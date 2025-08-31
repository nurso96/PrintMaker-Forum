/**
 * Backend Authentication Integration
 * Connects Forum to main SaaS backend for user authentication
 */

export interface BackendUser {
  id: string
  email: string
  name: string | null
  username: string | null
  is_active: boolean
  is_premium: boolean
  is_admin: boolean
  
  // Forum-specific fields
  forum_reputation: number
  forum_role: 'USER' | 'MODERATOR' | 'ADMIN'
  forum_total_posts: number
  forum_total_threads: number
  forum_bio: string | null
  forum_location: string | null
  forum_website: string | null
  forum_is_verified: boolean
  forum_last_active: string
  forum_joined_at: string
  
  // Computed fields
  avatar_url: string | null
  reputation_level: string
  badges: Array<{
    id: string
    name: string
    description: string
    icon: string
    color: string
    rarity: string
    earned_at: string
  }>
}

export interface AuthValidationResponse {
  valid: boolean
  user: BackendUser
  permissions: {
    can_post: boolean
    can_moderate: boolean
    can_admin: boolean
    is_premium: boolean
  }
}

export interface ForumStats {
  total_users: number
  total_threads: number
  total_posts: number
  recent_posts_24h: number
  active_users_24h: number
}

class BackendAuth {
  private backendUrl: string
  
  constructor() {
    this.backendUrl = process.env.NEXT_PUBLIC_API_URL || process.env.BACKEND_URL || 'https://backend-production-edad.up.railway.app'
  }

  /**
   * Validate user session with the main SaaS backend
   */
  async validateSession(token: string): Promise<AuthValidationResponse | null> {
    try {
      const response = await fetch(`${this.backendUrl}/forum/auth/validate`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        if (response.status === 401) {
          // Token is invalid/expired
          return null
        }
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Failed to validate session with backend:', error)
      return null
    }
  }

  /**
   * Get user profile from backend
   */
  async getUserProfile(userId: string, token?: string): Promise<BackendUser | null> {
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      }
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`
      }

      const response = await fetch(`${this.backendUrl}/forum/auth/user/${userId}`, {
        method: 'GET',
        headers,
      })

      if (!response.ok) {
        if (response.status === 404) {
          return null
        }
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      return data.user
    } catch (error) {
      console.error('Failed to get user profile from backend:', error)
      return null
    }
  }

  /**
   * Update user's forum profile
   */
  async updateProfile(profileData: Partial<BackendUser>, token: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.backendUrl}/forum/auth/update-profile`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      })

      return response.ok
    } catch (error) {
      console.error('Failed to update profile:', error)
      return false
    }
  }

  /**
   * Get forum statistics
   */
  async getForumStats(): Promise<ForumStats | null> {
    try {
      const response = await fetch(`${this.backendUrl}/forum/stats`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Failed to get forum stats:', error)
      return null
    }
  }

  /**
   * Award reputation points (admin/moderator only)
   */
  async awardReputation(userId: string, points: number, reason: string, token: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.backendUrl}/forum/reputation/award`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          points,
          reason,
        }),
      })

      return response.ok
    } catch (error) {
      console.error('Failed to award reputation:', error)
      return false
    }
  }

  /**
   * Redirect to main SaaS login
   */
  redirectToLogin(returnUrl?: string) {
    const mainSaasUrl = process.env.NEXT_PUBLIC_MAIN_APP_URL || 'https://printmakerai.com'
    const redirectUrl = returnUrl ? encodeURIComponent(returnUrl) : encodeURIComponent(window.location.href)
    window.location.href = `${mainSaasUrl}/login?redirect=${redirectUrl}`
  }

  /**
   * Check if user is authenticated (has valid token in localStorage)
   */
  isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false
    const token = localStorage.getItem('auth_token') || localStorage.getItem('token')
    return !!token
  }

  /**
   * Get stored auth token
   */
  getToken(): string | null {
    if (typeof window === 'undefined') return null
    return localStorage.getItem('auth_token') || localStorage.getItem('token')
  }

  /**
   * Clear authentication
   */
  logout() {
    if (typeof window === 'undefined') return
    localStorage.removeItem('auth_token')
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }
}

// Export singleton instance
export const backendAuth = new BackendAuth()
export default backendAuth