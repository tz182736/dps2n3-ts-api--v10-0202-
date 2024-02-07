/**
 * 231224 (tz182736): migrate from betting service. combine repeated field with parent
 * NSaleServiceApi.ts helper partial class
 */

import * as grpc from "@grpc/grpc-js";
import { nanoid } from "nanoid";

import { dps_logger } from "../utilities/tslog-main.js";
const logger = dps_logger.getSubLogger({ name: "Sale Service api" });

import { DpsUserSaleGroup } from "../proto/generated/Dps2n3Grpc/DpsUserSaleGroup.js";
import { Empty } from "../proto/generated/Dps2n3Grpc/Empty.js";

import * as userRepository from '../drizzle_orm/repository/DpsUserRepository.js';
import { EntityStatusMsg } from "../proto/generated/Dps2n3Grpc/EntityStatusMsg.js";
import { ExtractCredential, insertApiKey_AuthList } from "../utilities/auth-utils.js";


export const admin_AuthServerUser = async function (call: grpc.ServerUnaryCall<Empty, EntityStatusMsg>, callback: grpc.sendUnaryData<EntityStatusMsg>) {
    // extract apiKey from metadata
    const metadata = call.metadata;

    //! TODO: create session table for apikey ?
    // if apiKey is valid in user database, return apiKey
    const { apiKey, userName, password } = ExtractCredential(metadata);

    console.log("!~91: start auth");
    let userData = await userRepository.findByName(userName);

    // ENDPOINT 2: USER NAME NOT VALID
    if (!userData) {
        metadata.add("error", JSON.stringify("User Name Not Exist. "));
        callback({ code: grpc.status.UNAUTHENTICATED, metadata: metadata }, null);
        return;
    }

    // ENDPOINT 1: VALID key, insert session
    if (userData.apiKey != null && userData.apiKey == apiKey) {
        // set api key for session usage
        insertApiKey_AuthList(userData.apiKey, undefined);
        callback(null, <EntityStatusMsg>{ data: apiKey });
        return;
    }

    // ENDPOINT 3: VALID PASS VALID KEY, , insert session
    if (userName == userData?.userName && password == userData?.password) {
        userData.apiKey = nanoid();
        await userRepository.updateUser(userData.userId, userData.userName, userData.password, userData.apiKey);

        // set api key for session usage
        insertApiKey_AuthList(userData.apiKey, undefined);

        // update authenticated list
        callback(null, <EntityStatusMsg>{ data: userData.apiKey });
        return;
    }

    metadata.add("error", JSON.stringify("Auth faile. unknown reason. "));
    callback({ code: grpc.status.UNAUTHENTICATED, metadata: metadata }, null);
};

export const admin_DeleteUserSaleGroup = async (call: grpc.ServerUnaryCall<DpsUserSaleGroup, EntityStatusMsg>, callback: grpc.sendUnaryData<EntityStatusMsg>) => {
    if (call.request) {
        const saleGroup: DpsUserSaleGroup = call.request;
        await userRepository.deleteUser_SaleGroup(saleGroup.UserName!, saleGroup.GroupId!);
        callback(null, <EntityStatusMsg>{ SvrMessage: `User Deleted from : ${saleGroup.UserName!}` });
    }
    callback({
        code: grpc.status.DATA_LOSS,
        message: "Invalid request parameter",
    });
};
export const admin_AssignUserSaleGroup = async function (call: grpc.ServerUnaryCall<DpsUserSaleGroup, EntityStatusMsg>, callback: grpc.sendUnaryData<EntityStatusMsg>) {

    if (call.request) {
        const saleGroup: DpsUserSaleGroup = call.request;
        await userRepository.upsertUserGroup(saleGroup.UserName!, saleGroup.GroupId!, true, true, true);
        callback(null, <EntityStatusMsg>{ data: `User Added to : ${saleGroup.UserName!}` });
    }
    callback({
        code: grpc.status.DATA_LOSS,
        message: "Invalid request parameter",
    });
};

export const admin_DeleteServerUser = async function (call: grpc.ServerUnaryCall<Empty, EntityStatusMsg>, callback: grpc.sendUnaryData<EntityStatusMsg>) {
    // extract apiKey from metadata
    const metadata = call.metadata;
    const adminKey = metadata.get("adminkey")[0] as string;
    const userName = metadata.get("username")[0] as string;
    try {
        const keyvalue = parseInt(adminKey);
        const dateValue = parseInt(new Date().toISOString().slice(0, 10).replace('-', ''));

        if (keyvalue == dateValue + 7188228) {
            const userExist = await userRepository.findByName(userName);
            if (userExist) {
                await userRepository.deleteUser(userExist.userId);
            }
        }

        callback(null, <EntityStatusMsg>{ data: `Deleted : ${userName}` });

    } catch (ex) {
        logger.info(`!~82:UpsertServerUser: invalid admin `);
    }
};

export const admin_updateServerUser = async function (call: grpc.ServerUnaryCall<Empty, EntityStatusMsg>, callback: grpc.sendUnaryData<EntityStatusMsg>) {
    // extract apiKey from metadata
    const metadata = call.metadata;
    const adminKey = metadata.get("adminkey")[0] as string;
    const userName = metadata.get("username")[0] as string;
    const password = metadata.get("password")[0] as string;

    try {
        const keyvalue = parseInt(adminKey);
        const dateValue = parseInt(new Date().toISOString().slice(0, 10).replace('-', ''));

        const userExist = await userRepository.findByName(userName);
        if (userExist)
            await userRepository.updateUser(userExist.userId, userName, password, "");

        callback(null, <EntityStatusMsg>{ data: `${keyvalue}` });

    } catch (ex) {
        logger.info(`!~82:UpsertServerUser: invalid admin `);
    }

};