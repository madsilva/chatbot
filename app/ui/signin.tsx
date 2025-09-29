import { useState } from 'react'
import { Form } from 'react-router'
import { authClient } from '../../utils/auth-client'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const signIn = async () => {
    await authClient.signIn.email(
      {email, password},
      {
        onRequest: (ctx) => {
          //loading state here
        },
        onSuccess: (ctx) => {
          // redirect to home
        },
        onError: (ctx) => {
          alert(ctx.error)
        }
      }
    )
  }

  return (
    <div>
      <h2>sign in!!!</h2>
      <Form onSubmit={signIn}>
        <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='email' />
        <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='password' />
        <button type='submit'>sign in!</button>
      </Form>
    </div>
  )
}