import { BetTypeEnumPb } from "../proto/generated/Dps2n3Grpc/BetTypeEnumPb.js";

export interface DpsQueryArgs { betType?: BetTypeEnumPb, betPeriod?: number; groupId?: number; userId?:number, entityId?:number, syncSeq?: number }

