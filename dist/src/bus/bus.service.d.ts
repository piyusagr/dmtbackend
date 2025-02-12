import { CreateBusDto } from './dto/create-bus.dto';
import { UpdateBusDto } from './dto/update-bus.dto';
export declare class BusService {
    create(createBusDto: CreateBusDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateBusDto: UpdateBusDto): string;
    remove(id: number): string;
}
