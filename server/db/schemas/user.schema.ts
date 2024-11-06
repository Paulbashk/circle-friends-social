import { relations } from 'drizzle-orm'
import {
  text,
  pgTable,
  varchar,
  pgEnum,
  serial,
  timestamp,
} from 'drizzle-orm/pg-core'

import { timestamps, enumToPgEnum } from './column.helpers'

export enum Genders {
  MALE = 'male',
  FEMALE = 'female',
  NOT_SELECTED = 'not-selected',
}

export enum Roles {
  REGUSER = 'reguser',
  USER = 'user',
  ADMIN = 'admin',
}

export const userRoles = pgEnum('role', enumToPgEnum(Roles))
export const userGenders = pgEnum('gender', enumToPgEnum(Genders))

export const UserSchema = pgTable('users', {
  id: serial('id').primaryKey(),
  login: varchar('login', { length: 256 }).unique().notNull(),
  email: varchar('email').notNull(),
  passwordHash: varchar('password_hash', { length: 256 }).notNull(),
  fullName: varchar('full_name', { length: 256 }),
  date_of_brith: timestamp('date_of_brith', { mode: 'string' }),
  country: text('country'),
  gender: userGenders('gender').notNull().default(Genders.NOT_SELECTED),
  city: text('city'),
  role: userRoles('role').notNull().default(Roles.USER),
  ...timestamps,
})

export type IUserSchemaSelect = typeof UserSchema.$inferSelect
export type IUserSchemaInsert = typeof UserSchema.$inferInsert
export type IUserWithoutPassword = Omit<IUserSchemaSelect, 'passwordHash'>
