import { EnumPrivateGroupHosting, EnumTransferService } from '@prisma/client';
import { DateRangesDTO } from './date-ranges.dto';
export declare class OnsiteEventDTO {
    dateRanges: DateRangesDTO[];
    extraAmount?: number;
    privateGroupHosting?: EnumPrivateGroupHosting;
    privateGroupHostingCharge?: number;
    transferService: EnumTransferService;
    latitude: number;
    longitude: number;
}
