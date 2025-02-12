/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RoomEntity } from '../../src/rooms/entities/room.entity';
import { UserEntity } from '../../src/users/entities/user.entity';
import { UserSession } from '../../types/user';

type Subjects = InferSubjects<typeof UserEntity | typeof RoomEntity> | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

@Injectable()
export class CaslAbilityFactory {
  createForUser(user?: UserSession) {
    if (!user)
      throw new UnauthorizedException(
        'You must be logged in to preform this action',
      );

    const { can, build } = new AbilityBuilder<AppAbility>(
      Ability as AbilityClass<AppAbility>,
    );

    if (user.role === 'ADMIN') {
      can(Action.Manage, 'all');
    }

    can<FlatRoomEntity>(Action.Create, RoomEntity, {
      'place.user_id': user.id,
    });
    can<FlatRoomEntity>(Action.Update, RoomEntity, {
      'place.user_id': user.id,
    });
    can(Action.Read, RoomEntity);

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}

type FlatRoomEntity = RoomEntity & {
  'place.user_id': number;
};
