import { CreateBedDto, CreateRoomDto } from './create-room.dto';
declare const UpdateBedDto_base: import("@nestjs/common").Type<Partial<CreateBedDto>>;
export declare class UpdateBedDto extends UpdateBedDto_base {
    id: number;
}
declare const UpdateRoomDto_base: import("@nestjs/common").Type<Partial<Omit<CreateRoomDto, "beds">>>;
export declare class UpdateRoomDto extends UpdateRoomDto_base {
    delete_bed_ids?: number[];
    beds: UpdateBedDto[];
}
export {};
