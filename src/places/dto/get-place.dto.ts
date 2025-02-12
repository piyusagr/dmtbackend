import { Prisma } from '@prisma/client';
import { IsIncludeQuery } from '../../../common/decorators/swagger.decorators';

export class GetPlaceQueryDto implements Prisma.PlaceInclude {
  @IsIncludeQuery()
  rooms?: boolean = false;

  @IsIncludeQuery()
  reviews?: boolean = false;

  @IsIncludeQuery()
  bookings?: boolean = false;

  @IsIncludeQuery()
  _count?: boolean = false;
}
