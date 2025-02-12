import { Place } from '@prisma/client';
import { UserEntity } from '../../../users/entities/user.entity';
export declare class PlaceBookedEvent {
    startDate: Date;
    endDate: Date;
    buyer: UserEntity;
    seller: UserEntity;
    total: number;
    place: Place;
    constructor(event: PlaceBookedEvent);
}
