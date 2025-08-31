import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { formatDistanceToNow } from "date-fns"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatRelativeTime(date: Date | string): string {
  const parsedDate = typeof date === 'string' ? new Date(date) : date
  return formatDistanceToNow(parsedDate, { addSuffix: true })
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-')
    .trim()
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .substring(0, 2)
    .toUpperCase()
}

export function getReputationLevel(reputation: number): {
  level: string
  color: string
  nextThreshold: number
} {
  if (reputation >= 10000) return { level: 'Legendary', color: 'legendary', nextThreshold: Infinity }
  if (reputation >= 5000) return { level: 'Epic', color: 'epic', nextThreshold: 10000 }
  if (reputation >= 2000) return { level: 'Expert', color: 'rare', nextThreshold: 5000 }
  if (reputation >= 500) return { level: 'Advanced', color: 'uncommon', nextThreshold: 2000 }
  if (reputation >= 100) return { level: 'Intermediate', color: 'common', nextThreshold: 500 }
  return { level: 'Beginner', color: 'common', nextThreshold: 100 }
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validateUsername(username: string): boolean {
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/
  return usernameRegex.test(username)
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(this, args), wait)
  }
}

export function generateAvatar(name: string): string {
  // Generate a deterministic avatar based on name
  const colors = [
    'from-neon-cyan to-neon-purple',
    'from-neon-green to-neon-cyan',
    'from-neon-purple to-neon-orange',
    'from-neon-orange to-neon-green',
  ]
  
  const hash = name.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0)
    return a & a
  }, 0)
  
  return colors[Math.abs(hash) % colors.length]
}

export function isValidImageUrl(url: string): boolean {
  return /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(url)
}

export function sanitizeHtml(html: string): string {
  // Basic HTML sanitization - in production, use a library like DOMPurify
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/on\w+="[^"]*"/gi, '')
}

export const REPUTATION_THRESHOLDS = {
  BEGINNER: 0,
  INTERMEDIATE: 100,
  ADVANCED: 500,
  EXPERT: 2000,
  EPIC: 5000,
  LEGENDARY: 10000,
}

export const BADGE_COLORS = {
  COMMON: 'bg-gray-500',
  UNCOMMON: 'bg-green-500',
  RARE: 'bg-blue-500',
  EPIC: 'bg-purple-500',
  LEGENDARY: 'bg-yellow-500',
}