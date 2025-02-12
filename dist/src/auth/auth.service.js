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
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const db_1 = require("../../config/db");
const bcrypt = require("bcrypt");
const api_error_1 = require("../../common/errors/api.error");
const library_1 = require("@prisma/client/runtime/library");
const prisma_error_constant_1 = require("../../common/constants/prisma-error.constant");
const config_1 = require("@nestjs/config");
const users_service_1 = require("../users/users.service");
const dmt_nodemailer_email_service_1 = require("../../common/services/email/dmt-nodemailer-email.service");
const google_auth_library_1 = require("google-auth-library");
const jwt_utility_service_1 = require("../../common/services/jwt/jwt-utility.service");
const client_1 = require("@prisma/client");
let AuthService = AuthService_1 = class AuthService {
    constructor(dmtNodemailerEmailService, configService, jwtUtilityService, usersService) {
        this.dmtNodemailerEmailService = dmtNodemailerEmailService;
        this.configService = configService;
        this.jwtUtilityService = jwtUtilityService;
        this.usersService = usersService;
        this.logger = new common_1.Logger(AuthService_1.name);
        this.client = new google_auth_library_1.OAuth2Client(this.configService.get('GOOGLE_AUTH_CLIENT_ID'), this.configService.get('GOOGLE_AUTH_CLIENT_SECRET'));
    }
    async signInWithGoogle(data) {
        try {
            const ticket = await this.client.verifyIdToken({
                idToken: data.token,
                audience: this.configService.get('GOOGLE_AUTH_CLIENT_ID'),
            });
            const { email, name } = ticket.getPayload();
            let user = await this.usersService.getByEmail(email);
            if (!user) {
                user = await this.usersService.create({
                    email,
                    firstName: name,
                    lastName: name,
                });
            }
            const { password, ...userData } = user;
            return await this.jwtUtilityService.sign(userData);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }
    async signUpWithEmail(data) {
        try {
            const password = await bcrypt.hash(data.password, 10);
            const user = await db_1.default.user.create({
                data: {
                    ...data,
                    password,
                },
            });
            delete user.password;
            const emailVerifyToken = await this.dmtNodemailerEmailService.sendVerificationLink(data.email);
            await db_1.default.user.update({
                where: { id: user.id },
                data: { emailVerifyToken, updatedAt: new Date() },
            });
            const token = await this.jwtUtilityService.sign(user);
            return { user, token };
        }
        catch (e) {
            if (e instanceof library_1.PrismaClientKnownRequestError) {
                if (e.code === prisma_error_constant_1.PRISMA_ERROR.uniqueConstriant)
                    throw new api_error_1.ApiError('Email address must be unique');
            }
            throw e;
        }
    }
    async resendEmailConfirmation(email) {
        try {
            const user = await this.usersService.getByEmail(email);
            if (!user) {
                return Promise.reject(new common_1.BadRequestException('User not found. Cannot send verify email!'));
            }
            if (user.isEmailConfirmed) {
                return Promise.reject(new common_1.BadRequestException('Email already confirmed'));
            }
            const emailVerifyToken = await this.dmtNodemailerEmailService.sendVerificationLink(user.email);
            await db_1.default.user.update({
                where: { id: user.id },
                data: { emailVerifyToken, updatedAt: new Date() },
            });
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }
    async emailConfirmation({ token }) {
        try {
            const payload = await this.jwtUtilityService.verify(token);
            this.logger.log(`emailConfirmation - payload - ${JSON.stringify(payload)}`);
            if (typeof payload === 'object' && 'email' in payload) {
                const user = await this.usersService.getByEmail(payload.email);
                if (!user) {
                    return Promise.reject(new common_1.UnprocessableEntityException('User not found. Cannot confirm email!'));
                }
                if (user.isEmailConfirmed) {
                    return Promise.reject(new common_1.BadRequestException('Email already confirmed'));
                }
                if (user.emailVerifyToken !== token) {
                    return Promise.reject(new common_1.BadRequestException('Invalid token!'));
                }
                await this.usersService.markEmailAsConfirmed(payload.email);
            }
            else {
                return Promise.reject(new common_1.BadRequestException('Token verification has been failed!'));
            }
        }
        catch (e) {
            console.error(e);
            if (e?.name === 'TokenExpiredError') {
                return Promise.reject(new common_1.BadRequestException('Email confirmation token expired'));
            }
            if (e?.name == 'JsonWebTokenError' && e?.message == 'invalid signature') {
                return Promise.reject(new common_1.BadRequestException('Invalid token!'));
            }
            return Promise.reject(e);
        }
    }
    async forgotPassword(email) {
        try {
            const user = await this.usersService.getByEmail(email);
            if (!user) {
                return Promise.reject(new common_1.BadRequestException('User not found. Cannot send reset password email!'));
            }
            const passwordResetToken = await this.dmtNodemailerEmailService.sendResetPasswordEmail(user.email);
            await db_1.default.user.update({
                where: { id: user.id },
                data: { passwordResetToken, updatedAt: new Date() },
            });
        }
        catch (e) {
            console.error(e);
            return Promise.reject(e);
        }
    }
    async resetPassword(token, password) {
        try {
            const payload = await this.jwtUtilityService.verify(token);
            this.logger.log(`resetPassword - payload - ${JSON.stringify(payload)}`);
            if (typeof payload === 'object' && 'email' in payload) {
                const user = await this.usersService.getByEmail(payload.email);
                if (!user) {
                    return Promise.reject(new common_1.BadRequestException('Invalid token!. User not found. Cannot reset password!'));
                }
                if (user.passwordResetToken !== token) {
                    return Promise.reject(new common_1.BadRequestException('Invalid token!'));
                }
                password = await bcrypt.hash(password, 10);
                await db_1.default.user.update({
                    where: { id: user.id },
                    data: { password, updatedAt: new Date() },
                });
            }
            else {
                return Promise.reject(new common_1.BadRequestException('Token verification has been failed!'));
            }
        }
        catch (e) {
            console.error(e);
            if (e?.name === 'TokenExpiredError') {
                return Promise.reject(new common_1.BadRequestException('Password reset token expired'));
            }
            if (e?.name == 'JsonWebTokenError' && e?.message == 'invalid signature') {
                return Promise.reject(new common_1.BadRequestException('Invalid token!'));
            }
            return Promise.reject(e);
        }
    }
    async login(loginDto) {
        const user = await db_1.default.user.findFirst({
            where: {
                email: loginDto.email,
            },
        });
        if (!user)
            throw new api_error_1.ApiError('User does not exist');
        if (user.status == client_1.EnumUserStatus.BLOCKED) {
            throw new common_1.UnauthorizedException('Unauthorized: User is BLOCKED!');
        }
        if (!user.isEmailConfirmed) {
            throw new common_1.UnauthorizedException('Unauthorized: Please verify your email!');
        }
        const isValidPassword = await bcrypt.compare(loginDto.password, user.password);
        if (!isValidPassword)
            throw new common_1.UnauthorizedException('Invalid password, please try again.');
        delete user.password;
        const token = await this.jwtUtilityService.sign(user);
        return { user, token };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [dmt_nodemailer_email_service_1.DmtNodemailerEmailService,
        config_1.ConfigService,
        jwt_utility_service_1.JwtUtilityService,
        users_service_1.UsersService])
], AuthService);
//# sourceMappingURL=auth.service.js.map