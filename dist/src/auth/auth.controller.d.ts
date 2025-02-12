import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ConfirmEmailDto, SignUpWithEmailDto, SignInWithGoogleDto, ResendVerifyEmailDto, ForgotPasswordDto, ResetPasswordDto } from './dto';
import { RequestWithUser } from '../../common/requests/request-with-user';
export declare class AuthController {
    private readonly authService;
    private logger;
    constructor(authService: AuthService);
    signInWithGoogle(signInWithGoogleDto: SignInWithGoogleDto, res: Response): Promise<void>;
    signUpWithEmail(req: Request, signUpWithEmailDto: SignUpWithEmailDto, res: Response): Promise<void>;
    resendEmailConfirmation(resendVerifyEmailDto: ResendVerifyEmailDto, res: Response): Promise<void>;
    emailConfirmation(confirmationData: ConfirmEmailDto, res: Response): Promise<void>;
    forgotPassword(forgotPasswordDto: ForgotPasswordDto, res: Response): Promise<void>;
    resetPassword(resetPasswordDto: ResetPasswordDto, res: Response): Promise<void>;
    signIn(loginDto: LoginDto, req: Request, res: Response): Promise<void>;
    logout(req: RequestWithUser): Promise<{
        result: string;
    }>;
    me(req: Request): Promise<import("../../types/user").UserSession>;
}
