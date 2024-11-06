export default defineNuxtRouteMiddleware(async (_to, from) => {
  const authStore = useAuthStore()

  if (!authStore.isAuth) {
    return navigateTo({ name: 'index' })
  } else if (authStore.isRegUser) {
    return navigateTo('/register/next')
  }
})
