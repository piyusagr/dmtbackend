import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Res,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { RoomEntity } from './entities/room.entity';
import { RoomsService } from './rooms.service';
import { EnumUserRole } from '@prisma/client';
import { AuthGuard } from '../../common/middlewears/auth.guard';
import { RoleAuthGuard } from '../../common/middlewears/role-auth.guard';
import { ErrorResponse } from '../../common/responses/error-response';
import { SuccessResponse } from '../../common/responses/success-response';

@ApiTags('Rooms')
@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @ApiResponse({ type: RoomEntity })
  @Post('/')
  @SetMetadata('roles', [EnumUserRole.SELLER])
  @UseGuards(AuthGuard, RoleAuthGuard)
  async create(@Body() createRoomDto: CreateRoomDto, @Res() res: Response) {
    try {
      const result = await this.roomsService.create(createRoomDto);
      SuccessResponse.sendSuccessResponse(
        res,
        HttpStatus.CREATED,
        result,
        'Room created successfully.',
      );
    } catch (err) {
      ErrorResponse.sendErrorResponse(res, err);
    }
  }

  @ApiResponse({ type: [RoomEntity] })
  @Get('/:placeId')
  // @SetMetadata('roles', [EnumUserRole.SELLER])
  // @UseGuards(AuthGuard, RoleAuthGuard)
  @UseGuards(AuthGuard)
  async findAll(
    @Param('placeId', ParseIntPipe) placeId: number,
    @Res() res: Response,
  ) {
    try {
      const result = await this.roomsService.findAllByPlaceId(placeId);
      SuccessResponse.sendSuccessResponse(
        res,
        HttpStatus.OK,
        result,
        'Rooms fetched successfully.',
      );
    } catch (err) {
      ErrorResponse.sendErrorResponse(res, err);
    }
  }

  @ApiResponse({ type: RoomEntity })
  @Get('/:placeId/:roomId')
  @SetMetadata('roles', [EnumUserRole.SELLER])
  @UseGuards(AuthGuard, RoleAuthGuard)
  async findOne(
    @Param('placeId', ParseIntPipe) placeId: number,
    @Param('roomId', ParseIntPipe) roomId: number,
    @Res() res: Response,
  ) {
    try {
      const result = await this.roomsService.findOneByPlaceId(placeId, roomId);
      SuccessResponse.sendSuccessResponse(
        res,
        HttpStatus.OK,
        result,
        'Room fetched successfully.',
      );
    } catch (err) {
      ErrorResponse.sendErrorResponse(res, err);
    }
  }

  @ApiResponse({ type: RoomEntity })
  @Patch('/:roomId')
  @SetMetadata('roles', [EnumUserRole.SELLER])
  @UseGuards(AuthGuard, RoleAuthGuard)
  async update(
    @Body() updateRoomDto: UpdateRoomDto,
    @Param('roomId', ParseIntPipe) roomId: number,
    @Res() res: Response,
  ) {
    try {
      const result = await this.roomsService.update(roomId, updateRoomDto);
      SuccessResponse.sendSuccessResponse(
        res,
        HttpStatus.OK,
        result,
        'Room updated successfully.',
      );
    } catch (err) {
      ErrorResponse.sendErrorResponse(res, err);
    }
  }

  @ApiResponse({ type: RoomEntity })
  @Delete('/:roomId')
  @SetMetadata('roles', [EnumUserRole.SELLER])
  @UseGuards(AuthGuard, RoleAuthGuard)
  async remove(@Param('roomId') roomId: string, @Res() res: Response) {
    try {
      console.log(roomId);

      const result = await this.roomsService.remove(+roomId);
      SuccessResponse.sendSuccessResponse(
        res,
        HttpStatus.OK,
        result,
        'Room deleted successfully.',
      );
    } catch (err) {
      ErrorResponse.sendErrorResponse(res, err);
    }
  }
}
