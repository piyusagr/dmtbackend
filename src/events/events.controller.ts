import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
  Res,
  SetMetadata,
  Put,
  HttpStatus,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { EventsService } from './events.service';
import { AuthGuard } from '../../common/middlewears/auth.guard';
import { EnumUserRole } from '@prisma/client';
import { RoleAuthGuard } from '../../common/middlewears/role-auth.guard';
import { CreateEventDTO } from './dto/create-event.dto';
import { CreateEventRequestDTO } from './dto/create-event-request.dto';
import { UpdateEventRequestStatusDto } from './dto/update-event-request-status.dto';
import { RequestWithUser } from '../../common/requests/request-with-user';
import { PhoneCountryValidationGuard } from '../../common/middlewears/phone-country-validation.guard';
import { ErrorResponse } from '../../common/responses/error-response';
import { SuccessResponse } from '../../common/responses/success-response';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FilesValidationPipe } from '../../common/pipes/files-validation.pipe';

@ApiTags('Events')
@ApiBearerAuth()
@Controller('events')
export class EventsController {
  constructor(private readonly eventService: EventsService) {}

  @Post()
  @SetMetadata('roles', [EnumUserRole.SELLER])
  @UseGuards(AuthGuard, RoleAuthGuard, PhoneCountryValidationGuard)
  @UseInterceptors(FilesInterceptor('files'))
  async createEvent(
    @Req() req: RequestWithUser,
    @Body() data: CreateEventDTO,
    @Res() res: Response,
    @UploadedFiles(new FilesValidationPipe()) files: Array<Express.Multer.File>,
  ) {
    try {
      const userId = req.user.id;
      const result = await this.eventService.createEvent(
        data,
        userId,
        req.user,
        files,
      );
      SuccessResponse.sendSuccessResponse(
        res,
        HttpStatus.CREATED,
        result,
        'Event created successfully.',
      );
    } catch (err) {
      ErrorResponse.sendErrorResponse(res, err);
    }
  }

  @Get('/')
  @SetMetadata('roles', [EnumUserRole.BUYER])
  @UseGuards(AuthGuard, RoleAuthGuard)
  async getEvents(@Res() res: Response) {
    try {
      const result = await this.eventService.getEvents();
      SuccessResponse.sendSuccessResponse(
        res,
        HttpStatus.OK,
        result,
        'Events fetched successfully.',
      );
    } catch (err) {
      ErrorResponse.sendErrorResponse(res, err);
    }
  }

  @Get('/hosted')
  @SetMetadata('roles', [EnumUserRole.SELLER])
  @UseGuards(AuthGuard, RoleAuthGuard)
  async getHostedEventsBySellerId(
    @Req() req: RequestWithUser,
    @Res() res: Response,
  ) {
    try {
      const userId = req.user.id;
      const result = await this.eventService.getHostedEventsBySellerId(+userId);
      SuccessResponse.sendSuccessResponse(
        res,
        HttpStatus.OK,
        result,
        'Hosted events by seller fetched successfully.',
      );
    } catch (err) {
      ErrorResponse.sendErrorResponse(res, err);
    }
  }

  @Get('/reservations')
  @SetMetadata('roles', [EnumUserRole.BUYER])
  @UseGuards(AuthGuard, RoleAuthGuard)
  async getReservationsForBuyer(
    @Req() req: RequestWithUser,
    @Res() res: Response,
  ) {
    try {
      const userId = req.user.id;
      const result = await this.eventService.getReservationsForBuyer(+userId);
      SuccessResponse.sendSuccessResponse(
        res,
        HttpStatus.OK,
        result,
        'Reservations for buyer fetched successfully.',
      );
    } catch (err) {
      ErrorResponse.sendErrorResponse(res, err);
    }
  }

  @Get('/request/:eventListingId')
  @SetMetadata('roles', [EnumUserRole.SELLER])
  @UseGuards(AuthGuard, RoleAuthGuard)
  async getEventRequestsByEventId(
    @Req() req: RequestWithUser,
    @Param('eventListingId') eventListingId: string,
    @Res() res: Response,
  ) {
    try {
      const userId = req.user.id;
      const result = await this.eventService.getEventRequestsByEventId(
        eventListingId,
        +userId,
      );
      SuccessResponse.sendSuccessResponse(
        res,
        HttpStatus.OK,
        result,
        'Event requests for event fetched successfully.',
      );
    } catch (err) {
      ErrorResponse.sendErrorResponse(res, err);
    }
  }

  @Get('/:eventListingId')
  @SetMetadata('roles', [EnumUserRole.BUYER, EnumUserRole.SELLER])
  @UseGuards(AuthGuard, RoleAuthGuard)
  async getEvent(
    @Param('eventListingId') eventListingId: string,
    @Res() res: Response,
  ) {
    try {
      const result = await this.eventService.getEvent(eventListingId);
      SuccessResponse.sendSuccessResponse(
        res,
        HttpStatus.OK,
        result,
        'Event data fetched successfully.',
      );
    } catch (err) {
      ErrorResponse.sendErrorResponse(res, err);
    }
  }

  @Delete('/:eventListingId')
  @SetMetadata('roles', [EnumUserRole.SELLER, EnumUserRole.ADMIN])
  @UseGuards(AuthGuard, RoleAuthGuard)
  async deleteEvent(
    @Req() req: RequestWithUser,
    @Param('eventListingId') eventListingId: string,
    @Res() res: Response,
  ) {
    try {
      const userId = req.user.id;
      const result = await this.eventService.deleteEvent(
        eventListingId,
        userId,
      );
      SuccessResponse.sendSuccessResponse(
        res,
        HttpStatus.OK,
        result,
        'Event deleted successfully.',
      );
    } catch (err) {
      ErrorResponse.sendErrorResponse(res, err);
    }
  }

  @Post('/request')
  @SetMetadata('roles', [EnumUserRole.BUYER])
  @UseGuards(AuthGuard, RoleAuthGuard)
  async createEventRequest(
    @Req() req: RequestWithUser,
    @Body() data: CreateEventRequestDTO,
    @Res() res: Response,
  ) {
    try {
      const userId = req.user.id;
      const result = await this.eventService.createEventRequest(data, +userId);
      SuccessResponse.sendSuccessResponse(
        res,
        HttpStatus.OK,
        result,
        'Event request created successfully.',
      );
    } catch (err) {
      ErrorResponse.sendErrorResponse(res, err);
    }
  }

  @Put('/request/approval')
  @SetMetadata('roles', [EnumUserRole.SELLER])
  @UseGuards(AuthGuard, RoleAuthGuard)
  async updateEventRequestStatus(
    @Req() req: RequestWithUser,
    @Body() data: UpdateEventRequestStatusDto,
    @Res() res: Response,
  ) {
    try {
      const result = await this.eventService.updateEventRequestStatus(data);
      SuccessResponse.sendSuccessResponse(
        res,
        HttpStatus.OK,
        result,
        'Event request status updated successfully.',
      );
    } catch (err) {
      ErrorResponse.sendErrorResponse(res, err);
    }
  }
}
