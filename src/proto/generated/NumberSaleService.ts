import type * as grpc from '@grpc/grpc-js';
import type { EnumTypeDefinition, MessageTypeDefinition } from '@grpc/proto-loader';

import type { NSaleServiceClient as _Dps2n3Grpc_NSaleServiceClient, NSaleServiceDefinition as _Dps2n3Grpc_NSaleServiceDefinition } from './Dps2n3Grpc/NSaleService.js';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  Dps2n3Grpc: {
    BetTypeEnumPb: EnumTypeDefinition
    DpsUserSaleGroup: MessageTypeDefinition
    Empty: MessageTypeDefinition
    EntityDeleteMsg: MessageTypeDefinition
    EntityStatusMsg: MessageTypeDefinition
    EntityTypeEnumPb: EnumTypeDefinition
    Message: MessageTypeDefinition
    NSaleDtlMsg: MessageTypeDefinition
    NSaleMsg: MessageTypeDefinition
    /**
     * grpc-js not supporting interceptor for auth yet. work around as custom Metadata { { "token", "secret" } }
     */
    NSaleService: SubtypeConstructor<typeof grpc.Client, _Dps2n3Grpc_NSaleServiceClient> & { service: _Dps2n3Grpc_NSaleServiceDefinition }
    NSaleStreamJoinMsg: MessageTypeDefinition
    NSaleStreamRspn: MessageTypeDefinition
    SyncGpMsg: MessageTypeDefinition
    SyncSeqMsg: MessageTypeDefinition
  }
}

