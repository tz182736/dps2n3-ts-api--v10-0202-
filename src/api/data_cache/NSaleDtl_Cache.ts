import { dps_logger } from "../../utilities/tslog-main.js";
const logger = dps_logger.getSubLogger({ name: "betting api" });

import { NSaleDtlMsg } from "../../proto/generated/Dps2n3Grpc/NSaleDtlMsg.js";

type BNumberKey = { Id: number; NSaleId: number; GroupId: number; UserId: number; };

class NSaleDtl_Cache {
   private mapped_list = new Map<BNumberKey, NSaleDtlMsg>();
   private static _instance: NSaleDtl_Cache;
   private constructor() {}
   public static get instance(): NSaleDtl_Cache { return this._instance || (this._instance = new this()); }

   size(): number { return this.mapped_list.size; }

   getBNumberItemList(
      groupId: number,
      userId: number,
      nSaleId: number,
      _sync_seq?: number
   ): NSaleDtlMsg[] {
      let betting_range: NSaleDtlMsg[] = Array.from(this.mapped_list.values()).filter(
         (value: NSaleDtlMsg) =>
            value.GroupId == groupId && value.UserId == userId && value.NSaleId == nSaleId
      );
      // TODO: FILTER BY sync_seq
      // refill if data not exist is done by header variables => betting

      return betting_range;
   }

   insertNSaleDtlCache(NumberFormula: NSaleDtlMsg): NSaleDtlMsg {
      let key: BNumberKey = {
         Id: NumberFormula.Id as number,
         NSaleId: NumberFormula.NSaleId as number,
         GroupId: NumberFormula.GroupId as number,
         UserId: NumberFormula.UserId as number
      };

      this.mapped_list.set(key, NumberFormula);
      return NumberFormula;
   }

   resetMappedList() {
      this.mapped_list = new Map<BNumberKey, NSaleDtlMsg>();
   }
}

export const NSaleDtlData = NSaleDtl_Cache.instance;
