import { LoginDto } from './dto/login.dto';
import { ConfirmEmailDto, SignInWithGoogleDto, SignUpWithEmailDto } from './dto';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { DmtNodemailerEmailService } from '../../common/services/email/dmt-nodemailer-email.service';
import { JwtUtilityService } from '../../common/services/jwt/jwt-utility.service';
export declare class AuthService {
    private readonly dmtNodemailerEmailService;
    private readonly configService;
    private readonly jwtUtilityService;
    private readonly usersService;
    private client;
    private logger;
    constructor(dmtNodemailerEmailService: DmtNodemailerEmailService, configService: ConfigService, jwtUtilityService: JwtUtilityService, usersService: UsersService);
    signInWithGoogle(data: SignInWithGoogleDto): Promise<string>;
    signUpWithEmail(data: SignUpWithEmailDto): Promise<{
        user: {
            id: number;
            createdAt: Date;
            status: import(".prisma/client").$Enums.EnumUserStatus;
            country: string | null;
            updatedAt: Date;
            firstName: string;
            lastName: string;
            email: string;
            password: string | null;
            phoneNumber: string | null;
            role: import(".prisma/client").$Enums.EnumUserRole;
            isSeller: boolean;
            isEmailConfirmed: boolean;
            isPhoneNumberConfirmed: boolean;
            isCountryConfirmed: boolean;
            emailVerifyToken: string | null;
            passwordResetToken: string | null;
        };
        token: string;
    }>;
    resendEmailConfirmation(email: string): Promise<never>;
    emailConfirmation({ token }: ConfirmEmailDto): Promise<never>;
    forgotPassword(email: string): Promise<never>;
    resetPassword(token: string, password: string): Promise<never>;
    login(loginDto: LoginDto): Promise<{
        user: {
            id: number;
            createdAt: Date;
            status: import(".prisma/client").$Enums.EnumUserStatus;
            country: string | null;
            updatedAt: Date;
            firstName: string;
            lastName: string;
            email: string;
            password: string | null;
            phoneNumber: string | null;
            role: import(".prisma/client").$Enums.EnumUserRole;
            isSeller: boolean;
            isEmailConfirmed: boolean;
            isPhoneNumberConfirmed: boolean;
            isCountryConfirmed: boolean;
            emailVerifyToken: string | null;
            passwordResetToken: string | null;
        };
        token: string;
    }>;
}
