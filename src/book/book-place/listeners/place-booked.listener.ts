import { SendEmailCommandOutput } from '@aws-sdk/client-ses';
import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EVENTS } from '../../../../common/constants/events';
import { EmailService } from '../../../../common/services/email/email.service';
import { PlaceBookedEvent } from '../events/place-booked.event';

const parseDate = (date: Date) =>
  date.toLocaleDateString('en-us', { dateStyle: 'short' });

@Injectable()
export class PlaceBookedListener {
  private logger = new Logger(PlaceBookedListener.name);

  constructor(private readonly emailService: EmailService) {}

  @OnEvent(EVENTS.booking.placeBooking)
  async handleBuyerConfirmationEmail(event: PlaceBookedEvent) {
    const textEmailBody = `Your booking has been sent to the seller. Seller has 5 days to confirm the booking. No money will be taken out until the seller confirms.`;

    const email = await this.emailService.sendEmail<SendEmailCommandOutput>(
      event.buyer.email,
      `You have sucessfully booked your stay ${event.place.title}`,
      { text: textEmailBody }
    );

    this.logger.debug(email);
  }

  @OnEvent(EVENTS.booking.placeBooking)
  async handleSellerConfirmationEmail(event: PlaceBookedEvent) {
    const textEmailBody = `${
      event.buyer.firstName
    } has booked a trip with you for dates ${parseDate(
      event.startDate
    )} - ${parseDate(event.endDate)}`;

    const email = await this.emailService.sendEmail<SendEmailCommandOutput>(
      event.seller.email,
      `${event.buyer.firstName} has booked a trip with you!`,
      { text: textEmailBody }
    );

    this.logger.debug(email);
  }
}
