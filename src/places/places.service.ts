import {
  BadGatewayException,
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PLACE_CONFIG } from '../../common/constants/place.constant';
import { PagnationDto } from '../../common/dto/pagnation.dto';
import { ApiError } from '../../common/errors/api.error';
import { DatabseError } from '../../common/errors/database.error';
import {
  ImageResponse,
  ImageService,
} from '../../common/services/images/image.service';
import prisma from '../../config/db';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';

const transformUrl = (images: ImageResponse): Prisma.AssetCreateInput => {
  const { mimetype, originalName, url, uuid, filePath } = images;
  return {
    url: url,
    mimetype: mimetype,
    original_name: originalName,
    uid: uuid,
    file_key: filePath,
  };
};

@Injectable()
export class PlacesService {
  private DEFAULT_PLACE_INCLUDE: Prisma.PlaceInclude = {
    cover_image: true,
    images: true,
    _count: true,
  };

  private logger = new Logger(PlacesService.name);

  constructor(private readonly imageService: ImageService) {}

  async create(
    createPlaceDto: CreatePlaceDto,
    photos: Express.Multer.File[],
    user_id: number,
  ) {
    try {
      if (!photos || photos.length < PLACE_CONFIG.minimumPhotosPerListing) {
        return Promise.reject(
          new ApiError(
            `Place must have at least ${PLACE_CONFIG.minimumPhotosPerListing} photos`,
          ),
        );
      }

      const images = await this.imageService.uploadImages(photos);

      // Create all assets passed into the service params `photos`
      const imageTransaction = await prisma.$transaction(
        images.map((image) =>
          prisma.asset.create({ data: transformUrl(image) }),
        ),
      );

      // Creates a place, sets the first image as the cover image, and connects the other images.
      return await prisma.place.create({
        data: {
          ...createPlaceDto,
          user_id,
          cover_image_id: imageTransaction[0].id,
          images: {
            connect: imageTransaction.map((image) => ({ id: image.id })),
          },
        },
        include: {
          ...this.DEFAULT_PLACE_INCLUDE,
        },
      });
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  async getCreatedPlacesForSeller(sellerId: number) {
    try {
      return await prisma.place.findMany({
        where: {
          user_id: sellerId,
        },
        include: {
          ...this.DEFAULT_PLACE_INCLUDE,
        },
      });
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findAll(
    pagnation: PagnationDto = new PagnationDto(),
    filters?: Prisma.PlaceWhereInput,
    include?: Prisma.PlaceInclude,
  ) {
    const { limit, page } = pagnation;

    try {
      const places = await prisma.place.findMany({
        take: limit,
        skip: page * limit,
        where: filters,
        include: {
          ...this.DEFAULT_PLACE_INCLUDE,
          ...include,
        },
      });

      return places;
    } catch (error) {
      throw new DatabseError(error);
    }
  }

  async findAllActive(pagnation: PagnationDto = new PagnationDto()) {
    try {
      const places = await this.findAll(
        pagnation,
        {
          AND: [
            { listing_status: 'ACTIVE' },
            { cover_image: { id: { not: undefined } } },
            { rooms: { some: { id: { not: undefined } } } },
          ],
        },
        { rooms: { select: { price: true } } },
      );

      return places;
    } catch (error) {
      throw new DatabseError(error);
    }
  }

  async findOne(id: number, include?: Prisma.PlaceInclude) {
    try {
      /* If reviews are included include the user */
      const place = await prisma.place.findUniqueOrThrow({
        where: { id: id },
        include: {
          ...this.DEFAULT_PLACE_INCLUDE,
          ...include,
          reviews: include?.reviews
            ? {
                include: { user: true },
              }
            : false,
        },
      });

      return place;
    } catch (error) {
      throw new DatabseError(error);
    }
  }

  async findOneImages(id: number) {
    try {
      console.log(id);

      const placeImages = await prisma.place.findUniqueOrThrow({
        where: { id },
        include: {
          ...this.DEFAULT_PLACE_INCLUDE,
        },
      });

      return placeImages;
    } catch (error) {
      throw new DatabseError(error);
    }
  }

  async update(
    id: number,
    updatePlaceDto: UpdatePlaceDto,
    images?: Express.Multer.File[],
  ) {
    try {
      const getImageConnect = async () => {
        if (!images || !images?.length) return [];
        const imageResponse = await this.imageService.uploadImages(images);

        // Create all assets passed into the service params `images`
        const imageTransaction = await prisma.$transaction(
          imageResponse.map((image) =>
            prisma.asset.create({ data: transformUrl(image) }),
          ),
        );

        return imageTransaction.map((image) => ({ id: image.id }));
      };

      const updatedPlace = await prisma.place.update({
        where: { id },
        data: {
          ...updatePlaceDto,
          images: {
            connect: await getImageConnect(),
          },
        },
        include: {
          ...this.DEFAULT_PLACE_INCLUDE,
        },
      });
      return updatedPlace;
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  async remove(id: number) {
    try {
      const deletedPlace = await prisma.place.delete({
        where: { id },
      });
      return deletedPlace;
    } catch (error) {
      throw new DatabseError(error);
    }
  }

  async removeImage(assetId: number) {
    try {
      const asset = await prisma.asset.findUniqueOrThrow({
        where: { id: assetId },
      });

      const response = await this.imageService.deleteImage(asset.file_key);

      const deletedImage = await prisma.asset.delete({
        where: { id: assetId },
      });

      return { response, deletedImage };
    } catch (error) {
      if (error instanceof ServiceUnavailableException) {
        throw error;
      }

      throw new DatabseError(error);
    }
  }
}
