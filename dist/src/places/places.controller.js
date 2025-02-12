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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var PlacesController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlacesController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const pagnation_dto_1 = require("../../common/dto/pagnation.dto");
const files_validation_pipe_1 = require("../../common/pipes/files-validation.pipe");
const create_place_dto_1 = require("./dto/create-place.dto");
const get_place_dto_1 = require("./dto/get-place.dto");
const update_place_dto_1 = require("./dto/update-place.dto");
const place_entity_1 = require("./entities/place.entity");
const places_service_1 = require("./places.service");
const auth_guard_1 = require("../../common/middlewears/auth.guard");
const role_auth_guard_1 = require("../../common/middlewears/role-auth.guard");
const phone_country_validation_guard_1 = require("../../common/middlewears/phone-country-validation.guard");
const client_1 = require("@prisma/client");
const success_response_1 = require("../../common/responses/success-response");
const error_response_1 = require("../../common/responses/error-response");
let PlacesController = PlacesController_1 = class PlacesController {
    constructor(placesService) {
        this.placesService = placesService;
        this.logger = new common_1.Logger(PlacesController_1.name);
    }
    async create(req, createPlaceDto, photos, res) {
        try {
            const userId = req.user.id;
            const result = await this.placesService.create(createPlaceDto, photos, userId);
            success_response_1.SuccessResponse.sendSuccessResponse(res, common_1.HttpStatus.CREATED, result, 'Place created successfully.');
        }
        catch (err) {
            error_response_1.ErrorResponse.sendErrorResponse(res, err);
        }
    }
    async getCreatedPlacesForSeller(sellerId, res) {
        try {
            const result = await this.placesService.getCreatedPlacesForSeller(sellerId);
            success_response_1.SuccessResponse.sendSuccessResponse(res, common_1.HttpStatus.OK, result, 'Places for seller fetched successfully.');
        }
        catch (err) {
            error_response_1.ErrorResponse.sendErrorResponse(res, err);
        }
    }
    findAll(pagnation) {
        return this.placesService.findAll(pagnation);
    }
    findAllActive(pagnation) {
        return this.placesService.findAllActive(pagnation);
    }
    findPlaceImages(id) {
        return this.placesService.findOneImages(id);
    }
    findOne(id, query) {
        const { bookings, reviews, rooms, _count } = query;
        return this.placesService.findOne(+id, {
            bookings,
            reviews,
            rooms,
            _count,
        });
    }
    async update(id, updatePlaceDto, images) {
        return this.placesService.update(+id, updatePlaceDto, images);
    }
    remove(id) {
        return this.placesService.remove(+id);
    }
    removePlaceImage(placeId, assetId) {
        return this.placesService.removeImage(assetId);
    }
};
exports.PlacesController = PlacesController;
__decorate([
    (0, swagger_1.ApiCreatedResponse)({ type: place_entity_1.PlaceEntity }),
    (0, common_1.Post)(),
    (0, common_1.SetMetadata)('roles', [client_1.EnumUserRole.SELLER]),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_auth_guard_1.RoleAuthGuard, phone_country_validation_guard_1.PhoneCountryValidationGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('photos')),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFiles)(new files_validation_pipe_1.FilesValidationPipe())),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_place_dto_1.CreatePlaceDto,
        Array,
        Response]),
    __metadata("design:returntype", Promise)
], PlacesController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({ type: place_entity_1.PlaceEntity, isArray: true }),
    (0, common_1.Get)('/seller'),
    (0, common_1.SetMetadata)('roles', [client_1.EnumUserRole.SELLER]),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_auth_guard_1.RoleAuthGuard),
    __param(0, (0, common_1.Query)('sellerId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Response]),
    __metadata("design:returntype", Promise)
], PlacesController.prototype, "getCreatedPlacesForSeller", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({ type: place_entity_1.PlaceEntity, isArray: true }),
    (0, common_1.Get)(),
    (0, common_1.SetMetadata)('roles', [client_1.EnumUserRole.BUYER]),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_auth_guard_1.RoleAuthGuard),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagnation_dto_1.PagnationDto]),
    __metadata("design:returntype", void 0)
], PlacesController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({ type: place_entity_1.PlaceActiveEntity, isArray: true }),
    (0, common_1.Get)('/active'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagnation_dto_1.PagnationDto]),
    __metadata("design:returntype", void 0)
], PlacesController.prototype, "findAllActive", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({ type: place_entity_1.PlaceImagesEntity }),
    (0, common_1.Get)(':id/images'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PlacesController.prototype, "findPlaceImages", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({ type: place_entity_1.PlaceEntity }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, get_place_dto_1.GetPlaceQueryDto]),
    __metadata("design:returntype", void 0)
], PlacesController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({ type: place_entity_1.PlaceEntity }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('images')),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFiles)(new files_validation_pipe_1.FilesValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_place_dto_1.UpdatePlaceDto, Array]),
    __metadata("design:returntype", Promise)
], PlacesController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({ type: place_entity_1.PlaceEntity }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PlacesController.prototype, "remove", null);
__decorate([
    (0, common_1.Delete)(':placeId/images/:assetId'),
    __param(0, (0, common_1.Param)('placeId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('assetId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", void 0)
], PlacesController.prototype, "removePlaceImage", null);
exports.PlacesController = PlacesController = PlacesController_1 = __decorate([
    (0, swagger_1.ApiTags)('Places'),
    (0, common_1.Controller)('places'),
    __metadata("design:paramtypes", [places_service_1.PlacesService])
], PlacesController);
//# sourceMappingURL=places.controller.js.map