import { timestamp } from 'drizzle-orm/pg-core'

export const timestamps = {
  updatedAt: timestamp('updated_at', { mode: 'string' }),
  createdAt: timestamp('created_at', { mode: 'string' }),
  deletedAt: timestamp('deleted_at', { mode: 'string' }),
}

export function enumToPgEnum<T extends Record<string, any>>(
  myEnum: T
): [T[keyof T], ...T[keyof T][]] {
  return Object.values(myEnum).map((value: any) => `${value}`) as any
}
