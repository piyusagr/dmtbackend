"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUpdatedBeds = void 0;
const getUpdatedBeds = (updateRoomDto) => {
    if (!updateRoomDto?.beds || !updateRoomDto.beds?.length)
        return;
    const bedsResponse = updateRoomDto.beds.reduce((acc, bed) => {
        if (!bed.id && bed.amount && bed.bed_type) {
            acc.created.data.push({
                amount: bed.amount,
                bed_type: bed.bed_type
            });
            return acc;
        }
        acc.updated.push({ where: { id: bed.id }, data: bed });
        return acc;
    }, {
        created: { data: [] },
        updated: []
    });
    return bedsResponse;
};
exports.getUpdatedBeds = getUpdatedBeds;
//# sourceMappingURL=room.helpers.js.map