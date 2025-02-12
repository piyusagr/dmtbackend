import { PartialType } from '@nestjs/mapped-types';
import { CreatePlaceBookingDto } from './create-book-place.dto';

export class UpdateBookPlaceDto extends PartialType(CreatePlaceBookingDto) {}
