import { dps_logger } from "../../utilities/tslog-main.js";
const logger = dps_logger.getSubLogger({ name: "betting api" });

import { initializednSaleDataCache } from "../../api/data_cache/data_loading.js";
import { NSaleMsg } from "../../proto/generated/Dps2n3Grpc/NSaleMsg.js";


class NSale_Cache {
   private static _instance: NSale_Cache;
   private constructor() { }
   public static get instance(): NSale_Cache { return this._instance || (this._instance = new this()); }
   size(): number { return this.syncItem_List.length; }

   private syncItem_List: NSaleMsg[] = [];


   // only return betting, bnumbers in another module
   getBettingItemList(betType: string, betPeriod: number, groupId: number): NSaleMsg[] {
      let betting_range: NSaleMsg[] = this.syncItem_List.filter(
         b => b.BetType == betType && b.BetPeriod == betPeriod && b.GroupId == groupId
      );
      return betting_range;
   }

   insertNSaleCache(betting: NSaleMsg): NSaleMsg {
      this.syncItem_List.push(betting);
      return betting;
   }
 
}

export const NSaleData = NSale_Cache.instance;
