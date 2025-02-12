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
var AuthController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_service_1 = require("./auth.service");
const login_dto_1 = require("./dto/login.dto");
const user_session_entity_1 = require("./entity/user-session.entity");
const dto_1 = require("./dto");
const success_response_1 = require("../../common/responses/success-response");
const error_response_1 = require("../../common/responses/error-response");
const token_response_dto_1 = require("./responses/token-response.dto");
const general_response_dto_1 = require("../../common/responses/general-response.dto");
const user_and_token_response_dto_1 = require("./responses/user-and-token-response.dto");
let AuthController = AuthController_1 = class AuthController {
    constructor(authService) {
        this.authService = authService;
        this.logger = new common_1.Logger(AuthController_1.name);
    }
    async signInWithGoogle(signInWithGoogleDto, res) {
        try {
            const token = await this.authService.signInWithGoogle(signInWithGoogleDto);
            success_response_1.SuccessResponse.sendSuccessResponse(res, common_1.HttpStatus.OK, { token }, 'The sign-in process with Google has been successful.');
        }
        catch (err) {
            error_response_1.ErrorResponse.sendErrorResponse(res, err);
        }
    }
    async signUpWithEmail(req, signUpWithEmailDto, res) {
        try {
            const { token } = await this.authService.signUpWithEmail(signUpWithEmailDto);
            success_response_1.SuccessResponse.sendSuccessResponse(res, common_1.HttpStatus.CREATED, { token }, 'The sign-up process with email has been successful.');
        }
        catch (err) {
            error_response_1.ErrorResponse.sendErrorResponse(res, err);
        }
    }
    async resendEmailConfirmation(resendVerifyEmailDto, res) {
        try {
            const result = await this.authService.resendEmailConfirmation(resendVerifyEmailDto.email);
            success_response_1.SuccessResponse.sendSuccessResponse(res, common_1.HttpStatus.OK, result, 'The verify email has been successfully sent.');
        }
        catch (err) {
            error_response_1.ErrorResponse.sendErrorResponse(res, err);
        }
    }
    async emailConfirmation(confirmationData, res) {
        try {
            await this.authService.emailConfirmation(confirmationData);
            success_response_1.SuccessResponse.sendSuccessResponse(res, common_1.HttpStatus.OK, null, 'The email confirmation has been successful.');
        }
        catch (err) {
            error_response_1.ErrorResponse.sendErrorResponse(res, err);
        }
    }
    async forgotPassword(forgotPasswordDto, res) {
        try {
            const result = await this.authService.forgotPassword(forgotPasswordDto.email);
            success_response_1.SuccessResponse.sendSuccessResponse(res, common_1.HttpStatus.OK, result, 'The reset password email has been successfully sent.');
        }
        catch (err) {
            error_response_1.ErrorResponse.sendErrorResponse(res, err);
        }
    }
    async resetPassword(resetPasswordDto, res) {
        try {
            const result = await this.authService.resetPassword(resetPasswordDto.token, resetPasswordDto.password);
            success_response_1.SuccessResponse.sendSuccessResponse(res, common_1.HttpStatus.OK, result, 'Password reset successful.');
        }
        catch (err) {
            error_response_1.ErrorResponse.sendErrorResponse(res, err);
        }
    }
    async signIn(loginDto, req, res) {
        try {
            const { user, token } = await this.authService.login(loginDto);
            success_response_1.SuccessResponse.sendSuccessResponse(res, common_1.HttpStatus.OK, {
                token,
                user,
            }, 'The sign-in process has been successful.');
        }
        catch (err) {
            error_response_1.ErrorResponse.sendErrorResponse(res, err);
        }
    }
    async logout(req) {
        req.user = undefined;
        req.session.destroy(() => {
            this.logger.verbose('Destroyed session.');
        });
        return { result: 'Logout successful' };
    }
    async me(req) {
        const userSession = req.session.user;
        if (!userSession)
            throw new common_1.UnauthorizedException('User is not logged in');
        return userSession;
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, swagger_1.ApiResponse)({ status: 200, type: token_response_dto_1.TokenResponseDto }),
    (0, common_1.Post)('sign-in-google'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.SignInWithGoogleDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signInWithGoogle", null);
__decorate([
    (0, swagger_1.ApiResponse)({ status: 201, type: token_response_dto_1.TokenResponseDto }),
    (0, common_1.Post)('sign-up-email'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.SignUpWithEmailDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signUpWithEmail", null);
__decorate([
    (0, swagger_1.ApiResponse)({ status: 200, type: general_response_dto_1.GeneralResponseDto }),
    (0, common_1.Post)('resend-email-confirmation'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.ResendVerifyEmailDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resendEmailConfirmation", null);
__decorate([
    (0, swagger_1.ApiResponse)({ status: 200, type: general_response_dto_1.GeneralResponseDto }),
    (0, common_1.Post)('email-confirmation'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.ConfirmEmailDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "emailConfirmation", null);
__decorate([
    (0, swagger_1.ApiResponse)({ status: 200, type: general_response_dto_1.GeneralResponseDto }),
    (0, common_1.Post)('forgot-password'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.ForgotPasswordDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgotPassword", null);
__decorate([
    (0, swagger_1.ApiResponse)({ status: 200, type: general_response_dto_1.GeneralResponseDto }),
    (0, common_1.Post)('reset-password'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.ResetPasswordDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
__decorate([
    (0, swagger_1.ApiResponse)({ status: 200, type: user_and_token_response_dto_1.UserAndTokenResponseDto }),
    (0, common_1.Post)('sign-in'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signIn", null);
__decorate([
    (0, common_1.Post)('logout'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, swagger_1.ApiResponse)({ type: user_session_entity_1.UserSessionEntity }),
    (0, common_1.Get)('me'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "me", null);
exports.AuthController = AuthController = AuthController_1 = __decorate([
    (0, swagger_1.ApiTags)('Auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map