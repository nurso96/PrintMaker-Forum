"use client"

import * as React from "react"
import Link from "next/link"
import { MessageSquare, Eye, Clock, Pin, Lock, Flame, Heart, ThumbsUp } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar } from "@/components/ui/avatar"
import { cn, formatRelativeTime } from "@/lib/utils"

interface ThreadCardProps {
  thread: {
    id: string
    title: string
    content: string
    author: {
      name: string
      avatar?: string
      reputation: number
      role: 'USER' | 'MODERATOR' | 'ADMIN'
    }
    category: {
      name: string
      color: string
    }
    stats: {
      posts: number
      views: number
      reactions: number
    }
    lastActivity: {
      user: string
      time: Date
    }
    tags?: string[]
    isSticky?: boolean
    isLocked?: boolean
    isHot?: boolean
    createdAt: Date
  }
  variant?: "default" | "compact"
  showCategory?: boolean
}

export function ThreadCard({ 
  thread, 
  variant = "default",
  showCategory = true 
}: ThreadCardProps) {
  const isCompact = variant === "compact"

  return (
    <Card className={cn(
      "thread-card group cursor-pointer",
      isCompact ? "p-4" : ""
    )}>
      <CardContent className={cn(
        isCompact ? "p-0" : "p-6"
      )}>
        <div className="flex items-start space-x-4">
          {/* Author Avatar */}
          <div className="flex-shrink-0">
            <Avatar
              src={thread.author.avatar}
              name={thread.author.name}
              size={isCompact ? "sm" : "md"}
              className="ring-2 ring-transparent group-hover:ring-neon-cyan/30 transition-all duration-300"
            />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-2 mb-1">
                {/* Sticky/Locked indicators */}
                {thread.isSticky && (
                  <Pin className="h-4 w-4 text-neon-orange" />
                )}
                {thread.isLocked && (
                  <Lock className="h-4 w-4 text-muted-foreground" />
                )}
                {thread.isHot && (
                  <Flame className="h-4 w-4 text-orange-500 animate-pulse" />
                )}

                {/* Category */}
                {showCategory && (
                  <Badge 
                    variant="outline" 
                    className={cn("text-xs", thread.category.color)}
                  >
                    {thread.category.name}
                  </Badge>
                )}
              </div>

              {/* Creation time */}
              <span className="text-xs text-muted-foreground flex-shrink-0">
                {formatRelativeTime(thread.createdAt)}
              </span>
            </div>

            {/* Title */}
            <Link href={`/thread/${thread.id}`} className="block group">
              <h3 className={cn(
                "font-semibold text-foreground group-hover:text-neon-cyan transition-colors duration-200",
                isCompact ? "text-sm" : "text-lg",
                "line-clamp-2"
              )}>
                {thread.title}
              </h3>
            </Link>

            {/* Content preview */}
            {!isCompact && (
              <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                {thread.content}
              </p>
            )}

            {/* Tags */}
            {thread.tags && thread.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-3">
                {thread.tags.slice(0, 3).map((tag) => (
                  <Badge 
                    key={tag} 
                    variant="secondary" 
                    className="text-xs px-2 py-0 hover:bg-neon-cyan/20 cursor-pointer"
                  >
                    #{tag}
                  </Badge>
                ))}
                {thread.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs px-2 py-0">
                    +{thread.tags.length - 3}
                  </Badge>
                )}
              </div>
            )}

            {/* Footer */}
            <div className={cn(
              "flex items-center justify-between",
              isCompact ? "mt-2" : "mt-4"
            )}>
              {/* Author info */}
              <div className="flex items-center space-x-3">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className={cn(
                      "font-medium",
                      isCompact ? "text-xs" : "text-sm"
                    )}>
                      {thread.author.name}
                    </span>
                    {thread.author.role !== 'USER' && (
                      <Badge 
                        variant={thread.author.role === 'ADMIN' ? 'admin' : 'moderator'}
                        className="text-xs px-1 py-0"
                      >
                        {thread.author.role}
                      </Badge>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {thread.author.reputation.toLocaleString()} REP
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <MessageSquare className="h-3 w-3" />
                  <span>{thread.stats.posts}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Eye className="h-3 w-3" />
                  <span>{thread.stats.views}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Heart className="h-3 w-3 text-red-500" />
                  <span>{thread.stats.reactions}</span>
                </div>
              </div>
            </div>

            {/* Last activity */}
            {!isCompact && (
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                <div className="text-xs text-muted-foreground">
                  Last reply by{' '}
                  <span className="font-medium text-neon-cyan">
                    {thread.lastActivity.user}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">
                  {formatRelativeTime(thread.lastActivity.time)}
                </div>
              </div>
            )}
          </div>

          {/* Hover indicator */}
          <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-1 h-8 bg-gradient-to-b from-neon-cyan to-neon-purple rounded-full" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}