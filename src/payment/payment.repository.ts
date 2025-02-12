import prisma from '../../config/db';
import { ConflictException, Injectable, Logger } from "@nestjs/common";
import { Prisma } from '@prisma/client';
import { errorMessage } from './constant/payment-error-message.constant';

@Injectable()
export class PaymentRepository {
  private logger = new Logger(PaymentRepository.name);

  async getPaymentSetting() {
    try {
      return await prisma.paymentSetting.findFirst({
        where: { id: 1 }
      });
    } catch (error) {
      this.logger.error(error);
      throw new ConflictException(errorMessage.dbRelatedError);
    }
  }

  async createPayment(paymentRecord: Prisma.PaymentCreateInput) {
    try {
      return await prisma.payment.create({
        data: {
          ...paymentRecord
        }
      })
    } catch (error) {
      this.logger.error(error);
      throw new ConflictException(errorMessage.dbRelatedError);
    }
  }

  async updatePayment(refId: string, paymentRecord: Prisma.PaymentUpdateInput) {
    try {
      return await prisma.payment.update({
        where: { refId },
        data: {
          ...paymentRecord
        }
      })
    } catch (error) {
      this.logger.error(error);
      throw new ConflictException(errorMessage.dbRelatedError);
    }
  }

  async findOneById(id: string) {
    try {
      return await prisma.payment.findUnique({
        where: { id },
        include: {
          User: true
        }
      });
    } catch (error) {
      this.logger.error(error);
      throw new ConflictException(errorMessage.dbRelatedError);
    }
  }
  
  async findOneByRefId(refId: string) {
    try {
      return await prisma.payment.findUnique({
        where: { refId }
      });
    } catch (error) {
      this.logger.error(error);
      throw new ConflictException(errorMessage.dbRelatedError);
    }
  }
}