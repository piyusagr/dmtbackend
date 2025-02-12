import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { UserSessionEntity } from './entity/user-session.entity';
import {
  ConfirmEmailDto,
  SignUpWithEmailDto,
  SignInWithGoogleDto,
  ResendVerifyEmailDto,
  ForgotPasswordDto,
  ResetPasswordDto,
} from './dto';
import { SuccessResponse } from '../../common/responses/success-response';
import { ErrorResponse } from '../../common/responses/error-response';
import { TokenResponseDto } from './responses/token-response.dto';
import { GeneralResponseDto } from '../../common/responses/general-response.dto';
import { UserAndTokenResponseDto } from './responses/user-and-token-response.dto';
import { RequestWithUser } from '../../common/requests/request-with-user';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  private logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  // new - ganesh

  @ApiResponse({ status: 200, type: TokenResponseDto })
  @Post('sign-in-google')
  async signInWithGoogle(
    @Body() signInWithGoogleDto: SignInWithGoogleDto,
    @Res() res: Response,
  ) {
    try {
      const token =
        await this.authService.signInWithGoogle(signInWithGoogleDto);
      SuccessResponse.sendSuccessResponse(
        res,
        HttpStatus.OK,
        { token },
        'The sign-in process with Google has been successful.',
      );
    } catch (err) {
      ErrorResponse.sendErrorResponse(res, err);
    }
  }

  @ApiResponse({ status: 201, type: TokenResponseDto })
  @Post('sign-up-email')
  async signUpWithEmail(
    @Req() req: Request,
    @Body() signUpWithEmailDto: SignUpWithEmailDto,
    @Res() res: Response,
  ) {
    try {
      const { token } =
        await this.authService.signUpWithEmail(signUpWithEmailDto);

      SuccessResponse.sendSuccessResponse(
        res,
        HttpStatus.CREATED,
        { token },
        'The sign-up process with email has been successful.',
      );
    } catch (err) {
      ErrorResponse.sendErrorResponse(res, err);
    }
  }

  @ApiResponse({ status: 200, type: GeneralResponseDto })
  @Post('resend-email-confirmation')
  async resendEmailConfirmation(
    @Body() resendVerifyEmailDto: ResendVerifyEmailDto,
    @Res() res: Response,
  ) {
    try {
      const result = await this.authService.resendEmailConfirmation(
        resendVerifyEmailDto.email,
      );
      SuccessResponse.sendSuccessResponse(
        res,
        HttpStatus.OK,
        result,
        'The verify email has been successfully sent.',
      );
    } catch (err) {
      ErrorResponse.sendErrorResponse(res, err);
    }
  }

  @ApiResponse({ status: 200, type: GeneralResponseDto })
  @Post('email-confirmation')
  async emailConfirmation(
    @Body() confirmationData: ConfirmEmailDto,
    @Res() res: Response,
  ) {
    try {
      await this.authService.emailConfirmation(confirmationData);
      SuccessResponse.sendSuccessResponse(
        res,
        HttpStatus.OK,
        null,
        'The email confirmation has been successful.',
      );
    } catch (err) {
      ErrorResponse.sendErrorResponse(res, err);
    }
  }

  @ApiResponse({ status: 200, type: GeneralResponseDto })
  @Post('forgot-password')
  async forgotPassword(
    @Body() forgotPasswordDto: ForgotPasswordDto,
    @Res() res: Response,
  ) {
    try {
      const result = await this.authService.forgotPassword(
        forgotPasswordDto.email,
      );
      SuccessResponse.sendSuccessResponse(
        res,
        HttpStatus.OK,
        result,
        'The reset password email has been successfully sent.',
      );
    } catch (err) {
      ErrorResponse.sendErrorResponse(res, err);
    }
  }

  @ApiResponse({ status: 200, type: GeneralResponseDto })
  @Post('reset-password')
  async resetPassword(
    @Body() resetPasswordDto: ResetPasswordDto,
    @Res() res: Response,
  ) {
    try {
      const result = await this.authService.resetPassword(
        resetPasswordDto.token,
        resetPasswordDto.password,
      );
      SuccessResponse.sendSuccessResponse(
        res,
        HttpStatus.OK,
        result,
        'Password reset successful.',
      );
    } catch (err) {
      ErrorResponse.sendErrorResponse(res, err);
    }
  }

  @ApiResponse({ status: 200, type: UserAndTokenResponseDto })
  @Post('sign-in')
  async signIn(
    @Body() loginDto: LoginDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const { user, token } = await this.authService.login(loginDto);

      SuccessResponse.sendSuccessResponse(
        res,
        HttpStatus.OK,
        {
          token,
          user,
        },
        'The sign-in process has been successful.',
      );
    } catch (err) {
      ErrorResponse.sendErrorResponse(res, err);
    }
  }

  // existed

  // @ApiResponse({ type: UserEntity })
  // @Post('signin')
  // async login(@Body() loginDto: LoginDto, @Req() req: Request) {
  //   const user = await this.authService.login(loginDto);
  //
  //   req.session.user = {
  //     id: user.id,
  //     firstName: user.firstName,
  //     lastName: user.lastName,
  //     email: user.email,
  //     phoneNumber: user.email,
  //     role: user.role,
  //     isSeller: user.isSeller,
  //     isEmailConfirmed: user.isEmailConfirmed,
  //     isPhoneNumberConfirmed: user.isPhoneNumberConfirmed,
  //   };
  //
  //   return user;
  // }

  @Post('logout')
  @HttpCode(200)
  async logout(@Req() req: RequestWithUser) {
    req.user = undefined;
    req.session.destroy(() => {
      this.logger.verbose('Destroyed session.');
    });

    return { result: 'Logout successful' };
  }

  @ApiResponse({ type: UserSessionEntity })
  @Get('me')
  async me(@Req() req: Request) {
    const userSession = req.session.user;

    if (!userSession) throw new UnauthorizedException('User is not logged in');

    return userSession;
  }
}
