import jwt from 'jsonwebtoken'
import type { EventHandlerRequest, H3Event } from 'h3'
import { v4 as uuidv4 } from 'uuid'

import { type IUserWithoutPassword } from '../../db'

interface IRefreshToken {
  userId: number
  token: string
  iat: number
  exp: number
}

declare module 'jsonwebtoken' {
  export interface IUserJwtPayload {
    data: { user: IUserWithoutPassword }
    iat: number
    exp: number
  }
}

// создание JWT Access токена
const createAccessToken = async (
  user: IUserWithoutPassword
): Promise<string> => {
  const config = useRuntimeConfig()

  const currentTime = Math.floor(Date.now() / 1000)

  return await jwt.sign(
    {
      data: { user: { ...user } },
      iat: currentTime,
      exp: currentTime + Number(config.tokenExpiration),
    },
    config.tokenSecret
  )
}

// создание Refresh токена
const createRefreshToken = (id: number): string => {
  const config = useRuntimeConfig()

  const currentTime = Math.floor(Date.now() / 1000)

  const refreshToken: IRefreshToken = {
    userId: id,
    token: uuidv4(),
    iat: currentTime,
    exp: currentTime + Number(config.refreshTokenExpiration),
  }

  const cryptoToken = encrypt(refreshToken, config.refreshTokenSecretKey)

  return cryptoToken
}

interface IVerifyAccessTokenArgs {
  token: string
  ignoreExpiration?: boolean
}

// Проверка JWT Access токена
const verifyAccessToken = async ({
  token,
  ignoreExpiration = false,
}: IVerifyAccessTokenArgs): Promise<{
  valid: boolean
  decoded?: jwt.IUserJwtPayload
}> => {
  const config = useRuntimeConfig()

  try {
    const decoded = await (<jwt.IUserJwtPayload>(
      jwt.verify(token, config.tokenSecret, { ignoreExpiration })
    ))

    return { valid: true, decoded }
  } catch (error: unknown) {
    return { valid: false }
  }
}

// Проверка JWT Access Payload токена на его срок
// вернет true если токен не действителен
const isTokenExpired = async <T extends { exp: number }>(payload: T) => {
  try {
    if (!payload || typeof payload.exp !== 'number') {
      return true
    }

    const currentTime = Math.floor(Date.now() / 1000)

    return payload.exp < currentTime
  } catch (_) {
    return true
  }
}

// создание сессии пользователя (двух токенов)
const createAccessAndRefreshTokens = async (
  event: H3Event<EventHandlerRequest>,
  user: IUserWithoutPassword
): Promise<{ token: string }> => {
  const config = useRuntimeConfig()

  const token = await createAccessToken(user)
  const refreshToken = createRefreshToken(user.id)

  setCookie(event, config.tokenName, token, { httpOnly: true, secure: true })
  setCookie(event, config.refreshTokenName, refreshToken, {
    httpOnly: true,
    secure: true,
  })

  return {
    token,
  }
}

// удаление токенов из куки
const removeTokensInCookie = (event: H3Event<EventHandlerRequest>): boolean => {
  const config = useRuntimeConfig()

  deleteCookie(event, config.tokenName)
  deleteCookie(event, config.refreshTokenName)

  return true
}

type TGetAccessTokenPromise = Promise<{
  user: IUserWithoutPassword
  token: string
} | null>

// получение токена авторизации
const getAccessToken = async (
  event: H3Event<EventHandlerRequest>
): TGetAccessTokenPromise => {
  const config = useRuntimeConfig()

  const tokenCookie = getCookie(event, config.tokenName)

  if (!tokenCookie) {
    return null
  }

  const { valid, decoded } = await verifyAccessToken({
    token: tokenCookie,
  })

  if (valid && decoded) {
    const { data } = decoded
    const { user } = data

    return {
      user: user,
      token: tokenCookie,
    }
  }

  return null
}

// получение токенов с рефрешом если access токен истек и есть refresh
const getAccessTokenWithRefresh = async (
  event: H3Event<EventHandlerRequest>
): TGetAccessTokenPromise => {
  const config = useRuntimeConfig()

  const accessTokenCookie = getCookie(event, config.tokenName)
  const refreshTokenCookie = getCookie(event, config.refreshTokenName)

  // если отсуствует access токен или refresh токен
  if (!accessTokenCookie || !refreshTokenCookie) {
    removeTokensInCookie(event)
    return null
  }

  // валидация access токена
  const { valid: validAccessToken, decoded: decodedAccessToken } =
    await verifyAccessToken({
      token: accessTokenCookie,
      ignoreExpiration: true,
    })

  if (validAccessToken && decodedAccessToken) {
    const { data: accessTokenData } = decodedAccessToken
    const { user } = accessTokenData

    const isAccessTokenExpired = await isTokenExpired(decodedAccessToken)

    // время access токена истекло
    if (isAccessTokenExpired) {
      // логика валидации рефреш токена
      const decryptRefreshToken = decrypt(
        refreshTokenCookie,
        config.refreshTokenSecretKey
      ) as IRefreshToken

      const isRefreshTokenExpired = await isTokenExpired(decryptRefreshToken)

      // время refresh токена истекло
      // проверка совпадения id пользователя у refresh и access токенов
      if (isRefreshTokenExpired || decryptRefreshToken.userId !== user.id) {
        removeTokensInCookie(event)
        return null
      }

      // создание новой пары токенов
      const { token: newAccessToken } = await createAccessAndRefreshTokens(
        event,
        user
      )

      return {
        user: user,
        token: newAccessToken,
      }
    }

    return {
      user: user,
      token: accessTokenCookie,
    }
  }

  removeTokensInCookie(event)
  return null
}

export {
  createAccessAndRefreshTokens,
  createRefreshToken,
  removeTokensInCookie,
  getAccessToken,
  verifyAccessToken,
  getAccessTokenWithRefresh,
}
