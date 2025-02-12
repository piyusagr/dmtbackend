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
exports.BookPlaceController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const sentry_interceptor_1 = require("../../../common/interceptors/sentry.interceptor");
const book_place_service_1 = require("./book-place.service");
const create_book_place_dto_1 = require("./dto/create-book-place.dto");
const client_1 = require("@prisma/client");
const auth_guard_1 = require("../../../common/middlewears/auth.guard");
const role_auth_guard_1 = require("../../../common/middlewears/role-auth.guard");
let BookPlaceController = class BookPlaceController {
    constructor(bookPlaceService) {
        this.bookPlaceService = bookPlaceService;
    }
    async bookPlace(placeId, placeBookingDto, req) {
        return this.bookPlaceService.bookPlace(placeId, placeBookingDto, {
            buyer: req.user,
        });
    }
    async getBookingsForBuyer(req) {
        const buyerId = req.user.id;
        return this.bookPlaceService.getBookingsForBuyer(buyerId);
    }
    async confirmBooking(bookingId) {
        return this.bookPlaceService.confirmBooking(bookingId);
    }
    async cancelBooking(bookingId) {
        return this.bookPlaceService.cancelBooking(bookingId);
    }
    async paymentTest() {
        return this.bookPlaceService.testPayment();
    }
};
exports.BookPlaceController = BookPlaceController;
__decorate([
    (0, common_1.Post)(':placeId'),
    (0, common_1.SetMetadata)('roles', [client_1.EnumUserRole.BUYER]),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_auth_guard_1.RoleAuthGuard),
    __param(0, (0, common_1.Param)('placeId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_book_place_dto_1.CreatePlaceBookingDto, Object]),
    __metadata("design:returntype", Promise)
], BookPlaceController.prototype, "bookPlace", null);
__decorate([
    (0, common_1.Get)('/'),
    (0, common_1.SetMetadata)('roles', [client_1.EnumUserRole.BUYER]),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_auth_guard_1.RoleAuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BookPlaceController.prototype, "getBookingsForBuyer", null);
__decorate([
    (0, common_1.Post)('/confirm/:bookingId'),
    __param(0, (0, common_1.Param)('bookingId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BookPlaceController.prototype, "confirmBooking", null);
__decorate([
    (0, common_1.Post)('/cancel/:bookingId'),
    __param(0, (0, common_1.Param)('bookingId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BookPlaceController.prototype, "cancelBooking", null);
__decorate([
    (0, common_1.Get)('payment'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BookPlaceController.prototype, "paymentTest", null);
exports.BookPlaceController = BookPlaceController = __decorate([
    (0, swagger_1.ApiTags)('Book'),
    (0, common_1.Controller)('book'),
    (0, common_1.UseInterceptors)(sentry_interceptor_1.SentryInterceptor),
    __metadata("design:paramtypes", [book_place_service_1.BookPlaceService])
], BookPlaceController);
//# sourceMappingURL=book-place.controller.js.map