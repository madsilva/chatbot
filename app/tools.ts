// tools.ts
import { tool } from "ai";
import { z } from 'zod'
import { listItemsDB, createItemDB } from './db/itemactions'

export const listItems = tool({
  name: "listItems",
  description: "List all items that belong to a given user.",
  inputSchema: z.object({
    //userId: z.string().describe('the ID of the user you want to list items for')
  }),
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
    userId: z.string().describe('the ID of the user you want to create the item for'),
    content: z.string().describe('the task content, generally taken verbatim from the user'),
    timeInfo: z.string().describe('any time related information about the task, such as tomorrow, tonight, next week, etc')
  }),
  execute: async ({ userId, content, timeInfo }) => {
    const result = await createItemDB({userId, content, timeInfo})
    return result
  }
});

export const deleteItem = tool({
  name: "deleteItem",
  description: "Delete an item by ID",
  inputSchema: z.object({
    itemId: z.string().describe('the id of the item you want to delete')
  }),
  execute: async ({ itemId }) => {
    // make db call here
  }
});
