
import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const bidder = sqliteTable('bidder', {
  bidderId: integer('bidderId').primaryKey(),  // 'id' is the column name
  bidderCode: text('bidderCode').notNull(),
  userId: integer('userId').notNull(),
});

export type SaleGp_select = InferSelectModel<typeof bidder>;
export type SaleGp_insert = InferInsertModel<typeof bidder>;