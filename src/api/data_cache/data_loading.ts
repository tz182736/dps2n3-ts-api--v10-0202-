import { dps_logger as logger } from "../../utilities/tslog-main.js";

import { toNSaleEntity } from "../../drizzle_orm/schemas/NSale.js";

import * as nSaleRepository from '../../drizzle_orm/repository/NSaleRepository.js';
import * as saleDtlRepository from '../../drizzle_orm/repository/NSaleDtlRepository.js';

import { NSaleData } from './NSale_Cache.js';
import { NSaleDtlData } from './NSaleDtl_Cache.js';

/** TODO: load betting on server restart or request by specific date on adhoc reload. 
 * purge daily on 3am mid night. */
export const initializednSaleDataCache = async (BetPeriodList: number[]) => {
   let resultCount: number = 0;
   const promises: Promise<void>[] = BetPeriodList.map(async p => {
      // FILLING NSALE AND NSALE DETAILS
      const nsale_list = await nSaleRepository.findAll({ betPeriod: p });
      // Add to cache
      for (const betting of nsale_list) {
         NSaleData.insertNSaleCache(toNSaleEntity(betting));
         // load numbers from database (loading all at the same time is faster? assume no key was missing)
         const bnumbers = await saleDtlRepository.findAll({ entityId: betting.id });
         resultCount++;
         
         for (const bnumber of bnumbers) {
            // NSaleDtlData.addBNumber(bnumber);
            NSaleDtlData.insertNSaleDtlCache((bnumber));
            resultCount++;
         }
      }
   });

   // Wait for all promises to complete before logging the resultCount
   await Promise.all(promises);

   logger.info(`!~32 data_loading: total ${resultCount} sale numbers loaded.`)
}
