// tools.ts
import { tool } from "ai";
import { z } from 'zod'
import { listItemsDB, createItemDB, deleteItemsDB } from './db/itemactions'

export const listItems = tool({
  name: "listItems",
  description: "List all items that belong to a given user.",
  inputSchema: z.object({}),
  execute: async (input, { experimental_context }) => {
    const { userId } = experimental_context
    const result = await listItemsDB({userId})
    return result
  }
});

export const createItem = tool({
  name: "createItem",
  description: "Create new item",
  inputSchema: z.object({
    content: z.string().describe('the task content, generally taken verbatim from the user'),
    timeInfo: z.string().describe('any time related information about the task, such as tomorrow, tonight, next week, etc')
  }),
  execute: async ({ content, timeInfo }, { experimental_context }) => {
    const { userId } = experimental_context
    const result = await createItemDB({userId, content, timeInfo})
    return result
  }
});

export const deleteItems = tool({
  name: "deleteItems",
  description: "Delete a list of items given by IDs",
  inputSchema: z.object({
    itemIds: z.array(z.string()).describe('the ids of the items you want to delete')
  }),
  execute: async ({ itemIds }, { experimental_context }) => {
    const result = await deleteItemsDB({itemIds})
    return result
  }
});
