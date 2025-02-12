import { EventEmitter2 } from '@nestjs/event-emitter';
import { Prisma } from '@prisma/client';
import { PlacesService } from '../places/places.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
export declare class ReviewsService {
    private readonly placeService;
    private readonly eventEmitter;
    constructor(placeService: PlacesService, eventEmitter: EventEmitter2);
    create(userId: number, createReviewDto: CreateReviewDto, placeId: number): Promise<{
        place: {
            rating: number;
        };
    } & {
        id: number;
        createdAt: Date;
        place_id: number | null;
        user_id: number;
        cleanliness: number;
        facilities: number;
        location: number;
        roomComfort: number;
        serviceQuality: number;
        valueForMoney: number;
        expierence_id: number | null;
    }>;
    findAll(filters?: Prisma.ReviewWhereInput): Promise<{
        id: number;
        createdAt: Date;
        place_id: number | null;
        user_id: number;
        cleanliness: number;
        facilities: number;
        location: number;
        roomComfort: number;
        serviceQuality: number;
        valueForMoney: number;
        expierence_id: number | null;
    }[]>;
    findOne(reviewId: number): Promise<{
        id: number;
        createdAt: Date;
        place_id: number | null;
        user_id: number;
        cleanliness: number;
        facilities: number;
        location: number;
        roomComfort: number;
        serviceQuality: number;
        valueForMoney: number;
        expierence_id: number | null;
    }>;
    update(reviewId: number, updateReviewDto: UpdateReviewDto): Promise<{
        id: number;
        createdAt: Date;
        place_id: number | null;
        user_id: number;
        cleanliness: number;
        facilities: number;
        location: number;
        roomComfort: number;
        serviceQuality: number;
        valueForMoney: number;
        expierence_id: number | null;
    }>;
    removeFromListing(reviewId: number, listingId: {
        placeId?: number;
        expierenceId?: number;
    }): Promise<{
        id: number;
        createdAt: Date;
        place_id: number | null;
        user_id: number;
        cleanliness: number;
        facilities: number;
        location: number;
        roomComfort: number;
        serviceQuality: number;
        valueForMoney: number;
        expierence_id: number | null;
    }>;
}
