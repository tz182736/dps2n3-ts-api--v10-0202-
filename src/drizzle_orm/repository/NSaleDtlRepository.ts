/** 20231216 : (tz182736) */
import { and, between, eq, sql } from "drizzle-orm";
import { dbDps2n3 } from "../dps_database.js";
import { nSaleDtl, NSaleDtl_insert, NSaleDtl_select } from "../schemas/NSaleDtl.js";
import { DpsQueryArgs } from "../../utilities/common.js";

/** will always load all data by betPeriod
 *  no need to search by specific nSaleId / userId */
export async function findAll({ betType, betPeriod, groupId, entityId }: DpsQueryArgs) {
  // Start with an empty SQLWrapper object
  let condition = sql``;

  // Check each parameter and append it to the condition if it exists
  if (typeof betType !== "undefined") {
    condition = condition.append(eq(nSaleDtl.betType, betType as number));
  }

  // Check each parameter and append it to the condition if it exists
  if (typeof betPeriod !== "undefined") {
    condition = condition.append(eq(nSaleDtl.betPeriod, betPeriod));
  }

  // Check each parameter and append it to the condition if it exists
  if (typeof groupId !== "undefined") {
    condition = condition.append(eq(nSaleDtl.groupId, groupId));
  }
  // Check each parameter and append it to the condition if it exists
  if (typeof entityId !== "undefined") {
    condition = condition.append(eq(nSaleDtl.nSaleId, entityId));
  }
  // Return the query result with the condition wrapped in the and() operator
  return dbDps2n3.select().from(nSaleDtl).where(and(condition)).all();
}

export async function find({betType,betPeriod,groupId,userId,syncSeq}: DpsQueryArgs): Promise<NSaleDtl_select | undefined> {
  return dbDps2n3
    .select()
    .from(nSaleDtl)
    .where(
      and(
        eq(nSaleDtl.betType, betType as number),
        eq(nSaleDtl.betPeriod, betPeriod!),
        eq(nSaleDtl.groupId, groupId!),
        eq(nSaleDtl.userId, userId!),
        eq(nSaleDtl.sync_seq, syncSeq!))).get();
}

export const upsertNSaleDtl = async (nSaleDtlData: NSaleDtl_insert) => {
  return await dbDps2n3.insert(nSaleDtl).values(nSaleDtlData).onConflictDoUpdate({
    target: [nSaleDtl.id, nSaleDtl.nSaleId, nSaleDtl.groupId, nSaleDtl.userId],
    set: nSaleDtlData
  }).returning();
}

export const getAllNSaleBetween = async (betType: number, betPeriod: number, groupId: number, startSyncSeq: number, endSyncSeq: number) => {
  return dbDps2n3.select().from(nSaleDtl).where(and(
    eq(nSaleDtl.betType, betType as number),
    eq(nSaleDtl.betPeriod, betPeriod!),
    eq(nSaleDtl.groupId, groupId!),
    between(nSaleDtl.sync_seq, startSyncSeq, endSyncSeq))).all();
}
