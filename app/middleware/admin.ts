export default defineNuxtRouteMiddleware((to, from) => {
  const { user, loggedIn } = useUserSession()

  if (!loggedIn.value) {
    return navigateTo('/')
  }

  if (user.value?.role !== 'admin') {
    return navigateTo('/') // Deny access
  }
})