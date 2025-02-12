import { Prisma } from '@prisma/client';
import prisma from '../../config/db';
import { ConflictException, Injectable, Logger } from "@nestjs/common";

@Injectable()
export class EventBuyerHistoryRepository {
  private logger = new Logger(EventBuyerHistoryRepository.name);

  async create(data: Prisma.EventBuyerHistoryCreateInput) {
    try {
      return await prisma.eventBuyerHistory.create({
        data
      });
    } catch (error) {
      this.logger.error(error);
      throw new ConflictException("Fail to process data, please try again later.");
    }
  }

  async update(id: string, data: Prisma.EventBuyerHistoryUpdateInput) {
    try {
      return await prisma.eventBuyerHistory.update({
        where: { id },
        data
      });
    } catch (error) {
      this.logger.error(error);
      throw new ConflictException("Fail to process data, please try again later.");
    }
  }

  async findAll() {
    try {
      return await prisma.eventBuyerHistory.findMany({});
    } catch (error) {
      this.logger.error(error);
      throw new ConflictException("Fail to process data, please try again later.");
    }
  }

  async findOne(id: string) {
    try {
      return await prisma.eventBuyerHistory.findUnique({
        where: { id }
      });
    } catch (error) {
      this.logger.error(error);
      throw new ConflictException("Fail to process data, please try again later.");
    }
  }

  async delete(id: string) {
    try {
      return await prisma.eventBuyerHistory.delete({
        where: { id }
      });
    } catch (error) {
      this.logger.error(error);
      throw new ConflictException("Fail to process data, please try again later.");
    }
  }


}