
import { dps_logger } from "../utilities/tslog-main.js";
const logger = dps_logger.getSubLogger({ name: "Sale Service api" });

import * as grpc_js from "@grpc/grpc-js";

import { Empty } from "../proto/generated/Dps2n3Grpc/Empty.js";
import { NSaleServiceClient } from "../proto/generated/Dps2n3Grpc/NSaleService.js";
import { getBetPeriod } from "../utilities/nsale-utils.js";
import { BetTypeEnumPb } from "../proto/generated/Dps2n3Grpc/BetTypeEnumPb.js";
import { Metadata_tag } from "../utilities/proto-utils.js";
const empty: Empty = <Empty>{};

const metadata = new grpc_js.Metadata();

/**  --1  */
export async function authenticatedClient(client: NSaleServiceClient, apikey?: string): Promise<string | undefined> {
    let apiKey: string | undefined;

    const metadata = new grpc_js.Metadata();
    metadata.set(`${Metadata_tag.Apikey}`, apikey ?? "KwiEmkkFqKeARRmNXFDvb");
    metadata.set(`${Metadata_tag.Username}`, "u1");
    metadata.set(`${Metadata_tag.Password}`, "");

    client.authServerUser(empty, metadata, (err, response) => {
        if (err) { console.error(err); }
        else {
            apiKey = response?.data;
        }
        console.log(`apikey: ${apiKey}`);
        console.log(metadata);

        logger.info(metadata);
    });

    return apiKey;
}


export async function upsertNewUser(client: NSaleServiceClient, username: string, password: string) {
    let message: string | undefined;
    //TODO : REMOVE THIS BEFORE DEPLOY
    metadata.set("adminkey", `${64264159 + getBetPeriod(BetTypeEnumPb.BET_2D, new Date())}`);
    metadata.set("username", username);
    metadata.set("password", password);

    client.UpsertServerUser(empty, metadata, (err, response) => {
        if (err) { console.error(err); }
        else {
            message = response?.data;
        }
        console.log(`apikey: ${message}`);

    });
}
