"use client"

import * as React from "react"
import Link from "next/link"
import { 
  MessageSquare, Users, Eye, Clock, TrendingUp, Zap,
  Home, BookOpen, Lightbulb, Coffee, ArrowRight, Sparkles
} from "lucide-react"

import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar } from "@/components/ui/avatar"
import { cn, formatRelativeTime } from "@/lib/utils"

export default function HomePage() {
  // Mock data - replace with real API calls
  const forumStats = {
    totalMembers: 12847,
    totalThreads: 3421,
    totalPosts: 28935,
    onlineNow: 147
  }

  const categories = [
    {
      id: "welcome",
      name: "Welcome & Announcements",
      description: "New to CAD AI? Start here! Get the latest updates and community guidelines.",
      icon: <Home className="h-6 w-6" />,
      color: "from-blue-500 to-cyan-500",
      stats: { threads: 45, posts: 234, members: 12847 },
      subcategories: [
        { name: "👋 Introductions", posts: 156, lastPost: new Date(Date.now() - 2 * 60 * 60 * 1000) },
        { name: "🚀 Product Updates", posts: 23, lastPost: new Date(Date.now() - 4 * 60 * 60 * 1000) },
        { name: "📜 Guidelines", posts: 12, lastPost: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) },
      ]
    },
    {
      id: "projects",
      name: "CAD AI Projects",
      description: "Showcase your AI-generated models, get feedback, and collaborate with fellow creators.",
      icon: <Zap className="h-6 w-6" />,
      color: "from-purple-500 to-pink-500",
      stats: { threads: 1234, posts: 8921, members: 3421 },
      isHot: true,
      subcategories: [
        { name: "🏗️ Work in Progress", posts: 445, lastPost: new Date(Date.now() - 15 * 60 * 1000), isHot: true },
        { name: "🎨 Finished Models", posts: 234, lastPost: new Date(Date.now() - 30 * 60 * 1000) },
        { name: "🤝 Collaborations", posts: 89, lastPost: new Date(Date.now() - 2 * 60 * 60 * 1000) },
      ]
    },
    {
      id: "tutorials",
      name: "Tutorials & Knowledge Base",
      description: "Learn CAD techniques, AI workflows, and troubleshooting from the community experts.",
      icon: <BookOpen className="h-6 w-6" />,
      color: "from-green-500 to-emerald-500",
      stats: { threads: 567, posts: 3421, members: 2156 },
      subcategories: [
        { name: "📐 CAD Tips & Tricks", posts: 234, lastPost: new Date(Date.now() - 1 * 60 * 60 * 1000) },
        { name: "🤖 AI Workflow Guides", posts: 156, lastPost: new Date(Date.now() - 3 * 60 * 60 * 1000) },
        { name: "🛠️ Troubleshooting", posts: 334, lastPost: new Date(Date.now() - 45 * 60 * 1000) },
      ]
    },
    {
      id: "feedback",
      name: "Feedback & Feature Requests",
      description: "Help shape the future of CAD AI. Report bugs, suggest features, and vote on roadmap items.",
      icon: <Lightbulb className="h-6 w-6" />,
      color: "from-yellow-500 to-orange-500",
      stats: { threads: 234, posts: 1456, members: 1789 },
      subcategories: [
        { name: "💡 Ideas & Suggestions", posts: 123, lastPost: new Date(Date.now() - 2 * 60 * 60 * 1000) },
        { name: "🐞 Bug Reports", posts: 45, lastPost: new Date(Date.now() - 6 * 60 * 60 * 1000) },
        { name: "🔮 Future Roadmap", posts: 23, lastPost: new Date(Date.now() - 12 * 60 * 60 * 1000) },
      ]
    },
    {
      id: "community",
      name: "Off-Topic & Community",
      description: "Connect with fellow creators, share stories, and discuss the latest in tech and AI.",
      icon: <Coffee className="h-6 w-6" />,
      color: "from-indigo-500 to-purple-500",
      stats: { threads: 1789, posts: 9876, members: 4567 },
      subcategories: [
        { name: "☕ Lounge", posts: 567, lastPost: new Date(Date.now() - 10 * 60 * 1000) },
        { name: "🎮 Fun & Random", posts: 432, lastPost: new Date(Date.now() - 25 * 60 * 1000) },
        { name: "📰 Tech & AI News", posts: 123, lastPost: new Date(Date.now() - 1 * 60 * 60 * 1000) },
      ]
    }
  ]

  const recentActivity = [
    {
      user: { name: "GeoMetrician", avatar: "", reputation: 2847 },
      action: "posted in",
      thread: "How to optimize AI-generated meshes for 3D printing",
      category: "CAD Tips & Tricks",
      time: new Date(Date.now() - 15 * 60 * 1000),
    },
    {
      user: { name: "LatheWizard", avatar: "", reputation: 1923 },
      action: "created",
      thread: "Parametric gear generator using DeepSeek",
      category: "Work in Progress",
      time: new Date(Date.now() - 32 * 60 * 1000),
    },
    {
      user: { name: "AI_Architect", avatar: "", reputation: 3456 },
      action: "replied in",
      thread: "Best practices for prompt engineering in CAD",
      category: "AI Workflow Guides",
      time: new Date(Date.now() - 1 * 60 * 60 * 1000),
    }
  ]

  return (
    <MainLayout>
      {/* Hero Section */}
      <div className="relative mb-12 overflow-hidden rounded-2xl bg-gradient-to-r from-background via-muted to-background border border-border">
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-[0.02]" />
        <div className="relative px-8 py-12 text-center">
          <div className="mx-auto max-w-4xl">
            <h1 className="mb-6 text-5xl font-bold tracking-tight">
              Welcome to <span className="bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent">CAD AI Forum</span>
            </h1>
            <p className="mb-8 text-xl text-muted-foreground">
              The premier community for AI-powered CAD enthusiasts. Share projects, learn techniques, 
              and collaborate on cutting-edge 3D modeling workflows.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="neon" size="lg" className="group">
                <Sparkles className="mr-2 h-4 w-4 group-hover:animate-spin" />
                Join the Community
              </Button>
              <Button variant="outline" size="lg">
                <TrendingUp className="mr-2 h-4 w-4" />
                View Trending
              </Button>
            </div>
          </div>
        </div>
        
        {/* Animated elements */}
        <div className="absolute -top-4 -right-4 w-24 h-24 diamond bg-neon-cyan/10 animate-float" />
        <div className="absolute -bottom-8 -left-8 w-16 h-16 hexagon bg-neon-purple/10 animate-float" style={{ animationDelay: '2s' }} />
      </div>

      {/* Forum Stats */}
      <div className="mb-12 grid grid-cols-2 gap-6 md:grid-cols-4">
        <StatCard 
          label="Members" 
          value={forumStats.totalMembers} 
          icon={<Users className="h-5 w-5" />}
          color="text-neon-cyan" 
        />
        <StatCard 
          label="Threads" 
          value={forumStats.totalThreads} 
          icon={<MessageSquare className="h-5 w-5" />}
          color="text-neon-green" 
        />
        <StatCard 
          label="Posts" 
          value={forumStats.totalPosts} 
          icon={<Eye className="h-5 w-5" />}
          color="text-neon-purple" 
        />
        <StatCard 
          label="Online Now" 
          value={forumStats.onlineNow} 
          icon={<div className="h-2 w-2 rounded-full bg-neon-green animate-pulse" />}
          color="text-neon-green" 
        />
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Categories */}
        <div className="lg:col-span-2">
          <h2 className="mb-6 text-2xl font-bold">Forum Categories</h2>
          <div className="space-y-6">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent Activity */}
          <Card className="cad-border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-neon-cyan" />
                <span>Recent Activity</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((activity, index) => (
                <ActivityItem key={index} activity={activity} />
              ))}
            </CardContent>
          </Card>

          {/* Top Contributors */}
          <Card className="cad-border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-neon-green" />
                <span>Top Contributors</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {['AI_Architect', 'GeoMetrician', 'LatheWizard'].map((user, index) => (
                  <div key={user} className="flex items-center space-x-3">
                    <div className={cn(
                      "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold",
                      index === 0 && "bg-yellow-500 text-black",
                      index === 1 && "bg-gray-400 text-white",
                      index === 2 && "bg-amber-600 text-white"
                    )}>
                      {index + 1}
                    </div>
                    <Avatar name={user} size="sm" />
                    <div>
                      <div className="text-sm font-medium">{user}</div>
                      <div className="text-xs text-muted-foreground">
                        {3456 - index * 500} REP
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}

interface StatCardProps {
  label: string
  value: number
  icon: React.ReactNode
  color?: string
}

function StatCard({ label, value, icon, color = "text-foreground" }: StatCardProps) {
  return (
    <Card className="cad-border hover:shadow-lg transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className={cn("text-2xl font-bold", color)}>
              {value.toLocaleString()}
            </p>
          </div>
          <div className={color}>{icon}</div>
        </div>
      </CardContent>
    </Card>
  )
}

interface CategoryCardProps {
  category: {
    id: string
    name: string
    description: string
    icon: React.ReactNode
    color: string
    stats: { threads: number; posts: number; members: number }
    isHot?: boolean
    subcategories: Array<{
      name: string
      posts: number
      lastPost: Date
      isHot?: boolean
    }>
  }
}

function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Card className="category-card group">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className={cn(
              "p-3 rounded-xl bg-gradient-to-br text-white shadow-lg",
              category.color
            )}>
              {category.icon}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-xl font-bold">{category.name}</h3>
                {category.isHot && (
                  <Badge variant="epic" className="animate-pulse">
                    🔥 Hot
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {category.description}
              </p>
            </div>
          </div>
          
          <Link href={`/category/${category.id}`}>
            <Button variant="ghost" size="icon" className="group-hover:bg-muted">
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="flex items-center space-x-6 mb-4 text-sm text-muted-foreground">
          <span className="flex items-center space-x-1">
            <MessageSquare className="h-4 w-4" />
            <span>{category.stats.threads.toLocaleString()} threads</span>
          </span>
          <span className="flex items-center space-x-1">
            <Eye className="h-4 w-4" />
            <span>{category.stats.posts.toLocaleString()} posts</span>
          </span>
          <span className="flex items-center space-x-1">
            <Users className="h-4 w-4" />
            <span>{category.stats.members.toLocaleString()} members</span>
          </span>
        </div>

        {/* Subcategories */}
        <div className="space-y-2">
          {category.subcategories.map((sub, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center space-x-2">
                <span className="text-sm">{sub.name}</span>
                {sub.isHot && <Badge variant="rare" className="px-1 py-0 text-xs">Hot</Badge>}
              </div>
              <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                <span>{sub.posts} posts</span>
                <span>{formatRelativeTime(sub.lastPost)}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

interface ActivityItemProps {
  activity: {
    user: { name: string; avatar: string; reputation: number }
    action: string
    thread: string
    category: string
    time: Date
  }
}

function ActivityItem({ activity }: ActivityItemProps) {
  return (
    <div className="flex items-start space-x-3">
      <Avatar name={activity.user.name} size="sm" />
      <div className="flex-1 min-w-0">
        <p className="text-sm">
          <span className="font-medium">{activity.user.name}</span>
          {' '}
          <span className="text-muted-foreground">{activity.action}</span>
        </p>
        <p className="text-sm font-medium text-neon-cyan truncate">
          {activity.thread}
        </p>
        <p className="text-xs text-muted-foreground">
          in {activity.category} · {formatRelativeTime(activity.time)}
        </p>
      </div>
    </div>
  )
}