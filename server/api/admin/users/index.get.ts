// server/api/admin/users/index.get.ts
import { desc } from 'drizzle-orm'
import { users } from '~~/server/database/schema'

export default defineEventHandler(async (event) => {
  const session = await requireAdmin(event)


  const userList = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      role: users.role,
      tier: users.tier,
      emailVerified: users.emailVerified,
      lastLoginAt: users.lastLoginAt,
      createdAt: users.createdAt,
    })
    .from(users)
    .orderBy(desc(users.createdAt))

  return userList
})