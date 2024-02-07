// Original file: src/proto/NumberSaleService.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { DpsUserSaleGroup as _Dps2n3Grpc_DpsUserSaleGroup, DpsUserSaleGroup__Output as _Dps2n3Grpc_DpsUserSaleGroup__Output } from '../Dps2n3Grpc/DpsUserSaleGroup.js';
import type { Empty as _Dps2n3Grpc_Empty, Empty__Output as _Dps2n3Grpc_Empty__Output } from '../Dps2n3Grpc/Empty.js';
import type { EntityDeleteMsg as _Dps2n3Grpc_EntityDeleteMsg, EntityDeleteMsg__Output as _Dps2n3Grpc_EntityDeleteMsg__Output } from '../Dps2n3Grpc/EntityDeleteMsg.js';
import type { EntityStatusMsg as _Dps2n3Grpc_EntityStatusMsg, EntityStatusMsg__Output as _Dps2n3Grpc_EntityStatusMsg__Output } from '../Dps2n3Grpc/EntityStatusMsg.js';
import type { Message as _Dps2n3Grpc_Message, Message__Output as _Dps2n3Grpc_Message__Output } from '../Dps2n3Grpc/Message.js';
import type { NSaleDtlMsg as _Dps2n3Grpc_NSaleDtlMsg, NSaleDtlMsg__Output as _Dps2n3Grpc_NSaleDtlMsg__Output } from '../Dps2n3Grpc/NSaleDtlMsg.js';
import type { NSaleMsg as _Dps2n3Grpc_NSaleMsg, NSaleMsg__Output as _Dps2n3Grpc_NSaleMsg__Output } from '../Dps2n3Grpc/NSaleMsg.js';
import type { NSaleStreamJoinMsg as _Dps2n3Grpc_NSaleStreamJoinMsg, NSaleStreamJoinMsg__Output as _Dps2n3Grpc_NSaleStreamJoinMsg__Output } from '../Dps2n3Grpc/NSaleStreamJoinMsg.js';
import type { NSaleStreamRspn as _Dps2n3Grpc_NSaleStreamRspn, NSaleStreamRspn__Output as _Dps2n3Grpc_NSaleStreamRspn__Output } from '../Dps2n3Grpc/NSaleStreamRspn.js';
import type { SyncSeqMsg as _Dps2n3Grpc_SyncSeqMsg, SyncSeqMsg__Output as _Dps2n3Grpc_SyncSeqMsg__Output } from '../Dps2n3Grpc/SyncSeqMsg.js';

/**
 * grpc-js not supporting interceptor for auth yet. work around as custom Metadata { { "token", "secret" } }
 */
export interface NSaleServiceClient extends grpc.Client {
  AssignUserSaleGroup(argument: _Dps2n3Grpc_DpsUserSaleGroup, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_Dps2n3Grpc_EntityStatusMsg__Output>): grpc.ClientUnaryCall;
  AssignUserSaleGroup(argument: _Dps2n3Grpc_DpsUserSaleGroup, metadata: grpc.Metadata, callback: grpc.requestCallback<_Dps2n3Grpc_EntityStatusMsg__Output>): grpc.ClientUnaryCall;
  AssignUserSaleGroup(argument: _Dps2n3Grpc_DpsUserSaleGroup, options: grpc.CallOptions, callback: grpc.requestCallback<_Dps2n3Grpc_EntityStatusMsg__Output>): grpc.ClientUnaryCall;
  AssignUserSaleGroup(argument: _Dps2n3Grpc_DpsUserSaleGroup, callback: grpc.requestCallback<_Dps2n3Grpc_EntityStatusMsg__Output>): grpc.ClientUnaryCall;
  assignUserSaleGroup(argument: _Dps2n3Grpc_DpsUserSaleGroup, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_Dps2n3Grpc_EntityStatusMsg__Output>): grpc.ClientUnaryCall;
  assignUserSaleGroup(argument: _Dps2n3Grpc_DpsUserSaleGroup, metadata: grpc.Metadata, callback: grpc.requestCallback<_Dps2n3Grpc_EntityStatusMsg__Output>): grpc.ClientUnaryCall;
  assignUserSaleGroup(argument: _Dps2n3Grpc_DpsUserSaleGroup, options: grpc.CallOptions, callback: grpc.requestCallback<_Dps2n3Grpc_EntityStatusMsg__Output>): grpc.ClientUnaryCall;
  assignUserSaleGroup(argument: _Dps2n3Grpc_DpsUserSaleGroup, callback: grpc.requestCallback<_Dps2n3Grpc_EntityStatusMsg__Output>): grpc.ClientUnaryCall;
  
  AuthServerUser(argument: _Dps2n3Grpc_Empty, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_Dps2n3Grpc_Message__Output>): grpc.ClientUnaryCall;
  AuthServerUser(argument: _Dps2n3Grpc_Empty, metadata: grpc.Metadata, callback: grpc.requestCallback<_Dps2n3Grpc_Message__Output>): grpc.ClientUnaryCall;
  AuthServerUser(argument: _Dps2n3Grpc_Empty, options: grpc.CallOptions, callback: grpc.requestCallback<_Dps2n3Grpc_Message__Output>): grpc.ClientUnaryCall;
  AuthServerUser(argument: _Dps2n3Grpc_Empty, callback: grpc.requestCallback<_Dps2n3Grpc_Message__Output>): grpc.ClientUnaryCall;
  authServerUser(argument: _Dps2n3Grpc_Empty, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_Dps2n3Grpc_Message__Output>): grpc.ClientUnaryCall;
  authServerUser(argument: _Dps2n3Grpc_Empty, metadata: grpc.Metadata, callback: grpc.requestCallback<_Dps2n3Grpc_Message__Output>): grpc.ClientUnaryCall;
  authServerUser(argument: _Dps2n3Grpc_Empty, options: grpc.CallOptions, callback: grpc.requestCallback<_Dps2n3Grpc_Message__Output>): grpc.ClientUnaryCall;
  authServerUser(argument: _Dps2n3Grpc_Empty, callback: grpc.requestCallback<_Dps2n3Grpc_Message__Output>): grpc.ClientUnaryCall;
  
  DeleteServerUser(argument: _Dps2n3Grpc_DpsUserSaleGroup, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_Dps2n3Grpc_EntityStatusMsg__Output>): grpc.ClientUnaryCall;
  DeleteServerUser(argument: _Dps2n3Grpc_DpsUserSaleGroup, metadata: grpc.Metadata, callback: grpc.requestCallback<_Dps2n3Grpc_EntityStatusMsg__Output>): grpc.ClientUnaryCall;
  DeleteServerUser(argument: _Dps2n3Grpc_DpsUserSaleGroup, options: grpc.CallOptions, callback: grpc.requestCallback<_Dps2n3Grpc_EntityStatusMsg__Output>): grpc.ClientUnaryCall;
  DeleteServerUser(argument: _Dps2n3Grpc_DpsUserSaleGroup, callback: grpc.requestCallback<_Dps2n3Grpc_EntityStatusMsg__Output>): grpc.ClientUnaryCall;
  deleteServerUser(argument: _Dps2n3Grpc_DpsUserSaleGroup, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_Dps2n3Grpc_EntityStatusMsg__Output>): grpc.ClientUnaryCall;
  deleteServerUser(argument: _Dps2n3Grpc_DpsUserSaleGroup, metadata: grpc.Metadata, callback: grpc.requestCallback<_Dps2n3Grpc_EntityStatusMsg__Output>): grpc.ClientUnaryCall;
  deleteServerUser(argument: _Dps2n3Grpc_DpsUserSaleGroup, options: grpc.CallOptions, callback: grpc.requestCallback<_Dps2n3Grpc_EntityStatusMsg__Output>): grpc.ClientUnaryCall;
  deleteServerUser(argument: _Dps2n3Grpc_DpsUserSaleGroup, callback: grpc.requestCallback<_Dps2n3Grpc_EntityStatusMsg__Output>): grpc.ClientUnaryCall;
  
  DeleteUserSaleGroup(argument: _Dps2n3Grpc_DpsUserSaleGroup, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_Dps2n3Grpc_EntityStatusMsg__Output>): grpc.ClientUnaryCall;
  DeleteUserSaleGroup(argument: _Dps2n3Grpc_DpsUserSaleGroup, metadata: grpc.Metadata, callback: grpc.requestCallback<_Dps2n3Grpc_EntityStatusMsg__Output>): grpc.ClientUnaryCall;
  DeleteUserSaleGroup(argument: _Dps2n3Grpc_DpsUserSaleGroup, options: grpc.CallOptions, callback: grpc.requestCallback<_Dps2n3Grpc_EntityStatusMsg__Output>): grpc.ClientUnaryCall;
  DeleteUserSaleGroup(argument: _Dps2n3Grpc_DpsUserSaleGroup, callback: grpc.requestCallback<_Dps2n3Grpc_EntityStatusMsg__Output>): grpc.ClientUnaryCall;
  deleteUserSaleGroup(argument: _Dps2n3Grpc_DpsUserSaleGroup, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_Dps2n3Grpc_EntityStatusMsg__Output>): grpc.ClientUnaryCall;
  deleteUserSaleGroup(argument: _Dps2n3Grpc_DpsUserSaleGroup, metadata: grpc.Metadata, callback: grpc.requestCallback<_Dps2n3Grpc_EntityStatusMsg__Output>): grpc.ClientUnaryCall;
  deleteUserSaleGroup(argument: _Dps2n3Grpc_DpsUserSaleGroup, options: grpc.CallOptions, callback: grpc.requestCallback<_Dps2n3Grpc_EntityStatusMsg__Output>): grpc.ClientUnaryCall;
  deleteUserSaleGroup(argument: _Dps2n3Grpc_DpsUserSaleGroup, callback: grpc.requestCallback<_Dps2n3Grpc_EntityStatusMsg__Output>): grpc.ClientUnaryCall;
  
  JoinNSaleStream(argument: _Dps2n3Grpc_NSaleStreamJoinMsg, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_Dps2n3Grpc_NSaleStreamRspn__Output>;
  JoinNSaleStream(argument: _Dps2n3Grpc_NSaleStreamJoinMsg, options?: grpc.CallOptions): grpc.ClientReadableStream<_Dps2n3Grpc_NSaleStreamRspn__Output>;
  joinNSaleStream(argument: _Dps2n3Grpc_NSaleStreamJoinMsg, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_Dps2n3Grpc_NSaleStreamRspn__Output>;
  joinNSaleStream(argument: _Dps2n3Grpc_NSaleStreamJoinMsg, options?: grpc.CallOptions): grpc.ClientReadableStream<_Dps2n3Grpc_NSaleStreamRspn__Output>;
  
  /**
   * TODO: will remove later using upsert to update delete flag
   */
  RemoveNSale(argument: _Dps2n3Grpc_EntityDeleteMsg, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_Dps2n3Grpc_SyncSeqMsg__Output>): grpc.ClientUnaryCall;
  RemoveNSale(argument: _Dps2n3Grpc_EntityDeleteMsg, metadata: grpc.Metadata, callback: grpc.requestCallback<_Dps2n3Grpc_SyncSeqMsg__Output>): grpc.ClientUnaryCall;
  RemoveNSale(argument: _Dps2n3Grpc_EntityDeleteMsg, options: grpc.CallOptions, callback: grpc.requestCallback<_Dps2n3Grpc_SyncSeqMsg__Output>): grpc.ClientUnaryCall;
  RemoveNSale(argument: _Dps2n3Grpc_EntityDeleteMsg, callback: grpc.requestCallback<_Dps2n3Grpc_SyncSeqMsg__Output>): grpc.ClientUnaryCall;
  /**
   * TODO: will remove later using upsert to update delete flag
   */
  removeNSale(argument: _Dps2n3Grpc_EntityDeleteMsg, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_Dps2n3Grpc_SyncSeqMsg__Output>): grpc.ClientUnaryCall;
  removeNSale(argument: _Dps2n3Grpc_EntityDeleteMsg, metadata: grpc.Metadata, callback: grpc.requestCallback<_Dps2n3Grpc_SyncSeqMsg__Output>): grpc.ClientUnaryCall;
  removeNSale(argument: _Dps2n3Grpc_EntityDeleteMsg, options: grpc.CallOptions, callback: grpc.requestCallback<_Dps2n3Grpc_SyncSeqMsg__Output>): grpc.ClientUnaryCall;
  removeNSale(argument: _Dps2n3Grpc_EntityDeleteMsg, callback: grpc.requestCallback<_Dps2n3Grpc_SyncSeqMsg__Output>): grpc.ClientUnaryCall;
  
  /**
   * TODO: will remove later using upsert to update delete flag
   */
  RemoveNSaleDtl(argument: _Dps2n3Grpc_EntityDeleteMsg, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_Dps2n3Grpc_SyncSeqMsg__Output>): grpc.ClientUnaryCall;
  RemoveNSaleDtl(argument: _Dps2n3Grpc_EntityDeleteMsg, metadata: grpc.Metadata, callback: grpc.requestCallback<_Dps2n3Grpc_SyncSeqMsg__Output>): grpc.ClientUnaryCall;
  RemoveNSaleDtl(argument: _Dps2n3Grpc_EntityDeleteMsg, options: grpc.CallOptions, callback: grpc.requestCallback<_Dps2n3Grpc_SyncSeqMsg__Output>): grpc.ClientUnaryCall;
  RemoveNSaleDtl(argument: _Dps2n3Grpc_EntityDeleteMsg, callback: grpc.requestCallback<_Dps2n3Grpc_SyncSeqMsg__Output>): grpc.ClientUnaryCall;
  /**
   * TODO: will remove later using upsert to update delete flag
   */
  removeNSaleDtl(argument: _Dps2n3Grpc_EntityDeleteMsg, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_Dps2n3Grpc_SyncSeqMsg__Output>): grpc.ClientUnaryCall;
  removeNSaleDtl(argument: _Dps2n3Grpc_EntityDeleteMsg, metadata: grpc.Metadata, callback: grpc.requestCallback<_Dps2n3Grpc_SyncSeqMsg__Output>): grpc.ClientUnaryCall;
  removeNSaleDtl(argument: _Dps2n3Grpc_EntityDeleteMsg, options: grpc.CallOptions, callback: grpc.requestCallback<_Dps2n3Grpc_SyncSeqMsg__Output>): grpc.ClientUnaryCall;
  removeNSaleDtl(argument: _Dps2n3Grpc_EntityDeleteMsg, callback: grpc.requestCallback<_Dps2n3Grpc_SyncSeqMsg__Output>): grpc.ClientUnaryCall;
  
  UpsertNSale(argument: _Dps2n3Grpc_NSaleMsg, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_Dps2n3Grpc_SyncSeqMsg__Output>): grpc.ClientUnaryCall;
  UpsertNSale(argument: _Dps2n3Grpc_NSaleMsg, metadata: grpc.Metadata, callback: grpc.requestCallback<_Dps2n3Grpc_SyncSeqMsg__Output>): grpc.ClientUnaryCall;
  UpsertNSale(argument: _Dps2n3Grpc_NSaleMsg, options: grpc.CallOptions, callback: grpc.requestCallback<_Dps2n3Grpc_SyncSeqMsg__Output>): grpc.ClientUnaryCall;
  UpsertNSale(argument: _Dps2n3Grpc_NSaleMsg, callback: grpc.requestCallback<_Dps2n3Grpc_SyncSeqMsg__Output>): grpc.ClientUnaryCall;
  upsertNSale(argument: _Dps2n3Grpc_NSaleMsg, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_Dps2n3Grpc_SyncSeqMsg__Output>): grpc.ClientUnaryCall;
  upsertNSale(argument: _Dps2n3Grpc_NSaleMsg, metadata: grpc.Metadata, callback: grpc.requestCallback<_Dps2n3Grpc_SyncSeqMsg__Output>): grpc.ClientUnaryCall;
  upsertNSale(argument: _Dps2n3Grpc_NSaleMsg, options: grpc.CallOptions, callback: grpc.requestCallback<_Dps2n3Grpc_SyncSeqMsg__Output>): grpc.ClientUnaryCall;
  upsertNSale(argument: _Dps2n3Grpc_NSaleMsg, callback: grpc.requestCallback<_Dps2n3Grpc_SyncSeqMsg__Output>): grpc.ClientUnaryCall;
  
  UpsertNSaleDtl(argument: _Dps2n3Grpc_NSaleDtlMsg, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_Dps2n3Grpc_SyncSeqMsg__Output>): grpc.ClientUnaryCall;
  UpsertNSaleDtl(argument: _Dps2n3Grpc_NSaleDtlMsg, metadata: grpc.Metadata, callback: grpc.requestCallback<_Dps2n3Grpc_SyncSeqMsg__Output>): grpc.ClientUnaryCall;
  UpsertNSaleDtl(argument: _Dps2n3Grpc_NSaleDtlMsg, options: grpc.CallOptions, callback: grpc.requestCallback<_Dps2n3Grpc_SyncSeqMsg__Output>): grpc.ClientUnaryCall;
  UpsertNSaleDtl(argument: _Dps2n3Grpc_NSaleDtlMsg, callback: grpc.requestCallback<_Dps2n3Grpc_SyncSeqMsg__Output>): grpc.ClientUnaryCall;
  upsertNSaleDtl(argument: _Dps2n3Grpc_NSaleDtlMsg, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_Dps2n3Grpc_SyncSeqMsg__Output>): grpc.ClientUnaryCall;
  upsertNSaleDtl(argument: _Dps2n3Grpc_NSaleDtlMsg, metadata: grpc.Metadata, callback: grpc.requestCallback<_Dps2n3Grpc_SyncSeqMsg__Output>): grpc.ClientUnaryCall;
  upsertNSaleDtl(argument: _Dps2n3Grpc_NSaleDtlMsg, options: grpc.CallOptions, callback: grpc.requestCallback<_Dps2n3Grpc_SyncSeqMsg__Output>): grpc.ClientUnaryCall;
  upsertNSaleDtl(argument: _Dps2n3Grpc_NSaleDtlMsg, callback: grpc.requestCallback<_Dps2n3Grpc_SyncSeqMsg__Output>): grpc.ClientUnaryCall;
  
  /**
   * require adminkey, credential was pass in metadata.
   */
  UpsertServerUser(argument: _Dps2n3Grpc_Empty, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_Dps2n3Grpc_EntityStatusMsg__Output>): grpc.ClientUnaryCall;
  UpsertServerUser(argument: _Dps2n3Grpc_Empty, metadata: grpc.Metadata, callback: grpc.requestCallback<_Dps2n3Grpc_EntityStatusMsg__Output>): grpc.ClientUnaryCall;
  UpsertServerUser(argument: _Dps2n3Grpc_Empty, options: grpc.CallOptions, callback: grpc.requestCallback<_Dps2n3Grpc_EntityStatusMsg__Output>): grpc.ClientUnaryCall;
  UpsertServerUser(argument: _Dps2n3Grpc_Empty, callback: grpc.requestCallback<_Dps2n3Grpc_EntityStatusMsg__Output>): grpc.ClientUnaryCall;
  /**
   * require adminkey, credential was pass in metadata.
   */
  upsertServerUser(argument: _Dps2n3Grpc_Empty, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_Dps2n3Grpc_EntityStatusMsg__Output>): grpc.ClientUnaryCall;
  upsertServerUser(argument: _Dps2n3Grpc_Empty, metadata: grpc.Metadata, callback: grpc.requestCallback<_Dps2n3Grpc_EntityStatusMsg__Output>): grpc.ClientUnaryCall;
  upsertServerUser(argument: _Dps2n3Grpc_Empty, options: grpc.CallOptions, callback: grpc.requestCallback<_Dps2n3Grpc_EntityStatusMsg__Output>): grpc.ClientUnaryCall;
  upsertServerUser(argument: _Dps2n3Grpc_Empty, callback: grpc.requestCallback<_Dps2n3Grpc_EntityStatusMsg__Output>): grpc.ClientUnaryCall;
  
}

/**
 * grpc-js not supporting interceptor for auth yet. work around as custom Metadata { { "token", "secret" } }
 */
export interface NSaleServiceHandlers extends grpc.UntypedServiceImplementation {
  AssignUserSaleGroup: grpc.handleUnaryCall<_Dps2n3Grpc_DpsUserSaleGroup__Output, _Dps2n3Grpc_EntityStatusMsg>;
  
  AuthServerUser: grpc.handleUnaryCall<_Dps2n3Grpc_Empty__Output, _Dps2n3Grpc_Message>;
  
  DeleteServerUser: grpc.handleUnaryCall<_Dps2n3Grpc_DpsUserSaleGroup__Output, _Dps2n3Grpc_EntityStatusMsg>;
  
  DeleteUserSaleGroup: grpc.handleUnaryCall<_Dps2n3Grpc_DpsUserSaleGroup__Output, _Dps2n3Grpc_EntityStatusMsg>;
  
  JoinNSaleStream: grpc.handleServerStreamingCall<_Dps2n3Grpc_NSaleStreamJoinMsg__Output, _Dps2n3Grpc_NSaleStreamRspn>;
  
  /**
   * TODO: will remove later using upsert to update delete flag
   */
  RemoveNSale: grpc.handleUnaryCall<_Dps2n3Grpc_EntityDeleteMsg__Output, _Dps2n3Grpc_SyncSeqMsg>;
  
  /**
   * TODO: will remove later using upsert to update delete flag
   */
  RemoveNSaleDtl: grpc.handleUnaryCall<_Dps2n3Grpc_EntityDeleteMsg__Output, _Dps2n3Grpc_SyncSeqMsg>;
  
  UpsertNSale: grpc.handleUnaryCall<_Dps2n3Grpc_NSaleMsg__Output, _Dps2n3Grpc_SyncSeqMsg>;
  
  UpsertNSaleDtl: grpc.handleUnaryCall<_Dps2n3Grpc_NSaleDtlMsg__Output, _Dps2n3Grpc_SyncSeqMsg>;
  
  /**
   * require adminkey, credential was pass in metadata.
   */
  UpsertServerUser: grpc.handleUnaryCall<_Dps2n3Grpc_Empty__Output, _Dps2n3Grpc_EntityStatusMsg>;
  
}

export interface NSaleServiceDefinition extends grpc.ServiceDefinition {
  AssignUserSaleGroup: MethodDefinition<_Dps2n3Grpc_DpsUserSaleGroup, _Dps2n3Grpc_EntityStatusMsg, _Dps2n3Grpc_DpsUserSaleGroup__Output, _Dps2n3Grpc_EntityStatusMsg__Output>
  AuthServerUser: MethodDefinition<_Dps2n3Grpc_Empty, _Dps2n3Grpc_Message, _Dps2n3Grpc_Empty__Output, _Dps2n3Grpc_Message__Output>
  DeleteServerUser: MethodDefinition<_Dps2n3Grpc_DpsUserSaleGroup, _Dps2n3Grpc_EntityStatusMsg, _Dps2n3Grpc_DpsUserSaleGroup__Output, _Dps2n3Grpc_EntityStatusMsg__Output>
  DeleteUserSaleGroup: MethodDefinition<_Dps2n3Grpc_DpsUserSaleGroup, _Dps2n3Grpc_EntityStatusMsg, _Dps2n3Grpc_DpsUserSaleGroup__Output, _Dps2n3Grpc_EntityStatusMsg__Output>
  JoinNSaleStream: MethodDefinition<_Dps2n3Grpc_NSaleStreamJoinMsg, _Dps2n3Grpc_NSaleStreamRspn, _Dps2n3Grpc_NSaleStreamJoinMsg__Output, _Dps2n3Grpc_NSaleStreamRspn__Output>
  RemoveNSale: MethodDefinition<_Dps2n3Grpc_EntityDeleteMsg, _Dps2n3Grpc_SyncSeqMsg, _Dps2n3Grpc_EntityDeleteMsg__Output, _Dps2n3Grpc_SyncSeqMsg__Output>
  RemoveNSaleDtl: MethodDefinition<_Dps2n3Grpc_EntityDeleteMsg, _Dps2n3Grpc_SyncSeqMsg, _Dps2n3Grpc_EntityDeleteMsg__Output, _Dps2n3Grpc_SyncSeqMsg__Output>
  UpsertNSale: MethodDefinition<_Dps2n3Grpc_NSaleMsg, _Dps2n3Grpc_SyncSeqMsg, _Dps2n3Grpc_NSaleMsg__Output, _Dps2n3Grpc_SyncSeqMsg__Output>
  UpsertNSaleDtl: MethodDefinition<_Dps2n3Grpc_NSaleDtlMsg, _Dps2n3Grpc_SyncSeqMsg, _Dps2n3Grpc_NSaleDtlMsg__Output, _Dps2n3Grpc_SyncSeqMsg__Output>
  UpsertServerUser: MethodDefinition<_Dps2n3Grpc_Empty, _Dps2n3Grpc_EntityStatusMsg, _Dps2n3Grpc_Empty__Output, _Dps2n3Grpc_EntityStatusMsg__Output>
}
