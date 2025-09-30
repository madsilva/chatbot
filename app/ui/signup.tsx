import { useState } from 'react'
import { Form } from 'react-router'
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
          alert(ctx.error.message)
        }
      }
    )
  }

  return (
    <div>
      <h2>Sign Up</h2>
      <Form onSubmit={signUp}>
        <input type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='name' />
        <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='email' />
        <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='password' />
        <button type='submit' className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 active:bg-blue-800">Sign up!!!!</button>
      </Form>
    </div>
  )
}