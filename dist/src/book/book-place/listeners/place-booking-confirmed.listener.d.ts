import { EmailService } from '../../../../common/services/email/email.service';
import { PlaceBookedEvent } from '../events/place-booked.event';
export declare class PlaceBookingConfirmedListener {
    private readonly emailSerivce;
    private logger;
    constructor(emailSerivce: EmailService);
    handleBuyerConfirmationEmail(booking: PlaceBookedEvent): Promise<void>;
    handleSellerConfirmationEmail(booking: PlaceBookedEvent): Promise<void>;
}
