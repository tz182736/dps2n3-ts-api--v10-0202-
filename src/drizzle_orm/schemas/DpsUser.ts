import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const dpsUser = sqliteTable('dpsUser', {
  userId: integer('userId').primaryKey(),  // 'id' is the column name
  userName: text('userName').notNull().unique(),
  password: text('password'),

  userStatus: integer('userStatus'),
  apiKey: text('apiKey'),
  active: integer('active', { mode: 'boolean' }).notNull(),
  sync_seq: integer('sync_seq')
});

export type User_select = InferSelectModel<typeof dpsUser>;
export type User_insert = InferInsertModel<typeof dpsUser>;