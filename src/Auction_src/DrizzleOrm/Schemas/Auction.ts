import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';

export const auction = sqliteTable('auction', {
  auctionId: integer('auctionId').primaryKey(),  // 'id' is the column name
  stockId: text('stockId').notNull(), 
  basePrice: real('basePrice'),
  baseBidCount: integer('baseBidCount'),
  Status: integer('Status', { mode: 'boolean' }).notNull(),
  WinnerId: integer('WinnerId'),
  lastPrice:real('WinnerPrice'),
});

export type Auction_select = InferSelectModel<typeof auction>;
export type Auction_insert = InferInsertModel<typeof auction>;