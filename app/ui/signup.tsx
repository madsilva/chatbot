import { useState } from 'react'
import { authClient } from '../../utils/auth-client'

export default function SignUp() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const signUp = async () => {
    await authClient.signUp.email(
      {email, password, name},
      {
        onRequest: (ctx) => {
          // loading state goes here
        },
        onSuccess: (ctx) => {
          // redirect to home
        },
        onError: (ctx) => {
          console.log(ctx.error)
        }
      }
    )
  }

  return (
    <p>hoooo boy</p>
  )
}