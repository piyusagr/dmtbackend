import { ApiProperty } from '@nestjs/swagger';
import { Asset } from '@prisma/client';

export class AssetEntity implements Asset {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  original_name!: string;

  @ApiProperty()
  file_key!: string;

  @ApiProperty()
  url!: string;

  @ApiProperty()
  mimetype!: string;

  @ApiProperty()
  uid!: string;

  @ApiProperty()
  place_id!: number;

  @ApiProperty()
  eventListingId: string;

  @ApiProperty({ type: Date })
  createdAt!: Date;
}
