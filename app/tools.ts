// tools.ts
import { tool } from "ai";
import { z } from 'zod'

import { listItemsDB, createItemDB } from './db/itemactions'

// tool to get the current date!

// get all items
// gotta add auth to this 
export const listItems = tool({
  name: "listItems",
  description: "List all items that belong to a given user.",
  inputSchema: z.object({
    userId: z.string().describe('the ID of the user you want to list items for')
  }),
  execute: async ({ userId }) => {
    console.log("toooooool callllll")
    const result = await listItemsDB({userId})
    return result
  }
});

// Tool to write a database entry
export const createItem = tool({
  name: "createItem",
  description: "Create new item",
  inputSchema: z.object({
    userId: z.string().describe('the ID of the user you want to create the item for'),
    content: z.string().describe('the task content, generally taken verbatim from the user'),
    timeInfo: z.string().describe('any time related information about the task, such as tomorrow, tonight, next week, etc')
  }),
  execute: async ({ userId, content, timeInfo }) => {
    console.log('createitem called!!')
    const result = await createItemDB({userId, content, timeInfo})
    console.log('result from createitem', result)
  }
});

// Tool to delete a database entry
export const deleteItem = tool({
  name: "deleteItem",
  description: "Delete a database entry by ID",
  inputSchema: z.object({

  }),
  execute: async ({ city }) => {
    // get all items from db
  }
});

// Export all tools as an array for use in your AI SDK calls
export const tools = {listItems, createItem, deleteItem}
