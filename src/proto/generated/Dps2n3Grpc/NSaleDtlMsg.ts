// Original file: src/proto/NumberSaleService.proto

import type { BetTypeEnumPb as _Dps2n3Grpc_BetTypeEnumPb, BetTypeEnumPb__Output as _Dps2n3Grpc_BetTypeEnumPb__Output } from '../Dps2n3Grpc/BetTypeEnumPb.js';

export interface NSaleDtlMsg {
  'Id'?: (number);
  'NSaleId'?: (number);
  /**
   * this field was added on server interface as add hoc solution for data sync tracking
   */
  'BetType'?: (_Dps2n3Grpc_BetTypeEnumPb);
  /**
   * this field was added on server interface as add hoc solution for data sync tracking
   */
  'BetPeriod'?: (number);
  /**
   * this field was added on server interface as add hoc solution for data sync tracking
   */
  'GroupId'?: (number);
  /**
   * this field was added on server interface as add hoc solution for data sync tracking
   */
  'UserId'?: (number);
  'NumberFormula'?: (string);
  'AmountFormula'?: (string);
  'CSVNumberList'?: (string);
  'BetTotal'?: (number | string);
  'WinTotalBetAmt'?: (number | string);
  'WinPartialBetAmt'?: (number | string);
  'active'?: (boolean);
  'deleted'?: (boolean);
  'is_synced'?: (boolean);
  'sync_seq'?: (number);
  'remarks'?: (string);
}

export interface NSaleDtlMsg__Output {
  'Id': (number);
  'NSaleId': (number);
  /**
   * this field was added on server interface as add hoc solution for data sync tracking
   */
  'BetType': (_Dps2n3Grpc_BetTypeEnumPb__Output);
  /**
   * this field was added on server interface as add hoc solution for data sync tracking
   */
  'BetPeriod': (number);
  /**
   * this field was added on server interface as add hoc solution for data sync tracking
   */
  'GroupId': (number);
  /**
   * this field was added on server interface as add hoc solution for data sync tracking
   */
  'UserId': (number);
  'NumberFormula': (string);
  'AmountFormula': (string);
  'CSVNumberList': (string);
  'BetTotal': (number);
  'WinTotalBetAmt': (number);
  'WinPartialBetAmt': (number);
  'active': (boolean);
  'deleted': (boolean);
  'is_synced': (boolean);
  'sync_seq': (number);
  'remarks': (string);
}
