import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../app/db/index"; // your drizzle instance
import * as schema from '../app/db/auth-schema'
import { redirect } from "react-router"

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

export async function requireUser(request: Request) {
  const session = await auth.api.getSession({ headers: request.headers })
  
  if (session?.user) {
    return { user: session.user }
  } else {
    throw redirect('/')
  }
}