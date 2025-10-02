import { redirect, type ActionFunctionArgs, type LoaderFunctionArgs } from 'react-router'
import { openai } from '@ai-sdk/openai';
import { streamText, type UIMessage, convertToModelMessages, stepCountIs } from 'ai';
import { listItems, createItem } from '../tools'
import { systemPrompt } from '../systemprompt'
import { auth } from '../../utils/auth'

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function action({ request }: ActionFunctionArgs) {
  try {
    const session = await auth.api.getSession({ headers: request.headers })
    if (!session?.user) throw redirect('/')
    const { messages }: { messages: UIMessage[] } = await request.json()

    const userId = session.user.id

    const result = streamText({
      model: openai('gpt-4o-mini'),
      messages: convertToModelMessages(messages),
      tools: { listItems, createItem },
      experimental_context: {
        userId: userId
      },
      system: systemPrompt,
      stopWhen: stepCountIs(4)
    })

    return result.toUIMessageStreamResponse()
  } catch (error) {
    console.error("chat api error:", error)
  }
  
}

export function AI() {
  return (
    <p>test</p>
  )
}