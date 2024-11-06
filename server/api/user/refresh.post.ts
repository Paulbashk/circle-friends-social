import { getAccessToken } from '~/server/utils/auth/auth-session'

export default defineEventHandler(async (event) => {
  const payload = await getAccessToken(event)

  if (!payload) {
    return {
      user: null,
    }
  }

  if (payload) {
    return {
      user: payload.user,
    }
  }
})
