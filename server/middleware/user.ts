import { getAccessTokenWithRefresh } from '../utils/auth/auth-session'

export default defineEventHandler(async (event) => {
  const payload = await getAccessTokenWithRefresh(event)

  if (!payload) {
    event.context.user = null
  }

  if (payload) {
    event.context.user = payload.user
  }
})
