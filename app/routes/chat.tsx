import { redirect, type ActionFunctionArgs, type LoaderFunctionArgs } from 'react-router'
import { auth } from '../../utils/auth'
import type { Route } from "./+types/protected";
import { useChat } from '@ai-sdk/react';
import { useState } from 'react';
import { DefaultChatTransport } from 'ai';
import { Button } from "@/components/ui/button"
import { Markdown } from "@/components/ui/markdown"
import {
  PromptInput,
  PromptInputAction,
  PromptInputActions,
  PromptInputTextarea,
} from "@/components/ui/prompt-input"
import {
  Message,
  MessageAvatar,
  MessageContent,
} from "@/components/ui/message"
import {
  ChatContainerContent,
  ChatContainerRoot,
} from "@/components/ui/chat-container"
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
    <div className='soft-rainbow-gradient'>
      <LogOutButton />
      <div>
        <ChatDisplay />
      </div>
    </div>
  )
}

export function ChatDisplay() {
  const [input, setInput] = useState('')
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: '/ai' })
  })

  const isLoading = status === 'submitted' ? true : false
  const showToolOutput = false
  
  const handleSubmit = () => {
    sendMessage({ text: input })
    setInput('')
  }

  return (
    <div className='glass flex flex-col h-[700px] overflow-hidden w-full max-w-lg py-4 mx-auto stretch'>
      <ChatContainerRoot className='flex-1'>
      <ChatContainerContent className="space-y-4 p-4">
      {messages.map((message) => {
        const isAssistant = (message.role === 'assistant')

        return (
          <Message
            key={message.id}
            className={
              (message.role === "user" ? "justify-end" : "justify-start")}
          >
            <div className="max-w-[85%] flex-1 sm:max-w-[75%]">
              {isAssistant ? (
                <div className="glass bg-secondary text-foreground prose rounded-lg p-2">
                 
                    {message.parts?.map((part, i) => {
              if (part.type === "text") {
                return (
                    <div key={`${message.id}-${i}`}>
                       <Markdown>
                      {part.text}
                      </Markdown>
                    </div>
                  );
              } else if (part.type.startsWith('tool-')) {
                if (showToolOutput) {
                    return (
                    <div key={`${message.id}-${i}`} className="text-xs font-mono p-2 bg-gray-100 rounded">
                      <pre>Input: {JSON.stringify(part.input, null, 2)}</pre>
                      <pre>Output: {JSON.stringify(part.output, null, 2)}</pre>
                    </div>
                  );
                } else {
                  return (
                    <MessageContent className='glass'>tool call....</MessageContent>
                  )
                }
              }
            })}

                  
                </div>
              ) : (
                <div>
                  {message.parts.map((part, i) => {
                    return (
                      <MessageContent className="glass bg-primary ">
                    <div key={`${message.id}-${i}`}>{part.text}</div>
                    </MessageContent>
                    )
                  })}
                
                </div>
              )}
            </div>
          </Message>
        )
      })}
      </ChatContainerContent>
      </ChatContainerRoot>
      <PromptInput
        value={input}
        onValueChange={(v) => setInput(v)}
        isLoading={isLoading}
        onSubmit={handleSubmit}
        className="glass w-full max-w-(--breakpoint-md)"
      >
        <PromptInputTextarea placeholder="make your request..." />
      </PromptInput>
    </div>
  )
}