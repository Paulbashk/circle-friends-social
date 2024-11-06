import { Roles } from '~/server/db'
import { createAccessAndRefreshTokens } from '~/server/utils/auth/auth-session'
import { ApiUser } from '~/server/services/user'
import { createHashPassword } from '~/server/utils/auth/password'

export interface IUserCreate {
  login: string
  email: string
  password: string
}

export default defineEventHandler(
  async (event) =>
    await jwtMiddleware(event, { only: 'guest' }, async () => {
      const body: IUserCreate = await readBody(event)

      const formatLogin = body.login.trim()
      const formatEmail = body.email.trim()

      const findUser = await ApiUser.getUserByLoginOrEmail({
        login: formatLogin,
        email: formatEmail,
      })

      if (findUser) {
        throw createError({
          status: 401,
          message: `Пользователь с введенным логином или почтой уже существует`,
        })
      }

      const passwordHash = await createHashPassword(body.password)

      const newUser = {
        login: formatLogin,
        email: formatEmail,
        passwordHash: passwordHash,
        role: Roles.REGUSER,
        createdAt: new Date().toISOString(),
      }

      const user = await ApiUser.createUser(newUser)

      const { passwordHash: _password, ...userWithoutPassword } = user

      await createAccessAndRefreshTokens(event, userWithoutPassword)

      return {
        user: userWithoutPassword,
      }
    })
)
