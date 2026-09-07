// server/api/user/profile.patch.ts
export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event)
  const body = await readBody(event)

  // update the user's name in your DB here, keyed off session.user.id
  // ...

  return { success: true }
})