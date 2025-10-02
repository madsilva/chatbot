import { pgTable, varchar, serial, text, timestamp } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const itemsTable = pgTable("items", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 255 }),
  timeCreated: timestamp("time_created")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  content: text("content").notNull(),
  timeInfo: text("time_info"),
});

export type Item = typeof itemsTable.$inferSelect; // type for reading
export type NewItem = typeof itemsTable.$inferInsert; // type for inserting
