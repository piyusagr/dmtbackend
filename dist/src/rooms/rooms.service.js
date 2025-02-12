"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomsService = void 0;
const common_1 = require("@nestjs/common");
const db_1 = require("../../config/db");
const room_helpers_1 = require("./helpers/room.helpers");
let RoomsService = class RoomsService {
    async create(createRoomDto) {
        try {
            return await db_1.default.room.create({
                data: {
                    ...createRoomDto,
                    beds: {
                        createMany: { data: createRoomDto.beds, skipDuplicates: true },
                    },
                },
                include: { place: true, beds: true },
            });
        }
        catch (error) {
            return Promise.reject(error);
        }
    }
    async findAllByPlaceId(placeId) {
        try {
            return await db_1.default.room.findMany({
                where: {
                    place_id: placeId,
                },
                include: {
                    beds: true,
                },
            });
        }
        catch (error) {
            return Promise.reject(error);
        }
    }
    async findOneByPlaceId(placeId, roomId) {
        try {
            const room = await db_1.default.room.findFirst({
                where: {
                    id: roomId,
                    place_id: placeId,
                },
                include: {
                    place: true,
                    beds: true,
                },
            });
            if (!room) {
                return Promise.reject(new common_1.NotFoundException('Room not found'));
            }
            return room;
        }
        catch (error) {
            return Promise.reject(error);
        }
    }
    async update(id, updateRoomDto) {
        const beds = (0, room_helpers_1.getUpdatedBeds)(updateRoomDto);
        try {
            return await db_1.default.room.update({
                where: {
                    id: id,
                },
                data: {
                    ...updateRoomDto,
                    beds: {
                        updateMany: beds?.updated,
                        createMany: beds?.created,
                    },
                },
                include: { place: true, beds: true },
            });
        }
        catch (error) {
            return Promise.reject(error);
        }
    }
    async remove(id) {
        try {
            console.log(`room`, id);
            return await db_1.default.room.delete({
                where: {
                    id,
                },
            });
        }
        catch (error) {
            return Promise.reject(error);
        }
    }
};
exports.RoomsService = RoomsService;
exports.RoomsService = RoomsService = __decorate([
    (0, common_1.Injectable)()
], RoomsService);
//# sourceMappingURL=rooms.service.js.map