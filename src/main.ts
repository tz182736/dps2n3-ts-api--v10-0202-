// * hightlight
// ! alert
// ? query
import "reflect-metadata";
import { dps_logger as logger } from "./utilities/tslog-main.js";
import * as utils from "./utilities/proto-utils.js";
import * as nSaleUtils from "./utilities/nsale-utils.js";

//#region Ts Node Import
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { ProtoGrpcType } from "./proto/generated/NumberSaleService.js";
import { NSaleServiceClass } from "./api/NSaleServiceApi.js";

import * as dataLoading from "./api/data_cache/data_loading.js";
import * as sync_manager_ins from "./api/SyncSeqService.js";
import { BetTypeEnumPb } from "./proto/generated/Dps2n3Grpc/BetTypeEnumPb.js";

const host: string = "0.0.0.0:50051";
// const host = "https://dps24-tyt.onrender.com:50051";

async function main() {
  try {
    // * load necessary data and cache.
    await loadAndCacheBettings();

    // * start grpc server
    const packageDefinition = protoLoader.loadSync("NumberSaleService.proto", utils.protoLoaderConfig);
    const proto = grpc.loadPackageDefinition(packageDefinition) as unknown as ProtoGrpcType;

    const server = new grpc.Server();
    server.addService(proto.Dps2n3Grpc.NSaleService.service, new NSaleServiceClass());
    server.bindAsync(host, grpc.ServerCredentials.createInsecure(), (err: Error | null, port: number) => {
      if (err) {
        console.error(`Server error: ${err.message}`);
      } else {
        console.log(`Server bound on port: ${port}`);
        server.start();
      }
    });
  } catch (err) {
    console.error("Error during data source initialization", err);
  }
}

async function loadAndCacheBettings() {
  // TODO: check with user on how to load old data
  const currentDate = new Date();
  // const year = currentDate.getFullYear();
  // const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Adding 1 because months are zero-based
  // const day = currentDate.getDate().toString().padStart(2, "0");

  // const betPeriod2D = parseInt(`${year}${month}${day}01`, 10);
  const betPeriod2D = nSaleUtils.getBetPeriod(BetTypeEnumPb.BET_2D, currentDate);
  const betPeriod3D = nSaleUtils.getBetPeriod(BetTypeEnumPb.BET_3D, currentDate);

  const betpPeriodSet = new Set<number>();
  betpPeriodSet.add(betPeriod2D);
  betpPeriodSet.add(betPeriod3D);
  
  logger.info(`!~56 main: Loading data for betPeriod ${betPeriod2D} ${betPeriod3D}`);

  // * LOAD SyncSeq List
  // get betPeriod for all sale Type, for instance hardcode to 2D,3D
  await sync_manager_ins.initializeSyncSeqCache(Array.from(betpPeriodSet));

  // * LOAD NSale and NSaleDtl
  // implement 3D and 2D betperiod calculating formula in ts
  await dataLoading.initializednSaleDataCache(Array.from(betpPeriodSet));
}

// Schedule the resetMappedList method to be called every 2 days (in milliseconds).
const resetInterval = 2 * 24 * 60 * 60 * 1000; // 2 days in milliseconds

setInterval(async () => {
  sync_manager_ins.purgeSyncSeq();
  await loadAndCacheBettings();
}, resetInterval);

// // Self provoking async function. This code will only run when my_module.js is imported for its side effects
(async () => {
  try {
    main();
  } catch (err) {
    // handle the error here, do not rethrow it
    console.error(` !~94 Main function:: ${err}`);
  }
})();
