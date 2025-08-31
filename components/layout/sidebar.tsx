"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  Home, MessageSquare, Users, BookOpen, Lightbulb, Bug, 
  Coffee, Gamepad2, Newspaper, Settings, Crown, Shield,
  TrendingUp, Star, Activity, Flame
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface SidebarProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function Sidebar({ open, onOpenChange }: SidebarProps) {
  const pathname = usePathname()

  const categories = [
    {
      name: "Welcome & Announcements",
      icon: <Home className="h-4 w-4" />,
      subcategories: [
        { name: "👋 Introductions", href: "/category/introductions", posts: 42 },
        { name: "🚀 Product Updates", href: "/category/updates", posts: 8, isNew: true },
        { name: "📜 Community Guidelines", href: "/category/guidelines", posts: 3 },
      ]
    },
    {
      name: "CAD AI Projects",
      icon: <MessageSquare className="h-4 w-4" />,
      subcategories: [
        { name: "🏗️ Work in Progress", href: "/category/wip", posts: 156, isHot: true },
        { name: "🎨 Finished Models", href: "/category/showcase", posts: 89 },
        { name: "🤝 Collaborations", href: "/category/collab", posts: 23 },
      ]
    },
    {
      name: "Tutorials & Knowledge",
      icon: <BookOpen className="h-4 w-4" />,
      subcategories: [
        { name: "📐 CAD Tips & Tricks", href: "/category/cad-tips", posts: 67 },
        { name: "🤖 AI Workflow Guides", href: "/category/ai-guides", posts: 34 },
        { name: "🛠️ Troubleshooting", href: "/category/help", posts: 124 },
      ]
    },
    {
      name: "Feedback & Features",
      icon: <Lightbulb className="h-4 w-4" />,
      subcategories: [
        { name: "💡 Ideas & Suggestions", href: "/category/ideas", posts: 78 },
        { name: "🐞 Bug Reports", href: "/category/bugs", posts: 12 },
        { name: "🔮 Future Roadmap", href: "/category/roadmap", posts: 5 },
      ]
    },
    {
      name: "Off-Topic & Community",
      icon: <Coffee className="h-4 w-4" />,
      subcategories: [
        { name: "☕ Lounge", href: "/category/lounge", posts: 234 },
        { name: "🎮 Fun & Random", href: "/category/random", posts: 167 },
        { name: "📰 Tech & AI News", href: "/category/news", posts: 45 },
      ]
    }
  ]

  const quickLinks = [
    { name: "🔥 Trending", href: "/trending", icon: <TrendingUp className="h-4 w-4" /> },
    { name: "⭐ Popular", href: "/popular", icon: <Star className="h-4 w-4" /> },
    { name: "📊 Activity", href: "/activity", icon: <Activity className="h-4 w-4" /> },
  ]

  const userStats = {
    reputation: 2847,
    posts: 156,
    threads: 23,
    badges: 8
  }

  return (
    <>
      {/* Overlay for mobile */}
      {open && (
        <div 
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => onOpenChange(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 transform bg-background border-r border-border transition-transform duration-300 ease-in-out lg:translate-x-0",
        open ? "translate-x-0" : "-translate-x-full",
        "lg:static lg:inset-auto lg:transform-none"
      )}>
        <div className="flex h-full flex-col overflow-hidden">
          {/* Quick Stats */}
          <div className="border-b border-border p-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center">
                <div className="text-lg font-bold text-neon-cyan">{userStats.reputation.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">Reputation</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-neon-green">{userStats.badges}</div>
                <div className="text-xs text-muted-foreground">Badges</div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="border-b border-border p-4">
            <h3 className="mb-3 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Quick Access
            </h3>
            <div className="space-y-1">
              {quickLinks.map((link) => (
                <SidebarLink
                  key={link.href}
                  href={link.href}
                  icon={link.icon}
                  active={pathname === link.href}
                >
                  {link.name}
                </SidebarLink>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="flex-1 overflow-y-auto scrollbar-thin">
            <div className="p-4 space-y-6">
              {categories.map((category) => (
                <CategorySection 
                  key={category.name}
                  category={category}
                  pathname={pathname}
                />
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-border p-4">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>© 2024 CAD AI Forum</span>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Settings className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

interface CategorySectionProps {
  category: {
    name: string
    icon: React.ReactNode
    subcategories: Array<{
      name: string
      href: string
      posts: number
      isNew?: boolean
      isHot?: boolean
    }>
  }
  pathname: string
}

function CategorySection({ category, pathname }: CategorySectionProps) {
  const [isExpanded, setIsExpanded] = React.useState(true)

  return (
    <div>
      <Button
        variant="ghost"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full justify-start p-2 h-auto hover:bg-muted/50"
      >
        <div className="flex items-center space-x-2">
          {category.icon}
          <span className="text-sm font-medium">{category.name}</span>
        </div>
      </Button>
      
      {isExpanded && (
        <div className="ml-6 mt-1 space-y-1">
          {category.subcategories.map((sub) => (
            <SidebarLink
              key={sub.href}
              href={sub.href}
              active={pathname === sub.href}
              className="text-sm"
            >
              <div className="flex items-center justify-between w-full">
                <span>{sub.name}</span>
                <div className="flex items-center space-x-1">
                  {sub.isNew && <Badge variant="uncommon" className="px-1 py-0 text-xs">New</Badge>}
                  {sub.isHot && <Flame className="h-3 w-3 text-orange-500" />}
                  <span className="text-xs text-muted-foreground">{sub.posts}</span>
                </div>
              </div>
            </SidebarLink>
          ))}
        </div>
      )}
    </div>
  )
}

interface SidebarLinkProps {
  href: string
  children: React.ReactNode
  icon?: React.ReactNode
  active?: boolean
  className?: string
}

function SidebarLink({ href, children, icon, active, className }: SidebarLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center space-x-2 rounded-lg px-3 py-2 text-sm transition-all duration-200 relative overflow-hidden group",
        active 
          ? "bg-primary text-primary-foreground shadow-sm" 
          : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
        className
      )}
    >
      {icon}
      <span className="flex-1">{children}</span>
      
      {active && (
        <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/20 to-neon-purple/20" />
      )}
      
      {!active && (
        <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/10 to-neon-purple/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      )}
    </Link>
  )
}