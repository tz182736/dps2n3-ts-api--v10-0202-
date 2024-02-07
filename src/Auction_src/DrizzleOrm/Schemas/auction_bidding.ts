import { relations } from 'drizzle-orm';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { auction } from './Auction.js';
import { bidder } from './Bidder.js';

export const auction_bidding = sqliteTable("auction_bidding", {
  id: integer("id").primaryKey(),
  auctionId: integer("auctionId").notNull(),
  bidderId: integer("bidderId").notNull(),
  biddingAmt: integer('biddingAmt', { mode: 'boolean' }).notNull(),
  biddingStatus: integer('biddingStatus', { mode: 'boolean' }).notNull(),
  AutoBidOptions: integer('AutoBidOptions', { mode: 'boolean' }).notNull(), // belong to bidder options
  AutoBidInterval: integer('AutoBidInterval', { mode: 'boolean' }).notNull(), // belong to bidder options
  AutoBidMaxValue: integer('AutoBidMaxValue', { mode: 'boolean' }).notNull(), // belong to bidder options
  startTime: integer('startTime', { mode: 'boolean' }).notNull(),
  EndTime: integer('EndTime', { mode: 'boolean' }).notNull(),
});
// , (t)=>({SeqKeyUnique:unique("users_groups").on(t.groupId,t.userId)})

export const usersRelations = relations(auction, ({ many }) => ({
  user_salegroup: many(auction_bidding),
}));

export const dpsGroupRelations = relations(bidder, ({ many }) => ({
  // Fix: Should be many(user_salegroup), not many(user)
  users: many(auction_bidding),
}));

export const salegroup_userRelations = relations(auction_bidding, ({ one }) => ({
  user: one(auction, {
    fields: [auction_bidding.auctionId],
    references: [auction.auctionId]
  }),
  dpsGroup: one(bidder, {
    fields: [auction_bidding.bidderId],
    references: [bidder.bidderId]
  }),
}));

