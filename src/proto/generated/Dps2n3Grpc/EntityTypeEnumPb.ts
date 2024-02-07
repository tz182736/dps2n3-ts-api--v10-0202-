// Original file: src/proto/NumberSaleService.proto

export const EntityTypeEnumPb = {
  NSale: 0,
  NSaleDtl: 1,
} as const;

export type EntityTypeEnumPb =
  | 'NSale'
  | 0
  | 'NSaleDtl'
  | 1

export type EntityTypeEnumPb__Output = typeof EntityTypeEnumPb[keyof typeof EntityTypeEnumPb]
