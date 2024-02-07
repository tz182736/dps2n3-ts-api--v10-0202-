import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { integer, real, sqliteTable, text, unique } from "drizzle-orm/sqlite-core";
import { NSaleDtlMsg } from "../../proto/generated/Dps2n3Grpc/NSaleDtlMsg.js";
import { BetTypeEnumPb } from "../../proto/generated/Dps2n3Grpc/BetTypeEnumPb.js";

export const nSaleDtl = sqliteTable("nSaleDtl", {
   id: integer("id").notNull(),
   nSaleId: integer("nSaleId").notNull(),
   groupId: integer("groupId").notNull(), // using uuid only save 3 fields value and more step to retrieve
   userId: integer("userId").notNull(), // redunt here for retrieving last syncseq
   betType: integer("betType").notNull(), //  TODO: redunt here for faster loading last syncseq  ,  
   betPeriod: integer("betPeriod").notNull(), // possible to fill it during data loading ?
   numberFormula: text("numberFormula").notNull(),
   amountFormula: text("amountFormula").notNull(),
   csvNumberList: text("csvNumberList"),
   betTotal: real("betTotal").notNull(),
   winTotalBetAmt: real("winTotalBetAmt").notNull(),
   winPartialBetAmt: real("winPartialBetAmt").notNull(),
   active: integer('active', { mode: 'boolean' }).notNull(),
   deleted: integer('deleted', { mode: 'boolean' }).notNull(),
   is_synced: integer('is_synced', { mode: 'boolean' }).notNull(),
   sync_seq: integer('sync_seq').notNull()
}, (t) => ({
   SeqKeyUnique: unique("NSaleDtlSeqKeyUnique").on(t.id, t.nSaleId, t.groupId, t.userId)
}));


export type NSaleDtl_select = InferSelectModel<typeof nSaleDtl>;
export type NSaleDtl_insert = InferInsertModel<typeof nSaleDtl>;

export function toNSaleDtlEntity(msg: NSaleDtlMsg): NSaleDtl_insert {
   const entity = <NSaleDtl_select>{};
   entity.id = msg.Id!;
   entity.nSaleId = msg.NSaleId!;
   entity.betType = msg.BetType as number;
   entity.betPeriod = msg.BetPeriod!;
   entity.groupId = msg.GroupId!;
   entity.userId = msg.UserId!;
   entity.numberFormula = msg.NumberFormula!;
   entity.amountFormula = msg.AmountFormula!;
   entity.csvNumberList = msg.CSVNumberList as string;
   entity.betTotal = msg.BetTotal as number;
   entity.winTotalBetAmt = msg.WinTotalBetAmt as number;
   entity.winPartialBetAmt = msg.WinPartialBetAmt as number;
   entity.active = msg.active!;
   entity.deleted = msg.deleted!;
   entity.is_synced = msg.is_synced!;
   entity.sync_seq = msg.sync_seq!;

   return entity;
}

// TODO :(note) to remove betType, betPeriod, groupId, userId from database will require to pass as parameter here. 
// ques: server have to generate uuid and return to client on NSale insert event ? or generate uuid on client side ?

export function toNSaleDtlMsg(entity: NSaleDtl_select): NSaleDtlMsg {
   const msg = <NSaleDtlMsg>{};

   msg.Id = entity.id;
   msg.NSaleId = entity.nSaleId;
   msg.BetType = entity.betType as BetTypeEnumPb;
   msg.BetPeriod = entity.betPeriod;
   msg.GroupId = entity.groupId;
   msg.UserId = entity.userId;
   msg.NumberFormula = entity.numberFormula;
   msg.AmountFormula = entity.amountFormula;
   msg.CSVNumberList = entity.csvNumberList as string;
   msg.BetTotal = entity.betTotal;
   msg.WinTotalBetAmt = entity.winTotalBetAmt;
   msg.WinPartialBetAmt = entity.winPartialBetAmt;
   msg.active = entity.active;
   msg.deleted = entity.deleted;
   msg.is_synced = entity.is_synced;
   msg.sync_seq = entity.sync_seq;

   return msg;
}
