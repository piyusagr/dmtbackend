import { Review } from '@prisma/client';
import { Exactly } from '../../../helpers/type.helpers';
export declare class CreateReviewDto implements Exactly<Review, CreateReviewDto> {
    cleanliness: number;
    facilities: number;
    location: number;
    roomComfort: number;
    serviceQuality: number;
    valueForMoney: number;
}
