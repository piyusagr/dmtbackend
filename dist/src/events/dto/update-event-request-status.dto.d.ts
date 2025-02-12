import { EnumExperinceEventRequestStatus } from '@prisma/client';
export declare class UpdateEventRequestStatusDto {
    eventListingId: string;
    eventRequestId: string;
    status: EnumExperinceEventRequestStatus;
}
