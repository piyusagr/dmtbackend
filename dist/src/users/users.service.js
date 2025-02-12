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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const database_error_1 = require("../../common/errors/database.error");
const db_1 = require("../../config/db");
const client_1 = require("@prisma/client");
const jwt_utility_service_1 = require("../../common/services/jwt/jwt-utility.service");
const twilio_service_1 = require("../../common/services/twilio/twilio.service");
let UsersService = class UsersService {
    constructor(jwtUtilityService, twilioService) {
        this.jwtUtilityService = jwtUtilityService;
        this.twilioService = twilioService;
    }
    async sendWhatsAppCode(user, country) {
        try {
            console.log(user.phoneNumber);
            const result = await this.twilioService.initiatePhoneNumberVerification(user.phoneNumber);
            const status = result.status;
            const valid = result.valid;
            await this.updateCountry(user.id, country);
            return { status, valid };
        }
        catch (e) {
            return Promise.reject(e);
        }
    }
    async checkWhatsAppCode(user, code) {
        try {
            const result = await this.twilioService.confirmPhoneNumber(user.phoneNumber, code);
            const status = result.status;
            const valid = result.valid;
            if (!valid || status !== 'approved') {
                return Promise.reject(new common_1.BadRequestException(`Wrong code provided. status : ${status} valid ${valid}`));
            }
            await this.markPhoneNumberAsConfirmed(user.id);
            return { status, valid };
        }
        catch (e) {
            console.log(e);
            return Promise.reject(e);
        }
    }
    async switchUserRoleBuyerSeller(user) {
        try {
            if (user.role === client_1.EnumUserRole.BUYER) {
                user.role = client_1.EnumUserRole.SELLER;
                user.isSeller = true;
            }
            else if (user.role === client_1.EnumUserRole.SELLER) {
                user.role = client_1.EnumUserRole.BUYER;
                user.isSeller = false;
            }
            else {
                return Promise.reject(new common_1.UnauthorizedException('Unauthorized user role!'));
            }
            const updateUser = await this.updateUserRole(user.id, user.role, user.isSeller);
            const token = await this.jwtUtilityService.sign(updateUser);
            return { user: updateUser, token };
        }
        catch (e) {
            return Promise.reject(e);
        }
    }
    async updateUserRole(userId, role, isSeller) {
        try {
            const updatedUser = await db_1.default.user.update({
                where: { id: userId },
                data: {
                    role,
                    isSeller,
                    updatedAt: new Date(),
                },
            });
            delete updatedUser.password;
            return updatedUser;
        }
        catch (e) {
            throw e;
        }
    }
    async updateUserStatus(data) {
        try {
            const { userId, status } = data;
            const user = await this.findByUserId(userId);
            if (user.status === status) {
                return Promise.reject(new common_1.BadRequestException(`User already in ${status} status!`));
            }
            const updatedUser = await db_1.default.user.update({
                where: { id: userId },
                data: {
                    status,
                    updatedAt: new Date(),
                },
            });
            delete updatedUser.password;
            return updatedUser;
        }
        catch (e) {
            throw e;
        }
    }
    async updateCountry(userId, country) {
        try {
            const updatedUser = await db_1.default.user.update({
                where: { id: userId },
                data: {
                    country,
                    updatedAt: new Date(),
                },
            });
            delete updatedUser.password;
            return updatedUser;
        }
        catch (e) {
            throw e;
        }
    }
    async create(data) {
        return db_1.default.user.create({ data });
    }
    async markEmailAsConfirmed(email) {
        return db_1.default.user.update({
            where: { email },
            data: {
                isEmailConfirmed: true,
                updatedAt: new Date(),
            },
        });
    }
    async getById(user_id) {
        return db_1.default.user.findFirst({
            where: { id: Number(user_id) },
        });
    }
    async getByEmail(email) {
        return db_1.default.user.findFirst({
            where: { email },
        });
    }
    async getByEmailAndToken(email, emailVerifyToken) {
        return db_1.default.user.findFirst({
            where: { email, emailVerifyToken },
        });
    }
    async findAll() {
        try {
            const users = await db_1.default.user.findMany({});
            return users.map((user) => {
                const { password, ...userWithoutPassword } = user;
                return userWithoutPassword;
            });
        }
        catch (error) {
            throw new database_error_1.DatabseError(error);
        }
    }
    async findByUserId(id) {
        try {
            const user = await db_1.default.user.findFirst({
                where: { id: id },
            });
            if (!user) {
                return Promise.reject(new common_1.NotFoundException('User not found'));
            }
            return user;
        }
        catch (error) {
            throw new database_error_1.DatabseError(error);
        }
    }
    async update(id, updateUserDto) {
        try {
            const updateData = { ...updateUserDto };
            if (updateUserDto.email) {
                updateData['isEmailConfirmed'] = false;
            }
            if (updateUserDto.phoneNumber) {
                updateData['isPhoneNumberConfirmed'] = false;
            }
            const user = await db_1.default.user.update({
                where: { id },
                data: updateData,
            });
            delete user['password'];
            return user;
        }
        catch (error) {
            throw new database_error_1.DatabseError(error);
        }
    }
    async markPhoneNumberAsConfirmed(id) {
        try {
            return await db_1.default.user.update({
                where: { id },
                data: {
                    isPhoneNumberConfirmed: true,
                    isCountryConfirmed: true,
                    updatedAt: new Date(),
                },
            });
        }
        catch (error) {
            throw new database_error_1.DatabseError(error);
        }
    }
    async remove(id) {
        try {
            return await db_1.default.user.delete({
                where: { id },
            });
        }
        catch (error) {
            throw new database_error_1.DatabseError(error);
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_utility_service_1.JwtUtilityService,
        twilio_service_1.TwilioService])
], UsersService);
//# sourceMappingURL=users.service.js.map