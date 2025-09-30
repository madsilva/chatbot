import { redirect, type ActionFunctionArgs, type LoaderFunctionArgs } from 'react-router'
import { openai } from '@ai-sdk/openai';
import { streamText, type UIMessage, convertToModelMessages } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function action({ request }: ActionFunctionArgs) {
  const { messages }: { messages: UIMessage[] } = await request.json()

  const result = streamText({
    model: openai('gpt-4o-mini'),
    messages: convertToModelMessages(messages)
  })

  return result.toUIMessageStreamResponse()
}

export function AI() {
  return (
    <p>test</p>
  )
}