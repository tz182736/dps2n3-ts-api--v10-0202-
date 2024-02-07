
import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const dpsGroup = sqliteTable('dpsGroup', {
  groupId: integer('groupId').primaryKey(),  // 'id' is the column name
  groupName: text('groupName').notNull(),
  groupStatus: integer('groupStatus').notNull(),
  active: integer('active', { mode: 'boolean' }).notNull(),
  sync_seq: integer('sync_seq')
});

export type SaleGp_select = InferSelectModel<typeof dpsGroup>;
export type SaleGp_insert = InferInsertModel<typeof dpsGroup>;