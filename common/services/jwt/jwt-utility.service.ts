import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtUtilityService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async sign(payload: any) {
    try {
      const expirationTime = this.configService.get(
        'JWT_VERIFICATION_TOKEN_EXPIRATION_TIME',
      );

      const expiresIn =
        typeof expirationTime === 'number'
          ? `${expirationTime}s`
          : expirationTime;

      return this.jwtService.sign(payload, {
        secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
        expiresIn,
      });
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async verify(token: string) {
    try {
      const isVerified = await this.jwtService.verify(token, {
        secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
      });

      return isVerified;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
