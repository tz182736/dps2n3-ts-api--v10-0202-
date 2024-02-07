
import { format } from 'date-fns';
import { BetTypeEnumPb } from "../proto/generated/Dps2n3Grpc/BetTypeEnumPb.js";

export const getBetPeriod = (betType: BetTypeEnumPb, bettingDate: Date): number => { 

    const betPeriodString = betType === BetTypeEnumPb.BET_3D
        ? `${format(getPrizeDrawDate3D(bettingDate), 'yyyyMMdd')}01` : `${format(bettingDate, 'yyyyMMdd')}${bettingDate.getHours() < 12 ? "00" : "01"}`;
 
    return parseInt(betPeriodString, 10);
}

export function getPrizeDrawDate3D(bettingDate: Date): Date {
    let drawDate3D = new Date(bettingDate.getFullYear(), bettingDate.getMonth(), 1);

    if (bettingDate.getDate() >= 5 && bettingDate.getDate() <= 19) {
        drawDate3D = new Date(bettingDate.getFullYear(), bettingDate.getMonth(), 16);
    } else if (bettingDate.getDate() > 19) {
        drawDate3D.setMonth(drawDate3D.getMonth() + 1);
    }

    if (drawDate3D.getMonth() === 4 && drawDate3D.getDate() === 1) {
        drawDate3D = new Date(drawDate3D.getFullYear(), drawDate3D.getMonth(), 2); // special case, may day off
    } else if (drawDate3D.getMonth() === 0 && drawDate3D.getDate() === 1) {
        drawDate3D.setMonth(drawDate3D.getMonth() - 1);
        drawDate3D = new Date(drawDate3D.getFullYear(), drawDate3D.getMonth(), 31); // special case, may day off
    }

    return drawDate3D;
}

// Example usage:
// const betType = BetTypeEnumPb.BET_3D;
// const bettingDate = new Date();
// const result = getBetPeriod(betType, bettingDate);
// console.log(result);
