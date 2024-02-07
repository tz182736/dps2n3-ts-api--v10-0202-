// Original file: src/proto/NumberSaleService.proto

import type { BetTypeEnumPb as _Dps2n3Grpc_BetTypeEnumPb, BetTypeEnumPb__Output as _Dps2n3Grpc_BetTypeEnumPb__Output } from '../Dps2n3Grpc/BetTypeEnumPb.js';
import type { SyncGpMsg as _Dps2n3Grpc_SyncGpMsg, SyncGpMsg__Output as _Dps2n3Grpc_SyncGpMsg__Output } from '../Dps2n3Grpc/SyncGpMsg.js';

export interface NSaleStreamJoinMsg {
  'BetType'?: (_Dps2n3Grpc_BetTypeEnumPb);
  'BetPeriod'?: (number);
  'UserId'?: (number);
  'GroupList'?: (_Dps2n3Grpc_SyncGpMsg)[];
}

export interface NSaleStreamJoinMsg__Output {
  'BetType': (_Dps2n3Grpc_BetTypeEnumPb__Output);
  'BetPeriod': (number);
  'UserId': (number);
  'GroupList': (_Dps2n3Grpc_SyncGpMsg__Output)[];
}
