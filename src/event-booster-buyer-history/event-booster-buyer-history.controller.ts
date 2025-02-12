import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { EventBoosterBuyerHistoryService } from './event-booster-buyer-history.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RequestWithUser } from 'common/requests/request-with-user';
import { AuthGuard } from 'common/middlewears/auth.guard';
import { CreateEventBoosterBuyerHistoryDto } from './dto/create-event-booster-buyer-history.dto';
import { UpdateEventBoosterBuyerHistoryDto } from './dto/update-event-booster-buyer-history.dto';
import { PayoutDto } from 'src/payment/dto/payout.dto';
import { PaymentService } from 'src/payment/service/payment.service';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('Event Booster Buyer History')
@Controller('event-booster-buyer-history')
export class EventBoosterBuyerHistoryController {
  constructor(
    private readonly eventBoosterBuyerHistoryService: EventBoosterBuyerHistoryService,
    private readonly paymentService: PaymentService,
  ) { }

  @Post()
  create(
    @Req() req: RequestWithUser,
    @Body() createEventBoosterBuyerHistoryDto: CreateEventBoosterBuyerHistoryDto
  ) {
    const userId = req.user.id;
    return this.eventBoosterBuyerHistoryService.create(userId, createEventBoosterBuyerHistoryDto);
  }

  @Get()
  findAll() {
    return this.eventBoosterBuyerHistoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventBoosterBuyerHistoryService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateEventBoosterBuyerHistoryDto: UpdateEventBoosterBuyerHistoryDto) {
    const buyerHistoru = await this.eventBoosterBuyerHistoryService
      .update(id, updateEventBoosterBuyerHistoryDto);

    const { isApproved, paymentId } = buyerHistoru;

    if (isApproved === false) {
      const paymentHistory = await this.paymentService
        .findOneById(paymentId);

      const { totalAmount, payerId } = paymentHistory;

      const payoutDto = new PayoutDto();
      payoutDto.amount = totalAmount;
      payoutDto.message = "Refund money for canceled event boosted";
      payoutDto.note = "Refund money for canceled event boosted";
      payoutDto.subject = "Refunding Money";
      payoutDto.toPaypalReceiverId = payerId;

      await this.paymentService.payout(payoutDto);

      await this.eventBoosterBuyerHistoryService.update(id, { isRefunded: true });
    }

    return buyerHistoru;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventBoosterBuyerHistoryService.remove(id);
  }
}
