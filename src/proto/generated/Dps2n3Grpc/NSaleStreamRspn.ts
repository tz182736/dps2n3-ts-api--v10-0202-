// Original file: src/proto/NumberSaleService.proto

import type { BetTypeEnumPb as _Dps2n3Grpc_BetTypeEnumPb, BetTypeEnumPb__Output as _Dps2n3Grpc_BetTypeEnumPb__Output } from '../Dps2n3Grpc/BetTypeEnumPb.js';
import type { NSaleMsg as _Dps2n3Grpc_NSaleMsg, NSaleMsg__Output as _Dps2n3Grpc_NSaleMsg__Output } from '../Dps2n3Grpc/NSaleMsg.js';
import type { NSaleDtlMsg as _Dps2n3Grpc_NSaleDtlMsg, NSaleDtlMsg__Output as _Dps2n3Grpc_NSaleDtlMsg__Output } from '../Dps2n3Grpc/NSaleDtlMsg.js';

/**
 * !~(\d+)(\.?)DpsStream
 */
export interface NSaleStreamRspn {
  'BetType'?: (_Dps2n3Grpc_BetTypeEnumPb);
  'BetPeriod'?: (number);
  'GroupId'?: (number);
  'UserId'?: (number);
  'NSale'?: (_Dps2n3Grpc_NSaleMsg | null);
  'NSaleDtl'?: (_Dps2n3Grpc_NSaleDtlMsg | null);
  'SyncType'?: "NSale"|"NSaleDtl";
}

/**
 * !~(\d+)(\.?)DpsStream
 */
export interface NSaleStreamRspn__Output {
  'BetType': (_Dps2n3Grpc_BetTypeEnumPb__Output);
  'BetPeriod': (number);
  'GroupId': (number);
  'UserId': (number);
  'NSale'?: (_Dps2n3Grpc_NSaleMsg__Output | null);
  'NSaleDtl'?: (_Dps2n3Grpc_NSaleDtlMsg__Output | null);
  'SyncType': "NSale"|"NSaleDtl";
}
