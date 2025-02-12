import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewsService } from './reviews.service';
import { RequestWithUser } from '../../common/requests/request-with-user';
export declare class ReviewsController {
    private readonly reviewsService;
    constructor(reviewsService: ReviewsService);
    create(placeId: number, createReviewDto: CreateReviewDto, req: RequestWithUser): Promise<{
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
    findAllByPlace(placeId: number): Promise<{
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
    remove(reviewId: number, placeId: number): Promise<{
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
