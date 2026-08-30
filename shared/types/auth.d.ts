// auth.d.ts
export type UserRole = 'user' | 'admin'
export type UserTier = 'basic' | 'essential' | 'pro'

declare module '#auth-utils' {
  interface User {
    id: string
    email: string
    name?: string | null
    emailVerified: boolean
    role: UserRole
    tier: UserTier
  }

  interface UserSession {
    user: User
    loggedInAt: Date
  }

  interface SecureSessionData {
    // Optional: add fields here if you store server-only session data
  }
}

export {}