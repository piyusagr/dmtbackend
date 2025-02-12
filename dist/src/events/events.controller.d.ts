import { EventsService } from './events.service';
import { CreateEventDTO } from './dto/create-event.dto';
import { CreateEventRequestDTO } from './dto/create-event-request.dto';
import { UpdateEventRequestStatusDto } from './dto/update-event-request-status.dto';
import { RequestWithUser } from '../../common/requests/request-with-user';
export declare class EventsController {
    private readonly eventService;
    constructor(eventService: EventsService);
    createEvent(req: RequestWithUser, data: CreateEventDTO, res: Response, files: Array<Express.Multer.File>): Promise<void>;
    getEvents(res: Response): Promise<void>;
    getHostedEventsBySellerId(req: RequestWithUser, res: Response): Promise<void>;
    getReservationsForBuyer(req: RequestWithUser, res: Response): Promise<void>;
    getEventRequestsByEventId(req: RequestWithUser, eventListingId: string, res: Response): Promise<void>;
    getEvent(eventListingId: string, res: Response): Promise<void>;
    deleteEvent(req: RequestWithUser, eventListingId: string, res: Response): Promise<void>;
    createEventRequest(req: RequestWithUser, data: CreateEventRequestDTO, res: Response): Promise<void>;
    updateEventRequestStatus(req: RequestWithUser, data: UpdateEventRequestStatusDto, res: Response): Promise<void>;
}
