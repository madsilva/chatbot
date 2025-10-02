import { db } from './index'
import { itemsTable } from './item-schema'
import { eq } from 'drizzle-orm'

export async function listItemsDB({ userId }) {
  const result = await db.select({  }).from(itemsTable).where(eq(itemsTable.userId, userId))
  console.log(result)
  return result
}

