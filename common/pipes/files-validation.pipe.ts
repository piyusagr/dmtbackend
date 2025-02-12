import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  Logger,
  PipeTransform,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class FilesValidationPipe implements PipeTransform {
  private defaultSizeLimit = 5 * 1000 * 1000;
  private defaultValidFileTypes = [
    'image/jpeg',
    'image/webp',
    'image/png',
    'image/jpg',
    'image/bmp',
  ];
  private logger = new Logger(FilesValidationPipe.name);

  transform(
    files: Request['files'], // This now expects { [fieldname: string]: File[] }
    metadata: ArgumentMetadata,
  ) {
    // Loop through the files object for each field
    if (files && typeof files === 'object') {
      Object.keys(files).forEach((fieldname) => {
        const fileArray = files[fieldname];
        if (Array.isArray(fileArray)) {
          // Validate each file in the array
          this.validateFilesArray(fileArray);
        } else {
          // Validate single file
          this.validateFile(fileArray);
        }
      });
    }
    return files;
  }

  private isValidSize(file: Express.Multer.File) {
    return file.size <= this.defaultSizeLimit;
  }

  private isValidType(file: Express.Multer.File) {
    return this.defaultValidFileTypes.includes(file.mimetype);
  }

  private validateFilesArray(files: Array<Express.Multer.File>) {
    if (!files?.length) return undefined;

    if (!files.every((file) => this.isValidSize(file)))
      throw new BadRequestException('File size is too large');

    if (!files.every((file) => this.isValidType(file)))
      throw new BadRequestException('Contains invalid file type');

    return files;
  }

  private validateFile(file: Express.Multer.File) {
    if (!file) return undefined;

    if (!this.isValidSize(file))
      throw new BadRequestException('File size is too large');

    if (!this.isValidType(file))
      throw new BadRequestException('Contains invalid file type');

    return file;
  }
}
