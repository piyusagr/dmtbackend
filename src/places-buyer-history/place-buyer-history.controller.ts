import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { PlaceBuyerHistoryService } from './place-buyer-history.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RequestWithUser } from 'common/requests/request-with-user';
import { AuthGuard } from 'common/middlewears/auth.guard';
import { CreatePlaceBuyerHistoryDto } from './dto/create-place-buyer-history.dto';
import { UpdatePlaceBuyerHistoryDto } from './dto/update-place-buyer-history.dto';
import { PaymentService } from 'src/payment/service/payment.service';
import { PayoutDto } from 'src/payment/dto/payout.dto';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('Place Buyer History')
@Controller('place-buyer-history')
export class PlaceBuyerHistoryController {
  constructor(
    private readonly placeBuyerHistoryService: PlaceBuyerHistoryService,
    private readonly paymentService: PaymentService
  ) { }

  @Post()
  create(
    @Req() req: RequestWithUser,
    @Body() createPlaceBuyerHistoryDto: CreatePlaceBuyerHistoryDto
  ) {
    const userId = req.user.id;
    return this.placeBuyerHistoryService.create(userId, createPlaceBuyerHistoryDto);
  }

  @Get()
  findAll() {
    return this.placeBuyerHistoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.placeBuyerHistoryService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePlaceBuyerHistoryDto: UpdatePlaceBuyerHistoryDto) {
    const buyerHistory = await this.placeBuyerHistoryService
      .update(id, updatePlaceBuyerHistoryDto);

    const { isApproved, paymentId } = buyerHistory;

    if (isApproved === false) {
      const paymentHistory = await this.paymentService
        .findOneById(paymentId);

      const { totalAmount, payerId } = paymentHistory;

      const payoutDto = new PayoutDto();
      payoutDto.amount = totalAmount;
      payoutDto.message = "Refund money for canceled place booking";
      payoutDto.note = "Refund money for canceled place booking";
      payoutDto.subject = "Refunding Money";
      payoutDto.toPaypalReceiverId = payerId;

      await this.paymentService.payout(payoutDto);

      await this.placeBuyerHistoryService.update(id, { isRefunded: true });
    }

    return buyerHistory;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.placeBuyerHistoryService.remove(id);
  }
}
