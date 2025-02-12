import { GeneralResponseDto } from '../../../common/responses/general-response.dto';
import { UserResponse } from './user-response.dto';
declare class UserAndTokenResponse {
    token: string;
    user: UserResponse;
}
export declare class UserAndTokenResponseDto extends GeneralResponseDto {
    data: UserAndTokenResponse;
}
export {};
