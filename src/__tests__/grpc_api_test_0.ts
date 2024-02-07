// node .\dist\__tests__\grpc_api_test.js --1

// #region import declaration
import * as readline from "readline";

import { dps_logger } from "../utilities/tslog-main.js";
const logger = dps_logger.getSubLogger({ name: "betting api" });

import * as grpc_js from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { ProtoGrpcType } from "../proto/generated/NumberSaleService.js";

import * as utils from "../utilities/proto-utils.js";
// #endregion

// #region this is local data helper to keep track of last betting Id, number id
import * as fs from "fs";
let groupId: number = 0; // share to read text file as filename
let userId: string = ""; // share to read text file as filename
let customerName: string = ""; // share to read text file as filename
let nSaleId: number;
let nSaleDtlId: number;
let filePath = groupId + userId + ".txt";
async function initLocalDataFile(groupId: number, userId: string) {
    return new Promise((resolve, reject) => {
        filePath = groupId + userId + ".txt";
        fs.readFile(filePath, "utf8", (err, data) => {
            if (err) {
                console.error(`Error reading the file: ${err}, create new one.`);
                (nSaleId = 0), (nSaleDtlId = 0);
            } else {
                const last_id = data.split(" ");
                nSaleId = parseInt(last_id[0]);
                nSaleDtlId = parseInt(last_id[1]);
            }
            nSaleId += 1;
            filePath = groupId + userId + ".txt"; // assigns a default value if it's not already defined.
            resolve(0);
        });
    });
}
// // Self provoking async function. This code will only run when my_module.js is imported for its side effects
(async () => {
    try {
        await initLocalDataFile(groupId, userId);
    } catch (err) {
        // handle the error here, do not rethrow it
        console.error(`test self provoking : ${err}`);
    }
})();
//#endregion

// #region start client grpc connection
// const host = "192.168.1.3:50051";
const host = "0.0.0.0:50051";
const packageDefinition = protoLoader.loadSync("NumberSaleService.proto", utils.protoLoaderConfig);
const proto = grpc_js.loadPackageDefinition(packageDefinition) as unknown as ProtoGrpcType;
const client = new proto.Dps2n3Grpc.NSaleService(host, grpc_js.credentials.createInsecure());

const metadata = new grpc_js.Metadata();

const deadline = new Date();
deadline.setSeconds(deadline.getSeconds() + 5);
client.waitForReady(deadline, async (error?: Error) => {
    if (error) {
        console.log(`Client connect error: ${error.message}`);
    } else {
        await onClientReady();
    }
});
// #endregion

import { authenticatedClient, upsertNewUser } from './grpc_api_test_1.js';
import { call_addNSale } from "./grpc_call_addNSale.js";

async function onClientReady(): Promise<void> {
    groupId = parseInt(process.argv[3]);
    userId = process.argv[4];
    customerName = process.argv[5];

    switch (process.argv[2]) {
        case "--1":
            const apiKey = await authenticatedClient(client);
            fs.writeFile(filePath, `${apiKey} ${0} ${0}`, (err) => { });
            break;
        case "--2":
            await authenticatedClient(client, "0wBkClyPbymfPkN6AC1UK");
            break;
        case "--3":
            break;
        case "--8": await call_addNSale(client);
            break;
        case "--9": await upsertNewUser(client, process.argv[3], process.argv[4]);
            break;
        default:
            throw new Error("Example not specified");
    }
} 