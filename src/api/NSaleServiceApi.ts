/**3
 * 20240125 v9-0127 
 */

//#region Ts Node Import
import * as grpc from "@grpc/grpc-js";

import { dps_logger } from "../utilities/tslog-main.js";

const logger = dps_logger.getSubLogger({ name: "Sale Service api" });

import * as userRepository from "../drizzle_orm/repository/DpsUserRepository.js";
import * as nSaleRepository from "../drizzle_orm/repository/NSaleRepository.js";
import * as nSaleDtlRepository from "../drizzle_orm/repository/NSaleDtlRepository.js";

import { SyncSeq_select, toSyncSeqMsg } from "../drizzle_orm/schemas/SyncSeq.js";
import { toNSaleEntity, toNSaleMsg } from "../drizzle_orm/schemas/NSale.js";
import { toNSaleDtlEntity, toNSaleDtlMsg } from "../drizzle_orm/schemas/NSaleDtl.js";

import { Metadata_tag } from "../utilities/proto-utils.js";
import { parseSeqKey } from "../utilities/sync-utils.js";
import * as syncService from "./SyncSeqService.js";
import { admin_AssignUserSaleGroup, admin_AuthServerUser, admin_DeleteServerUser, admin_DeleteUserSaleGroup, admin_updateServerUser } from "./NSaleAdminService.js";
import { Auth_Metadata, authkey_list, DeleteApiKey_AuthList, insertApiKey_AuthList, IsApiKeyExist_AuthList } from "../utilities/auth-utils.js";

import { EntityTypeEnumPb } from "../proto/generated/Dps2n3Grpc/EntityTypeEnumPb.js";
import { NSaleServiceHandlers } from "../proto/generated/Dps2n3Grpc/NSaleService.js";
import { NSaleMsg } from "../proto/generated/Dps2n3Grpc/NSaleMsg.js";
import { NSaleDtlMsg } from "../proto/generated/Dps2n3Grpc/NSaleDtlMsg.js";
import { EntityDeleteMsg, EntityDeleteMsg__Output } from "../proto/generated/Dps2n3Grpc/EntityDeleteMsg.js";
import { SyncSeqMsg } from "../proto/generated/Dps2n3Grpc/SyncSeqMsg.js";
import { SyncGpMsg } from "../proto/generated/Dps2n3Grpc/SyncGpMsg.js";
import { NSaleStreamJoinMsg } from "../proto/generated/Dps2n3Grpc/NSaleStreamJoinMsg.js";
import { NSaleStreamRspn } from "../proto/generated/Dps2n3Grpc/NSaleStreamRspn.js";

//#endregion

/** SeqKey => ApiKey => Call [SeqKey and ApiKey list was assign in authorization function] */
export const _broadcastSeqKeyList: Map<string, Map<string, grpc.ServerWritableStream<NSaleStreamJoinMsg, NSaleStreamRspn>>> = new Map();

function Broadcast_bySeqKey(seqKey: string, msg: NSaleStreamRspn) {
    const callList = _broadcastSeqKeyList.get(seqKey);

    if (callList == null || callList == undefined) return;

    for (const call of callList.values()) {
        logger.trace(`Just Broadcasted ${seqKey} - uid / ${msg.UserId} of count ${callList.size}`);
        call.write(msg);
    }
}

export class NSaleServiceClass implements NSaleServiceHandlers {
    [name: string]: grpc.UntypedHandleCall;

    AuthServerUser = admin_AuthServerUser;
    DeleteUserSaleGroup = admin_DeleteUserSaleGroup;
    AssignUserSaleGroup = admin_AssignUserSaleGroup;
    DeleteServerUser = admin_DeleteServerUser;
    UpsertServerUser = admin_updateServerUser;

    RemoveNSale = async function (call: grpc.ServerUnaryCall<EntityDeleteMsg, SyncSeqMsg>, callback: grpc.sendUnaryData<SyncSeqMsg>) {
        callback(null, <SyncSeqMsg>{ SeqKey:"grpc call success" });
    };

    RemoveNSaleDtl: grpc.handleUnaryCall<EntityDeleteMsg__Output, SyncSeqMsg>;

    JoinNSaleStream = async function (call: grpc.ServerWritableStream<NSaleStreamJoinMsg, NSaleStreamRspn>) {

        try {
            let apikey = call.metadata.get(`${Metadata_tag.Apikey}`)[0] as string;

            // TODO: for test only, later move to auth function later.
            // login with username and emit error
            if (!IsApiKeyExist_AuthList(apikey)) {
                logger.info(`invalid apiKey : ${apikey}, now trying username and password.`);

                const auth_login = await Auth_Metadata(call.metadata);
                if (!auth_login.valid) {
                    apikey = auth_login.apiKey!;
                    logger.info("invalid username password");
                    call.end();
                }
            }
            insertApiKey_AuthList(apikey, undefined);
            logger.info(`!~79: auth apikey ${apikey} was inserted of ttl key ${authkey_list.size}.`);

            // get group list and insert into SeqKey  
            const joinReqMsg = call.request;
            /** user request group list */
            const reqGroupList: SyncGpMsg[] = joinReqMsg.GroupList!;
            /** group list from user database */
            const assignedGroupList = await userRepository.findGroupIdListByApikey(apikey);

            for (const item of reqGroupList) {
                logger.trace(`!~92 ${new Date().toISOString()}: resync loop start for group id (${item.GroupId})`);
                if (assignedGroupList.includes(item.GroupId!)) {
                    let seqKey = parseSeqKey(joinReqMsg.BetType as number, joinReqMsg.BetPeriod!, item.GroupId!);

                    // join broadcase list
                    let syncKey = _broadcastSeqKeyList.get(seqKey) || new Map();
                    syncKey.set(apikey, call);
                    _broadcastSeqKeyList.set(seqKey, syncKey);

                    // don't mind overlap 1 or 2 nSale repeated, resend sale data between client last seq and client join seq
                    const currentSeqValue = await syncService.getLastSeqValue(seqKey);

                    logger.info(`!~104 seqkey ${seqKey} , reqSeqValue ${item.ClientLastSyncSeq} , currentSeqValue: ${currentSeqValue}  `);

                    // send missing nsale data,
                    var nSaleList = await nSaleRepository.getAllNSaleBetween(joinReqMsg.BetType as number, joinReqMsg.BetPeriod as number, item.GroupId!, item.ClientLastSyncSeq!, currentSeqValue!);
                    for (const nSaleItem of nSaleList) {
                        const nSaleMsg = <NSaleStreamRspn>{
                            BetType: joinReqMsg.BetType, BetPeriod: joinReqMsg.BetPeriod, GroupId: item.GroupId,
                            UserId: nSaleItem.userId, NSale: toNSaleMsg(nSaleItem)
                        };
                        logger.info(`send out nSale (${nSaleItem.id})`);
                        call.write(nSaleMsg);
                    }

                    // send missing nsaleDtl data,
                    var nSaleDtlList = await nSaleDtlRepository.getAllNSaleBetween(joinReqMsg.BetType as number, joinReqMsg.BetPeriod as number, item.GroupId!, item.ClientLastSyncSeq!, currentSeqValue!);
                    for (const nSaleDtlItem of nSaleDtlList) {
                        const nSaleMsg = <NSaleStreamRspn>{
                            BetType: joinReqMsg.BetType, BetPeriod: joinReqMsg.BetPeriod, GroupId: item.GroupId,
                            UserId: nSaleDtlItem.userId, NSaleDtl: toNSaleDtlMsg(nSaleDtlItem)
                        };
                        logger.info(`send out nSaleDtl (${nSaleDtlItem.id}, n ${nSaleDtlItem.numberFormula})`);
                        call.write(nSaleMsg);
                    }

                } // assigned group list
            }//req group list

            logger.trace(`!~86: reqList:${reqGroupList.length}, assignedList: ${assignedGroupList.length}`);

            // Remove the client from the map 
            call.on("end", () => {
                DeleteApiKey_AuthList(apikey);
                logger.info(`stream1 said: client leave (${apikey})`);
            });
            call.on("cancel", () => { logger.info("client cancel"); });
            call.on("close", () => { logger.info("close disconnected"); });
            call.on('error', (error) => { logger.error('Error on client-side:', error); });

        }
        catch (ex) {
            logger.error(` grpc resync error ${ex}`);
        }
    };

    // ! TODO: CHECK TO PREVENT DUPLICATE INSERT WITH ENTITYID
    /** Insert sale data into server database,
     * make SeqKey, insert SyncSeq, insert nSaleEntity */
    UpsertNSale = async function (call: grpc.ServerUnaryCall<NSaleMsg, NSaleMsg>, callback: grpc.sendUnaryData<SyncSeqMsg>) {
        let apikey = call.metadata.get(`${Metadata_tag.Apikey}`)[0] as string;

        let msg: NSaleMsg = call.request;
        if (msg) {
            try {
                // generate syncSeq
                const seqKey = parseSeqKey(msg.BetType as number, msg.BetPeriod!, msg.GroupId!);
                const newSeqValue = await syncService.getNextSeqValue(seqKey);

                // upsert nSaleEntity database
                msg.sync_seq = newSeqValue;
                await nSaleRepository.upsertNSale(toNSaleEntity(msg));

                Broadcast_bySeqKey(seqKey, <NSaleStreamRspn>{ BetType: msg.BetType, BetPeriod: msg.BetPeriod, GroupId: msg.GroupId, UserId: msg.UserId, NSale: msg });

                // upsert sync seq and resposne as msg
                const syncSeq: SyncSeq_select = { SeqKey: seqKey, UserId: msg.UserId!, EntityType: EntityTypeEnumPb.NSale, SeqValue: newSeqValue };
                await syncService.upsertSyncSeqValue(syncSeq);

                logger.trace(`!~166: seqValue:${syncSeq.SeqValue}, nSaleId: ${msg.Id}/${msg.CustomerName}`);
                callback(null, toSyncSeqMsg(syncSeq));
            } catch (e) {
                logger.error(`!~169: Upsert NSale error ${msg.sync_seq}, err: ${e}`);
            }
        }
    };
    UpsertNSaleDtl = async function (call: grpc.ServerUnaryCall<NSaleDtlMsg, NSaleDtlMsg>, callback: grpc.sendUnaryData<SyncSeqMsg>) {

        let apikey = call.metadata.get(`${Metadata_tag.Apikey}`)[0] as string;

        let msg: NSaleDtlMsg = call.request;
        if (msg) {
            try {
                let seqKey = parseSeqKey(msg.BetType as number, msg.BetPeriod!, msg.GroupId!);
                const newSeqValue = await syncService.getNextSeqValue(seqKey);

                // upsert nsale details to database
                msg.sync_seq = newSeqValue;
                await nSaleDtlRepository.upsertNSaleDtl(toNSaleDtlEntity(msg));

                Broadcast_bySeqKey(seqKey, <NSaleStreamRspn>{ BetType: msg.BetType, BetPeriod: msg.BetPeriod, GroupId: msg.GroupId, UserId: msg.UserId, NSaleDtl: msg });

                // upsert sync seq and resposne as msg
                const syncSeq: SyncSeq_select = { SeqKey: seqKey, UserId: msg.UserId!, EntityType: EntityTypeEnumPb.NSale, SeqValue: newSeqValue };
                await syncService.upsertSyncSeqValue(syncSeq);

                logger.trace(`!~166: seqValue:${syncSeq.SeqValue}, nSaleId: ${msg.Id}/${msg.NumberFormula}`);

                callback(null, toSyncSeqMsg(syncSeq));
            } catch (e) {
                logger.error(`!~208: Upsert Error ${msg.sync_seq} , err: ${e}`);
            }
        }
    };
}
