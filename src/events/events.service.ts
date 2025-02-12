/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { EnumEventType } from '@prisma/client';
import { Prisma } from '@prisma/client';
import prisma from '../../config/db';
import { CreateEventDTO } from './dto/create-event.dto';
import { CreateEventRequestDTO } from './dto/create-event-request.dto';
import { UpdateEventRequestStatusDto } from './dto/update-event-request-status.dto';
import * as countryContinentArray from '../../common/constants/country-by-continent.json';
import { UserEntity } from '../users/entities/user.entity';
import {
  ImageResponse,
  ImageService,
} from '../../common/services/images/image.service';

const transformUrl = (images: ImageResponse): Prisma.AssetCreateInput => {
  const { mimetype, originalName, url, uuid, filePath } = images;
  return {
    url: url,
    mimetype: mimetype,
    original_name: originalName,
    uid: uuid,
    file_key: filePath,
  };
};

@Injectable()
export class EventsService {
  constructor(private readonly imageService: ImageService) {}

  async createEvent(
    data: CreateEventDTO,
    userId: number,
    user: UserEntity,
    files: Express.Multer.File[],
  ): Promise<any> {
    try {
      // if (!user.country) {
      //   return Promise.reject(
      //     new UnprocessableEntityException('Country is not found for user!'),
      //   );
      // }

      let event: any = {};

      if (data.eventType === EnumEventType.ONLINE) {
        if (!data.onlineEvent) {
          return Promise.reject(
            new BadRequestException('Online event details are missing'),
          );
        }

        const onlineEventData: any = data.onlineEvent;
        delete data.onlineEvent;

        const eventListingData = { ...data, sellerId: userId };

        if (files && files?.length > 0) {
          const uploadedFiles = await this.imageService.uploadImages(files);

          const fileTransaction = await prisma.$transaction(
            uploadedFiles.map((file) =>
              prisma.asset.create({ data: transformUrl(file) }),
            ),
          );

          eventListingData['files'] = {
            connect: fileTransaction.map((file) => ({ id: file.id })),
          };
        }

        const createdEventListing = await prisma.eventListing.create({
          data: eventListingData,
          include: { files: true },
        });

        onlineEventData.sellerId = userId;
        onlineEventData.eventListingId = createdEventListing.id;

        event = { ...createdEventListing };

        event.onlineEvent = await prisma.onlineEvent.create({
          data: onlineEventData,
        });
      } else if (data.eventType === EnumEventType.ONSITE) {
        if (!data.onsiteEvent) {
          return Promise.reject(
            new BadRequestException('Onsite event details are missing'),
          );
        }

        // const continentData = countryContinentArray.find(
        //   (item) => item.country === user.country,
        // );

        // if (
        //   continentData.continent !== 'Asia' &&
        //   continentData.continent !== 'Africa'
        // ) {
        //   return Promise.reject(
        //     new ForbiddenException('Country is not allowed!'),
        //   );
        // }

        const onsiteEventData: any = data.onsiteEvent;
        delete data.onsiteEvent;

        const eventListingData = { ...data, sellerId: userId };

        if (files && files?.length > 0) {
          const uploadedFiles = await this.imageService.uploadImages(files);

          const fileTransaction = await prisma.$transaction(
            uploadedFiles.map((file) =>
              prisma.asset.create({ data: transformUrl(file) }),
            ),
          );

          eventListingData['files'] = {
            connect: fileTransaction.map((file) => ({ id: file.id })),
          };
        }

        const createdEventListing = await prisma.eventListing.create({
          data: eventListingData,
          include: { files: true },
        });

        onsiteEventData.sellerId = userId;
        onsiteEventData.eventListingId = createdEventListing.id;

        event = { ...createdEventListing };

        event.onsiteEvent = await prisma.onsiteEvent.create({
          data: onsiteEventData,
        });
      } else {
        return Promise.reject(new BadRequestException('Invalid event type'));
      }

      return event;
    } catch (e) {
      throw e;
    }
  }

  async getEvents() {
    return prisma.eventListing.findMany({
      where: { isActive: true, isRetired: false },
      include: { OnlineEvent: true, OnsiteEvent: true, files: true },
    });
  }

  async getHostedEventsBySellerId(sellerId: number) {
    return prisma.eventListing.findMany({
      where: {
        sellerId,
        isRetired: false,
      },
      include: {
        OnlineEvent: true,
        OnsiteEvent: true,
        files: true,
      },
    });
  }

  async getEvent(eventListingId: string) {
    const event = await prisma.eventListing.findFirst({
      where: {
        id: eventListingId,
      },
      include: {
        OnlineEvent: true,
        OnsiteEvent: true,
        files: true,
        EventBoostedCategory: true,
      },
    });

    if (!event) {
      return Promise.reject(new NotFoundException('Event not found!'));
    }

    if (event.isRetired) {
      return Promise.reject(
        new NotFoundException('Event has been deleted and not found!'),
      );
    }

    return event;
  }

  async deleteEvent(eventListingId: string, userId: number) {
    try {
      const eventListing = await prisma.eventListing.findFirst({
        where: { id: eventListingId },
      });

      if (!eventListing) {
        return Promise.reject(new NotFoundException('Event listing not found'));
      }

      if (eventListing.isRetired) {
        return Promise.reject(
          new BadRequestException('The event has been deleted already.'),
        );
      }

      if (eventListing.eventType === EnumEventType.ONLINE) {
        const onlineEvent = await prisma.onlineEvent.findFirst({
          where: { eventListingId: eventListingId },
        });

        if (!onlineEvent) {
          return Promise.reject(
            new NotFoundException('Online event not found'),
          );
        }

        // await prisma.buyersOnlineEventRequest.deleteMany({where: {eventListingId}});
        await prisma.onlineEvent.update({
          where: {
            id: onlineEvent.id,
          },
          data: {
            isRetired: true,
          },
        });
      } else {
        const onsiteEvent = await prisma.onsiteEvent.findFirst({
          where: { eventListingId: eventListingId },
        });

        if (!onsiteEvent) {
          return Promise.reject(
            new NotFoundException('Onsite event not found'),
          );
        }

        // await prisma.buyersOnsiteEventRequest.deleteMany({where: {eventListingId}});
        await prisma.onsiteEvent.update({
          where: {
            id: onsiteEvent.id,
          },
          data: {
            isRetired: true,
          },
        });
      }

      await prisma.eventListing.update({
        where: {
          id: eventListingId,
        },
        data: {
          isRetired: true,
        },
      });
    } catch (e) {
      throw e;
    }
  }

  async createEventRequest(data: CreateEventRequestDTO, userId: number) {
    try {
      const eventListing = await prisma.eventListing.findFirst({
        where: { id: data.eventListingId },
      });

      if (!eventListing) {
        return Promise.reject(new NotFoundException('Event listing not found'));
      }

      if (eventListing.isRetired) {
        return Promise.reject(
          new NotFoundException(
            'Event listing not found. The event has been deleted.',
          ),
        );
      }

      if (eventListing.eventType === EnumEventType.ONLINE) {
        const onlineEvent = await prisma.onlineEvent.findFirst({
          where: { eventListingId: data.eventListingId },
        });

        if (!onlineEvent) {
          return Promise.reject(
            new NotFoundException('Online event not found'),
          );
        }

        const requestData = {
          ...data,
          buyerId: userId,
          eventId: onlineEvent.id,
        };

        return prisma.buyersOnlineEventRequest.create({ data: requestData });
      } else {
        const onsiteEvent = await prisma.onsiteEvent.findFirst({
          where: { eventListingId: data.eventListingId },
        });

        if (!onsiteEvent) {
          return Promise.reject(
            new NotFoundException('Onsite event not found'),
          );
        }

        const requestData = {
          ...data,
          buyerId: userId,
          eventId: onsiteEvent.id,
        };

        return prisma.buyersOnsiteEventRequest.create({ data: requestData });
      }
    } catch (e) {
      throw e;
    }
  }

  async getEventRequestsByEventId(eventListingId: string, userId: number) {
    try {
      const eventListing = await prisma.eventListing.findFirst({
        where: { id: eventListingId },
      });

      if (!eventListing) {
        return Promise.reject(new NotFoundException('Event listing not found'));
      }

      if (eventListing.eventType === EnumEventType.ONLINE) {
        return await prisma.buyersOnlineEventRequest.findMany({
          where: { eventListingId: eventListingId },
        });
      } else {
        return await prisma.buyersOnsiteEventRequest.findMany({
          where: { eventListingId: eventListingId },
        });
      }
    } catch (e) {
      throw e;
    }
  }

  async updateEventRequestStatus(data: UpdateEventRequestStatusDto) {
    try {
      const eventListing = await prisma.eventListing.findFirst({
        where: { id: data.eventListingId },
      });

      if (!eventListing) {
        return Promise.reject(new NotFoundException('Event listing not found'));
      }

      if (eventListing.isRetired) {
        return Promise.reject(
          new NotFoundException(
            'Event listing not found. The event has been deleted.',
          ),
        );
      }

      if (eventListing.eventType === EnumEventType.ONLINE) {
        return await prisma.buyersOnlineEventRequest.update({
          where: { id: data.eventRequestId },
          data: { status: data.status },
        });
      } else {
        return await prisma.buyersOnsiteEventRequest.update({
          where: { id: data.eventRequestId },
          data: { status: data.status },
        });
      }
    } catch (e) {
      throw e;
    }
  }

  async getReservationsForBuyer(buyerId: number) {
    const onlineEventRequests = await prisma.buyersOnlineEventRequest.findMany({
      where: {
        buyerId,
      },
      include: {
        Event: true,
        EventListing: true,
      },
    });

    const onsiteEventRequests = await prisma.buyersOnsiteEventRequest.findMany({
      where: {
        buyerId,
      },
      include: {
        Event: true,
        EventListing: true,
      },
    });

    return {
      online: onlineEventRequests,
      onsite: onsiteEventRequests,
    };
  }
}
