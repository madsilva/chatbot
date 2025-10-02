import { db } from './index'
import { itemsTable, type NewItem } from './item-schema'
import { eq } from 'drizzle-orm'

export async function listItemsDB({ userId }: { userId: string }) {
  const result = await db.select({  }).from(itemsTable).where(eq(itemsTable.userId, userId))
  console.log(result)
  return result
}

export async function createItemDB({ userId, content, timeInfo }: { userId: string, content: string, timeInfo: string }) {
  const newItem: NewItem = {
    userId: userId,
    content: content,
    timeInfo: timeInfo
  }
  const result = await db.insert(itemsTable).values(newItem)
  return result
}