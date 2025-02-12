import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewsService } from './reviews.service';
import { EnumUserRole } from '@prisma/client';
import { RoleAuthGuard } from '../../common/middlewears/role-auth.guard';
import { AuthGuard } from '../../common/middlewears/auth.guard';
import { RequestWithUser } from '../../common/requests/request-with-user';

@ApiTags('Reviews')
@Controller('places')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post(':placeId/reviews')
  @SetMetadata('roles', [EnumUserRole.BUYER])
  @UseGuards(AuthGuard, RoleAuthGuard)
  create(
    @Param('placeId', ParseIntPipe) placeId: number,
    @Body() createReviewDto: CreateReviewDto,
    @Req() req: RequestWithUser,
  ) {
    const userId = req.user.id;
    return this.reviewsService.create(userId, createReviewDto, placeId);
  }

  @Get(':placeId/reviews')
  findAllByPlace(@Param('placeId', ParseIntPipe) placeId: number) {
    return this.reviewsService.findAll({ place_id: placeId });
  }

  @Get('reviews/:reviewId')
  findOne(@Param('reviewId', ParseIntPipe) reviewId: number) {
    return this.reviewsService.findOne(reviewId);
  }

  // @Patch('reviews/:reviewId')
  // update(
  //   @Param('reviewId', ParseIntPipe) reviewId: number,
  //   @Body() updateReviewDto: UpdateReviewDto
  // ) {
  //   return this.reviewsService.update(reviewId, updateReviewDto);
  // }

  @Delete(':placeId/reviews/:reviewId')
  remove(
    @Param('reviewId', ParseIntPipe) reviewId: number,
    @Param('placeId', ParseIntPipe) placeId: number,
  ) {
    return this.reviewsService.removeFromListing(reviewId, { placeId });
  }
}
