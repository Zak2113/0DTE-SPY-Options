// server/api/auth/login.post.ts
import { eq } from 'drizzle-orm'
import { users } from '~~/server/database/schema'
import { LoginSchema } from '~~/shared/types/auth'

export default defineEventHandler(async (event) => {
  // 1. Validate payload with Zod
  const body = await readValidatedBody(event, LoginSchema.parse)
  const normalizedEmail = body.email.toLowerCase()

  // 2. Fetch user from PostgreSQL
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, normalizedEmail))
    .limit(1)

  // 3. Guard against non-existent user (generic message prevents account enumeration)
  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid email or password',
    })
  }

  // 4. Verify password with nuxt-auth-utils (scrypt comparison)
  const isValid = await verifyPassword(user.passwordHash, body.password)
  if (!isValid) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid email or password',
    })
  }

  // Record login timestamp
  const loginTimestamp = new Date()
  await db
    .update(users)
    .set({ lastLoginAt: loginTimestamp})
    .where(eq(users.id, user.id))

  // 5. Seal the session cookie (guaranteed type-safe user object)
  await setUserSession(event, {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      emailVerified: user.emailVerified,
      role: user.role,
      tier: user.tier
    },
    loggedInAt: loginTimestamp,
  })

  // 6. Return safe public user data
  return {
    success: true,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
  }
})