import { Injectable, NotFoundException } from '@nestjs/common';
import { EventBoosterBuyerHistoryRepository } from './event-booster-buyer-history.repository';
import { CreateEventBoosterBuyerHistoryDto } from './dto/create-event-booster-buyer-history.dto';
import { UpdateEventBoosterBuyerHistoryDto } from './dto/update-event-booster-buyer-history.dto';

@Injectable()
export class EventBoosterBuyerHistoryService {
  constructor(
    private readonly eventBoosterBuyerHistoryRepository: EventBoosterBuyerHistoryRepository
  ) { }

  async create(userId: number, createEventBoosterBuyerHistoryDto: CreateEventBoosterBuyerHistoryDto) {
    const { paymentId, eventId } = createEventBoosterBuyerHistoryDto;

    return await this.eventBoosterBuyerHistoryRepository.create({
      // isApproved: false,
      Payment: { connect: { id: paymentId } },
      Seller: { connect: { id: userId } },
      Event: { connect: { id: eventId } }
    });
  }

  async findAll() {
    return this.eventBoosterBuyerHistoryRepository.findAll();
  }

  async findOne(id: string) {
    const eventBuyerHistory = await this.eventBoosterBuyerHistoryRepository.findOne(id);
    if (!eventBuyerHistory) {
      throw new NotFoundException();
    }
    return eventBuyerHistory;
  }

  async update(id: string, updateEventBoosterBuyerHistoryDto: UpdateEventBoosterBuyerHistoryDto) {
    await this.findOne(id);

    const { isApproved, isRefunded } = updateEventBoosterBuyerHistoryDto;

    return await this.eventBoosterBuyerHistoryRepository.update(id, {
      isApproved, isRefunded
    })
  }

  async remove(id: string) {
    await this.findOne(id);

    return await this.eventBoosterBuyerHistoryRepository.delete(id);
  }
}
