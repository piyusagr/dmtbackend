import { Prisma } from '@prisma/client';
import prisma from '../../config/db';
import { ConflictException, Injectable, Logger } from "@nestjs/common";

@Injectable()
export class PlaceBuyerHistoryRepository {
  private logger = new Logger(PlaceBuyerHistoryRepository.name);

  async create(data: Prisma.PlaceBuyerHistoryCreateInput) {
    try {
      return await prisma.placeBuyerHistory.create({
        data
      });
    } catch (error) {
      this.logger.error(error);
      throw new ConflictException("Fail to process data, please try again later.");
    }
  }

  async update(id: string, data: Prisma.PlaceBuyerHistoryUpdateInput) {
    try {
      return await prisma.placeBuyerHistory.update({
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
      return await prisma.placeBuyerHistory.findMany({});
    } catch (error) {
      this.logger.error(error);
      throw new ConflictException("Fail to process data, please try again later.");
    }
  }

  async findOne(id: string) {
    try {
      return await prisma.placeBuyerHistory.findUnique({
        where: { id }
      });
    } catch (error) {
      this.logger.error(error);
      throw new ConflictException("Fail to process data, please try again later.");
    }
  }

  async delete(id: string) {
    try {
      return await prisma.placeBuyerHistory.delete({
        where: { id }
      });
    } catch (error) {
      this.logger.error(error);
      throw new ConflictException("Fail to process data, please try again later.");
    }
  }


}