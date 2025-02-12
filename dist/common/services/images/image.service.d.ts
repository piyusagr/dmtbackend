export interface FileOptions extends Omit<Express.Multer.File, 'path'> {
    path?: string;
}
export interface ImageResponse {
    fieldName: string;
    originalName: string;
    url: string;
    mimetype: string;
    uuid: string;
    filePath: string;
}
export declare abstract class IImageService {
    abstract getImage(): string;
    abstract getImages(): string[];
    abstract uploadImage(fileOptions: FileOptions): Promise<ImageResponse>;
    abstract uploadImages(images: Express.Multer.File[]): Promise<ImageResponse[]>;
    abstract deleteImage(imageUUID: string): Promise<any>;
}
export declare class ImageService implements IImageService {
    private provider;
    constructor(provider: IImageService);
    uploadImage(fileOptions: FileOptions): Promise<ImageResponse>;
    uploadImages(images: Express.Multer.File[]): Promise<ImageResponse[]>;
    private transformImages;
    deleteImage(imageUUID: string): Promise<any>;
    getImage(): string;
    getImages(): string[];
}
