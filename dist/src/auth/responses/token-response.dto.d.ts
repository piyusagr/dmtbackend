import { GeneralResponseDto } from '../../../common/responses/general-response.dto';
declare class TokenResponse {
    token: string;
}
export declare class TokenResponseDto extends GeneralResponseDto {
    data: TokenResponse;
}
export {};
