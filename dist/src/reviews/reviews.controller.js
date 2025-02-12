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
exports.ReviewsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const create_review_dto_1 = require("./dto/create-review.dto");
const reviews_service_1 = require("./reviews.service");
const client_1 = require("@prisma/client");
const role_auth_guard_1 = require("../../common/middlewears/role-auth.guard");
const auth_guard_1 = require("../../common/middlewears/auth.guard");
let ReviewsController = class ReviewsController {
    constructor(reviewsService) {
        this.reviewsService = reviewsService;
    }
    create(placeId, createReviewDto, req) {
        const userId = req.user.id;
        return this.reviewsService.create(userId, createReviewDto, placeId);
    }
    findAllByPlace(placeId) {
        return this.reviewsService.findAll({ place_id: placeId });
    }
    findOne(reviewId) {
        return this.reviewsService.findOne(reviewId);
    }
    remove(reviewId, placeId) {
        return this.reviewsService.removeFromListing(reviewId, { placeId });
    }
};
exports.ReviewsController = ReviewsController;
__decorate([
    (0, common_1.Post)(':placeId/reviews'),
    (0, common_1.SetMetadata)('roles', [client_1.EnumUserRole.BUYER]),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_auth_guard_1.RoleAuthGuard),
    __param(0, (0, common_1.Param)('placeId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_review_dto_1.CreateReviewDto, Object]),
    __metadata("design:returntype", void 0)
], ReviewsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':placeId/reviews'),
    __param(0, (0, common_1.Param)('placeId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ReviewsController.prototype, "findAllByPlace", null);
__decorate([
    (0, common_1.Get)('reviews/:reviewId'),
    __param(0, (0, common_1.Param)('reviewId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ReviewsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(':placeId/reviews/:reviewId'),
    __param(0, (0, common_1.Param)('reviewId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('placeId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], ReviewsController.prototype, "remove", null);
exports.ReviewsController = ReviewsController = __decorate([
    (0, swagger_1.ApiTags)('Reviews'),
    (0, common_1.Controller)('places'),
    __metadata("design:paramtypes", [reviews_service_1.ReviewsService])
], ReviewsController);
//# sourceMappingURL=reviews.controller.js.map