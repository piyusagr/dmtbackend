import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
export declare class JwtUtilityService {
    private readonly jwtService;
    private readonly configService;
    constructor(jwtService: JwtService, configService: ConfigService);
    sign(payload: any): Promise<string>;
    verify(token: string): Promise<any>;
}
