"use client"

import * as React from "react"
import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ThemeToggleProps {
  className?: string
  variant?: "button" | "dropdown"
}

export function ThemeToggle({ className, variant = "button" }: ThemeToggleProps) {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className={cn("h-9 w-9 animate-pulse rounded-md bg-muted", className)} />
    )
  }

  const toggleTheme = () => {
    if (resolvedTheme === "dark") {
      setTheme("light")
    } else {
      setTheme("dark")
    }
  }

  const Icon = resolvedTheme === "dark" ? Sun : Moon

  if (variant === "button") {
    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        className={cn("relative overflow-hidden group", className)}
        aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} theme`}
      >
        <Icon className="h-4 w-4 transition-all duration-300 group-hover:scale-110" />
        
        {/* CAD-style scanning line effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neon-cyan to-transparent opacity-0 group-hover:opacity-30 group-hover:animate-scan" />
        
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  return (
    <div className={cn("flex items-center space-x-1 rounded-lg border bg-background p-1", className)}>
      <Button
        variant={theme === "light" ? "secondary" : "ghost"}
        size="sm"
        onClick={() => setTheme("light")}
        className="h-7 w-7 p-0"
        aria-label="Light theme"
      >
        <Sun className="h-3 w-3" />
      </Button>
      <Button
        variant={theme === "system" ? "secondary" : "ghost"}
        size="sm"
        onClick={() => setTheme("system")}
        className="h-7 w-7 p-0"
        aria-label="System theme"
      >
        <Monitor className="h-3 w-3" />
      </Button>
      <Button
        variant={theme === "dark" ? "secondary" : "ghost"}
        size="sm"
        onClick={() => setTheme("dark")}
        className="h-7 w-7 p-0"
        aria-label="Dark theme"
      >
        <Moon className="h-3 w-3" />
      </Button>
    </div>
  )
}