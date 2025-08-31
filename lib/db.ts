import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
})

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

// Database utilities
export async function checkDatabaseConnection() {
  try {
    await prisma.$queryRaw`SELECT 1`
    return { success: true, message: 'Database connected successfully' }
  } catch (error) {
    return { 
      success: false, 
      message: `Database connection failed: ${error instanceof Error ? error.message : 'Unknown error'}` 
    }
  }
}

export async function disconnectDatabase() {
  await prisma.$disconnect()
}

// Helper functions for common queries
export const db = {
  // User queries
  user: {
    findByEmail: (email: string) =>
      prisma.user.findUnique({ where: { email } }),
    
    findByUsername: (username: string) =>
      prisma.user.findUnique({ where: { username } }),
    
    create: (data: Parameters<typeof prisma.user.create>[0]['data']) =>
      prisma.user.create({ data }),
    
    updateReputation: (userId: string, points: number) =>
      prisma.user.update({
        where: { id: userId },
        data: { reputation: { increment: points } }
      }),
  },

  // Category queries
  category: {
    findAll: () =>
      prisma.category.findMany({
        include: {
          subcategories: {
            orderBy: { position: 'asc' }
          },
          _count: {
            select: { threads: true }
          }
        },
        orderBy: { position: 'asc' }
      }),
    
    findBySlug: (slug: string) =>
      prisma.category.findUnique({
        where: { slug },
        include: {
          subcategories: {
            orderBy: { position: 'asc' }
          }
        }
      }),
  },

  // Thread queries
  thread: {
    findMany: (options?: {
      categoryId?: string
      subcategoryId?: string
      take?: number
      skip?: number
      orderBy?: 'recent' | 'popular' | 'hot'
    }) => {
      const orderBy = options?.orderBy === 'popular' 
        ? { viewCount: 'desc' as const }
        : options?.orderBy === 'hot'
        ? { postCount: 'desc' as const }
        : { lastActivityAt: 'desc' as const }

      return prisma.thread.findMany({
        where: {
          categoryId: options?.categoryId,
          subcategoryId: options?.subcategoryId,
          isDeleted: false
        },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              username: true,
              image: true,
              reputation: true,
              role: true
            }
          },
          category: {
            select: {
              name: true,
              slug: true,
              color: true
            }
          },
          subcategory: {
            select: {
              name: true,
              slug: true
            }
          },
          _count: {
            select: { posts: true }
          },
          posts: {
            take: 1,
            orderBy: { createdAt: 'desc' },
            include: {
              author: {
                select: {
                  name: true,
                  username: true
                }
              }
            }
          }
        },
        orderBy,
        take: options?.take,
        skip: options?.skip
      })
    },

    findBySlug: (categorySlug: string, threadSlug: string) =>
      prisma.thread.findFirst({
        where: {
          slug: threadSlug,
          category: { slug: categorySlug },
          isDeleted: false
        },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              username: true,
              image: true,
              reputation: true,
              role: true,
              badges: {
                include: {
                  badge: true
                }
              }
            }
          },
          category: true,
          subcategory: true,
          posts: {
            where: { isDeleted: false },
            include: {
              author: {
                select: {
                  id: true,
                  name: true,
                  username: true,
                  image: true,
                  reputation: true,
                  role: true
                }
              },
              reactions: true,
              _count: {
                select: { replies: true }
              }
            },
            orderBy: { createdAt: 'asc' }
          },
          tags: {
            include: {
              tag: true
            }
          }
        }
      }),
  },

  // Post queries
  post: {
    create: (data: Parameters<typeof prisma.post.create>[0]['data']) =>
      prisma.post.create({ 
        data,
        include: {
          author: {
            select: {
              name: true,
              username: true,
              image: true,
              reputation: true,
              role: true
            }
          }
        }
      }),

    findReplies: (postId: string) =>
      prisma.post.findMany({
        where: {
          parentId: postId,
          isDeleted: false
        },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              username: true,
              image: true,
              reputation: true,
              role: true
            }
          },
          reactions: true
        },
        orderBy: { createdAt: 'asc' }
      }),
  },

  // Search queries
  search: {
    threads: (query: string, options?: { take?: number }) =>
      prisma.thread.findMany({
        where: {
          OR: [
            { title: { contains: query, mode: 'insensitive' } },
            { content: { contains: query, mode: 'insensitive' } }
          ],
          isDeleted: false
        },
        include: {
          author: {
            select: {
              name: true,
              username: true,
              image: true
            }
          },
          category: {
            select: {
              name: true,
              slug: true
            }
          }
        },
        take: options?.take || 50,
        orderBy: { lastActivityAt: 'desc' }
      }),

    users: (query: string, options?: { take?: number }) =>
      prisma.user.findMany({
        where: {
          OR: [
            { name: { contains: query, mode: 'insensitive' } },
            { username: { contains: query, mode: 'insensitive' } }
          ]
        },
        select: {
          id: true,
          name: true,
          username: true,
          image: true,
          reputation: true,
          role: true
        },
        take: options?.take || 20,
        orderBy: { reputation: 'desc' }
      }),
  }
}