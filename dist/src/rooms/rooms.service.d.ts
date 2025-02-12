import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { RoomEntity } from './entities/room.entity';
export declare class RoomsService {
    create(createRoomDto: CreateRoomDto): Promise<{
        beds: {
            id: number;
            bed_type: string;
            amount: number;
            room_id: number;
        }[];
        place: {
            id: number;
            createdAt: Date;
            title: string;
            price: number | null;
            description: string;
            currency: string | null;
            place_type: string | null;
            street: string;
            city: string;
            province: string;
            postal_code: string;
            country: string;
            rating: number | null;
            subtitle: string | null;
            listing_status: import(".prisma/client").$Enums.ListingStats;
            booking_policy: import(".prisma/client").$Enums.BookingPolicy;
            latitude: number;
            longitude: number;
            businessNature: import(".prisma/client").$Enums.EnumBusinessNature;
            individualNbr: string | null;
            individualTaxIdNbr: string | null;
            businessRegistrationNbr: string | null;
            businessTaxIdNbr: string | null;
            updatedAt: Date | null;
            user_id: number;
            cover_image_id: number | null;
        };
    } & {
        id: number;
        createdAt: Date;
        title: string;
        price: number;
        stock: number;
        room_type: string;
        isDiscountAvailable: boolean;
        discount: number | null;
        transferService: import(".prisma/client").$Enums.EnumTransferService;
        extraAmount: number | null;
        place_id: number;
    }>;
    findAllByPlaceId(placeId: number): Promise<({
        beds: {
            id: number;
            bed_type: string;
            amount: number;
            room_id: number;
        }[];
    } & {
        id: number;
        createdAt: Date;
        title: string;
        price: number;
        stock: number;
        room_type: string;
        isDiscountAvailable: boolean;
        discount: number | null;
        transferService: import(".prisma/client").$Enums.EnumTransferService;
        extraAmount: number | null;
        place_id: number;
    })[]>;
    findOneByPlaceId(placeId: number, roomId: number): Promise<RoomEntity>;
    update(id: number, updateRoomDto: UpdateRoomDto): Promise<RoomEntity>;
    remove(id: number): Promise<any>;
}
