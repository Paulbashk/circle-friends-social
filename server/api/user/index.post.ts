import { ApiUser } from '~/server/services/user'
import { createAccessAndRefreshTokens } from '~/server/utils/auth/auth-session'

export interface IUserLogin {
  loginOrEmail: string
  password: string
}

export default defineEventHandler(
  async (event) =>
    await jwtMiddleware(event, { only: 'guest' }, async () => {
      const body: IUserLogin = await readBody(event)

      const formatLoginOrEmail = body.loginOrEmail.trim()

      const findUser = await ApiUser.getUserByLoginOrEmail({
        login: formatLoginOrEmail,
        email: formatLoginOrEmail,
      })

      if (!findUser) {
        throw createError({
          status: 401,
          message: 'Логин или пароль введены неверно',
        })
      }

      const comparePasswords = await verifyPassword(
        body.password,
        findUser.passwordHash
      )

      if (!comparePasswords) {
        throw createError({
          status: 401,
          message: 'Логин или пароль введены неверно',
        })
      }

      const { passwordHash, ...userWithoutPassword } = findUser

      await createAccessAndRefreshTokens(event, userWithoutPassword)

      return {
        user: userWithoutPassword,
      }
    })
)
