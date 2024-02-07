import { EntityTypeEnumPb } from "../proto/generated/Dps2n3Grpc/EntityTypeEnumPb.js";

//export interface SyncSeq {SeqKey: string;SeqValue: number;EntityType: EntityTypeEnumPb;}
/** Sync Seq Key/Value */
export type SyncKeyValue = { SeqKey: string, SeqValue: number, EntityType?: EntityTypeEnumPb };
/** SeqKey Represents a special string key in the format of BetType-BetPeriod-GroupId. */
export const parseSeqKey = (BetType: number, BetPeriod: number, GroupId: number): string => `${BetType as number}-${BetPeriod}-${GroupId}`;
