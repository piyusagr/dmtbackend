import { Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const logger = new Logger('DATABSE');

export const connectToDatabase = async () => {
  try {
    await prisma.$connect();
    logger.log('Databse connection established sucessfully. 📑');
  } catch (error) {
    logger.error('Databse connection failed.', error);
    process.exit(1);
  }
};
connectToDatabase();

export default prisma;
