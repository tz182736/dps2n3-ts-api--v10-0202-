/** 20240128 : (tz182736)  last test  v9-0127 */

import { and, eq, like, max, or, sql } from "drizzle-orm";

import { dps_logger } from "../../utilities/tslog-main.js";
const logger = dps_logger.getSubLogger({ name: "Sale Service api" });


import { dbDps2n3 } from "../dps_database.js";
import { SyncSeq_insert, SyncSeq_select, sync_seq } from "../schemas/SyncSeq.js";


export const getLastSeqByBetPeriod = async (betPeriod: number) => {
  // Get the row that matches the maximum value
  const result = dbDps2n3.select().from(sync_seq)
    .where(like(sync_seq.SeqKey, `%-${betPeriod}-%`)).all();
  return result;
};

export const upsertSyncSeq = async (syncSeq: SyncSeq_insert) => {
  const result = await dbDps2n3.insert(sync_seq).values(syncSeq)
    .onConflictDoUpdate({
      target: [sync_seq.SeqKey],
      set: { SeqValue: syncSeq.SeqValue }
    }).returning();
  return result;
};

export const insertSyncSeq = async (syncSeq: SyncSeq_insert, newSeqValue?: number) => {
  syncSeq.SeqValue = newSeqValue ?? syncSeq.SeqValue;
  const result = await dbDps2n3.insert(sync_seq).values(syncSeq).returning();
  return result;
};

export const deleteAllSyncSeq = async (seqKey?: string) => {
  let condition = seqKey ? sql`` : undefined;

  if (condition) {
    if (seqKey) condition = condition.append(eq(sync_seq.SeqKey, seqKey));
  }

  return await dbDps2n3.delete(sync_seq).where(and(condition)).execute();
}