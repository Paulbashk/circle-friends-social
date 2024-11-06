import { removeTokensInCookie } from '~/server/utils/auth/auth-session'

export default defineEventHandler(
  async (event) =>
    await jwtMiddleware(event, { only: 'user' }, async () => {
      event.context.user = null

      removeTokensInCookie(event)

      return {
        user: null,
      }
    })
)
