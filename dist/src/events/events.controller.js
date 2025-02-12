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
exports.EventsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const events_service_1 = require("./events.service");
const auth_guard_1 = require("../../common/middlewears/auth.guard");
const client_1 = require("@prisma/client");
const role_auth_guard_1 = require("../../common/middlewears/role-auth.guard");
const create_event_dto_1 = require("./dto/create-event.dto");
const create_event_request_dto_1 = require("./dto/create-event-request.dto");
const update_event_request_status_dto_1 = require("./dto/update-event-request-status.dto");
const phone_country_validation_guard_1 = require("../../common/middlewears/phone-country-validation.guard");
const error_response_1 = require("../../common/responses/error-response");
const success_response_1 = require("../../common/responses/success-response");
const platform_express_1 = require("@nestjs/platform-express");
const files_validation_pipe_1 = require("../../common/pipes/files-validation.pipe");
let EventsController = class EventsController {
    constructor(eventService) {
        this.eventService = eventService;
    }
    async createEvent(req, data, res, files) {
        try {
            const userId = req.user.id;
            const result = await this.eventService.createEvent(data, userId, req.user, files);
            success_response_1.SuccessResponse.sendSuccessResponse(res, common_1.HttpStatus.CREATED, result, 'Event created successfully.');
        }
        catch (err) {
            error_response_1.ErrorResponse.sendErrorResponse(res, err);
        }
    }
    async getEvents(res) {
        try {
            const result = await this.eventService.getEvents();
            success_response_1.SuccessResponse.sendSuccessResponse(res, common_1.HttpStatus.OK, result, 'Events fetched successfully.');
        }
        catch (err) {
            error_response_1.ErrorResponse.sendErrorResponse(res, err);
        }
    }
    async getHostedEventsBySellerId(req, res) {
        try {
            const userId = req.user.id;
            const result = await this.eventService.getHostedEventsBySellerId(+userId);
            success_response_1.SuccessResponse.sendSuccessResponse(res, common_1.HttpStatus.OK, result, 'Hosted events by seller fetched successfully.');
        }
        catch (err) {
            error_response_1.ErrorResponse.sendErrorResponse(res, err);
        }
    }
    async getReservationsForBuyer(req, res) {
        try {
            const userId = req.user.id;
            const result = await this.eventService.getReservationsForBuyer(+userId);
            success_response_1.SuccessResponse.sendSuccessResponse(res, common_1.HttpStatus.OK, result, 'Reservations for buyer fetched successfully.');
        }
        catch (err) {
            error_response_1.ErrorResponse.sendErrorResponse(res, err);
        }
    }
    async getEventRequestsByEventId(req, eventListingId, res) {
        try {
            const userId = req.user.id;
            const result = await this.eventService.getEventRequestsByEventId(eventListingId, +userId);
            success_response_1.SuccessResponse.sendSuccessResponse(res, common_1.HttpStatus.OK, result, 'Event requests for event fetched successfully.');
        }
        catch (err) {
            error_response_1.ErrorResponse.sendErrorResponse(res, err);
        }
    }
    async getEvent(eventListingId, res) {
        try {
            const result = await this.eventService.getEvent(eventListingId);
            success_response_1.SuccessResponse.sendSuccessResponse(res, common_1.HttpStatus.OK, result, 'Event data fetched successfully.');
        }
        catch (err) {
            error_response_1.ErrorResponse.sendErrorResponse(res, err);
        }
    }
    async deleteEvent(req, eventListingId, res) {
        try {
            const userId = req.user.id;
            const result = await this.eventService.deleteEvent(eventListingId, userId);
            success_response_1.SuccessResponse.sendSuccessResponse(res, common_1.HttpStatus.OK, result, 'Event deleted successfully.');
        }
        catch (err) {
            error_response_1.ErrorResponse.sendErrorResponse(res, err);
        }
    }
    async createEventRequest(req, data, res) {
        try {
            const userId = req.user.id;
            const result = await this.eventService.createEventRequest(data, +userId);
            success_response_1.SuccessResponse.sendSuccessResponse(res, common_1.HttpStatus.OK, result, 'Event request created successfully.');
        }
        catch (err) {
            error_response_1.ErrorResponse.sendErrorResponse(res, err);
        }
    }
    async updateEventRequestStatus(req, data, res) {
        try {
            const result = await this.eventService.updateEventRequestStatus(data);
            success_response_1.SuccessResponse.sendSuccessResponse(res, common_1.HttpStatus.OK, result, 'Event request status updated successfully.');
        }
        catch (err) {
            error_response_1.ErrorResponse.sendErrorResponse(res, err);
        }
    }
};
exports.EventsController = EventsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.SetMetadata)('roles', [client_1.EnumUserRole.SELLER]),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_auth_guard_1.RoleAuthGuard, phone_country_validation_guard_1.PhoneCountryValidationGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files')),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __param(3, (0, common_1.UploadedFiles)(new files_validation_pipe_1.FilesValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_event_dto_1.CreateEventDTO,
        Response,
        Array]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "createEvent", null);
__decorate([
    (0, common_1.Get)('/'),
    (0, common_1.SetMetadata)('roles', [client_1.EnumUserRole.BUYER]),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_auth_guard_1.RoleAuthGuard),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Response]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "getEvents", null);
__decorate([
    (0, common_1.Get)('/hosted'),
    (0, common_1.SetMetadata)('roles', [client_1.EnumUserRole.SELLER]),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_auth_guard_1.RoleAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Response]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "getHostedEventsBySellerId", null);
__decorate([
    (0, common_1.Get)('/reservations'),
    (0, common_1.SetMetadata)('roles', [client_1.EnumUserRole.BUYER]),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_auth_guard_1.RoleAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Response]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "getReservationsForBuyer", null);
__decorate([
    (0, common_1.Get)('/request/:eventListingId'),
    (0, common_1.SetMetadata)('roles', [client_1.EnumUserRole.SELLER]),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_auth_guard_1.RoleAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('eventListingId')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Response]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "getEventRequestsByEventId", null);
__decorate([
    (0, common_1.Get)('/:eventListingId'),
    (0, common_1.SetMetadata)('roles', [client_1.EnumUserRole.BUYER, client_1.EnumUserRole.SELLER]),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_auth_guard_1.RoleAuthGuard),
    __param(0, (0, common_1.Param)('eventListingId')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Response]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "getEvent", null);
__decorate([
    (0, common_1.Delete)('/:eventListingId'),
    (0, common_1.SetMetadata)('roles', [client_1.EnumUserRole.SELLER, client_1.EnumUserRole.ADMIN]),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_auth_guard_1.RoleAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('eventListingId')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Response]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "deleteEvent", null);
__decorate([
    (0, common_1.Post)('/request'),
    (0, common_1.SetMetadata)('roles', [client_1.EnumUserRole.BUYER]),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_auth_guard_1.RoleAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_event_request_dto_1.CreateEventRequestDTO,
        Response]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "createEventRequest", null);
__decorate([
    (0, common_1.Put)('/request/approval'),
    (0, common_1.SetMetadata)('roles', [client_1.EnumUserRole.SELLER]),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_auth_guard_1.RoleAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_event_request_status_dto_1.UpdateEventRequestStatusDto,
        Response]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "updateEventRequestStatus", null);
exports.EventsController = EventsController = __decorate([
    (0, swagger_1.ApiTags)('Events'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('events'),
    __metadata("design:paramtypes", [events_service_1.EventsService])
], EventsController);
//# sourceMappingURL=events.controller.js.map