import { Prisma } from '@prisma/client';
import prisma from '../../config/db';
import { ConflictException, Injectable, Logger } from "@nestjs/common";

@Injectable()
export class EventBoosterBuyerHistoryRepository {
  private logger = new Logger(EventBoosterBuyerHistoryRepository.name);

  async create(data: Prisma.EventBoosterBuyerHistoryCreateInput) {
    try {
      return await prisma.eventBoosterBuyerHistory.create({
        data
      });
    } catch (error) {
      this.logger.error(error);
      throw new ConflictException("Fail to process data, please try again later.");
    }
  }

  async update(id: string, data: Prisma.EventBoosterBuyerHistoryUpdateInput) {
    try {
      return await prisma.eventBoosterBuyerHistory.update({
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
      return await prisma.eventBoosterBuyerHistory.findMany({});
    } catch (error) {
      this.logger.error(error);
      throw new ConflictException("Fail to process data, please try again later.");
    }
  }

  async findOne(id: string) {
    try {
      return await prisma.eventBoosterBuyerHistory.findUnique({
        where: { id }
      });
    } catch (error) {
      this.logger.error(error);
      throw new ConflictException("Fail to process data, please try again later.");
    }
  }

  async delete(id: string) {
    try {
      return await prisma.eventBoosterBuyerHistory.delete({
        where: { id }
      });
    } catch (error) {
      this.logger.error(error);
      throw new ConflictException("Fail to process data, please try again later.");
    }
  }


}