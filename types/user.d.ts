import { User } from '@prisma/client';

export type UserSession = Pick<
  User,
  | 'id'
  | 'firstName'
  | 'lastName'
  | 'role'
  | 'email'
  | 'phoneNumber'
  | 'isSeller'
  | 'isEmailConfirmed'
  | 'isPhoneNumberConfirmed'
>;
