import type {
  EventHandlerRequest,
  EventHandler,
  EventHandlerObject,
  H3Event,
} from 'h3'
import { Roles } from '~/server/db'
import { verifyAccessToken } from './auth-session'

type TRulesOnly = 'admin' | 'user' | 'guest'

interface IJwtMiddlewareOptions {
  only?: TRulesOnly
}

export const jwtMiddleware = async <
  Request extends EventHandlerRequest,
  Response,
>(
  event: H3Event<EventHandlerRequest>,
  { only = 'user' }: IJwtMiddlewareOptions,
  handler:
    | EventHandler<Request, Response>
    | EventHandlerObject<Request, Response>
) => {
  const user = event.context.user

  const isOnlyUser = only === 'user'
  const isOnlyAdmin = only === 'admin'
  const isOnlyGuest = only === 'guest'

  const headerToken = event.headers.get('authorization')
  const formatedHeaderToken = headerToken
    ? headerToken.replace('Bearer ', '').trim()
    : null
  const isHeaderToken =
    !!formatedHeaderToken && formatedHeaderToken.length !== 0
  const isValidToken = isHeaderToken
    ? (
        await verifyAccessToken({
          token: formatedHeaderToken,
        })
      ).valid
    : isHeaderToken

  const isUserAuth = user ? !!user : isValidToken

  const isAccessAdmin = isOnlyAdmin && user && !user.role.includes(Roles.ADMIN)
  const isAccessUser = !isUserAuth && isOnlyUser
  const isAccessGuest = isOnlyGuest && isUserAuth

  if (isAccessUser || isAccessAdmin || isAccessGuest) {
    const isAccessAdminOrGuest = isAccessAdmin || isAccessGuest

    throw createError({
      status: isAccessAdminOrGuest ? 403 : 401,
      message: isAccessAdminOrGuest
        ? 'У вас недостаточно прав'
        : 'Вы не авторизованы',
    })
  }

  return typeof handler === 'function' ? await handler(event) : handler
}
