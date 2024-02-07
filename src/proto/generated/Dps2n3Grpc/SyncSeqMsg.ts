// Original file: src/proto/NumberSaleService.proto

import type { EntityTypeEnumPb as _Dps2n3Grpc_EntityTypeEnumPb, EntityTypeEnumPb__Output as _Dps2n3Grpc_EntityTypeEnumPb__Output } from '../Dps2n3Grpc/EntityTypeEnumPb.js';

export interface SyncSeqMsg {
  'SeqKey'?: (string);
  'UserId'?: (number);
  'EntityType'?: (_Dps2n3Grpc_EntityTypeEnumPb);
  'SeqValue'?: (number);
}

export interface SyncSeqMsg__Output {
  'SeqKey': (string);
  'UserId': (number);
  'EntityType': (_Dps2n3Grpc_EntityTypeEnumPb__Output);
  'SeqValue': (number);
}
