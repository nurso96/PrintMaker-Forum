import { PrismaClient, UserRole, BadgeRarity, ReactionType } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Clear existing data
  await prisma.reaction.deleteMany()
  await prisma.post.deleteMany()
  await prisma.thread.deleteMany()
  await prisma.userBadge.deleteMany()
  await prisma.badge.deleteMany()
  await prisma.subcategory.deleteMany()
  await prisma.category.deleteMany()
  await prisma.account.deleteMany()
  await prisma.user.deleteMany()

  console.log('🗑️  Cleared existing data')

  // Create badges
  const badges = await Promise.all([
    prisma.badge.create({
      data: {
        name: "First Post",
        description: "Made your first post in the forum",
        icon: "🎯",
        color: "#22c55e",
        rarity: BadgeRarity.COMMON,
        criteria: "Create your first post",
      }
    }),
    prisma.badge.create({
      data: {
        name: "CAD Master",
        description: "Expert in CAD modeling and design",
        icon: "🏆",
        color: "#f59e0b",
        rarity: BadgeRarity.RARE,
        criteria: "Demonstrate advanced CAD skills",
      }
    }),
    prisma.badge.create({
      data: {
        name: "AI Pioneer",
        description: "Early adopter of AI-powered CAD workflows",
        icon: "🚀",
        color: "#8b5cf6",
        rarity: BadgeRarity.EPIC,
        criteria: "Share innovative AI CAD techniques",
      }
    }),
    prisma.badge.create({
      data: {
        name: "Community Helper",
        description: "Always ready to help fellow members",
        icon: "🤝",
        color: "#06b6d4",
        rarity: BadgeRarity.UNCOMMON,
        criteria: "Help other community members consistently",
      }
    }),
    prisma.badge.create({
      data: {
        name: "Bug Hunter",
        description: "Found critical bugs and helped improve the platform",
        icon: "🐛",
        color: "#ef4444",
        rarity: BadgeRarity.RARE,
        criteria: "Report critical bugs",
      }
    }),
    prisma.badge.create({
      data: {
        name: "Legendary Contributor",
        description: "Outstanding contributions to the community",
        icon: "⭐",
        color: "#fbbf24",
        rarity: BadgeRarity.LEGENDARY,
        criteria: "Make exceptional contributions to the community",
      }
    }),
  ])

  console.log('🏅 Created badges')

  // Create mock users with AI/CAD-themed names
  const users = await Promise.all([
    prisma.user.create({
      data: {
        name: "GeoMetrician",
        username: "geometrician", 
        email: "geo@cadai.forum",
        image: "/avatars/geo.jpg",
        bio: "Passionate about parametric design and computational geometry. Love exploring the mathematical beauty behind 3D forms.",
        location: "San Francisco, CA",
        website: "https://geometrician.dev",
        role: UserRole.USER,
        reputation: 2847,
        totalPosts: 156,
        totalThreads: 23,
        joinedAt: new Date('2024-01-15'),
        lastActiveAt: new Date(),
        isVerified: true,
      }
    }),
    prisma.user.create({
      data: {
        name: "LatheWizard",
        username: "lathewizard",
        email: "lathe@cadai.forum", 
        image: "/avatars/lathe.jpg",
        bio: "CNC machinist turned AI enthusiast. Bridging traditional manufacturing with cutting-edge AI workflows.",
        location: "Detroit, MI",
        role: UserRole.USER,
        reputation: 1923,
        totalPosts: 134,
        totalThreads: 18,
        joinedAt: new Date('2024-02-03'),
        lastActiveAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
        isVerified: true,
      }
    }),
    prisma.user.create({
      data: {
        name: "AI_Architect",
        username: "ai_architect",
        email: "architect@cadai.forum",
        image: "/avatars/architect.jpg", 
        bio: "Pushing the boundaries of what's possible with AI in design. Always experimenting with the latest models and techniques.",
        location: "Austin, TX",
        website: "https://aiarchitect.io",
        role: UserRole.MODERATOR,
        reputation: 3456,
        totalPosts: 234,
        totalThreads: 45,
        joinedAt: new Date('2023-12-10'),
        lastActiveAt: new Date(Date.now() - 30 * 60 * 1000),
        isVerified: true,
        isPremium: true,
      }
    }),
    prisma.user.create({
      data: {
        name: "PrintSorcerer",
        username: "printsorcerer",
        email: "print@cadai.forum",
        image: "/avatars/sorcerer.jpg",
        bio: "3D printing wizard who can make any design printable. Specializing in support-free geometries and print optimization.",
        location: "Berlin, Germany", 
        role: UserRole.USER,
        reputation: 1654,
        totalPosts: 98,
        totalThreads: 12,
        joinedAt: new Date('2024-03-20'),
        lastActiveAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
        isVerified: true,
      }
    }),
    prisma.user.create({
      data: {
        name: "BugHunter",
        username: "bughunter",
        email: "bugs@cadai.forum",
        image: "/avatars/hunter.jpg",
        bio: "Professional QA engineer with an eye for edge cases. If there's a bug, I'll find it!",
        location: "Vancouver, Canada",
        role: UserRole.USER, 
        reputation: 987,
        totalPosts: 67,
        totalThreads: 8,
        joinedAt: new Date('2024-04-12'),
        lastActiveAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
        isVerified: false,
      }
    }),
    prisma.user.create({
      data: {
        name: "MeshMaster",
        username: "meshmaster",
        email: "mesh@cadai.forum",
        role: UserRole.USER,
        reputation: 2341,
        totalPosts: 189,
        totalThreads: 29,
        joinedAt: new Date('2024-01-28'),
        lastActiveAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
      }
    }),
    prisma.user.create({
      data: {
        name: "CodeCrafter",
        username: "codecrafter",
        email: "code@cadai.forum",
        bio: "OpenSCAD enthusiast and procedural modeling expert. Love generating complex geometries with simple code.",
        role: UserRole.USER,
        reputation: 1876,
        totalPosts: 143,
        totalThreads: 21,
        joinedAt: new Date('2024-02-14'),
        lastActiveAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
      }
    }),
    prisma.user.create({
      data: {
        name: "ForumAdmin",
        username: "admin",
        email: "admin@cadai.forum",
        bio: "Community manager and platform administrator. Here to help and keep things running smoothly!",
        role: UserRole.ADMIN,
        reputation: 5000,
        totalPosts: 89,
        totalThreads: 15,
        joinedAt: new Date('2023-11-01'),
        lastActiveAt: new Date(),
        isVerified: true,
        isPremium: true,
      }
    }),
  ])

  console.log('👥 Created mock users')

  // Create categories with subcategories
  const welcomeCategory = await prisma.category.create({
    data: {
      name: "Welcome & Announcements",
      slug: "welcome",
      description: "New to CAD AI? Start here! Get the latest updates and community guidelines.",
      icon: "👋",
      color: "#3b82f6",
      position: 1,
      subcategories: {
        create: [
          {
            name: "Introductions",
            slug: "introductions", 
            description: "Introduce yourself to the community",
            icon: "👋",
            position: 1,
          },
          {
            name: "Product Updates",
            slug: "updates",
            description: "Latest updates and announcements", 
            icon: "🚀",
            position: 2,
          },
          {
            name: "Community Guidelines",
            slug: "guidelines",
            description: "Rules and guidelines for the community",
            icon: "📜", 
            position: 3,
          },
        ]
      }
    },
    include: { subcategories: true }
  })

  const projectsCategory = await prisma.category.create({
    data: {
      name: "CAD AI Projects",
      slug: "projects", 
      description: "Showcase your AI-generated models, get feedback, and collaborate with fellow creators.",
      icon: "⚡",
      color: "#8b5cf6",
      position: 2,
      subcategories: {
        create: [
          {
            name: "Work in Progress",
            slug: "wip",
            description: "Share your ongoing projects and get feedback",
            icon: "🏗️",
            position: 1,
          },
          {
            name: "Finished Models Showcase",
            slug: "showcase", 
            description: "Show off your completed AI-generated models",
            icon: "🎨",
            position: 2,
          },
          {
            name: "Collaborations",
            slug: "collaborations",
            description: "Find collaborators for your projects",
            icon: "🤝",
            position: 3,
          },
        ]
      }
    },
    include: { subcategories: true }
  })

  const tutorialsCategory = await prisma.category.create({
    data: {
      name: "Tutorials & Knowledge Base",
      slug: "tutorials",
      description: "Learn CAD techniques, AI workflows, and troubleshooting from the community experts.",
      icon: "📚",
      color: "#10b981", 
      position: 3,
      subcategories: {
        create: [
          {
            name: "CAD Tips & Tricks",
            slug: "cad-tips",
            description: "General CAD modeling tips and techniques",
            icon: "📐",
            position: 1,
          },
          {
            name: "AI Workflow Guides", 
            slug: "ai-guides",
            description: "Learn how to use AI effectively in your CAD workflow",
            icon: "🤖",
            position: 2,
          },
          {
            name: "Troubleshooting",
            slug: "help",
            description: "Get help with technical issues and problems",
            icon: "🛠️",
            position: 3,
          },
        ]
      }
    },
    include: { subcategories: true }
  })

  const feedbackCategory = await prisma.category.create({
    data: {
      name: "Feedback & Feature Requests",
      slug: "feedback",
      description: "Help shape the future of CAD AI. Report bugs, suggest features, and vote on roadmap items.",
      icon: "💡",
      color: "#f59e0b",
      position: 4,
      subcategories: {
        create: [
          {
            name: "Ideas & Suggestions",
            slug: "ideas", 
            description: "Share your ideas for new features and improvements",
            icon: "💡",
            position: 1,
          },
          {
            name: "Bug Reports",
            slug: "bugs",
            description: "Report bugs and technical issues",
            icon: "🐞",
            position: 2,
          },
          {
            name: "Future Roadmap",
            slug: "roadmap",
            description: "Discuss future development plans",
            icon: "🔮",
            position: 3,
          },
        ]
      }
    },
    include: { subcategories: true }
  })

  const communityCategory = await prisma.category.create({
    data: {
      name: "Off-Topic & Community",
      slug: "community",
      description: "Connect with fellow creators, share stories, and discuss the latest in tech and AI.",
      icon: "☕",
      color: "#6366f1",
      position: 5,
      subcategories: {
        create: [
          {
            name: "Lounge",
            slug: "lounge",
            description: "General discussion and casual chat",
            icon: "☕",
            position: 1,
          },
          {
            name: "Fun & Random",
            slug: "random",
            description: "Off-topic discussions and fun content", 
            icon: "🎮",
            position: 2,
          },
          {
            name: "Tech & AI News",
            slug: "news",
            description: "Latest news in technology and AI",
            icon: "📰",
            position: 3,
          },
        ]
      }
    },
    include: { subcategories: true }
  })

  console.log('📂 Created categories and subcategories')

  // Create welcome threads with the specified content
  const welcomeThreads = [
    {
      title: "Welcome to the CAD AI Forum!",
      content: `Welcome, creators! This is the official community hub for all things CAD + AI. Whether you're testing the SaaS, building models, or just curious, you belong here. 

Start by introducing yourself below—share your favorite CAD tool, what you're working on, or a random fun fact. Don't be shy, we're all here to experiment and grow.

## What You'll Find Here
- 🏗️ **Projects**: Share your work-in-progress and finished models
- 📚 **Tutorials**: Learn from community experts
- 💡 **Ideas**: Help shape the future of CAD AI
- ☕ **Community**: Connect with fellow creators

Let's build something amazing together! 🚀`,
      categoryId: welcomeCategory.id,
      subcategoryId: welcomeCategory.subcategories[0].id, // Introductions
      authorId: users[7].id, // ForumAdmin
    },
    {
      title: "First Update: Beta Forum is Live",
      content: `We're thrilled to have you here. This forum is our central space to share updates, patch notes, and behind-the-scenes progress on our AI-powered CAD SaaS. Watch this space for regular updates.

## What's New
- ✨ Beautiful new forum design with CAD-inspired aesthetics
- 🔥 Real-time activity feeds and notifications
- 🏆 Reputation system and community badges
- 🎨 Rich text editor with code syntax highlighting

To kick things off—drop your thoughts on the UI design below! What do you love? What could be improved? Your feedback shapes our development priorities.

## Coming Soon
- 📱 Mobile app companion
- 🔗 Direct integration with the main CAD AI platform
- 🎯 Advanced project collaboration tools`,
      categoryId: welcomeCategory.id,
      subcategoryId: welcomeCategory.subcategories[1].id, // Product Updates  
      authorId: users[7].id, // ForumAdmin
    },
    {
      title: "Share Your WIP Models",
      content: `Got a model half-done? Post screenshots, STL snippets, or just brainstorms. The messier the better. Early sketches often lead to the wildest breakthroughs.

Our AI assistant loves iterating on WIP files, so let's start swapping them here.

## What to Share
- 🖼️ **Screenshots**: Show your modeling progress
- 📁 **Files**: Upload STL, OBJ, or OpenSCAD files
- 💭 **Ideas**: Describe your concept even if it's not built yet
- ❓ **Questions**: Ask for help or feedback

## Tips for Great WIP Posts
1. **Context is key**: Explain what you're trying to achieve
2. **Show your process**: Multiple iterations are fascinating
3. **Ask specific questions**: "How can I improve the aerodynamics?" vs "What do you think?"
4. **Tag your tools**: #OpenSCAD #FreeCAD #AI #DeepSeek

Remember: Every expert was once a beginner. Share fearlessly! 🎨`,
      categoryId: projectsCategory.id,
      subcategoryId: projectsCategory.subcategories[0].id, // WIP
      authorId: users[2].id, // AI_Architect
    },
    {
      title: "Using AI to Jumpstart Your CAD Workflow",
      content: `AI is not here to replace creativity—it's here to turbocharge it. In this category, we'll post guides on using AI prompts to generate base STL, refine meshes, and auto-optimize for printing.

Feel free to share your hacks and personal workflows.

## AI CAD Workflow Fundamentals

### 1. **Prompt Engineering for 3D Models**
The key to great AI-generated CAD is specific, detailed prompts:

\`\`\`
❌ Bad: "Create a gear"
✅ Good: "Create a 20-tooth involute gear, module 2.5, 20-degree pressure angle, with 6mm center hole and chamfered edges"
\`\`\`

### 2. **Iterative Refinement**
- Start with basic shapes
- Add details incrementally
- Use AI for optimization passes
- Always validate geometry

### 3. **Popular AI Tools Integration**
- **DeepSeek**: Natural language to OpenSCAD
- **GPT-4**: Complex parametric modeling
- **Custom Models**: Fine-tuned for specific domains

### 4. **Quality Control Checklist**
- [ ] Manifold geometry
- [ ] Proper wall thickness
- [ ] No floating elements
- [ ] Print-friendly orientation

## Share Your Workflows!
Post your favorite prompts, tools, and techniques. Let's build a comprehensive knowledge base together! 🤖⚡`,
      categoryId: tutorialsCategory.id,
      subcategoryId: tutorialsCategory.subcategories[1].id, // AI Guides
      authorId: users[2].id, // AI_Architect
    },
    {
      title: "Got a Feature Idea? Post It Here",
      content: `We're building this platform with you, not just for you. Have an idea for the forum, CAD AI SaaS, or something completely wild? Post it here. Even 'half-baked' ideas are welcome—we'll explore together what can be real.

## How to Submit Great Ideas

### 1. **Problem Statement**
Start with the problem you're trying to solve:
- What workflow is currently frustrating?
- What takes too much time?
- What's impossible with current tools?

### 2. **Proposed Solution**  
Describe your idea in detail:
- How would it work?
- What would the user experience be?
- Any technical considerations?

### 3. **Impact Assessment**
Help us prioritize:
- Who would benefit? (beginners, experts, specific industries)
- How often would this be used?
- What's the learning curve?

## Current Hot Topics 🔥
- Real-time collaborative modeling
- AI-powered error detection
- Mobile CAD companion app
- Integration with major CAD platforms
- Advanced material simulation

## Voting System
Use reactions to vote on ideas:
- 👍 Love it!
- 🤔 Interesting, needs refinement  
- 🚀 This should be prioritized
- 💡 I have additional ideas

Your feedback directly influences our development roadmap. Let's build the future of CAD together! 💪`,
      categoryId: feedbackCategory.id,
      subcategoryId: feedbackCategory.subcategories[0].id, // Ideas
      authorId: users[7].id, // ForumAdmin
    },
  ]

  const createdThreads = []
  for (const threadData of welcomeThreads) {
    const thread = await prisma.thread.create({
      data: {
        ...threadData,
        slug: threadData.title.toLowerCase().replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '-'),
        isSticky: true, // Make welcome threads sticky
        lastActivityAt: new Date(),
      }
    })
    createdThreads.push(thread)
  }

  console.log('📝 Created welcome threads')

  // Assign badges to users
  await Promise.all([
    // AI_Architect gets multiple badges
    prisma.userBadge.create({
      data: {
        userId: users[2].id, // AI_Architect  
        badgeId: badges[2].id, // AI Pioneer
      }
    }),
    prisma.userBadge.create({
      data: {
        userId: users[2].id, // AI_Architect
        badgeId: badges[5].id, // Legendary Contributor
      }
    }),
    // LatheWizard gets CAD Master
    prisma.userBadge.create({
      data: {
        userId: users[1].id, // LatheWizard
        badgeId: badges[1].id, // CAD Master
      }
    }),
    // BugHunter gets Bug Hunter badge
    prisma.userBadge.create({
      data: {
        userId: users[4].id, // BugHunter
        badgeId: badges[4].id, // Bug Hunter
      }
    }),
    // GeoMetrician gets Community Helper
    prisma.userBadge.create({
      data: {
        userId: users[0].id, // GeoMetrician
        badgeId: badges[3].id, // Community Helper
      }
    }),
  ])

  console.log('🏅 Assigned badges to users')

  // Create some sample replies to welcome threads
  const samplePosts = [
    {
      threadId: createdThreads[0].id, // Welcome thread
      authorId: users[0].id, // GeoMetrician
      content: `Hey everyone! 👋 

I'm GeoMetrician, and I've been working with parametric CAD for over 8 years. Recently got into AI-assisted modeling and I'm blown away by what's possible!

**Current setup:**
- Primary tool: OpenSCAD + custom Python scripts  
- AI: DeepSeek for complex geometries
- Focus: Mathematical art and functional prototypes

**Random fun fact:** I once generated a 3D fractal that took 47 hours to render but looked absolutely stunning when 3D printed in translucent resin! ✨

Looking forward to sharing some of my geometric experiments here. The intersection of math, AI, and fabrication is where the magic happens! 🔮`,
    },
    {
      threadId: createdThreads[0].id, // Welcome thread  
      authorId: users[1].id, // LatheWizard
      content: `Welcome! I'm LatheWizard - been machining parts for 15 years, recently diving into the AI side of things.

**My background:**
- Traditional CNC machining and turning
- Transitioning from manual programming to AI-assisted CAD
- Love bridging old-school manufacturing with new tech

**Currently working on:** A series of precision mechanical components that would traditionally take days to program, but AI helps me iterate in minutes!

**Fun fact:** My workshop has a 1960s manual lathe right next to a modern AI workstation. The contrast is pretty wild! 🔧⚙️

Excited to learn from all of you! 🚀`,
    },
    {
      threadId: createdThreads[2].id, // WIP thread
      authorId: users[3].id, // PrintSorcerer  
      content: `Just uploaded my latest WIP - a generative bracket design that adapts to stress patterns! 

The AI generated 47 different iterations based on FEA feedback. Still fine-tuning the support removal strategy, but the organic forms are incredible.

**Files attached:**
- bracket_v23.stl (latest iteration)
- stress_analysis.png  
- generation_params.json

Anyone have experience with variable-density infill for organic structures like this? The overhangs are tricky but I think there's a solution! 🧙‍♂️✨

**Print settings so far:**
- Layer height: 0.15mm
- Infill: 15% gyroid
- Supports: Tree supports (experimental)

[Would upload actual files in real implementation]`,
    },
  ]

  for (const postData of samplePosts) {
    await prisma.post.create({
      data: {
        ...postData,
        createdAt: new Date(Date.now() - Math.random() * 2 * 60 * 60 * 1000), // Random time within last 2 hours
      }
    })
  }

  console.log('💬 Created sample posts')

  // Update thread activity
  for (const thread of createdThreads) {
    await prisma.thread.update({
      where: { id: thread.id },
      data: {
        postCount: await prisma.post.count({
          where: { threadId: thread.id }
        }),
        lastActivityAt: new Date(),
      }
    })
  }

  console.log('📊 Updated thread statistics')
  console.log('✅ Database seed completed successfully!')

  // Print summary
  const stats = {
    users: await prisma.user.count(),
    categories: await prisma.category.count(), 
    subcategories: await prisma.subcategory.count(),
    threads: await prisma.thread.count(),
    posts: await prisma.post.count(),
    badges: await prisma.badge.count(),
  }

  console.log('\n📈 Seed Summary:')
  console.log(`👥 Users: ${stats.users}`)
  console.log(`📂 Categories: ${stats.categories}`)  
  console.log(`📁 Subcategories: ${stats.subcategories}`)
  console.log(`📝 Threads: ${stats.threads}`)
  console.log(`💬 Posts: ${stats.posts}`)
  console.log(`🏅 Badges: ${stats.badges}`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Seed failed:', e)
    await prisma.$disconnect()
    process.exit(1)
  })