// server/utils/guards.ts
import type { H3Event } from 'h3'


export async function requireAdmin(event: H3Event) {
  const session = await requireUserSession(event)
  if (session.user.role !== 'admin') {
    throw createError({ statusCode: 403, statusMessage: 'Forbidden: Admin access required' })
  }
  return session
}