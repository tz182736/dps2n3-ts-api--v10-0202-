// Original file: src/proto/NumberSaleService.proto


/**
 * * NSale Sync message * /
 */
export interface SyncGpMsg {
  'GroupId'?: (number);
  'UserId'?: (number);
  'GroupKey'?: (string);
  'ClientLastSyncSeq'?: (number);
}

/**
 * * NSale Sync message * /
 */
export interface SyncGpMsg__Output {
  'GroupId': (number);
  'UserId': (number);
  'GroupKey': (string);
  'ClientLastSyncSeq': (number);
}
