
import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';

export const stock = sqliteTable('bidder', {
  stockId: integer('stockId').primaryKey(),  // 'id' is the column name
  name: text('name').notNull(),
  price: real('price').notNull(),
  imagePath: text('imagePath').notNull(),
  imgDescription: real('imgDescription').notNull(),
  supplierId: integer('supplierId', { mode: 'boolean' }).notNull(),
});

export type SaleGp_select = InferSelectModel<typeof stock>;
export type SaleGp_insert = InferInsertModel<typeof stock>;