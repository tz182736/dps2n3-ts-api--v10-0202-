import { relations } from 'drizzle-orm';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { dpsUser } from './DpsUser.js';
import { dpsGroup } from './DpsGroup.js';

export const users_groups = sqliteTable("users_groups", {
  id: integer("id").primaryKey(),
  userId: integer("userId").notNull(),
  groupId: integer("groupId").notNull(),
  editLockedItem: integer('editLockedItem', { mode: 'boolean' }).notNull(),
  deleteLockedItem: integer('deleteLockedItem', { mode: 'boolean' }).notNull(),
  active: integer('active', { mode: 'boolean' }).notNull(),
  sync_seq: integer('sync_seq')
});
// , (t)=>({SeqKeyUnique:unique("users_groups").on(t.groupId,t.userId)})

export const usersRelations = relations(dpsUser, ({ many }) => ({
  user_salegroup: many(users_groups),
}));

export const dpsGroupRelations = relations(dpsGroup, ({ many }) => ({
  // Fix: Should be many(user_salegroup), not many(user)
  users: many(users_groups),
}));

export const salegroup_userRelations = relations(users_groups, ({ one }) => ({
  user: one(dpsUser, {
    fields: [users_groups.userId],
    references: [dpsUser.userId]
  }),
  dpsGroup: one(dpsGroup, {
    fields: [users_groups.groupId],
    references: [dpsGroup.groupId]
  }),
}));

