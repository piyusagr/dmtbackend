import { BusService } from './bus.service';
import { CreateBusDto } from './dto/create-bus.dto';
import { UpdateBusDto } from './dto/update-bus.dto';
export declare class BusController {
    private readonly busService;
    constructor(busService: BusService);
    create(createBusDto: CreateBusDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateBusDto: UpdateBusDto): string;
    remove(id: string): string;
}
