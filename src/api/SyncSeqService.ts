/**
 * tz182736: (20240202) Main focus on last seq of each group.
 * Sync Seq will generate on every request and allow to skip. 
 * */

import { dps_logger } from "../utilities/tslog-main.js";
const logger = dps_logger.getSubLogger({ name: "sync service module:" });

import * as syncSeqRepository from "../drizzle_orm/repository/SyncSeqRepository.js";
import { SyncSeq_insert } from "../drizzle_orm/schemas/SyncSeq.js";

import { Mutex } from "async-mutex";
const lastSeqMap: Map<string, number> = new Map();
const lockMutexes: WeakMap<object, Mutex> = new WeakMap();

/** *loading sync seq from database for sync control call from main startup.  */
export const initializeSyncSeqCache = async (BetPeriodList: number[]) => {
  5
  // TODO: init updateSeq from database ,
  // Use Promise.all to wait for all the promises to resolve  
  await Promise.all(BetPeriodList.map(async p => {
    var syncSeqListOfBetPeriod = await syncSeqRepository.getLastSeqByBetPeriod(p);
    syncSeqListOfBetPeriod.forEach(sync => { lastSeqMap.set(sync.SeqKey, sync.SeqValue); });
  }));

};

export const upsertSyncSeqValue = async (syncSeq: SyncSeq_insert) => await syncSeqRepository.upsertSyncSeq(syncSeq);

export const getLastSeqValue = async (SeqKey: string) => lastSeqMap.get(SeqKey) ?? 0;

export const getNextSeqValue = async (SeqKey: string) => {
  const mutex = lockMutexes.get({ synckey: SeqKey }) || new Mutex();
  lockMutexes.set({ synckey: SeqKey }, mutex);
  const release = await mutex.acquire();

  try {
    const updatedSeq = (lastSeqMap.get(SeqKey) ?? 0) + 1;
    lastSeqMap.set(SeqKey, updatedSeq);  
    // should I save db ? or skip
    return updatedSeq;
  } finally {
    release();
  }
};

export const getAllSyncSeq = async ()=> lastSeqMap;

// call by main interval timer and refill by main initialization
export const purgeSyncSeq = (retainBetPeriod: number[] = []) => {
  lastSeqMap.clear();
};

