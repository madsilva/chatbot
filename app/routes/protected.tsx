import { redirect, type ActionFunctionArgs, type LoaderFunctionArgs } from 'react-router'
import { auth } from '../../utils/auth'
import type { Route } from "./+types/protected";

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await auth.api.getSession({ headers: request.headers })
  if (session?.user) {
    return { user: session.user }
  } else {
    throw redirect('/')
  }
}

export async function action({ request }: ActionFunctionArgs) {
  return auth.handler(request)
}

export default function Protected({ loaderData }: Route.ComponentProps ) {
  return (
    <h2>hi {JSON.stringify(loaderData.user.email)}!</h2>
  )
}