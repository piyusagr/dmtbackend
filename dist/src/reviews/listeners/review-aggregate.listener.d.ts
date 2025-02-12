import { PlacesService } from '../../places/places.service';
import { ReviewAggregateEvent } from '../event/review-aggregate.event';
export declare class ReviewAggregateListner {
    private readonly placeService;
    constructor(placeService: PlacesService);
    handleAggregatePlaceReviews(event: ReviewAggregateEvent): Promise<void>;
}
