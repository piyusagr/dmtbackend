import { User } from '@prisma/client';
import { Exactly } from '../../../helpers/type.helpers';
export declare class LoginDto implements Exactly<User, LoginDto> {
    email: string;
    password: string;
}
