
import { sql, and, eq, between } from "drizzle-orm";
import { dbDps2n3 } from "../dps_database.js";
import { nSale, NSale_insert, NSale_select } from "../schemas/NSale.js";
import { DpsQueryArgs } from "../../utilities/common.js";

/** Init loading will only use betPeriod */
export async function findAll({ betType, betPeriod, groupId }: DpsQueryArgs): Promise<NSale_select[]> {

  // Start with an empty SQLWrapper object
  let condition = sql``;

  if (typeof betPeriod !== "undefined") {
    condition = condition.append(eq(nSale.betPeriod, betPeriod));
  }

  // Check each parameter and append it to the condition if it exists
  if (typeof betType !== "undefined") {
    condition = condition.append(eq(nSale.betType, betType as number));
  }

  // Check each parameter and append it to the condition if it exists
  if (typeof groupId !== "undefined") {
    condition = condition.append(eq(nSale.groupId, groupId));
  }

  // Return the query result with the condition wrapped in the and() operator
  return dbDps2n3.select().from(nSale).where(and(condition)).all();
}

export async function find({ betType, betPeriod, groupId, syncSeq }: DpsQueryArgs): Promise<NSale_select | undefined> {

  return dbDps2n3.select().from(nSale).where(and(
    eq(nSale.betType, betType as number),
    eq(nSale.betPeriod, betPeriod!),
    eq(nSale.groupId, groupId!),
    eq(nSale.sync_seq, syncSeq!))).get();
}

export const getAllNSaleBetween = async (betType: number, betPeriod: number, groupId: number, startSyncSeq: number, endSyncSeq: number) => {
  return dbDps2n3.select().from(nSale).where(and(
    eq(nSale.betType, betType as number),
    eq(nSale.betPeriod, betPeriod!),
    eq(nSale.groupId, groupId!),
    between(nSale.sync_seq, startSyncSeq, endSyncSeq))).all();
}

export const upsertNSale = async (nSaleData: NSale_insert) => {
  return await dbDps2n3.insert(nSale).values(nSaleData).onConflictDoUpdate({
    target: [nSale.id, nSale.groupId, nSale.userId, nSale.betType, nSale.betPeriod],
    set: nSaleData
  }).returning();
}
