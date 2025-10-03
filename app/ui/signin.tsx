import { useState } from 'react'
import { Form } from 'react-router'
import { authClient } from '../../utils/auth-client'
import { Button } from '../components/ui/button'
import { Input } from "@/components/ui/input"
import { useNavigate } from 'react-router'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const signIn = async () => {
    await authClient.signIn.email(
      {email, password},
      {
        onRequest: (ctx) => {
          //loading state here
        },
        onSuccess: (ctx) => {
          navigate('/')
        },
        onError: (ctx) => {
          alert(ctx.error)
        }
      }
    )
   
    
  }

  return (
    <div className='flex flex-col items-center'>
      <h2>Sign in</h2>
      <div>
      <Form onSubmit={signIn}>
        <Input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='email' />
        <Input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='password' />
        <div>
        <Button type='submit'>sign in!</Button>
        </div>
      </Form>
      </div>
    </div>
  )
}