import { redirect, type ActionFunctionArgs, type LoaderFunctionArgs } from 'react-router'
import { openai } from '@ai-sdk/openai';
import { streamText, type UIMessage, convertToModelMessages } from 'ai';
import { listItems, createItem } from '../tools'

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function action({ request }: ActionFunctionArgs) {
  try {
    const { messages }: { messages: UIMessage[] } = await request.json()

    const result = streamText({
      model: openai('gpt-4o-mini'),
      messages: convertToModelMessages(messages),
      tools: { listItems, createItem }
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