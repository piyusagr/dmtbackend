import { EmailService } from '../../../../common/services/email/email.service';
import { PlaceBookedEvent } from '../events/place-booked.event';
export declare class PlaceBookedListener {
    private readonly emailService;
    private logger;
    constructor(emailService: EmailService);
    handleBuyerConfirmationEmail(event: PlaceBookedEvent): Promise<void>;
    handleSellerConfirmationEmail(event: PlaceBookedEvent): Promise<void>;
}
