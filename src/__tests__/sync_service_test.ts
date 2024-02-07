// node .\dist\__tests__\sync_service_test.js
/** 20240128 : (tz182736)  v10-0202,  change to save only last seq */
import { dps_logger } from "../utilities/tslog-main.js";
const logger = dps_logger.getSubLogger({ name: "Dps number sale api" });

import { SyncSeq_insert } from "../drizzle_orm/schemas/SyncSeq.js";
import * as syncSeqRepository from "../drizzle_orm/repository/SyncSeqRepository.js";
import * as syncService from "../api/SyncSeqService.js";
export async function main() {

    /**  betType-betPeriod-groupId */
    const seqKey = "0-dummyKey-0";
    const userId = 1;
    const entityType = 1; // Math.floor(Math.random() * 2) == 1 ? 0 : 1;

    // skip first 50 for next test
    console.log(await syncSeqRepository.deleteAllSyncSeq());

    // advance 50
    for (let i = 0; i < 50; i++) await syncService.getNextSeqValue(seqKey);

    // will print 51
    console.log(await syncService.getNextSeqValue(seqKey));

    // will save 52
    const syncSeq: SyncSeq_insert = { SeqKey: seqKey, SeqValue: await syncService.getNextSeqValue(seqKey), UserId: userId, EntityType: entityType };
    const result = await syncService.upsertSyncSeqValue(syncSeq);

    // insert 10 dummy key
    for (let i = 0; i < 10; i++) {
        syncSeq.SeqKey = `${seqKey}${i}`;
        await syncService.getNextSeqValue(syncSeq.SeqKey);
        await syncService.getNextSeqValue(syncSeq.SeqKey);
        await syncService.getNextSeqValue(syncSeq.SeqKey);
        await syncService.upsertSyncSeqValue(syncSeq);
    }

    // increate 50 on last dummy2
    syncSeq.SeqKey = "dummy2";
    for (let i = 0; i < 50; i++) await syncService.getNextSeqValue(syncSeq.SeqKey)
    await syncService.upsertSyncSeqValue(syncSeq);
    console.log(`dummy2 ${syncSeq.SeqValue}`);

    const allKeyList = (await syncService.getAllSyncSeq()).keys();
    for (const key of allKeyList) {
        console.log(key);
    }
}

/** Self provoking async function. This code will only run when my_module.js is imported for its side effects */
(async () => {
    try {
        await main();
    } catch (err) {
        // handle the error here, do not rethrow it
        console.error(`test self provoking : ${err}`);
    }
})();