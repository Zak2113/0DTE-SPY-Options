export default defineEventHandler(async (event) => {
  // 1. Ensures the user is logged in (throws 401 Unauthorized automatically if not)
  const session = await requireUserSession(event)

  // 2. Direct role check
  if (session.user.role !== 'admin') {
    throw createError({
      statusCode: 403,
      statusMessage: 'Forbidden: Admins only',
    })
  }

  // 3. Run endpoint logic
  return { usersCount: 1420, activeSubscriptions: 350 }
})