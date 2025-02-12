import { BookingPolicy, EnumBusinessNature, ListingStats, Prisma } from '@prisma/client';
import { Exactly } from '../../../helpers/type.helpers';
type PlaceWithImages = Prisma.PlaceCreateArgs['data'];
export declare class CreatePlaceDto implements Exactly<PlaceWithImages, CreatePlaceDto> {
    title: string;
    description: string;
    listing_status: ListingStats;
    latitude: number;
    longitude: number;
    businessNature: EnumBusinessNature;
    individualNbr?: string;
    individualTaxIdNbr?: string;
    businessRegistrationNbr?: string;
    businessTaxIdNbr?: string;
    street: string;
    city: string;
    province: string;
    postal_code: string;
    country: string;
    subtitle: string | null;
    place_type: string | null;
    booking_policy: BookingPolicy;
    images: Prisma.PlaceCreateArgs['data']['images'];
    rating?: number | null;
}
export {};
