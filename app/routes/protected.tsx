import { redirect, type ActionFunctionArgs, type LoaderFunctionArgs } from 'react-router'
import { auth } from '../../utils/auth'
import type { Route } from "./+types/protected";
import { useChat } from '@ai-sdk/react';
import { useState } from 'react';
import { DefaultChatTransport } from 'ai';

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
    <>
    <h2>hi {JSON.stringify(loaderData.user.email)}!</h2>
    <div>
      <Chat />
    </div>
    </>

  )
}

export function Chat() {
  const [input, setInput] = useState('')
  const { messages, sendMessage } = useChat({
    transport: new DefaultChatTransport({ api: '/ai' })
  })

  return (
    <div className='flex flex-col w-full max-w-md py-24 mx-auto stretch'>
      {messages.map(message => (
        <div key={message.id} className='whitespace-pre-wrap'>
          {message.role === 'user' ? 'User ' : 'AI: '}
          {message.parts.map((part, i) => {
            switch(part.type) {
              case 'text':
                return <div key={`${message.id}-${i}`}>{part.text}</div>
            }
          })}
        </div>
      ))}
      <form onSubmit={e => {
        e.preventDefault()
        sendMessage({ text: input })
        setInput('')
      }}
      >
        <input value={input} onChange={(e) => setInput(e.currentTarget.value)} className='' placeholder='say something....' />
      </form>
    </div>
  )
}