import {
  BadGatewayException,
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import {
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
  DeleteObjectCommand,
  DeleteObjectCommandInput,
} from '@aws-sdk/client-s3';
import { FileOptions, IImageService, ImageResponse } from './image.service';
import { v4 as uuidV4 } from 'uuid';

@Injectable()
export class S3ImageService implements IImageService {
  private client = new S3Client({
    region: 'eu2',
    endpoint: 'https://eu2.contabostorage.com',
    credentials: {
      accessKeyId: process.env.CONTABO_ACCESS_KEY_ID,
      secretAccessKey: process.env.CONTABO_SECRET_ACCESS_KEY,
    },
    forcePathStyle: true,
  });
  private bucket = process.env.CONTABO_BUCKET_NAME;
  private folderPath = `user-images`;
  private S3Uri = 'https://eu2.contabostorage.com';
  private logger = new Logger(S3ImageService.name);

  async uploadImage(fileData: FileOptions): Promise<ImageResponse> {
    const { originalname, mimetype, path, buffer, fieldname } = fileData;

    const uuidFileName = uuidV4();

    // prettier-ignore
    const fileKey = `${this.getFilePath(path)}/${uuidFileName}.${this.getFileTypeSuffix(mimetype)}`;

    const CONFIG: PutObjectCommandInput = {
      Bucket: this.bucket,
      Key: fileKey,
      Body: buffer,
      ContentType: mimetype,
    };

    const command = new PutObjectCommand(CONFIG);

    try {
      const response = await this.client.send(command);

      this.logger.verbose(response);

      return {
        url: this.getImageURI(fileKey),
        originalName: originalname,
        mimetype,
        uuid: uuidFileName,
        fieldName: fieldname,
        filePath: fileKey,
      };
    } catch (error) {
      this.logger.error('Error uploading files to S3', error);
      throw new BadGatewayException(error);
    }
  }

  async uploadImages(images: Express.Multer.File[]): Promise<ImageResponse[]> {
    const imageUrls = await Promise.all(
      images.map(async (file) => {
        return await this.uploadImage(file);
      }),
    );

    return imageUrls;
  }

  async deleteImage(imageKey: string) {
    const CONFIG: DeleteObjectCommandInput = {
      Bucket: this.bucket,
      Key: imageKey,
    };

    const command = new DeleteObjectCommand(CONFIG);

    try {
      const response = await this.client.send(command);

      return response;
    } catch (error) {
      this.logger.error('Error deleting file in S3');
      throw new ServiceUnavailableException(
        `Error deleting file in S3 ${error}`,
      );
    }
  }

  getImage(): string {
    return '';
  }

  getImages(): string[] {
    return [];
  }

  /**
   * Returns the image URI from the uploaded images
   * @param fileKey File name and path
   * @returns
   */
  private getImageURI(fileKey: string) {
    return `${this.S3Uri}/${fileKey}`;
  }

  private getFilePath(path?: string) {
    return `${this.folderPath}${path ? `/${path}` : ''}`;
  }

  private getFileTypeSuffix(type: string) {
    return type.split('/')[1];
  }
}
