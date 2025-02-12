import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  SetMetadata,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SentryInterceptor } from '../../../common/interceptors/sentry.interceptor';
import { BookPlaceService } from './book-place.service';
import { CreatePlaceBookingDto } from './dto/create-book-place.dto';
import { RequestWithUser } from '../../../common/requests/request-with-user';
import { EnumUserRole } from '@prisma/client';
import { AuthGuard } from '../../../common/middlewears/auth.guard';
import { RoleAuthGuard } from '../../../common/middlewears/role-auth.guard';

@ApiTags('Book')
@Controller('book')
@UseInterceptors(SentryInterceptor)
export class BookPlaceController {
  constructor(private readonly bookPlaceService: BookPlaceService) {}

  @Post(':placeId')
  @SetMetadata('roles', [EnumUserRole.BUYER])
  @UseGuards(AuthGuard, RoleAuthGuard)
  async bookPlace(
    @Param('placeId', ParseIntPipe) placeId: number,
    @Body() placeBookingDto: CreatePlaceBookingDto,
    @Req() req: RequestWithUser,
  ) {
    return this.bookPlaceService.bookPlace(placeId, placeBookingDto, {
      buyer: req.user,
    });
  }

  @Get('/')
  @SetMetadata('roles', [EnumUserRole.BUYER])
  @UseGuards(AuthGuard, RoleAuthGuard)
  async getBookingsForBuyer(@Req() req: RequestWithUser) {
    const buyerId = req.user.id;
    return this.bookPlaceService.getBookingsForBuyer(buyerId);
  }

  @Post('/confirm/:bookingId')
  async confirmBooking(@Param('bookingId', ParseIntPipe) bookingId: number) {
    return this.bookPlaceService.confirmBooking(bookingId);
  }

  @Post('/cancel/:bookingId')
  async cancelBooking(@Param('bookingId', ParseIntPipe) bookingId: number) {
    return this.bookPlaceService.cancelBooking(bookingId);
  }

  @Get('payment')
  async paymentTest() {
    return this.bookPlaceService.testPayment();
  }
}

// Commeted out while deciding route strecute for booking.
// @ApiTags('Book')
// @Controller('booking')
// export class BookController {
//   constructor(private readonly bookPlaceService: BookPlaceService) {}

// }
