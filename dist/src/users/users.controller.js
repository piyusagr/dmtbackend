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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const update_user_dto_1 = require("./dto/update-user.dto");
const places_service_1 = require("../places/places.service");
const swagger_1 = require("@nestjs/swagger");
const place_entity_1 = require("../places/entities/place.entity");
const user_entity_1 = require("./entities/user.entity");
const error_response_1 = require("../../common/responses/error-response");
const success_response_1 = require("../../common/responses/success-response");
const client_1 = require("@prisma/client");
const auth_guard_1 = require("../../common/middlewears/auth.guard");
const role_auth_guard_1 = require("../../common/middlewears/role-auth.guard");
const update_user_status_dto_1 = require("./dto/update-user-status.dto");
const user_response_dto_1 = require("../auth/responses/user-response.dto");
const check_whatsapp_code_dto_1 = require("./dto/check-whatsapp-code.dto");
const send_code_dto_1 = require("./dto/send-code.dto");
let UsersController = class UsersController {
    constructor(usersService, placesService) {
        this.usersService = usersService;
        this.placesService = placesService;
    }
    async sendWhatsAppCode(req, data, res) {
        try {
            const user = req.user;
            const result = await this.usersService.sendWhatsAppCode(user, data.country);
            success_response_1.SuccessResponse.sendSuccessResponse(res, common_1.HttpStatus.OK, result, 'WhatsApp code sent successfully.');
        }
        catch (err) {
            error_response_1.ErrorResponse.sendErrorResponse(res, err);
        }
    }
    async checkWhatsAppCode(req, data, res) {
        try {
            const user = req.user;
            const result = await this.usersService.checkWhatsAppCode(user, data.code);
            success_response_1.SuccessResponse.sendSuccessResponse(res, common_1.HttpStatus.OK, result, 'WhatsApp verified successfully.');
        }
        catch (err) {
            error_response_1.ErrorResponse.sendErrorResponse(res, err);
        }
    }
    async switchUserRoleBuyerSeller(id, req, res) {
        try {
            const user = await this.usersService.findByUserId(id);
            const result = await this.usersService.switchUserRoleBuyerSeller(user);
            success_response_1.SuccessResponse.sendSuccessResponse(res, common_1.HttpStatus.OK, result, 'User role switched successful.');
        }
        catch (err) {
            error_response_1.ErrorResponse.sendErrorResponse(res, err);
        }
    }
    async updateUserStatus(data, res) {
        try {
            const result = await this.usersService.updateUserStatus(data);
            success_response_1.SuccessResponse.sendSuccessResponse(res, common_1.HttpStatus.OK, result, 'User status update was successful.');
        }
        catch (err) {
            error_response_1.ErrorResponse.sendErrorResponse(res, err);
        }
    }
    async findAll(res) {
        try {
            const result = await this.usersService.findAll();
            success_response_1.SuccessResponse.sendSuccessResponse(res, common_1.HttpStatus.OK, result, 'Retrieving all users was successful.');
        }
        catch (err) {
            error_response_1.ErrorResponse.sendErrorResponse(res, err);
        }
    }
    async findOne(id, res) {
        try {
            const user = await this.usersService.findByUserId(id);
            success_response_1.SuccessResponse.sendSuccessResponse(res, common_1.HttpStatus.OK, user, 'The retrieval of the user by ID was successful.');
        }
        catch (err) {
            error_response_1.ErrorResponse.sendErrorResponse(res, err);
        }
    }
    async updateUserByUserId(id, updateUserDto, res) {
        try {
            const result = await this.usersService.update(+id, updateUserDto);
            success_response_1.SuccessResponse.sendSuccessResponse(res, common_1.HttpStatus.OK, result, 'User data updated successfully.');
        }
        catch (err) {
            error_response_1.ErrorResponse.sendErrorResponse(res, err);
        }
    }
    async updateProfile(req, updateUserDto, res) {
        try {
            const id = req.user.id;
            const result = await this.usersService.update(+id, updateUserDto);
            success_response_1.SuccessResponse.sendSuccessResponse(res, common_1.HttpStatus.OK, result, 'User profile updated successfully');
        }
        catch (err) {
            error_response_1.ErrorResponse.sendErrorResponse(res, err);
        }
    }
    async findPlacesByUserId(userId) {
        return this.placesService.findAll(undefined, { user_id: userId });
    }
    remove(id) {
        return this.usersService.remove(+id);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Post)('/send-whatsapp-code'),
    (0, common_1.SetMetadata)('roles', [client_1.EnumUserRole.SELLER]),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_auth_guard_1.RoleAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, send_code_dto_1.SendCodeDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "sendWhatsAppCode", null);
__decorate([
    (0, common_1.Post)('/check-whatsapp-code'),
    (0, common_1.SetMetadata)('roles', [client_1.EnumUserRole.SELLER]),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_auth_guard_1.RoleAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, check_whatsapp_code_dto_1.CheckWhatsappCodeDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "checkWhatsAppCode", null);
__decorate([
    (0, common_1.Get)('/switch/:id'),
    (0, common_1.SetMetadata)('roles', [client_1.EnumUserRole.BUYER, client_1.EnumUserRole.SELLER]),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "switchUserRoleBuyerSeller", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({ type: user_response_dto_1.UserResponseDto }),
    (0, common_1.Put)('/status'),
    (0, common_1.SetMetadata)('roles', [client_1.EnumUserRole.ADMIN]),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_auth_guard_1.RoleAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_user_status_dto_1.UpdateUserStatusDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateUserStatus", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({ type: user_entity_1.UserEntity, isArray: true }),
    (0, common_1.Get)(),
    (0, common_1.SetMetadata)('roles', [client_1.EnumUserRole.ADMIN]),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_auth_guard_1.RoleAuthGuard),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({ type: user_entity_1.UserEntity }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({ type: user_entity_1.UserEntity }),
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_user_dto_1.UpdateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateUserByUserId", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({ type: user_entity_1.UserEntity }),
    (0, common_1.Patch)('/'),
    (0, common_1.SetMetadata)('roles', [client_1.EnumUserRole.BUYER, client_1.EnumUserRole.SELLER]),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_auth_guard_1.RoleAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_user_dto_1.UpdateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateProfile", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({ type: user_entity_1.UserEntity }),
    (0, swagger_1.ApiResponse)({ type: [place_entity_1.PlaceEntity] }),
    (0, common_1.Get)(':userId/places'),
    __param(0, (0, common_1.Param)('userId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findPlacesByUserId", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({ type: user_entity_1.UserEntity }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "remove", null);
exports.UsersController = UsersController = __decorate([
    (0, swagger_1.ApiTags)('Users'),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        places_service_1.PlacesService])
], UsersController);
//# sourceMappingURL=users.controller.js.map