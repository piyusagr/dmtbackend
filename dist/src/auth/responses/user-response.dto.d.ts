import { GeneralResponseDto } from '../../../common/responses/general-response.dto';
import { EnumUserRole, EnumUserStatus } from '@prisma/client';
export declare class UserResponse {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    country: string;
    role: EnumUserRole;
    isSeller: boolean;
    isEmailConfirmed: boolean;
    isPhoneNumberConfirmed: boolean;
    isCountryConfirmed: boolean;
    status: EnumUserStatus;
    createdAt: string;
    updatedAt: string;
}
export declare class UserResponseDto extends GeneralResponseDto {
    data: UserResponse;
}
