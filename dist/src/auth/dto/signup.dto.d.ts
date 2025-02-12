import { User } from '@prisma/client';
import { Exactly } from '../../../helpers/type.helpers';
export declare class SignUpDto implements Exactly<User, SignUpDto> {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string | null;
}
