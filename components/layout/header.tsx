"use client"

import * as React from "react"
import Link from "next/link"
import { Search, Bell, Settings, Menu, Zap, Users, BookOpen } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { cn } from "@/lib/utils"

interface HeaderProps {
  className?: string
}

export function Header({ className }: HeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = React.useState(false)
  
  // Mock user data - replace with real auth
  const user = {
    name: "GeoMetrician",
    avatar: "/avatars/geom.jpg",
    reputation: 2847,
    isOnline: true,
    notifications: 3
  }

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-xl",
      "before:absolute before:inset-0 before:bg-grid-pattern before:bg-grid before:opacity-[0.02]",
      className
    )}>
      {/* Scanning line effect */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-cyan to-transparent opacity-50 animate-scan" />
      
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo & Navigation */}
        <div className="flex items-center space-x-8">
          <Link href="/" className="group flex items-center space-x-3">
            <div className="relative">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-neon-cyan to-neon-purple p-0.5">
                <div className="h-full w-full rounded-[6px] bg-background flex items-center justify-center">
                  <Zap className="h-4 w-4 text-neon-cyan" />
                </div>
              </div>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-neon-cyan to-neon-purple opacity-0 blur-md transition-opacity group-hover:opacity-50" />
            </div>
            <span className="hidden sm:block text-xl font-bold tech-font">
              CAD<span className="text-neon-cyan">AI</span> Forum
            </span>
          </Link>

          <nav className="hidden lg:flex items-center space-x-6">
            <NavItem href="/categories" icon={<BookOpen className="h-4 w-4" />}>
              Categories
            </NavItem>
            <NavItem href="/community" icon={<Users className="h-4 w-4" />}>
              Community
            </NavItem>
            <NavItem href="/showcase">
              Showcase
            </NavItem>
            <NavItem href="/tutorials">
              Tutorials
            </NavItem>
          </nav>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-8 hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search threads, users, or tags..."
              className={cn(
                "w-full rounded-lg border border-input bg-background/50 pl-10 pr-4 py-2",
                "focus:border-neon-cyan focus:outline-none focus:ring-1 focus:ring-neon-cyan",
                "transition-all duration-300 tech-font text-sm",
                "placeholder:text-muted-foreground"
              )}
            />
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-neon-cyan/10 to-neon-purple/10 opacity-0 transition-opacity duration-300 focus-within:opacity-100" />
          </div>
        </div>

        {/* User Actions */}
        <div className="flex items-center space-x-3">
          {/* Mobile Search */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <Search className="h-4 w-4" />
          </Button>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-4 w-4" />
            {user.notifications > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs flex items-center justify-center animate-pulse"
              >
                {user.notifications}
              </Badge>
            )}
          </Button>

          {/* User Menu */}
          <div className="flex items-center space-x-3">
            <div className="hidden sm:block text-right">
              <div className="text-sm font-medium">{user.name}</div>
              <div className="text-xs text-muted-foreground flex items-center justify-end space-x-1">
                <span>{user.reputation.toLocaleString()} REP</span>
                <div className="w-1 h-1 rounded-full bg-neon-green animate-pulse" />
              </div>
            </div>
            <Avatar
              src={user.avatar}
              name={user.name}
              size="md"
              status={user.isOnline ? "online" : "offline"}
              showStatus
              className="ring-2 ring-transparent hover:ring-neon-cyan/50 transition-all duration-300 cursor-pointer"
            />
          </div>

          {/* Mobile Menu */}
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {isSearchOpen && (
        <div className="border-t border-border bg-background p-4 md:hidden">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full rounded-lg border border-input bg-background pl-10 pr-4 py-2 focus:border-neon-cyan focus:outline-none focus:ring-1 focus:ring-neon-cyan"
              autoFocus
            />
          </div>
        </div>
      )}
    </header>
  )
}

interface NavItemProps {
  href: string
  children: React.ReactNode
  icon?: React.ReactNode
}

function NavItem({ href, children, icon }: NavItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex items-center space-x-2 rounded-lg px-3 py-2 text-sm font-medium",
        "text-muted-foreground hover:text-foreground hover:bg-muted/50",
        "transition-all duration-300 relative overflow-hidden"
      )}
    >
      {icon}
      <span>{children}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/20 to-neon-purple/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </Link>
  )
}