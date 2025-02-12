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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const create_room_dto_1 = require("./dto/create-room.dto");
const update_room_dto_1 = require("./dto/update-room.dto");
const room_entity_1 = require("./entities/room.entity");
const rooms_service_1 = require("./rooms.service");
const client_1 = require("@prisma/client");
const auth_guard_1 = require("../../common/middlewears/auth.guard");
const role_auth_guard_1 = require("../../common/middlewears/role-auth.guard");
const error_response_1 = require("../../common/responses/error-response");
const success_response_1 = require("../../common/responses/success-response");
let RoomsController = class RoomsController {
    constructor(roomsService) {
        this.roomsService = roomsService;
    }
    async create(createRoomDto, res) {
        try {
            const result = await this.roomsService.create(createRoomDto);
            success_response_1.SuccessResponse.sendSuccessResponse(res, common_1.HttpStatus.CREATED, result, 'Room created successfully.');
        }
        catch (err) {
            error_response_1.ErrorResponse.sendErrorResponse(res, err);
        }
    }
    async findAll(placeId, res) {
        try {
            const result = await this.roomsService.findAllByPlaceId(placeId);
            success_response_1.SuccessResponse.sendSuccessResponse(res, common_1.HttpStatus.OK, result, 'Rooms fetched successfully.');
        }
        catch (err) {
            error_response_1.ErrorResponse.sendErrorResponse(res, err);
        }
    }
    async findOne(placeId, roomId, res) {
        try {
            const result = await this.roomsService.findOneByPlaceId(placeId, roomId);
            success_response_1.SuccessResponse.sendSuccessResponse(res, common_1.HttpStatus.OK, result, 'Room fetched successfully.');
        }
        catch (err) {
            error_response_1.ErrorResponse.sendErrorResponse(res, err);
        }
    }
    async update(updateRoomDto, roomId, res) {
        try {
            const result = await this.roomsService.update(roomId, updateRoomDto);
            success_response_1.SuccessResponse.sendSuccessResponse(res, common_1.HttpStatus.OK, result, 'Room updated successfully.');
        }
        catch (err) {
            error_response_1.ErrorResponse.sendErrorResponse(res, err);
        }
    }
    async remove(roomId, res) {
        try {
            console.log(roomId);
            const result = await this.roomsService.remove(+roomId);
            success_response_1.SuccessResponse.sendSuccessResponse(res, common_1.HttpStatus.OK, result, 'Room deleted successfully.');
        }
        catch (err) {
            error_response_1.ErrorResponse.sendErrorResponse(res, err);
        }
    }
};
exports.RoomsController = RoomsController;
__decorate([
    (0, swagger_1.ApiResponse)({ type: room_entity_1.RoomEntity }),
    (0, common_1.Post)('/'),
    (0, common_1.SetMetadata)('roles', [client_1.EnumUserRole.SELLER]),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_auth_guard_1.RoleAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_room_dto_1.CreateRoomDto, Response]),
    __metadata("design:returntype", Promise)
], RoomsController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiResponse)({ type: [room_entity_1.RoomEntity] }),
    (0, common_1.Get)('/:placeId'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Param)('placeId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Response]),
    __metadata("design:returntype", Promise)
], RoomsController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiResponse)({ type: room_entity_1.RoomEntity }),
    (0, common_1.Get)('/:placeId/:roomId'),
    (0, common_1.SetMetadata)('roles', [client_1.EnumUserRole.SELLER]),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_auth_guard_1.RoleAuthGuard),
    __param(0, (0, common_1.Param)('placeId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('roomId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Response]),
    __metadata("design:returntype", Promise)
], RoomsController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiResponse)({ type: room_entity_1.RoomEntity }),
    (0, common_1.Patch)('/:roomId'),
    (0, common_1.SetMetadata)('roles', [client_1.EnumUserRole.SELLER]),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_auth_guard_1.RoleAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('roomId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_room_dto_1.UpdateRoomDto, Number, Response]),
    __metadata("design:returntype", Promise)
], RoomsController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiResponse)({ type: room_entity_1.RoomEntity }),
    (0, common_1.Delete)('/:roomId'),
    (0, common_1.SetMetadata)('roles', [client_1.EnumUserRole.SELLER]),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_auth_guard_1.RoleAuthGuard),
    __param(0, (0, common_1.Param)('roomId')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Response]),
    __metadata("design:returntype", Promise)
], RoomsController.prototype, "remove", null);
exports.RoomsController = RoomsController = __decorate([
    (0, swagger_1.ApiTags)('Rooms'),
    (0, common_1.Controller)('rooms'),
    __metadata("design:paramtypes", [rooms_service_1.RoomsService])
], RoomsController);
//# sourceMappingURL=rooms.controller.js.map