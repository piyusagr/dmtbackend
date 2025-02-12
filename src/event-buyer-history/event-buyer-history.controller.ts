import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { EventBuyerHistoryService } from './event-buyer-history.service';
import { CreateEventBuyerHistoryDto } from './dto/create-event-buyer-history.dto';
import { UpdateEventBuyerHistoryDto } from './dto/update-event-buyer-history.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RequestWithUser } from 'common/requests/request-with-user';
import { AuthGuard } from 'common/middlewears/auth.guard';
import { PayoutDto } from 'src/payment/dto/payout.dto';
import { PaymentService } from 'src/payment/service/payment.service';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('Event Buyer History')
@Controller('event-buyer-history')
export class EventBuyerHistoryController {
  constructor(
    private readonly eventBuyerHistoryService: EventBuyerHistoryService,
    private readonly paymentService: PaymentService
  ) { }

  @Post()
  create(
    @Req() req: RequestWithUser,
    @Body() createEventBuyerHistoryDto: CreateEventBuyerHistoryDto
  ) {
    const userId = req.user.id;
    return this.eventBuyerHistoryService.create(userId, createEventBuyerHistoryDto);
  }

  @Get()
  findAll() {
    return this.eventBuyerHistoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventBuyerHistoryService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEventBuyerHistoryDto: UpdateEventBuyerHistoryDto
  ) {
    const eventHistory = await this.eventBuyerHistoryService
      .update(id, updateEventBuyerHistoryDto);

    const { isApproved, paymentId } = eventHistory;

    if (isApproved === false) {
      const paymentHistory = await this.paymentService
        .findOneById(paymentId);

      const { totalAmount, payerId } = paymentHistory;

      const payoutDto = new PayoutDto();
      payoutDto.amount = totalAmount;
      payoutDto.message = "Refund money for canceled event booking";
      payoutDto.note = "Refund money for canceled event booking";
      payoutDto.subject = "Refunding Money";
      payoutDto.toPaypalReceiverId = payerId;

      await this.paymentService.payout(payoutDto);

      await this.eventBuyerHistoryService.update(id, { isRefunded: true });
    }

    return eventHistory;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventBuyerHistoryService.remove(id);
  }
}
