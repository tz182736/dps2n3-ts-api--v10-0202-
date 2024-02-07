// Original file: src/proto/NumberSaleService.proto

import type { BetTypeEnumPb as _Dps2n3Grpc_BetTypeEnumPb, BetTypeEnumPb__Output as _Dps2n3Grpc_BetTypeEnumPb__Output } from '../Dps2n3Grpc/BetTypeEnumPb.js';

export interface EntityDeleteMsg {
  'BetType'?: (_Dps2n3Grpc_BetTypeEnumPb);
  'BetPeriod'?: (number);
  'EntityId'?: (number);
  'GroupId'?: (number);
  'UserId'?: (number);
}

export interface EntityDeleteMsg__Output {
  'BetType': (_Dps2n3Grpc_BetTypeEnumPb__Output);
  'BetPeriod': (number);
  'EntityId': (number);
  'GroupId': (number);
  'UserId': (number);
}
