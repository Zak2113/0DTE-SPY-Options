// server/api/user/password.patch.ts
import { eq } from 'drizzle-orm'
import { users } from '~~/server/database/schema'
import { UpdatePasswordSchema } from '~~/shared/types/auth'

export default defineEventHandler(async (event) => {
  // 1. Require an authenticated session
  const { user: sessionUser } = await requireUserSession(event)

  // 2. Validate payload with Zod
  const body = await readValidatedBody(event, UpdatePasswordSchema.parse)

  // 3. Fetch the current password hash (the session doesn't carry it)
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, sessionUser.id))
    .limit(1)

  if (!user) {
    throw createError({
      statusCode: 404,
      statusMessage: 'User not found',
    })
  }

  // 4. Verify the current password with nuxt-auth-utils (scrypt comparison)
  const isValid = await verifyPassword(user.passwordHash, body.currentPassword)
  if (!isValid) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Current password is incorrect',
    })
  }

  // 5. Hash and persist the new password
  const newHash = await hashPassword(body.newPassword)
  await db
    .update(users)
    .set({ passwordHash: newHash, updatedAt: new Date() })
    .where(eq(users.id, user.id))

  // 6. Return success (never return password data of any kind)
  return {
    success: true,
  }
})