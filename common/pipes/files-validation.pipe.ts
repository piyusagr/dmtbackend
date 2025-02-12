/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  Logger,
  PipeTransform,
} from '@nestjs/common';

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
    files: Express.Multer.File[] | Express.Multer.File,
    metadata: ArgumentMetadata,
  ) {
    if (Array.isArray(files)) return this.validateFilesArray(files);

    return this.vaildateFile(files);
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
      throw new BadRequestException('File size is to large');

    if (!files.every((file) => this.isValidType(file)))
      throw new BadRequestException('Contains invalid file type');

    return files;
  }

  private vaildateFile(file: Express.Multer.File) {
    if (!file) return undefined;

    if (!this.isValidSize(file))
      throw new BadRequestException('File size is to large');

    if (!this.isValidType(file))
      throw new BadRequestException('Contains invalid file type');

    return file;
  }
}
