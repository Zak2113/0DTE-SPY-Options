// server/api/user/profile.patch.ts
import { eq } from 'drizzle-orm'
import { users } from '~~/server/database/schema'
import { UpdateNameSchema } from '~~/shared/types/auth'

export default defineEventHandler(async (event) => {
  // 1. Require an authenticated session
  const session = await requireUserSession(event)

  // 2. Validate payload with Zod
  const body = await readValidatedBody(event, UpdateNameSchema.parse)

  // 3. Persist the new name
  await db
    .update(users)
    .set({ name: body.name, updatedAt: new Date() })
    .where(eq(users.id, session.user.id))

  // 4. Refresh the session so the sidebar/header reflect the change
  //    immediately, without waiting on a separate client-side refetch.
  //    Preserve loggedInAt and any other top-level session fields.
  await setUserSession(event, {
    ...session,
    user: {
      ...session.user,
      name: body.name,
    },
  })

  // 5. Return the updated value
  return {
    success: true,
    name: body.name,
  }
})