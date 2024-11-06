export default defineNuxtRouteMiddleware(async (_to, from) => {
  const authStore = useAuthStore()

  if (!authStore.isAdmin) {
    return navigateTo({ name: 'profile' })
  }
})
