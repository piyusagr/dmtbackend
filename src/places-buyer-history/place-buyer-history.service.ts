import { Injectable, NotFoundException } from '@nestjs/common';
import { PlaceBuyerHistoryRepository } from './place-buyer-history.repository';
import { CreatePlaceBuyerHistoryDto } from './dto/create-place-buyer-history.dto';
import { UpdatePlaceBuyerHistoryDto } from './dto/update-place-buyer-history.dto';

@Injectable()
export class PlaceBuyerHistoryService {
  constructor(
    private readonly placeBuyerHistoryRepository: PlaceBuyerHistoryRepository
  ) { }

  async create(userId: number, createPlaceBuyerHistoryDto: CreatePlaceBuyerHistoryDto) {
    const { paymentId, placeId, longOfStay } = createPlaceBuyerHistoryDto;

    return await this.placeBuyerHistoryRepository.create({
      // isApproved: false,
      longOfStay,
      Payment: { connect: { id: paymentId } },
      Buyer: { connect: { id: userId } },
      Place: { connect: { id: placeId } }
    });
  }

  async findAll() {
    return this.placeBuyerHistoryRepository.findAll();
  }

  async findOne(id: string) {
    const buyerHistory = await this.placeBuyerHistoryRepository.findOne(id);
    if (!buyerHistory) {
      throw new NotFoundException();
    }
    return buyerHistory;
  }

  async update(id: string, updatePlaceBuyerHistoryDto: UpdatePlaceBuyerHistoryDto) {
    await this.findOne(id);

    const { isApproved, isRefunded } = updatePlaceBuyerHistoryDto;

    return await this.placeBuyerHistoryRepository.update(id, {
      isApproved, isRefunded
    })
  }

  async remove(id: string) {
    await this.findOne(id);

    return await this.placeBuyerHistoryRepository.delete(id);
  }
}
