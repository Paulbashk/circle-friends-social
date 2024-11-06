import { drizzle } from 'drizzle-orm/neon-serverless'
import { Pool, neonConfig } from '@neondatabase/serverless'
import ws from 'ws'

import * as UserSchema from './schemas/user.schema'

// const queryClient: NeonQueryFunction<boolean, boolean> = neon(
//   process.env.DATABASE_URL!
// )

neonConfig.webSocketConstructor = ws

const pool = new Pool({ connectionString: process.env.DATABASE_URL as string })

export const db = drizzle(pool, {
  schema: { ...UserSchema },
})

export * from './schemas/user.schema'
