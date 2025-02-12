import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PaymentService } from './service/payment.service';
import { EventsService } from 'src/events/events.service';
import { errorMessage } from './constant/payment-error-message.constant';
import {
  EnumEventType,
  PaymentContext,
  PaymentSetting,
  Prisma,
} from '@prisma/client';
import { AuthGuard } from 'common/middlewears/auth.guard';
import { RequestWithUser } from 'common/requests/request-with-user';
import { CreateEventPaymentDto } from './dto/event/create-event-payment.dto';
import { SaveEventPaymentDto } from './dto/event/save-event-payment.dto';
import { PaymentMetadata } from './type/payment-metadata.type';
import { CreatePlacePaymentDto } from './dto/place/create-place-payment.dto';
import { PlacesService } from 'src/places/places.service';
import { PayoutDto } from './dto/payout.dto';
import { Payment } from './service/payment.class';
import { EventBuyerHistoryService } from 'src/event-buyer-history/event-buyer-history.service';
import { EventBoosterBuyerHistoryService } from 'src/event-booster-buyer-history/event-booster-buyer-history.service';
import { PlaceBuyerHistoryService } from 'src/places-buyer-history/place-buyer-history.service';
import { CreateEventBuyerHistoryDto } from 'src/event-buyer-history/dto/create-event-buyer-history.dto';
import { CreateEventBoosterBuyerHistoryDto } from 'src/event-booster-buyer-history/dto/create-event-booster-buyer-history.dto';
import { CreatePlaceBuyerHistoryDto } from 'src/places-buyer-history/dto/create-place-buyer-history.dto';

@ApiBearerAuth()
@ApiTags('Payment')
@Controller('payment')
@UseGuards(AuthGuard)
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly eventService: EventsService,
    private readonly eventBuyerHistoryService: EventBuyerHistoryService,
    private readonly eventBoosterBuyerHistoryService: EventBoosterBuyerHistoryService,
    private readonly placesService: PlacesService,
    private readonly placeBuyerHistoryService: PlaceBuyerHistoryService,
  ) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentService.findOneById(id);
  }

  @Post('service/payout')
  async payout(@Body() payoutDto: PayoutDto) {
    return await this.paymentService.payout(payoutDto);
  }

  @Post('/order/event')
  async createOrderForEventBuyer(
    @Req() req: RequestWithUser,
    @Body() createEventPaymentDto: CreateEventPaymentDto,
  ) {
    const { eventId } = createEventPaymentDto;

    const event = await this.eventService.getEvent(eventId);
    if (!event) {
      throw new NotFoundException(errorMessage.eventNotFound);
    }

    const paymentSetting = await this.paymentService.getPaymentSetting();

    const { eventType, price } = event;
    const { platformCurrency } = paymentSetting;

    let totalAmount: number;
    let paymentContext: PaymentContext;
    let haveNextPayment: boolean;
    let nextPaymentAmount: number;

    if (eventType == EnumEventType.ONLINE) {
      totalAmount = price;
      paymentContext = PaymentContext.CUSTOMER_BUY_EVENT_ONLINE;
      haveNextPayment = false;
      nextPaymentAmount = 0;
    } else if (eventType == EnumEventType.ONSITE) {
      const { platformCharge } = paymentSetting;
      totalAmount = (price * platformCharge) / 100;
      paymentContext = PaymentContext.CUSTOMER_BUY_EVENT_ONSITE;
      haveNextPayment = true;
      nextPaymentAmount = price - totalAmount;
    }

    const payment = new Payment({
      totalAmount,
      paymentCurrency: platformCurrency,
    });

    const createPaymentDto = payment.getCreatePaymentDto();
    const createdPayment =
      await this.paymentService.createPayment(createPaymentDto);

    const savePaymentDto: SaveEventPaymentDto = {
      userId: req.user.id,
      paymentContext,
      paymentMetadata: {
        totalAmount,
        haveNextPayment,
        nextPaymentAmount,
      },
      createdPayment,
    };

    const paymentRecord =
      await this.paymentService.savePaymentRecord(savePaymentDto);

    const createEventBuyerHistoryDto = new CreateEventBuyerHistoryDto();
    createEventBuyerHistoryDto.eventId = eventId;
    createEventBuyerHistoryDto.paymentId = paymentRecord.id;

    await this.eventBuyerHistoryService.create(
      req.user.id,
      createEventBuyerHistoryDto,
    );

    return paymentRecord;
  }

  @Post('order/boosting-event')
  async createOrderForSellerBoostingEvent(
    @Req() req: RequestWithUser,
    @Body() createEventPaymentDto: CreateEventPaymentDto,
  ) {
    const { eventId } = createEventPaymentDto;

    const event = await this.eventService.getEvent(eventId);
    if (!event) {
      throw new NotFoundException(errorMessage.eventNotFound);
    }

    const paymentSetting = await this.paymentService.getPaymentSetting();

    const { EventBoostedCategory, maxBoostedDay } = event;
    const { charge } = EventBoostedCategory;
    const { platformCurrency } = paymentSetting;

    const totalAmount = charge * maxBoostedDay;

    const payment = new Payment({
      totalAmount,
      paymentCurrency: platformCurrency,
    });

    const createPaymentDto = payment.getCreatePaymentDto();
    const createdPayment =
      await this.paymentService.createPayment(createPaymentDto);

    const savePaymentDto: SaveEventPaymentDto = {
      userId: req.user.id,
      paymentContext: PaymentContext.SELLER_BOOST_EVENT,
      paymentMetadata: {
        totalAmount,
        haveNextPayment: false,
        nextPaymentAmount: 0,
      },
      createdPayment,
    };

    const paymentRecord =
      await this.paymentService.savePaymentRecord(savePaymentDto);

    const createEventBoosterBuyerHistoryDto =
      new CreateEventBoosterBuyerHistoryDto();
    createEventBoosterBuyerHistoryDto.eventId = eventId;
    createEventBoosterBuyerHistoryDto.paymentId = paymentRecord.id;

    await this.eventBoosterBuyerHistoryService.create(
      req.user.id,
      createEventBoosterBuyerHistoryDto,
    );

    return paymentRecord;
  }

  @Post('order/place')
  async createOrderForCustomerBokingngPlace(
    @Req() req: RequestWithUser,
    @Body() createPlacePaymentDto: CreatePlacePaymentDto,
  ) {
    const { placeId, longOfStay } = createPlacePaymentDto;

    const place = await this.placesService.findOne(placeId);
    if (!place) {
      throw new NotFoundException(errorMessage.placeNotFoud);
    }

    const paymentSetting = await this.paymentService.getPaymentSetting();

    const { price } = place;
    const { platformCurrency, platformCharge } = paymentSetting;

    const totalAmount = (price * longOfStay * platformCharge) / 100;
    const nextPaymentAmount = price * longOfStay - totalAmount;

    const payment = new Payment({
      totalAmount,
      paymentCurrency: platformCurrency,
    });

    const createPaymentDto = payment.getCreatePaymentDto();
    const createdPayment =
      await this.paymentService.createPayment(createPaymentDto);

    const savePaymentDto: SaveEventPaymentDto = {
      userId: req.user.id,
      paymentContext: PaymentContext.CUSTOMER_BOOK_PLACE,
      paymentMetadata: {
        totalAmount,
        haveNextPayment: true,
        nextPaymentAmount,
      },
      createdPayment,
    };

    const paymentRecord =
      await this.paymentService.savePaymentRecord(savePaymentDto);

    const createPlaceBuyerHistoryDto = new CreatePlaceBuyerHistoryDto();
    createPlaceBuyerHistoryDto.longOfStay = longOfStay;
    createPlaceBuyerHistoryDto.paymentId = paymentRecord.id;
    createPlaceBuyerHistoryDto.placeId = placeId;

    await this.placeBuyerHistoryService.create(
      req.user.id,
      createPlaceBuyerHistoryDto,
    );

    return paymentRecord;
  }

  @Post('capture-order/:orderID')
  async approveOrder(@Param('orderID') orderID: string) {
    const capturedPayment = await this.paymentService.capturePayment(orderID);
    return await this.paymentService.updatePaymentRecord(
      orderID,
      capturedPayment,
    );
  }
}
