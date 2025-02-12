import {
  BadGatewayException,
  Injectable,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Prisma } from '@prisma/client';
import { EVENTS } from '../../common/constants/events';
import { DatabseError } from '../../common/errors/database.error';
import prisma from '../../config/db';
import { PlacesService } from '../places/places.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ReviewAggregateEvent } from './event/review-aggregate.event';

@Injectable()
export class ReviewsService {
  constructor(
    private readonly placeService: PlacesService,
    private readonly eventEmitter: EventEmitter2,
  ) {
  }

  async create(userId: number, createReviewDto: CreateReviewDto, placeId: number) {
    try {
      const review = await prisma.review.create({
        data: { user_id: userId, place_id: placeId, ...createReviewDto },
        include: {
          place: {
            select: {
              rating: true,
            },
          },
        },
      });

      if (placeId)
        this.eventEmitter.emit(
          EVENTS.review.placeReviewAggregate,
          new ReviewAggregateEvent({ placeId }),
        );

      return review;
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  async findAll(filters?: Prisma.ReviewWhereInput) {
    try {
      const reviews = await prisma.review.findMany({
        where: filters,
      });

      return reviews;
    } catch (error) {
      throw new DatabseError(error);
    }
  }

  async findOne(reviewId: number) {
    try {
      const reviews = await prisma.review.findUniqueOrThrow({
        where: { id: reviewId },
      });

      return reviews;
    } catch (error) {
      throw new DatabseError(error);
    }
  }

  async update(reviewId: number, updateReviewDto: UpdateReviewDto) {
    try {
      const review = await prisma.review.update({
        where: { id: reviewId },
        data: updateReviewDto,
      });

      return review;
    } catch (error) {
      throw new DatabseError(error);
    }
  }

  async removeFromListing(
    reviewId: number,
    listingId: { placeId?: number; expierenceId?: number },
  ) {
    try {
      const reviews = await prisma.review.delete({
        where: { id: reviewId },
      });

      if (listingId?.placeId)
        this.eventEmitter.emit(
          EVENTS.review.placeReviewAggregate,
          new ReviewAggregateEvent({ placeId: listingId.placeId }),
        );

      return reviews;
    } catch (error) {
      throw new DatabseError(error);
    }
  }
}
