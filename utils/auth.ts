import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../app/db/index"; // drizzle instance
import * as schema from '../app/db/auth-schema'

export const auth = betterAuth({
  emailAndPassword: { 
      enabled: true, 
    }, 
    database: drizzleAdapter(db, {
      provider: "pg",
      schema: schema,
    }),
    trustedOrigins: ["http://localhost:5173"],
})
