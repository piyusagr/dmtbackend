import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventBuyerHistoryDto } from './dto/create-event-buyer-history.dto';
import { UpdateEventBuyerHistoryDto } from './dto/update-event-buyer-history.dto';
import { EventBuyerHistoryRepository } from './event-buyer-history.repository';

@Injectable()
export class EventBuyerHistoryService {
  constructor(
    private readonly buyerHistoryRepository: EventBuyerHistoryRepository
  ) { }

  async create(userId: number, createEventBuyerHistoryDto: CreateEventBuyerHistoryDto) {
    const { paymentId, eventId } = createEventBuyerHistoryDto;

    return await this.buyerHistoryRepository.create({
      // isApproved: false,
      Payment: { connect: { id: paymentId } },
      Buyer: { connect: { id: userId } },
      Event: { connect: { id: eventId } }
    });
  }

  async findAll() {
    return this.buyerHistoryRepository.findAll();
  }

  async findOne(id: string) {
    const eventBuyerHistory = await this.buyerHistoryRepository.findOne(id);
    if (!eventBuyerHistory) {
      throw new NotFoundException();
    }
    return eventBuyerHistory;
  }

  async update(id: string, updateEventBuyerHistoryDto: UpdateEventBuyerHistoryDto) {
    await this.findOne(id);

    const { isApproved, isRefunded } = updateEventBuyerHistoryDto;

    return await this.buyerHistoryRepository.update(id, {
      isApproved, isRefunded
    })
  }

  async remove(id: string) {
    await this.findOne(id);

    return await this.buyerHistoryRepository.delete(id);
  }
}
