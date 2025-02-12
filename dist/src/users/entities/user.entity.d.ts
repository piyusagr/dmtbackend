import { EnumUserRole, EnumUserStatus } from '@prisma/client';
export declare class UserEntity {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
    country: string;
    role: EnumUserRole;
    status: EnumUserStatus;
    isSeller: boolean;
    isEmailConfirmed: boolean;
    isPhoneNumberConfirmed: boolean;
    isCountryConfirmed: boolean;
    createdAt: Date;
    updatedAt: Date;
    constructor(user: UserEntity);
}
