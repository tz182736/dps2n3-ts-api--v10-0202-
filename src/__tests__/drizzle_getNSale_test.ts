// 20240111 test db call 

import { dps_logger } from "../utilities/tslog-main.js";
const logger = dps_logger.getSubLogger({ name: "Sale Service api" });

import * as nSaleRepository from "../drizzle_orm/repository/NSaleRepository.js";
import * as nSaleDtlRepository from "../drizzle_orm/repository/NSaleDtlRepository.js";
import { BetTypeEnumPb } from "../proto/generated/Dps2n3Grpc/BetTypeEnumPb.js";

export const call_getNSaleRepo = async () => {
    const req_data_stream1 = {
        betType: BetTypeEnumPb.BET_2D,
        betPeriod: 2024011200,
        groupId: 1, 
        syncSeq: 2
    };

    // load from database
    const nSaleData = await nSaleRepository.find(req_data_stream1);

    console.log(nSaleData);
} 