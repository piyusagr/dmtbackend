"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var PlacesService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlacesService = void 0;
const common_1 = require("@nestjs/common");
const place_constant_1 = require("../../common/constants/place.constant");
const pagnation_dto_1 = require("../../common/dto/pagnation.dto");
const api_error_1 = require("../../common/errors/api.error");
const database_error_1 = require("../../common/errors/database.error");
const image_service_1 = require("../../common/services/images/image.service");
const db_1 = require("../../config/db");
const transformUrl = (images) => {
    const { mimetype, originalName, url, uuid, filePath } = images;
    return {
        url: url,
        mimetype: mimetype,
        original_name: originalName,
        uid: uuid,
        file_key: filePath,
    };
};
let PlacesService = PlacesService_1 = class PlacesService {
    constructor(imageService) {
        this.imageService = imageService;
        this.DEFAULT_PLACE_INCLUDE = {
            cover_image: true,
            images: true,
            _count: true,
        };
        this.logger = new common_1.Logger(PlacesService_1.name);
    }
    async create(createPlaceDto, photos, user_id) {
        try {
            if (!photos || photos.length < place_constant_1.PLACE_CONFIG.minimumPhotosPerListing) {
                return Promise.reject(new api_error_1.ApiError(`Place must have at least ${place_constant_1.PLACE_CONFIG.minimumPhotosPerListing} photos`));
            }
            const images = await this.imageService.uploadImages(photos);
            const imageTransaction = await db_1.default.$transaction(images.map((image) => db_1.default.asset.create({ data: transformUrl(image) })));
            return await db_1.default.place.create({
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
        }
        catch (error) {
            throw new common_1.BadGatewayException(error);
        }
    }
    async getCreatedPlacesForSeller(sellerId) {
        try {
            return await db_1.default.place.findMany({
                where: {
                    user_id: sellerId,
                },
                include: {
                    ...this.DEFAULT_PLACE_INCLUDE,
                },
            });
        }
        catch (error) {
            return Promise.reject(error);
        }
    }
    async findAll(pagnation = new pagnation_dto_1.PagnationDto(), filters, include) {
        const { limit, page } = pagnation;
        try {
            const places = await db_1.default.place.findMany({
                take: limit,
                skip: page * limit,
                where: filters,
                include: {
                    ...this.DEFAULT_PLACE_INCLUDE,
                    ...include,
                },
            });
            return places;
        }
        catch (error) {
            throw new database_error_1.DatabseError(error);
        }
    }
    async findAllActive(pagnation = new pagnation_dto_1.PagnationDto()) {
        try {
            const places = await this.findAll(pagnation, {
                AND: [
                    { listing_status: 'ACTIVE' },
                    { cover_image: { id: { not: undefined } } },
                    { rooms: { some: { id: { not: undefined } } } },
                ],
            }, { rooms: { select: { price: true } } });
            return places;
        }
        catch (error) {
            throw new database_error_1.DatabseError(error);
        }
    }
    async findOne(id, include) {
        try {
            const place = await db_1.default.place.findUniqueOrThrow({
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
        }
        catch (error) {
            throw new database_error_1.DatabseError(error);
        }
    }
    async findOneImages(id) {
        try {
            console.log(id);
            const placeImages = await db_1.default.place.findUniqueOrThrow({
                where: { id },
                include: {
                    ...this.DEFAULT_PLACE_INCLUDE,
                },
            });
            return placeImages;
        }
        catch (error) {
            throw new database_error_1.DatabseError(error);
        }
    }
    async update(id, updatePlaceDto, images) {
        try {
            const getImageConnect = async () => {
                if (!images || !images?.length)
                    return [];
                const imageResponse = await this.imageService.uploadImages(images);
                const imageTransaction = await db_1.default.$transaction(imageResponse.map((image) => db_1.default.asset.create({ data: transformUrl(image) })));
                return imageTransaction.map((image) => ({ id: image.id }));
            };
            const updatedPlace = await db_1.default.place.update({
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
        }
        catch (error) {
            throw new common_1.BadGatewayException(error);
        }
    }
    async remove(id) {
        try {
            const deletedPlace = await db_1.default.place.delete({
                where: { id },
            });
            return deletedPlace;
        }
        catch (error) {
            throw new database_error_1.DatabseError(error);
        }
    }
    async removeImage(assetId) {
        try {
            const asset = await db_1.default.asset.findUniqueOrThrow({
                where: { id: assetId },
            });
            const response = await this.imageService.deleteImage(asset.file_key);
            const deletedImage = await db_1.default.asset.delete({
                where: { id: assetId },
            });
            return { response, deletedImage };
        }
        catch (error) {
            if (error instanceof common_1.ServiceUnavailableException) {
                throw error;
            }
            throw new database_error_1.DatabseError(error);
        }
    }
};
exports.PlacesService = PlacesService;
exports.PlacesService = PlacesService = PlacesService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [image_service_1.ImageService])
], PlacesService);
//# sourceMappingURL=places.service.js.map