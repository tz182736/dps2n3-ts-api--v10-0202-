
import * as grpc_js from "@grpc/grpc-js";

import { NSaleServiceClient } from "../proto/generated/Dps2n3Grpc/NSaleService.js";
import { NSaleMsg } from "../proto/generated/Dps2n3Grpc/NSaleMsg.js";
import { getBetPeriod } from "../utilities/nsale-utils.js";
import { BetTypeEnumPb } from "../proto/generated/Dps2n3Grpc/BetTypeEnumPb.js";

export async function call_addNSale(client: NSaleServiceClient) {
    const metadata = new grpc_js.Metadata();
    metadata.set("apikey", "secret");

    for (let i = 0; i < 5; i++) {
        const nSaleMsg = <NSaleMsg>{
            Id: i,
            GroupId: 1,
            UserId: 1,
            CustomerName: `c1-${i}`,
            BetDate: Math.floor(new Date().getTime() / 1000),
            BetRate: 80,
            BetCommission: 25,
            BetPeriod: getBetPeriod(BetTypeEnumPb.BET_2D, new Date()),
            BetType: BetTypeEnumPb.BET_2D,
            BetTotal: 0,
        };

        client.UpsertNSale(nSaleMsg, metadata, (error, response) => {
            if (error) {
                console.error(`Unexpected error: ${error}`);
            } else {
                console.log(`response sync_seq: ${response?.SeqValue}`);
            }
        });
    }

}