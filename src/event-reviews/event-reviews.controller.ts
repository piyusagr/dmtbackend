import {
  Controller, Post, Body, UseGuards, Req, SetMetadata, Get, Param, HttpStatus, Res, Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../common/middlewears/auth.guard';
import { EnumUserRole } from '@prisma/client';
import { RoleAuthGuard } from '../../common/middlewears/role-auth.guard';
import { OnlineEventReviewCreateDto } from './dtos/online-event-review-create.dto';
import { EventReviewsService } from './event-reviews.service';
import { RequestWithUser } from '../../common/requests/request-with-user';
import { OnsiteEventReviewCreateDto } from './dtos/onsite-event-review-create.dto';
import { ErrorResponse } from '../../common/responses/error-response';
import { SuccessResponse } from '../../common/responses/success-response';

@ApiTags('Event reviews')
@Controller('event-reviews')
export class EventReviewsController {
  constructor(
    private readonly eventReviewsService: EventReviewsService,
  ) {
  }

  @Post('/online')
  @SetMetadata('roles', [EnumUserRole.BUYER])
  @UseGuards(AuthGuard, RoleAuthGuard)
  async createOnlineEventReview(@Req() req: RequestWithUser, @Body() data: OnlineEventReviewCreateDto, @Res() res: Response) {
    try {
      const userId = req.user.id;
      const result = await this.eventReviewsService.createOnlineEventReview(data, userId);
      SuccessResponse.sendSuccessResponse(res, HttpStatus.CREATED, result, 'Review created successfully.');
    } catch (err) {
      ErrorResponse.sendErrorResponse(res, err);
    }
  }

  @Post('/onsite')
  @SetMetadata('roles', [EnumUserRole.BUYER])
  @UseGuards(AuthGuard, RoleAuthGuard)
  async createOnsiteEventReview(@Req() req: RequestWithUser, @Body() data: OnsiteEventReviewCreateDto, @Res() res: Response) {
    try {
      const userId = req.user.id;
      const result = await this.eventReviewsService.createOnsiteEventReview(data, userId);
      SuccessResponse.sendSuccessResponse(res, HttpStatus.CREATED, result, 'Review created successfully.');
    } catch (err) {
      ErrorResponse.sendErrorResponse(res, err);
    }
  }

  @Get('/:eventListingId')
  @SetMetadata('roles', [EnumUserRole.BUYER, EnumUserRole.SELLER, EnumUserRole.ADMIN])
  @UseGuards(AuthGuard, RoleAuthGuard)
  async getEventReviewsByEventListingId(@Param('eventListingId') eventListingId: string, @Res() res: Response) {
    try {
      const result = await this.eventReviewsService.getEventReviewsByEventListingId(eventListingId);
      SuccessResponse.sendSuccessResponse(res, HttpStatus.OK, result, 'Reviews fetched successfully.');
    } catch (err) {
      ErrorResponse.sendErrorResponse(res, err);
    }
  }

  @Delete('/:eventListingId/:reviewId')
  @SetMetadata('roles', [EnumUserRole.ADMIN])
  @UseGuards(AuthGuard, RoleAuthGuard)
  async deleteReviewByReviewId(
    @Param('eventListingId') eventListingId: string,
    @Param('reviewId') reviewId: string,
    @Res() res: Response,
  ) {
    try {
      const result = await this.eventReviewsService.deleteReviewByReviewId(eventListingId, reviewId);
      SuccessResponse.sendSuccessResponse(res, HttpStatus.OK, result, 'Reviews deleted successfully.');
    } catch (err) {
      ErrorResponse.sendErrorResponse(res, err);
    }
  }
}
