import * as React from "react"
import { cn, getInitials, generateAvatar } from "@/lib/utils"

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string
  alt?: string
  name?: string
  size?: "sm" | "md" | "lg" | "xl"
  status?: "online" | "away" | "offline"
  showStatus?: boolean
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt, name = "", size = "md", status, showStatus = false, ...props }, ref) => {
    const [imageError, setImageError] = React.useState(false)
    
    const sizeClasses = {
      sm: "h-6 w-6 text-xs",
      md: "h-8 w-8 text-sm",
      lg: "h-10 w-10 text-base",
      xl: "h-12 w-12 text-lg",
    }
    
    const statusClasses = {
      online: "status-online",
      away: "status-away", 
      offline: "status-offline",
    }

    const statusSizeClasses = {
      sm: "h-2 w-2",
      md: "h-2.5 w-2.5",
      lg: "h-3 w-3",
      xl: "h-3.5 w-3.5",
    }

    const showImage = src && !imageError
    const initials = getInitials(name)
    const gradientClass = generateAvatar(name)

    return (
      <div
        ref={ref}
        className={cn(
          "relative inline-flex items-center justify-center overflow-hidden rounded-full border border-border",
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {showImage ? (
          <img
            src={src}
            alt={alt || name}
            className="h-full w-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div
            className={cn(
              "flex h-full w-full items-center justify-center bg-gradient-to-br text-white font-medium",
              gradientClass
            )}
          >
            {initials}
          </div>
        )}
        
        {showStatus && status && (
          <div
            className={cn(
              "absolute -bottom-0.5 -right-0.5 rounded-full border-2 border-background",
              statusSizeClasses[size],
              statusClasses[status]
            )}
          />
        )}
      </div>
    )
  }
)
Avatar.displayName = "Avatar"

export { Avatar }