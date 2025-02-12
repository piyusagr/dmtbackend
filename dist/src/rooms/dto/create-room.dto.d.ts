import { EnumTransferService, Prisma, RoomBed } from '@prisma/client';
export declare class CreateBedDto implements Pick<RoomBed, 'amount' | 'bed_type'> {
    bed_type: string;
    amount: number;
}
type RoomWithBedsType = Omit<Prisma.RoomCreateInput, 'beds' | 'place' | 'createdAt'>;
export declare class CreateRoomDto implements RoomWithBedsType {
    place_id: number;
    title: string;
    price: number;
    stock: number;
    room_type: string;
    beds: CreateBedDto[];
    isDiscountAvailable: boolean;
    discount?: number;
    transferService: EnumTransferService;
    extraAmount?: number;
}
export {};
