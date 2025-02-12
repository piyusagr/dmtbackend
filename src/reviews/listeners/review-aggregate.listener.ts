import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EVENTS } from '../../../common/constants/events';
import prisma from '../../../config/db';
import { PlacesService } from '../../places/places.service';
import { ReviewAggregateEvent } from '../event/review-aggregate.event';

@Injectable()
export class ReviewAggregateListner {
  constructor(private readonly placeService: PlacesService) {}

  @OnEvent(EVENTS.review.placeReviewAggregate)
  async handleAggregatePlaceReviews(event: ReviewAggregateEvent) {
    const reviews = await prisma.review.findMany({
      where: { place_id: event.placeId },
      select: {
        cleanliness: true,
        facilities: true,
        location: true,
        roomComfort: true,
        serviceQuality: true,
        valueForMoney: true,
      },
    });

    const aggregateReviews = () => {
      const ratings = [
        'cleanliness',
        'facilities',
        'location',
        'roomComfort',
        'serviceQuality',
        'valueForMoney',
      ];

      return (
        ratings.reduce((acc, rating) => {
          return (
            acc +
            reviews.reduce((total, review) => total + review[rating], 0) /
              reviews.length
          );
        }, 0) / ratings.length
      ).toFixed(1);
    };

    // (reviews.reduce((acc, review) => (acc += review.rating), 0) / reviews.length).toFixed(1);

    const rating = +aggregateReviews();

    console.log(`handleAggregatePlaceReviews : ${rating}`);

    await this.placeService.update(event.placeId, {
      rating,
    });
  }
}
