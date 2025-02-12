import { Asset } from '@prisma/client';
export declare class AssetEntity implements Asset {
    id: number;
    original_name: string;
    file_key: string;
    url: string;
    mimetype: string;
    uid: string;
    place_id: number;
    eventListingId: string;
    createdAt: Date;
}
