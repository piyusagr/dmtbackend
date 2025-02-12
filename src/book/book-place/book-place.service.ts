import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { BookingStatus, Place, Room } from '@prisma/client';
import { EVENTS } from '../../../common/constants/events';
import { ApiError } from '../../../common/errors/api.error';
import { DatabseError } from '../../../common/errors/database.error';
import { stripe } from '../../../common/services/stripe/stripe.service';
import prisma from '../../../config/db';
import { dollarsToCents } from '../../../helpers/number.helper';
import { PlacesService } from '../../places/places.service';
import { UserEntity } from '../../users/entities/user.entity';
import { BookingCancellationService } from '../helpers/booking-cancel.helper';
import {
  BookingManager,
  PlaceBookingCalculator,
} from '../helpers/booking-helper';
import { CreatePlaceBookingDto } from './dto/create-book-place.dto';
import { PlaceBookedEvent } from './events/place-booked.event';

interface BookPlaceData {
  buyer: UserEntity;
}

@Injectable()
export class BookPlaceService {
  constructor(
    private readonly placeService: PlacesService,
    private eventEmitter: EventEmitter2,
  ) {}

  async bookPlace(
    placeId: number,
    bookPlaceDto: CreatePlaceBookingDto,
    params: BookPlaceData,
  ) {
    const { end_date, start_date, room_ids } = bookPlaceDto;

    const place = (await this.placeService.findOne(placeId, {
      rooms: true,
      user: true,
    })) as Place & { rooms: Room[]; user: UserEntity };

    if (!place) throw new ApiError(`Place with id ${placeId} does not exsist.`);

    const manager = new BookingManager(
      new PlaceBookingCalculator({
        startDate: start_date,
        endDate: end_date,
        selectedRoomIds: room_ids,
        rooms: place.rooms,
      }),
    );

    if (manager.bookingCalculator.hasInvalidPackage())
      throw new ApiError(
        `Booking contains rooms that are invalid or no longer exsist`,
      );

    const booking = await prisma.booking.create({
      data: {
        start_date: bookPlaceDto.start_date,
        end_date: bookPlaceDto.end_date,
        total: manager.getBookingTotal(),
        place_id: placeId,
        buyer_id: params.buyer.id,
        seller_id: place.user_id,
      },
    });

    const placeBookedEvent = new PlaceBookedEvent({
      buyer: new UserEntity(params.buyer),
      seller: new UserEntity(place.user),
      total: manager.getBookingTotal(),
      startDate: manager.bookingCalculator.startDate,
      endDate: manager.bookingCalculator.endDate,
      place: place,
    });

    this.eventEmitter.emit(EVENTS.booking.placeBooking, placeBookedEvent);

    await this.eventEmitter.emitAsync(
      EVENTS.booking.placeBookingPayment,
      placeBookedEvent,
    );

    return booking;
  }

  async confirmBooking(bookingId: number) {
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: {
        buyer: true,
        seller: true,
        place: true,
      },
    });

    if (!booking)
      throw new ApiError(`Booking with id ${bookingId} does not exsist`);

    if (booking.status === 'COMPLETED' || booking.status == 'ACCEPTED')
      throw new ApiError(
        'You can only confirm bookings that are in the pending status',
      );

    if (!booking?.place)
      throw new ApiError('Booking is not attached to a valid place.');

    await this.updateBookingStatus(bookingId, 'ACCEPTED');

    const bookingEvent = new PlaceBookedEvent({
      buyer: booking.buyer,
      seller: booking.seller,
      startDate: booking.start_date,
      endDate: booking.end_date,
      place: booking.place,
      total: booking.total,
    });

    this.eventEmitter.emit(EVENTS.booking.placeBookingConfirmed, bookingEvent);

    return booking;
  }

  async cancelBooking(bookingId: number) {
    try {
      const booking = await prisma.booking.findUniqueOrThrow({
        where: { id: bookingId },
      });

      if (booking.status !== 'ACCEPTED')
        throw new ApiError('You can only cancel bookings that are accepted.');

      if (new Date().getTime() > booking.start_date.getTime())
        throw new ApiError(
          'You cannot cancel a booking that has already started',
        );

      const cancelationManager = new BookingCancellationService(booking);

      if (!cancelationManager.isCancelable())
        throw new ApiError(
          'This booking cannot be cancelled due to cancellation policy',
        );

      return cancelationManager.refundAmount();

      // const updateBooking = await prisma.booking.update({
      //   where: { id: bookingId },
      //   data: {},
      // });
    } catch (error) {
      if (error instanceof ApiError) throw error;

      throw new DatabseError(error);
    }
  }

  async updateBookingStatus(bookingId: number, status: BookingStatus) {
    const booking = await prisma.booking.update({
      where: { id: bookingId },
      data: {
        status,
      },
    });

    return booking;
  }

  async getBookingsForBuyer(buyerId: number) {
    try {
      return prisma.booking.findMany({
        where: { buyer_id: buyerId },
        include: { place: true },
      });
    } catch (e) {
      console.log(e);
      return Promise.reject(e);
    }
  }

  async testPayment() {
    const transfer = await stripe.transfers.create({
      amount: dollarsToCents(10),
      currency: 'usd',
      destination: 'acct_1LOqMv2EJYxBIpbv',
      description: 'Seller accepted booking',
    });

    return transfer;

    /* Create Express Account */
    // const account = await stripe.accounts.create({type: "express"});

    /* Crete account link */
    // const accountLink = await stripe.accountLinks.create({
    //   account: 'acct_1LOqMv2EJYxBIpbv',
    //   refresh_url: "https://example.com/reauth",
    //   return_url: 'https://google.com/return',
    //   type: 'account_onboarding'
    // })
    // return accountLink;

    /* TEST PAYMENT */
    // const payment = await stripe.paymentIntents.create({
    //   amount: dollarsToCents(10),
    //   currency: 'usd',
    //   description: 'Booking payment charge',
    //   metadata: { userId: 1 },
    //   receipt_email: 'adam@webrevived.com',
    //   payment_method: 'pm_card_visa',
    //   off_session: true,
    //   confirm: true,
    // });

    // return payment;
  }
}
