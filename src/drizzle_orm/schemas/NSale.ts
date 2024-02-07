import { sqliteTable, text, integer, real, primaryKey, unique } from 'drizzle-orm/sqlite-core';
import { InferInsertModel, InferSelectModel } from "drizzle-orm";

import { NSaleMsg } from "../../proto/generated/Dps2n3Grpc/NSaleMsg.js";
import { BetTypeEnumPb } from '../../proto/generated/Dps2n3Grpc/BetTypeEnumPb.js';

export const nSale = sqliteTable('nSale', {
   id: integer('id').notNull(),  // 'id' is the column name
   groupId: integer('groupId').notNull(),
   userId: integer('userId').notNull(),
   betType: integer('betType').notNull(),
   betPeriod: integer('betPeriod').notNull(),

   machineName: text('machineName').notNull().default(''),
   customerName: text('customerName').notNull(),
   voucherName: text('voucherName').notNull(),
   isVoucherOpen: integer('isVoucherOpen', { mode: 'boolean' }).notNull(),
   betDate: integer('betDate').notNull(),
   betRate: real('betRate').notNull(),
   betCommission: real('betCommission').notNull(),
   betTotal: real('betTotal').notNull(),
   winTotalBetAmt: real('winTotalBetAmt').notNull(),
   winPartialBetAmt: real('winPartialBetAmt').notNull(),
   active: integer('active', { mode: 'boolean' }).notNull(),
   deleted: integer('deleted', { mode: 'boolean' }).notNull(),
   is_synced: integer('is_synced', { mode: 'boolean' }).notNull(),
   sync_seq: integer('sync_seq').notNull()
}, (t) => ({
   SeqKeyUnique: unique("NSaleSeqKeyUnique").on(t.id, t.groupId, t.userId)
})); //.primaryKey(['entityId','groupId', 'userId']);

export type NSale_select = InferSelectModel<typeof nSale>;
export type NSale_insert = InferInsertModel<typeof nSale>;

export const toNSaleEntity = (msg: NSaleMsg): NSale_insert => <NSale_insert>{
   id: msg.Id as number,
   groupId: msg.GroupId!,
   userId: msg.UserId!,
   betType: msg.BetType as number,
   betPeriod: msg.BetPeriod!,
   machineName: msg.MachineName,
   customerName: msg.CustomerName!,
   voucherName: msg.VoucherName as string,
   isVoucherOpen: msg.IsVoucherOpen!,
   betDate: msg.BetDate as number,
   betRate: msg.BetRate as number,
   betCommission: msg.BetCommission as number,
   betTotal: msg.BetTotal as number,
   winTotalBetAmt: msg.WinTotalBetAmt as number,
   winPartialBetAmt: msg.WinPartialBetAmt as number,
   active: msg.active!,
   deleted: msg.deleted!,
   is_synced: msg.is_synced!,
   sync_seq: msg.sync_seq!,
};

export const toNSaleMsg = (entity: NSale_select): NSaleMsg => <NSaleMsg>{
   Id: entity.id,
   GroupId: entity.groupId,
   UserId: entity.userId,
   BetType: entity.betType as BetTypeEnumPb,
   BetPeriod: entity.betPeriod,
   MachineName: entity.machineName,
   CustomerName: entity.customerName,
   VoucherName: entity.voucherName,
   IsVoucherOpen: entity.isVoucherOpen,
   BetDate: entity.betDate,
   BetRate: entity.betRate,
   BetCommission: entity.betCommission,
   BetTotal: entity.betTotal,
   WinTotalBetAmt: entity.winTotalBetAmt,
   WinPartialBetAmt: entity.winPartialBetAmt,
   active: entity.active,
   deleted: entity.deleted,
   is_synced: entity.is_synced,
   sync_seq: entity.sync_seq,
};
