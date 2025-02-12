import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  Res,
  SetMetadata,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PagnationDto } from '../../common/dto/pagnation.dto';
import { FilesValidationPipe } from '../../common/pipes/files-validation.pipe';
import { CreatePlaceDto } from './dto/create-place.dto';
import { GetPlaceQueryDto } from './dto/get-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import {
  PlaceActiveEntity,
  PlaceEntity,
  PlaceImagesEntity,
} from './entities/place.entity';
import { PlacesService } from './places.service';
import { AuthGuard } from '../../common/middlewears/auth.guard';
import { RoleAuthGuard } from '../../common/middlewears/role-auth.guard';
import { PhoneCountryValidationGuard } from '../../common/middlewears/phone-country-validation.guard';
// import { ContinentGuard } from '../../common/middlewears/continent.guard';
import { EnumUserRole } from '@prisma/client';
import { SuccessResponse } from '../../common/responses/success-response';
import { ErrorResponse } from '../../common/responses/error-response';
import { RequestWithUser } from '../../common/requests/request-with-user';

@ApiTags('Places')
@Controller('places')
export class PlacesController {
  private logger = new Logger(PlacesController.name);

  constructor(private readonly placesService: PlacesService) {}

  @ApiCreatedResponse({ type: PlaceEntity })
  @Post()
  @SetMetadata('roles', [EnumUserRole.SELLER])
  @UseGuards(
    AuthGuard,
    RoleAuthGuard,
    PhoneCountryValidationGuard,
    // ContinentGuard,
  )
  @UseInterceptors(FilesInterceptor('photos'))
  async create(
    @Req() req: RequestWithUser,
    @Body() createPlaceDto: CreatePlaceDto,
    @UploadedFiles(new FilesValidationPipe())
    photos: Array<Express.Multer.File>,
    @Res() res: Response,
  ) {
    try {
      const userId = req.user.id;
      const result = await this.placesService.create(
        createPlaceDto,
        photos,
        userId,
      );
      SuccessResponse.sendSuccessResponse(
        res,
        HttpStatus.CREATED,
        result,
        'Place created successfully.',
      );
    } catch (err) {
      ErrorResponse.sendErrorResponse(res, err);
    }
  }

  @ApiOkResponse({ type: PlaceEntity, isArray: true })
  @Get('/seller')
  @SetMetadata('roles', [EnumUserRole.SELLER])
  @UseGuards(AuthGuard, RoleAuthGuard)
  async getCreatedPlacesForSeller(
    @Query('sellerId', ParseIntPipe) sellerId: number,
    @Res() res: Response,
  ) {
    try {
      const result =
        await this.placesService.getCreatedPlacesForSeller(sellerId);
      SuccessResponse.sendSuccessResponse(
        res,
        HttpStatus.OK,
        result,
        'Places for seller fetched successfully.',
      );
    } catch (err) {
      ErrorResponse.sendErrorResponse(res, err);
    }
  }

  @ApiOkResponse({ type: PlaceEntity, isArray: true })
  @Get()
  @SetMetadata('roles', [EnumUserRole.BUYER])
  @UseGuards(AuthGuard, RoleAuthGuard)
  findAll(@Query() pagnation: PagnationDto) {
    return this.placesService.findAll(pagnation);
  }

  @ApiOkResponse({ type: PlaceActiveEntity, isArray: true })
  @Get('/active')
  findAllActive(@Query() pagnation: PagnationDto) {
    return this.placesService.findAllActive(pagnation);
  }

  @ApiOkResponse({ type: PlaceImagesEntity })
  @Get(':id/images')
  findPlaceImages(@Param('id', ParseIntPipe) id: number) {
    return this.placesService.findOneImages(id);
  }

  @ApiOkResponse({ type: PlaceEntity })
  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: string,
    @Query() query: GetPlaceQueryDto,
  ) {
    const { bookings, reviews, rooms, _count } = query;

    return this.placesService.findOne(+id, {
      bookings,
      reviews,
      rooms,
      _count,
    });
  }

  @ApiOkResponse({ type: PlaceEntity })
  @UseInterceptors(FilesInterceptor('images'))
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updatePlaceDto: UpdatePlaceDto,
    @UploadedFiles(new FilesValidationPipe()) images: Express.Multer.File[],
  ) {
    return this.placesService.update(+id, updatePlaceDto, images);
  }

  @ApiOkResponse({ type: PlaceEntity })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.placesService.remove(+id);
  }

  @Delete(':placeId/images/:assetId')
  removePlaceImage(
    @Param('placeId', ParseIntPipe) placeId: string,
    @Param('assetId', ParseIntPipe) assetId: number,
  ) {
    return this.placesService.removeImage(assetId);
  }
}
