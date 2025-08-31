"use client"

import * as React from "react"
import { Header } from "./header"
import { Sidebar } from "./sidebar"
import { cn } from "@/lib/utils"

interface MainLayoutProps {
  children: React.ReactNode
  className?: string
  showSidebar?: boolean
}

export function MainLayout({ 
  children, 
  className,
  showSidebar = true 
}: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex">
        {showSidebar && (
          <Sidebar 
            open={sidebarOpen}
            onOpenChange={setSidebarOpen}
          />
        )}
        
        <main className={cn(
          "flex-1 overflow-hidden",
          showSidebar && "lg:ml-64",
          className
        )}>
          <div className="container mx-auto px-4 py-8 max-w-7xl">
            {children}
          </div>
        </main>
      </div>
      
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-10 w-4 h-4 diamond bg-neon-cyan/20 animate-float" 
             style={{ animationDelay: '0s' }} />
        <div className="absolute top-40 right-20 w-6 h-6 hexagon bg-neon-purple/20 animate-float" 
             style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-40 left-20 w-3 h-3 rounded-full bg-neon-green/30 animate-float" 
             style={{ animationDelay: '4s' }} />
        <div className="absolute bottom-20 right-10 w-5 h-5 diamond bg-neon-orange/20 animate-float" 
             style={{ animationDelay: '1s' }} />
      </div>
    </div>
  )
}