import { FileOptions, IImageService, ImageResponse } from './image.service';
export declare class S3ImageService implements IImageService {
    private client;
    private bucket;
    private folderPath;
    private S3Uri;
    private logger;
    uploadImage(fileData: FileOptions): Promise<ImageResponse>;
    uploadImages(images: Express.Multer.File[]): Promise<ImageResponse[]>;
    deleteImage(imageKey: string): Promise<import("@aws-sdk/client-s3").DeleteObjectCommandOutput>;
    getImage(): string;
    getImages(): string[];
    private getImageURI;
    private getFilePath;
    private getFileTypeSuffix;
}
