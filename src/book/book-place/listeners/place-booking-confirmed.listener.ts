import {
    Injectable,
    InternalServerErrorException,
    Logger
} from '@nestjs/common';
import {OnEvent} from '@nestjs/event-emitter';
import {EmailService} from '../../../../common/services/email/email.service';
import {EVENTS} from '../../../../common/constants/events';
import {PlaceBookedEvent} from '../events/place-booked.event';
import {parseEjsFile} from '../../../../common/services/email/email-render.helpers';
import {setContext} from '@sentry/node';

const shortenDate = (date: Date) => date.toLocaleDateString('en-us', {dateStyle: 'short'});

/* TODO: Change Email messages */
@Injectable()
export class PlaceBookingConfirmedListener {
    private logger = new Logger(PlaceBookingConfirmedListener.name);

    constructor(private readonly emailSerivce: EmailService) {
    }

    @OnEvent(EVENTS.booking.placeBookingConfirmed)
    async handleBuyerConfirmationEmail(booking: PlaceBookedEvent) {
        try {
            const htmlEmailBody = await parseEjsFile({
                template: 'email.ejs',
                data: {name: booking.buyer.firstName}
            });

            // prettier-ignore
            const textEmailBody = `Your booking for ${booking.place.title} has been confirmed for dates ${shortenDate(booking.startDate)} - ${shortenDate(booking.endDate)}. Total: ${booking.total}`;

            this.emailSerivce.sendEmail(booking.buyer.email, 'Your booking has been confirmed!', {
                text: textEmailBody,
                html: htmlEmailBody
            });
        } catch (error) {
            throw new InternalServerErrorException('Failed to send confirmation email');
        }
    }

    @OnEvent(EVENTS.booking.placeBookingConfirmed)
    async handleSellerConfirmationEmail(booking: PlaceBookedEvent) {
        // prettier-ignore
        const textEmailBody = `You have your new booking for  ${booking.place.title} on ${shortenDate(booking.startDate)} - ${shortenDate(booking.endDate)}. Total: ${booking.total}`;
        try {
            this.emailSerivce.sendEmail(
                'adam@webrevived.com',
                `You have confirmed the booking for`,
                // `You have confirmed the booking for ${booking.buyer.first_name}`,
                {text: textEmailBody}
            );
        } catch (error) {
            setContext('Data', {error});

            throw new InternalServerErrorException(error, 'Failed to send confirmation email');
        }
    }
}
