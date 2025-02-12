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
exports.EventReviewsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_guard_1 = require("../../common/middlewears/auth.guard");
const client_1 = require("@prisma/client");
const role_auth_guard_1 = require("../../common/middlewears/role-auth.guard");
const online_event_review_create_dto_1 = require("./dtos/online-event-review-create.dto");
const event_reviews_service_1 = require("./event-reviews.service");
const onsite_event_review_create_dto_1 = require("./dtos/onsite-event-review-create.dto");
const error_response_1 = require("../../common/responses/error-response");
const success_response_1 = require("../../common/responses/success-response");
let EventReviewsController = class EventReviewsController {
    constructor(eventReviewsService) {
        this.eventReviewsService = eventReviewsService;
    }
    async createOnlineEventReview(req, data, res) {
        try {
            const userId = req.user.id;
            const result = await this.eventReviewsService.createOnlineEventReview(data, userId);
            success_response_1.SuccessResponse.sendSuccessResponse(res, common_1.HttpStatus.CREATED, result, 'Review created successfully.');
        }
        catch (err) {
            error_response_1.ErrorResponse.sendErrorResponse(res, err);
        }
    }
    async createOnsiteEventReview(req, data, res) {
        try {
            const userId = req.user.id;
            const result = await this.eventReviewsService.createOnsiteEventReview(data, userId);
            success_response_1.SuccessResponse.sendSuccessResponse(res, common_1.HttpStatus.CREATED, result, 'Review created successfully.');
        }
        catch (err) {
            error_response_1.ErrorResponse.sendErrorResponse(res, err);
        }
    }
    async getEventReviewsByEventListingId(eventListingId, res) {
        try {
            const result = await this.eventReviewsService.getEventReviewsByEventListingId(eventListingId);
            success_response_1.SuccessResponse.sendSuccessResponse(res, common_1.HttpStatus.OK, result, 'Reviews fetched successfully.');
        }
        catch (err) {
            error_response_1.ErrorResponse.sendErrorResponse(res, err);
        }
    }
    async deleteReviewByReviewId(eventListingId, reviewId, res) {
        try {
            const result = await this.eventReviewsService.deleteReviewByReviewId(eventListingId, reviewId);
            success_response_1.SuccessResponse.sendSuccessResponse(res, common_1.HttpStatus.OK, result, 'Reviews deleted successfully.');
        }
        catch (err) {
            error_response_1.ErrorResponse.sendErrorResponse(res, err);
        }
    }
};
exports.EventReviewsController = EventReviewsController;
__decorate([
    (0, common_1.Post)('/online'),
    (0, common_1.SetMetadata)('roles', [client_1.EnumUserRole.BUYER]),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_auth_guard_1.RoleAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, online_event_review_create_dto_1.OnlineEventReviewCreateDto, Response]),
    __metadata("design:returntype", Promise)
], EventReviewsController.prototype, "createOnlineEventReview", null);
__decorate([
    (0, common_1.Post)('/onsite'),
    (0, common_1.SetMetadata)('roles', [client_1.EnumUserRole.BUYER]),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_auth_guard_1.RoleAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, onsite_event_review_create_dto_1.OnsiteEventReviewCreateDto, Response]),
    __metadata("design:returntype", Promise)
], EventReviewsController.prototype, "createOnsiteEventReview", null);
__decorate([
    (0, common_1.Get)('/:eventListingId'),
    (0, common_1.SetMetadata)('roles', [client_1.EnumUserRole.BUYER, client_1.EnumUserRole.SELLER, client_1.EnumUserRole.ADMIN]),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_auth_guard_1.RoleAuthGuard),
    __param(0, (0, common_1.Param)('eventListingId')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Response]),
    __metadata("design:returntype", Promise)
], EventReviewsController.prototype, "getEventReviewsByEventListingId", null);
__decorate([
    (0, common_1.Delete)('/:eventListingId/:reviewId'),
    (0, common_1.SetMetadata)('roles', [client_1.EnumUserRole.ADMIN]),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_auth_guard_1.RoleAuthGuard),
    __param(0, (0, common_1.Param)('eventListingId')),
    __param(1, (0, common_1.Param)('reviewId')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Response]),
    __metadata("design:returntype", Promise)
], EventReviewsController.prototype, "deleteReviewByReviewId", null);
exports.EventReviewsController = EventReviewsController = __decorate([
    (0, swagger_1.ApiTags)('Event reviews'),
    (0, common_1.Controller)('event-reviews'),
    __metadata("design:paramtypes", [event_reviews_service_1.EventReviewsService])
], EventReviewsController);
//# sourceMappingURL=event-reviews.controller.js.map