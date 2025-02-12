import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EnumEventType, EnumExperinceEventRequestStatus } from '@prisma/client';
import prisma from '../../config/db';
import { OnlineEventReviewCreateDto } from './dtos/online-event-review-create.dto';
import { OnsiteEventReviewCreateDto } from './dtos/onsite-event-review-create.dto';

@Injectable()
export class EventReviewsService {
  async createOnlineEventReview(
    data: OnlineEventReviewCreateDto,
    buyerId: number,
  ): Promise<any> {
    try {
      const eventListing = await prisma.eventListing.findFirst({
        where: { id: data.eventListingId },
      });

      if (!eventListing) {
        return Promise.reject(new NotFoundException('Event listing not found'));
      }

      if (eventListing.eventType !== EnumEventType.ONLINE) {
        return Promise.reject(
          new BadRequestException(
            'Invalid event listing id. Required an online event listing id',
          ),
        );
      }

      const onlineEvent = await prisma.onlineEvent.findFirst({
        where: { id: data.eventId },
      });

      if (!onlineEvent) {
        return Promise.reject(new NotFoundException('Online event not found'));
      }

      const buyersOnlineEventRequest =
        await prisma.buyersOnlineEventRequest.findFirst({
          where: { id: data.eventRequestId },
        });

      if (!buyersOnlineEventRequest) {
        return Promise.reject(
          new NotFoundException('Online event request not found for buyer'),
        );
      }

      if (
        buyersOnlineEventRequest.status !==
        EnumExperinceEventRequestStatus.COMPLETED
      ) {
        return Promise.reject(
          new BadRequestException(
            'Cannot add review. Booking must be completed.',
          ),
        );
      }

      return await prisma.onlineEventReview.create({
        data: { ...data, buyerId },
      });
    } catch (e) {
      console.error(e);
      return Promise.reject(e);
    }
  }

  async createOnsiteEventReview(
    data: OnsiteEventReviewCreateDto,
    buyerId: number,
  ): Promise<any> {
    try {
      const eventListing = await prisma.eventListing.findFirst({
        where: { id: data.eventListingId },
      });

      if (!eventListing) {
        return Promise.reject(new NotFoundException('Event listing not found'));
      }

      if (eventListing.eventType !== EnumEventType.ONSITE) {
        return Promise.reject(
          new BadRequestException(
            'Invalid event listing id. Required an onsite event listing id',
          ),
        );
      }

      const onsiteEvent = await prisma.onsiteEvent.findFirst({
        where: { id: data.eventId },
      });

      if (!onsiteEvent) {
        return Promise.reject(new NotFoundException('Onsite event not found'));
      }

      const buyersOnsiteEventRequest =
        await prisma.buyersOnsiteEventRequest.findFirst({
          where: { id: data.eventRequestId },
        });

      if (!buyersOnsiteEventRequest) {
        return Promise.reject(
          new NotFoundException('Onsite event request not found for buyer'),
        );
      }

      if (
        buyersOnsiteEventRequest.status !==
        EnumExperinceEventRequestStatus.COMPLETED
      ) {
        return Promise.reject(
          new BadRequestException(
            'Cannot add review. Booking must be completed.',
          ),
        );
      }

      return await prisma.onsiteEventReview.create({
        data: { ...data, buyerId },
      });
    } catch (e) {
      console.error(e);
      return Promise.reject(e);
    }
  }

  async getEventReviewsByEventListingId(eventListingId: string) {
    try {
      const eventListing = await prisma.eventListing.findFirst({
        where: { id: eventListingId },
      });

      if (!eventListing) {
        return Promise.reject(new NotFoundException('Event listing not found'));
      }

      if (eventListing.eventType === EnumEventType.ONLINE) {
        return await prisma.onlineEventReview.findMany({
          where: { eventListingId },
        });
      } else {
        return await prisma.onsiteEventReview.findMany({
          where: { eventListingId },
        });
      }
    } catch (e) {
      console.error(e);
      return Promise.reject(e);
    }
  }

  async deleteReviewByReviewId(eventListingId: string, reviewId: string) {
    try {
      const eventListing = await prisma.eventListing.findFirst({
        where: { id: eventListingId },
      });

      if (!eventListing) {
        return Promise.reject(new NotFoundException('Event listing not found'));
      }

      if (eventListing.eventType === EnumEventType.ONLINE) {
        return await prisma.onlineEventReview.delete({
          where: { id: reviewId },
        });
      } else {
        return await prisma.onsiteEventReview.delete({
          where: { id: reviewId },
        });
      }
    } catch (e) {
      console.error(e);
      return Promise.reject(e);
    }
  }
}
