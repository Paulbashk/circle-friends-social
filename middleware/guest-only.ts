export default defineNuxtRouteMiddleware(async (_to, _from) => {
  const authStore = useAuthStore()

  if (authStore.isAuth) {
    return navigateTo({ name: 'profile' })
  }
})
