import { Ability, InferSubjects } from '@casl/ability';
import { RoomEntity } from '../../src/rooms/entities/room.entity';
import { UserEntity } from '../../src/users/entities/user.entity';
import { UserSession } from '../../types/user';
type Subjects = InferSubjects<typeof UserEntity | typeof RoomEntity> | 'all';
export type AppAbility = Ability<[Action, Subjects]>;
export declare enum Action {
    Manage = "manage",
    Create = "create",
    Read = "read",
    Update = "update",
    Delete = "delete"
}
export declare class CaslAbilityFactory {
    createForUser(user?: UserSession): AppAbility;
}
export {};
