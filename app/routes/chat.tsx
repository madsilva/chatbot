import { redirect, type ActionFunctionArgs, type LoaderFunctionArgs } from 'react-router'
import { auth } from '../../utils/auth'
import type { Route } from "./+types/protected";
import { useChat } from '@ai-sdk/react';
import { useState } from 'react';
import { DefaultChatTransport } from 'ai';
import { Button } from "@/components/ui/button"
import {
  PromptInput,
  PromptInputAction,
  PromptInputActions,
  PromptInputTextarea,
} from "@/components/ui/prompt-input"
import { LogOutButton } from '../ui/LogOutButton'

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

export default function Chat({ loaderData }: Route.ComponentProps ) {
  return (
    <>
    <h2>hi {JSON.stringify(loaderData.user.email)}!</h2>
    <LogOutButton />
    <div>
      <ChatDisplay />
    </div>
    </>

  )
}

export function ChatDisplay() {
  const [input, setInput] = useState('')
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: '/ai' })
  })

  const isLoading = status === 'submitted' ? true : false

  const handleSubmit = () => {
    //e.preventDefault()
    sendMessage({ text: input })
    setInput('')
  }

  return (
    <div className='flex flex-col w-full max-w-md py-24 mx-auto stretch'>
      <Button>test!</Button>
      
      {messages.map(message => (
        <div key={message.id} className='whitespace-pre-wrap'>
          {message.role === 'user' ? 'User ' : 'AI: '}
          {message.role === "assistant" ? (
            message.parts?.map((part, i) => {
              if (part.type === "text") {
                return (
                    <div key={`${message.id}-${i}`}>
                      {part.text}
                    </div>
                  );
              } else if (part.type.startsWith('tool-')) {
                return (
                    <div key={`${message.id}-${i}`} className="text-xs font-mono p-2 bg-gray-100 rounded">
                      <pre>Input: {JSON.stringify(part.input, null, 2)}</pre>
                      <pre>Output: {JSON.stringify(part.output, null, 2)}</pre>
                    </div>
                  );
              }
            })
          ) : (
            message.parts.map((part, i) => {
            switch(part.type) {
              case 'text':
                return <div key={`${message.id}-${i}`}>{part.text}</div>
            }
          })
          )}
        </div>
      ))}
      <PromptInput
        value={input}
        onValueChange={(v) => setInput(v)}
        isLoading={isLoading}
        onSubmit={handleSubmit}
        className="w-full max-w-(--breakpoint-md)"
      >
        <PromptInputTextarea placeholder="Ask me anything..." />
      </PromptInput>
      <form onSubmit={e => { handleSubmit(e)}}>
        <input value={input} onChange={(e) => setInput(e.currentTarget.value)} className='' placeholder='say something....' />
      </form>
    </div>
  )
}