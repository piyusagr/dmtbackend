import { BadGatewayException } from '@nestjs/common';
import { S3ImageService } from './s3-image.service';

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

export abstract class IImageService {
  abstract getImage(): string;
  abstract getImages(): string[];
  abstract uploadImage(fileOptions: FileOptions): Promise<ImageResponse>;
  abstract uploadImages(
    images: Express.Multer.File[],
  ): Promise<ImageResponse[]>;
  abstract deleteImage(imageUUID: string): Promise<any>;
}

export class ImageService implements IImageService {
  constructor(private provider: IImageService) {
    this.provider = provider || new S3ImageService();
  }

  uploadImage(fileOptions: FileOptions) {
    const response = this.provider.uploadImage(fileOptions);
    return response;
  }

  async uploadImages(images: Express.Multer.File[]): Promise<ImageResponse[]> {
    try {
      const transformedImages = this.transformImages(images);
      const imageUris = await this.provider.uploadImages(transformedImages);

      return imageUris;
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  /**
   * Transforms image names to valid names.
   */
  private transformImages(images: Express.Multer.File[]) {
    return images.map((image) => ({
      ...image,
      originalname: encodeURIComponent(image.originalname),
    }));
  }

  async deleteImage(imageUUID: string): Promise<any> {
    return this.provider.deleteImage(imageUUID);
  }

  getImage(): string {
    return this.provider.getImage();
  }

  getImages(): string[] {
    return this.provider.getImages();
  }
}
