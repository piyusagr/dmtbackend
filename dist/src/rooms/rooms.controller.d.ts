import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { RoomsService } from './rooms.service';
export declare class RoomsController {
    private readonly roomsService;
    constructor(roomsService: RoomsService);
    create(createRoomDto: CreateRoomDto, res: Response): Promise<void>;
    findAll(placeId: number, res: Response): Promise<void>;
    findOne(placeId: number, roomId: number, res: Response): Promise<void>;
    update(updateRoomDto: UpdateRoomDto, roomId: number, res: Response): Promise<void>;
    remove(roomId: string, res: Response): Promise<void>;
}
