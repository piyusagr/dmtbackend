import { OnlineEventReviewCreateDto } from './dtos/online-event-review-create.dto';
import { EventReviewsService } from './event-reviews.service';
import { RequestWithUser } from '../../common/requests/request-with-user';
import { OnsiteEventReviewCreateDto } from './dtos/onsite-event-review-create.dto';
export declare class EventReviewsController {
    private readonly eventReviewsService;
    constructor(eventReviewsService: EventReviewsService);
    createOnlineEventReview(req: RequestWithUser, data: OnlineEventReviewCreateDto, res: Response): Promise<void>;
    createOnsiteEventReview(req: RequestWithUser, data: OnsiteEventReviewCreateDto, res: Response): Promise<void>;
    getEventReviewsByEventListingId(eventListingId: string, res: Response): Promise<void>;
    deleteReviewByReviewId(eventListingId: string, reviewId: string, res: Response): Promise<void>;
}
