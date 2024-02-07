import * as grpc from "@grpc/grpc-js";
import { nanoid } from "nanoid";
import { Metadata_tag } from "./proto-utils.js";
import * as userRepository from "../drizzle_orm/repository/DpsUserRepository.js";
import { SyncSeq_insert } from "../drizzle_orm/schemas/SyncSeq.js";

// TODO: checking on start resync from last seq, map should be unique ?


/** 
 * map of < apiKey , [last SeqKey , last SeqValue]> 
 * list of all SeqKey for each group with latest SeqValue to resync. 
 * only authenticated user apiKey was inserted here.
 * */
export const authkey_list: Map<string, undefined | SyncSeq_insert[]> = new Map();

export const IsApiKeyExist_AuthList = (apiKey: string): boolean => authkey_list.has(apiKey);

export const insertApiKey_AuthList = (apikey: string, value: undefined | SyncSeq_insert[]) => authkey_list.set(apikey, value);

export const DeleteApiKey_AuthList = (apiKey: string) => authkey_list.delete(apiKey);

export const ExtractCredential = (metadata: grpc.Metadata): { apiKey: string; userName: string; password: string } => {
  const apiKey = metadata.get(`${Metadata_tag.Apikey}`)[0] as string;
  const userName = metadata.get(`${Metadata_tag.Username}`)[0] as string;
  const password = metadata.get(`${Metadata_tag.Password}`)[0] as string;
  return { apiKey, userName, password };
};

/** authenticate username and password database and update database apikey.  */
export const Auth_Metadata = async (metadata: grpc.Metadata): Promise<{ code: number, valid: boolean; apiKey?: string; err?: string }> => {
  const { apiKey, userName, password } = ExtractCredential(metadata);

  console.log("!~32: start Auth_Metadata");
  let userData = await userRepository.findByName(userName);

  // ENDPOINT 1: USER NAME NOT VALID
  if (!userData) {
    return { code: 1, valid: false, err: "User Name Not Exist. " };
  }

  // ENDPOINT 2: VALID key, insert session
  if (userData.apiKey != null && userData.apiKey == apiKey) {
    // set api key for session usage
    return { code: 2, valid: true, apiKey: userData.apiKey };
  }

  // ENDPOINT 3: VALID USER/PWD, GENERATE KEY, insert session
  if (userName == userData?.userName && password == userData?.password) {
    userData.apiKey = nanoid();
    await userRepository.updateUser(userData.userId, userData.userName, userData.password, userData.apiKey);
    return { code: 3, valid: true, apiKey: userData.apiKey! };
  }

  return { code: 0, valid: false, err: "unknown error." };
};
