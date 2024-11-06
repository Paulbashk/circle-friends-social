import {
  ApiUser,
  type TUserSchemaSelectForUpdated,
} from '~/server/services/user'
import { omitDeep } from '~/utils/object'

export interface IUserUpdate extends TUserSchemaSelectForUpdated {
  id: number
}

export default defineEventHandler(
  async (event) =>
    await jwtMiddleware(event, { only: 'user' }, async () => {
      const body: IUserUpdate = await readBody(event)

      const { id, login, email, ...otherBody } = body

      const formatLoginOrEmail = omitDeep({
        login: login?.trim(),
        email: email?.trim(),
      })

      const updatedUser = await ApiUser.updateUserById(id, {
        ...formatLoginOrEmail,
        ...otherBody,
      })

      if (!updatedUser) {
        throw createError({
          status: 401,
          message: `Пользователь не найден`,
        })
      }

      const { passwordHash: _password, ...updatedUserWithoutPassword } =
        updatedUser

      return { user: updatedUserWithoutPassword }
    })
)
