# 🚀 CAD AI Forum - Extravagant Community Platform

A modern, futuristic community forum designed specifically for CAD AI SaaS platforms. Built with Next.js, TypeScript, TailwindCSS, and Prisma with a stunning CAD-inspired aesthetic.

![CAD AI Forum](./public/demo-screenshot.png)

## ✨ Features

### 🎨 **Extravagant Design**
- Futuristic CAD-inspired aesthetic with geometric elements
- Animated holographic effects and neon accents
- Responsive design (desktop, tablet, mobile)
- Dark/light theme toggle with smooth transitions
- CAD-style grid background and floating elements

### 🏛️ **Core Forum Features**
- **Categories & Subcategories**: Organized discussion spaces
- **Threaded Discussions**: Rich text editor with code highlighting
- **User Profiles**: Avatars, badges, reputation system
- **Search & Filtering**: Find content quickly
- **Moderation Tools**: Admin/moderator dashboard
- **Real-time Activity**: Live updates and notifications

### 👥 **User Management**
- Authentication (Google/GitHub/Email)
- Role-based permissions (User/Moderator/Admin)
- Reputation system with levels
- Community badges and achievements
- Premium membership features

### 🛠️ **Technical Stack**
- **Frontend**: Next.js 14, TypeScript, TailwindCSS
- **Backend**: Next.js API routes, Prisma ORM
- **Database**: PostgreSQL (production) / SQLite (development)
- **Authentication**: NextAuth.js v5
- **UI Components**: Custom components with Radix UI primitives
- **Rich Text**: TipTap editor with code highlighting
- **Payments**: Stripe integration ready

## 🚀 Quick Start

### Prerequisites
- Node.js 18.17 or later
- npm or yarn package manager
- PostgreSQL database (or SQLite for development)

### 1. **Installation**

```bash
# Clone or create the project
cd PrintMaker-Forum

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
```

### 2. **Environment Setup**

Edit `.env.local` with your configuration:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/cadai_forum"

# NextAuth.js
NEXTAUTH_SECRET="your-super-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# OAuth Providers
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"

# Optional: Stripe for premium features
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
```

### 3. **Database Setup**

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma db push

# Seed with sample data (includes mock users and welcome posts)
npm run seed
```

### 4. **Start Development Server**

```bash
npm run dev
```

Visit `http://localhost:3000` to see your forum! 🎉

## 📊 Sample Data

The seed script creates:

### 👥 **Mock Users** (AI/CAD-themed names)
- **GeoMetrician** - Parametric design expert (2,847 reputation)
- **LatheWizard** - CNC machinist turned AI enthusiast (1,923 reputation)  
- **AI_Architect** - Moderator pushing AI boundaries (3,456 reputation)
- **PrintSorcerer** - 3D printing optimization wizard (1,654 reputation)
- **BugHunter** - QA engineer finding edge cases (987 reputation)
- **MeshMaster** - Geometry optimization specialist (2,341 reputation)
- **CodeCrafter** - OpenSCAD and procedural modeling expert (1,876 reputation)

### 📂 **Forum Categories**

1. **👋 Welcome & Announcements**
   - Introductions
   - Product Updates  
   - Community Guidelines

2. **⚡ CAD AI Projects**
   - Work in Progress
   - Finished Models Showcase
   - Collaborations

3. **📚 Tutorials & Knowledge Base**
   - CAD Tips & Tricks
   - AI Workflow Guides
   - Troubleshooting

4. **💡 Feedback & Feature Requests**
   - Ideas & Suggestions
   - Bug Reports
   - Future Roadmap

5. **☕ Off-Topic & Community**
   - Lounge
   - Fun & Random
   - Tech & AI News

### 📝 **Welcome Posts**
Pre-filled template posts for each category including:
- Community welcome message
- AI workflow guides
- Feature request guidelines
- Project sharing templates

## 🎨 Customization Guide

### **Brand Colors**

Edit `tailwind.config.ts` to customize the color scheme:

```typescript
// Add your brand colors
colors: {
  primary: "hsl(var(--primary))",
  // CAD-inspired neon colors
  neon: {
    cyan: '#00FFFF',      // Customize these
    green: '#00FF41',     // to match your
    purple: '#DA70D6',    // brand colors
    orange: '#FF6B35',
  }
}
```

### **Logo & Branding**

1. Replace logo in `components/layout/header.tsx`:
```tsx
// Replace the Zap icon with your logo
<YourLogo className="h-4 w-4 text-neon-cyan" />
```

2. Update brand name:
```tsx
<span className="text-xl font-bold tech-font">
  Your<span className="text-neon-cyan">Brand</span> Forum
</span>
```

3. Add your favicon and brand images to `/public/`

### **Custom CSS Variables**

Edit `app/globals.css` to adjust the theme:

```css
:root {
  --neon-cyan: 180 100% 50%;      /* Your primary accent */
  --neon-green: 120 100% 50%;     /* Success color */
  --neon-purple: 300 76% 72%;     /* Secondary accent */
  --neon-orange: 16 100% 60%;     /* Warning color */
}
```

### **Forum Categories**

Customize categories in the seed script (`prisma/seed.ts`) or through the admin interface:

```typescript
const categories = [
  {
    name: "Your Category Name",
    slug: "your-category",
    description: "Category description",
    icon: "🎯", // Emoji or icon
    color: "#your-color",
    // ... subcategories
  }
]
```

## 🔧 Development

### **Project Structure**

```
PrintMaker-Forum/
├── app/                     # Next.js 13+ app directory
│   ├── (auth)/             # Authentication routes
│   ├── api/                # API endpoints
│   ├── category/           # Category pages
│   ├── thread/             # Thread pages
│   ├── user/               # User profile pages
│   └── layout.tsx          # Root layout
├── components/             # React components
│   ├── ui/                 # Base UI components
│   ├── layout/             # Layout components  
│   ├── forum/              # Forum-specific components
│   └── forms/              # Form components
├── lib/                    # Utilities and configurations
│   ├── auth.ts             # Authentication config
│   ├── db.ts               # Database utilities
│   ├── utils.ts            # Helper functions
│   └── validators.ts       # Form validation schemas
├── prisma/                 # Database schema and migrations
│   ├── schema.prisma       # Database schema
│   └── seed.ts             # Sample data seeder
└── public/                 # Static assets
```

### **Available Scripts**

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run seed         # Seed database with sample data
npm run db:push      # Push schema changes to database
npm run db:migrate   # Create and run migrations
npm run db:studio    # Open Prisma Studio
```

### **Database Management**

```bash
# View your data
npm run db:studio

# Reset database and reseed
npx prisma db push --force-reset
npm run seed

# Create new migration
npx prisma migrate dev --name add_new_feature
```

## 🔐 Authentication Setup

### **Google OAuth**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add `http://localhost:3000` and `http://localhost:3000/api/auth/callback/google` to authorized origins

### **GitHub OAuth**
1. Go to GitHub Settings > Developer settings > OAuth Apps
2. Create new OAuth App
3. Set Authorization callback URL to `http://localhost:3000/api/auth/callback/github`

## 💳 Stripe Integration (Premium Features)

The forum is ready for premium features:

```typescript
// Premium features available
- Premium badges and profile customization
- Advanced moderation tools
- Priority support
- Extended file upload limits
- Custom themes
```

Set up Stripe:
1. Create Stripe account
2. Add API keys to environment variables
3. Configure webhook endpoints
4. Customize premium features in the codebase

## 🚀 Deployment

### **Vercel (Recommended)**

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard
```

### **Railway**

```bash
# Install Railway CLI
npm install -g @railway/cli

# Deploy
railway login
railway init
railway up
```

### **Docker**

```dockerfile
# Dockerfile included for containerized deployment
docker build -t cadai-forum .
docker run -p 3000:3000 cadai-forum
```

## 🎯 Advanced Features

### **Rich Text Editor**
- Code syntax highlighting
- Image uploads and embedding
- Markdown support
- Math notation (LaTeX)
- Mention system (@username)

### **Moderation System**
- User roles and permissions
- Content reporting and flagging
- Automated spam detection
- Reputation-based privileges
- Thread locking and stickying

### **Gamification**
- Reputation points system
- Achievement badges
- User levels and titles
- Community challenges
- Contribution tracking

### **Real-time Features**
- Live notifications
- Typing indicators
- Real-time post updates
- Online user presence
- Activity feeds

## 🔍 SEO & Performance

- **Next.js 14**: Latest performance optimizations
- **Server Components**: Reduced client-side JavaScript
- **Image Optimization**: Next.js Image component
- **Meta Tags**: Dynamic SEO meta tags
- **Sitemap**: Auto-generated sitemap
- **Analytics Ready**: Google Analytics integration points

## 🛠️ Troubleshooting

### **Common Issues**

**Database Connection Issues:**
```bash
# Check your DATABASE_URL in .env.local
# Ensure PostgreSQL is running
# Try resetting the database
npx prisma db push --force-reset
```

**Prisma Client Issues:**
```bash
# Regenerate Prisma client
npx prisma generate
```

**Build Errors:**
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

### **Performance Optimization**

```bash
# Analyze bundle size
npm run build && npm run analyze

# Database query optimization
# Use Prisma Studio to monitor query performance

# Image optimization
# Ensure all images use Next.js Image component
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Design Inspiration**: CAD software interfaces and geometric aesthetics
- **UI Components**: Radix UI primitives for accessibility
- **Color Palette**: Inspired by professional CAD tools
- **Community**: Built for makers, engineers, and AI enthusiasts

## 📞 Support

- 📧 Email: support@cadaiforum.com
- 💬 Discord: [Join our community](https://discord.gg/cadaiforum)
- 📖 Documentation: [Full docs](https://docs.cadaiforum.com)
- 🐛 Issues: [GitHub Issues](https://github.com/your-username/cadai-forum/issues)

---

**Built with ❤️ for the CAD AI community**

*Ready to launch your community? Clone this repo and customize it for your brand! The future of CAD collaboration starts here.* 🚀✨