import type { Route } from "./+types/home";
import { authClient } from '../../utils/auth-client'
import SignIn from '../ui/signin'
import { redirect, type LoaderFunctionArgs } from 'react-router'
import { auth } from '../../utils/auth'
import SignUp from '../ui/signup'

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await auth.api.getSession({ headers: request.headers })
  if (session?.user) {
    throw redirect('/chat')
  } 
}

export default function Home() {
  const { data, isPending, error } = authClient.useSession()

  if (data) {
    
    return (
      <div>
        Hello {data.user.email}!!!!!!
      </div>
    )
  } else {
    return <div>
      <SignIn />
      <SignUp />
    </div>
  }
}
