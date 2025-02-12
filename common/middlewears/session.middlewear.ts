import * as session from 'express-session';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import prisma from '../../config/db';
import { User } from '@prisma/client';
import { UserSession } from '../../types/user';

const prismaSessionStore = new PrismaSessionStore(prisma, {
  checkPeriod: 2 * 60 * 1000,
});

export const userSession = session({
  secret: 'dawkdm123149ad',
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000,
  },
  store: prismaSessionStore,
  resave: false,
  saveUninitialized: false,
});

declare module 'express-session' {
  interface SessionData {
    user: UserSession;
  }
}
