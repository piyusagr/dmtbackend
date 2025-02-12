import { EnumUserRole } from '@prisma/client';
import { UserSession } from '../../../types/user';
export declare class UserSessionEntity implements UserSession {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    role: EnumUserRole;
    isSeller: boolean;
    isEmailConfirmed: boolean;
    isPhoneNumberConfirmed: boolean;
    isCountryConfirmed: boolean;
}
