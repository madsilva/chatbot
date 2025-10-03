import { useState } from 'react'
import { Form } from 'react-router'
import { authClient } from '../../utils/auth-client'
import { Button } from '../components/ui/button'
import { Input } from "@/components/ui/input"

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
    <div className='flex flex-col items-center'>
      <h2>Sign Up</h2>
      <Form onSubmit={signUp}>
        <Input type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='name' />
        <Input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='email' />
        <Input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='password' />
        <Button type='submit' >Sign up!!!!</Button>
      </Form>
    </div>
  )
}