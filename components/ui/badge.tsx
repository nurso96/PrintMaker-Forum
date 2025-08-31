import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
        // Forum-specific variants
        reputation: "border-transparent bg-gradient-to-r from-muted to-accent text-accent-foreground",
        common: "border-transparent bg-gray-500 text-white",
        uncommon: "border-transparent bg-green-500 text-white",
        rare: "border-transparent bg-blue-500 text-white glow",
        epic: "border-transparent bg-purple-500 text-white glow",
        legendary: "border-transparent bg-gradient-to-r from-yellow-400 to-orange-500 text-white glow animate-pulse",
        moderator: "border-transparent bg-gradient-to-r from-red-500 to-pink-500 text-white",
        admin: "border-transparent bg-gradient-to-r from-indigo-500 to-purple-600 text-white glow",
        verified: "border-transparent bg-gradient-to-r from-green-400 to-blue-500 text-white",
        premium: "border-transparent bg-gradient-to-r from-purple-400 to-pink-400 text-white glow",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  icon?: React.ReactNode
}

function Badge({ className, variant, icon, children, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      {icon && <span className="mr-1">{icon}</span>}
      {children}
    </div>
  )
}

export { Badge, badgeVariants }