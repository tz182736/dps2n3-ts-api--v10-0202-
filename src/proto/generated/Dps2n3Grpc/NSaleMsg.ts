// Original file: src/proto/NumberSaleService.proto

import type { BetTypeEnumPb as _Dps2n3Grpc_BetTypeEnumPb, BetTypeEnumPb__Output as _Dps2n3Grpc_BetTypeEnumPb__Output } from '../Dps2n3Grpc/BetTypeEnumPb.js';
import type { Long } from '@grpc/proto-loader';

export interface NSaleMsg {
  'Id'?: (number);
  'GroupId'?: (number);
  'UserId'?: (number);
  'BetType'?: (_Dps2n3Grpc_BetTypeEnumPb);
  'BetPeriod'?: (number);
  'MachineName'?: (string);
  'CustomerName'?: (string);
  'VoucherName'?: (string);
  'IsVoucherOpen'?: (boolean);
  'BetDate'?: (number | string | Long);
  'BetRate'?: (number | string);
  'BetCommission'?: (number | string);
  'BetTotal'?: (number | string);
  'WinTotalBetAmt'?: (number | string);
  'WinPartialBetAmt'?: (number | string);
  'active'?: (boolean);
  'deleted'?: (boolean);
  'is_synced'?: (boolean);
  'sync_seq'?: (number);
  'remarks'?: (string);
}

export interface NSaleMsg__Output {
  'Id': (number);
  'GroupId': (number);
  'UserId': (number);
  'BetType': (_Dps2n3Grpc_BetTypeEnumPb__Output);
  'BetPeriod': (number);
  'MachineName': (string);
  'CustomerName': (string);
  'VoucherName': (string);
  'IsVoucherOpen': (boolean);
  'BetDate': (string);
  'BetRate': (number);
  'BetCommission': (number);
  'BetTotal': (number);
  'WinTotalBetAmt': (number);
  'WinPartialBetAmt': (number);
  'active': (boolean);
  'deleted': (boolean);
  'is_synced': (boolean);
  'sync_seq': (number);
  'remarks': (string);
}
