import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import {
  EnumBusinessNature,
  EnumEventDateType,
  EnumEventType,
  EnumExperienceEventStatus,
  EnumHostSkillLevel,
  EnumListingPaidType,
} from '@prisma/client';
import { OnlineEventDTO } from './online-event.dto';
import { OnsiteEventDTO } from './onsite-event.dto';
import { Transform, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDTO {
  @ApiProperty()
  @IsOptional()
  @IsArray()
  photos?: string[];

  @ApiProperty()
  @IsString()
  location: string;

  @ApiProperty()
  @IsEnum(EnumBusinessNature)
  businessNature: EnumBusinessNature;

  @ApiProperty()
  @IsString()
  currency: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  individualNbr?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  individualTaxIdNbr?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  businessRegistrationNbr?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  businessTaxIdNbr?: string;

  @ApiProperty()
  @IsOptional()
  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  price?: number;

  @ApiProperty()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  isPaid: boolean;

  @ApiProperty()
  @IsEnum(EnumListingPaidType)
  @ValidateIf((o) => o.isPaid === true)
  listingPaidType: EnumListingPaidType;

  @ApiProperty()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @ValidateIf((o) => o.isPaid === true)
  noOfPromotionDays: number;

  @ApiProperty()
  @IsEnum(EnumEventType)
  eventType: EnumEventType;

  @ApiProperty()
  @IsString()
  @IsOptional()
  category?: string;

  @ApiProperty()
  @IsString()
  highlight: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  imageUrl?: string;

  @ApiProperty()
  @IsEnum(EnumEventDateType)
  dateType: EnumEventDateType;

  @ApiProperty()
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  nbrOfDays: number;

  @ApiProperty()
  @IsNumber()
  @Transform(({ value }) => parseFloat(value))
  hoursPerDay: number;

  @ApiProperty()
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  maxAttendances: number;

  @ApiProperty()
  @IsString()
  language: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(EnumExperienceEventStatus)
  status?: EnumExperienceEventStatus;

  @ApiProperty()
  @IsArray()
  @IsOptional()
  requirements?: string[];

  @ApiProperty()
  @IsString()
  @IsOptional()
  otherInformation?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  guestInformation?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  hostInformation?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  cancellationPolicy?: string;

  @ApiProperty()
  @IsEnum(EnumHostSkillLevel)
  hostSkillLevel: EnumHostSkillLevel;

  @ApiProperty()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  isDiscountAvailable: boolean;

  @ApiProperty()
  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  @ValidateIf((o) => o.isDiscountAvailable === true)
  discount: number;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  business?: string[];

  @ApiProperty()
  @IsOptional()
  @IsArray()
  experiential?: string[];

  @ApiProperty()
  @IsOptional()
  @IsString()
  healthAndWellness?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  specialInterest?: string;

  @ApiProperty()
  @IsOptional()
  @ValidateNested()
  @Type(() => OnlineEventDTO)
  onlineEvent?: OnlineEventDTO;

  @ApiProperty()
  @IsOptional()
  @ValidateNested()
  @Type(() => OnsiteEventDTO)
  onsiteEvent?: OnsiteEventDTO;
}
