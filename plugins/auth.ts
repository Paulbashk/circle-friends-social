export default defineNuxtPlugin(async () => {
  const authStore = await useAuthStore()

  await authStore.userLoggedIn()
})
