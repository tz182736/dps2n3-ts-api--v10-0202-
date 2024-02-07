// Original file: src/proto/NumberSaleService.proto

export const BetTypeEnumPb = {
  BET_2D: 0,
  BET_3D: 1,
} as const;

export type BetTypeEnumPb =
  | 'BET_2D'
  | 0
  | 'BET_3D'
  | 1

export type BetTypeEnumPb__Output = typeof BetTypeEnumPb[keyof typeof BetTypeEnumPb]
