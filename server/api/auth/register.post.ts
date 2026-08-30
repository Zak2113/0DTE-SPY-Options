import { eq } from 'drizzle-orm'
import { users } from '~~/server/database/schema'
import { RegisterSchema } from '~~/shared/types/auth'

export default defineEventHandler(async (event) => {
  // 1. Validate payload with Zod
  const body = await readValidatedBody(event, RegisterSchema.parse)

  const email = body.email.toLowerCase()

  // 2. Check for duplicate user
  const [existingUser] = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, email))
    .limit(1)

  if (existingUser) {
    throw createError({
      statusCode: 409,
      statusMessage: 'An account with this email already exists',
    })
  }

  // 3. Built-in hashing from nuxt-auth-utils (uses scrypt)
  const passwordHash = await hashPassword(body.password)

  // 4. Save to PostgreSQL
  const [newUser] = await db
    .insert(users)
    .values({
      name: body.name || null,
      email,
      passwordHash,
    })
    .returning({
      id: users.id,
      name: users.name,
      email: users.email,
      emailVerified: users.emailVerified,
      role: users.role,
      tier: users.tier
    })

  if (!newUser) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create user account. Please try again.',
    })
  }

  // 5. Automatically log the user in by sealing session cookie
  await setUserSession(event, {
    user: {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      emailVerified: newUser.emailVerified,
      role: newUser.role,
      tier: newUser.tier
    },
    loggedInAt: new Date(),
  })

  return { success: true, user: newUser }
})