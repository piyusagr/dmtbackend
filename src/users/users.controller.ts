import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Res,
  HttpStatus,
  SetMetadata,
  UseGuards,
  Put,
  Req,
  Post,
} from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { PlacesService } from '../places/places.service';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PlaceEntity } from '../places/entities/place.entity';
import { UserEntity } from './entities/user.entity';
import { ErrorResponse } from '../../common/responses/error-response';
import { SuccessResponse } from '../../common/responses/success-response';
import { EnumUserRole } from '@prisma/client';
import { AuthGuard } from '../../common/middlewears/auth.guard';
import { RoleAuthGuard } from '../../common/middlewears/role-auth.guard';
import { UpdateUserStatusDto } from './dto/update-user-status.dto';
import { UserResponseDto } from '../auth/responses/user-response.dto';
import { RequestWithUser } from '../../common/requests/request-with-user';
import { CheckWhatsappCodeDto } from './dto/check-whatsapp-code.dto';
import { SendCodeDto } from './dto/send-code.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly placesService: PlacesService,
  ) {}

  @Post('/send-whatsapp-code')
  @SetMetadata('roles', [EnumUserRole.SELLER])
  @UseGuards(AuthGuard, RoleAuthGuard)
  async sendWhatsAppCode(
    @Req() req: RequestWithUser,
    @Body() data: SendCodeDto,
    @Res() res: Response,
  ) {
    try {
      const user = req.user;
      const result = await this.usersService.sendWhatsAppCode(
        user,
        data.country,
      );
      SuccessResponse.sendSuccessResponse(
        res,
        HttpStatus.OK,
        result,
        'WhatsApp code sent successfully.',
      );
    } catch (err) {
      ErrorResponse.sendErrorResponse(res, err);
    }
  }

  @Post('/check-whatsapp-code')
  @SetMetadata('roles', [EnumUserRole.SELLER])
  @UseGuards(AuthGuard, RoleAuthGuard)
  async checkWhatsAppCode(
    @Req() req: RequestWithUser,
    @Body() data: CheckWhatsappCodeDto,
    @Res() res: Response,
  ) {
    try {
      const user = req.user;
      const result = await this.usersService.checkWhatsAppCode(user, data.code);
      SuccessResponse.sendSuccessResponse(
        res,
        HttpStatus.OK,
        result,
        'WhatsApp verified successfully.',
      );
    } catch (err) {
      ErrorResponse.sendErrorResponse(res, err);
    }
  }

  @Get('/switch/:id')
  @SetMetadata('roles', [EnumUserRole.BUYER, EnumUserRole.SELLER])
  // @UseGuards(AuthGuard, RoleAuthGuard)
  async switchUserRoleBuyerSeller(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: RequestWithUser,
    @Res() res: Response,
  ) {
    try {
      const user = await this.usersService.findByUserId(id);
      const result = await this.usersService.switchUserRoleBuyerSeller(user);
      SuccessResponse.sendSuccessResponse(
        res,
        HttpStatus.OK,
        result,
        'User role switched successful.',
      );
    } catch (err) {
      ErrorResponse.sendErrorResponse(res, err);
    }
  }

  @ApiOkResponse({ type: UserResponseDto })
  @Put('/status')
  @SetMetadata('roles', [EnumUserRole.ADMIN])
  @UseGuards(AuthGuard, RoleAuthGuard)
  async updateUserStatus(
    @Body() data: UpdateUserStatusDto,
    @Res() res: Response,
  ) {
    try {
      const result = await this.usersService.updateUserStatus(data);
      SuccessResponse.sendSuccessResponse(
        res,
        HttpStatus.OK,
        result,
        'User status update was successful.',
      );
    } catch (err) {
      ErrorResponse.sendErrorResponse(res, err);
    }
  }

  @ApiOkResponse({ type: UserEntity, isArray: true })
  @Get()
  @SetMetadata('roles', [EnumUserRole.ADMIN])
  @UseGuards(AuthGuard, RoleAuthGuard)
  async findAll(@Res() res: Response) {
    try {
      const result = await this.usersService.findAll();
      SuccessResponse.sendSuccessResponse(
        res,
        HttpStatus.OK,
        result,
        'Retrieving all users was successful.',
      );
    } catch (err) {
      ErrorResponse.sendErrorResponse(res, err);
    }
  }

  @ApiOkResponse({ type: UserEntity })
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    try {
      const user = await this.usersService.findByUserId(id);
      SuccessResponse.sendSuccessResponse(
        res,
        HttpStatus.OK,
        user,
        'The retrieval of the user by ID was successful.',
      );
    } catch (err) {
      ErrorResponse.sendErrorResponse(res, err);
    }
  }

  @ApiOkResponse({ type: UserEntity })
  @Patch(':id')
  @UseGuards(AuthGuard)
  // @UseGuards(AuthGuard, RoleAuthGuard)
  // @SetMetadata('roles', [EnumUserRole.ADMIN])
  async updateUserByUserId(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response,
  ) {
    try {
      const result = await this.usersService.update(+id, updateUserDto);

      SuccessResponse.sendSuccessResponse(
        res,
        HttpStatus.OK,
        result,
        'User data updated successfully.',
      );
    } catch (err) {
      ErrorResponse.sendErrorResponse(res, err);
    }
  }

  @ApiOkResponse({ type: UserEntity })
  @Patch('/')
  @SetMetadata('roles', [EnumUserRole.BUYER, EnumUserRole.SELLER])
  @UseGuards(AuthGuard, RoleAuthGuard)
  async updateProfile(
    @Req() req: RequestWithUser,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response,
  ) {
    try {
      const id = req.user.id;
      const result = await this.usersService.update(+id, updateUserDto);
      SuccessResponse.sendSuccessResponse(
        res,
        HttpStatus.OK,
        result,
        'User profile updated successfully',
      );
    } catch (err) {
      ErrorResponse.sendErrorResponse(res, err);
    }
  }

  @ApiOkResponse({ type: UserEntity })
  @ApiResponse({ type: [PlaceEntity] })
  @Get(':userId/places')
  async findPlacesByUserId(@Param('userId', ParseIntPipe) userId: number) {
    return this.placesService.findAll(undefined, { user_id: userId });
  }

  @ApiOkResponse({ type: UserEntity })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(+id);
  }
}
