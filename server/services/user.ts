import {
  db,
  type IUserSchemaInsert,
  type IUserSchemaSelect,
  UserSchema,
} from '~/server/db'

import { or, eq } from 'drizzle-orm'

export type TUserSchemaSelectForUpdated = Omit<
  Partial<IUserSchemaSelect>,
  'id' | 'created_at' | 'deleted_at'
>

interface IGetUserByLoginOrEmail {
  login: string
  email: string
}

export class ApiUser {
  // получение пользователя по логину или паролю
  public static async getUserByLoginOrEmail({
    login,
    email,
  }: IGetUserByLoginOrEmail): Promise<IUserSchemaSelect> {
    return (
      await db
        .select()
        .from(UserSchema)
        .where(or(eq(UserSchema.login, login), eq(UserSchema.email, email)))
        .limit(1)
        .execute()
    )[0]
  }

  // создание пользователя
  public static async createUser(
    data: IUserSchemaInsert
  ): Promise<IUserSchemaSelect> {
    return (
      await db
        .insert(UserSchema)
        .values({ ...data })
        .returning()
    )[0]
  }

  // обновление пользователя по его id
  public static async updateUserById(
    id: number,
    data: TUserSchemaSelectForUpdated
  ): Promise<IUserSchemaSelect> {
    return (
      await db
        .update(UserSchema)
        .set({ ...data })
        .where(eq(UserSchema.id, id))
        .returning()
    )[0]
  }
}
