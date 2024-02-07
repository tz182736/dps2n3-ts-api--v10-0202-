// Original file: src/proto/NumberSaleService.proto


export interface EntityStatusMsg {
  'active'?: (boolean);
  'deleted'?: (boolean);
  'is_synced'?: (boolean);
  'sync_seq'?: (number);
  'data'?: (string);
}

export interface EntityStatusMsg__Output {
  'active': (boolean);
  'deleted': (boolean);
  'is_synced': (boolean);
  'sync_seq': (number);
  'data': (string);
}
