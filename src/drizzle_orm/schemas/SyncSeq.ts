import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { sqliteTable, text, integer, unique } from 'drizzle-orm/sqlite-core';
import { SyncSeqMsg } from '../../proto/generated/Dps2n3Grpc/SyncSeqMsg.js';

/** this table will only keep the last value of each seqkey, same seqkey will overwrite. UserId and EntityType is not using */
export const sync_seq = sqliteTable('sync_seq', {
  SeqKey: text('seqkey').primaryKey(), // (betType-betPeriod-groupId)
  UserId: integer('userId').notNull(),
  EntityType: integer('entitytype').notNull(),
  SeqValue: integer('seqvalue').notNull(),
}, (t) => ({
  SeqKeyUnique: unique("sync_seq_unique_ongroup").on(t.SeqKey)
}));

export type SyncSeq_select = InferSelectModel<typeof sync_seq>;
export type SyncSeq_insert = InferInsertModel<typeof sync_seq>;


export const toNSyncSeqEntity = (msg: SyncSeqMsg): SyncSeq_select => <SyncSeq_select>{
  EntityType: msg.EntityType,
  UserId: msg.UserId,
  SeqValue: msg.SeqValue,
  SeqKey: msg.SeqKey
};

export const toSyncSeqMsg = (entity: SyncSeq_select) => <SyncSeqMsg>{
  EntityType: entity.EntityType,
  UserId: entity.UserId,
  SeqValue: entity.SeqValue,
  SeqKey: entity.SeqKey
};