"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CaslAbilityFactory = exports.Action = void 0;
const ability_1 = require("@casl/ability");
const common_1 = require("@nestjs/common");
const room_entity_1 = require("../../src/rooms/entities/room.entity");
var Action;
(function (Action) {
    Action["Manage"] = "manage";
    Action["Create"] = "create";
    Action["Read"] = "read";
    Action["Update"] = "update";
    Action["Delete"] = "delete";
})(Action || (exports.Action = Action = {}));
let CaslAbilityFactory = class CaslAbilityFactory {
    createForUser(user) {
        if (!user)
            throw new common_1.UnauthorizedException('You must be logged in to preform this action');
        const { can, build } = new ability_1.AbilityBuilder(ability_1.Ability);
        if (user.role === 'ADMIN') {
            can(Action.Manage, 'all');
        }
        can(Action.Create, room_entity_1.RoomEntity, {
            'place.user_id': user.id,
        });
        can(Action.Update, room_entity_1.RoomEntity, {
            'place.user_id': user.id,
        });
        can(Action.Read, room_entity_1.RoomEntity);
        return build({
            detectSubjectType: (item) => item.constructor,
        });
    }
};
exports.CaslAbilityFactory = CaslAbilityFactory;
exports.CaslAbilityFactory = CaslAbilityFactory = __decorate([
    (0, common_1.Injectable)()
], CaslAbilityFactory);
//# sourceMappingURL=casl-ability.factory.js.map