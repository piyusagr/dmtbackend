import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { Request } from 'express';
export declare class FilesValidationPipe implements PipeTransform {
    private defaultSizeLimit;
    private defaultValidFileTypes;
    private logger;
    transform(files: Request['files'], metadata: ArgumentMetadata): {
        [fieldname: string]: Express.Multer.File[];
    } | Express.Multer.File[];
    private isValidSize;
    private isValidType;
    private validateFilesArray;
    private validateFile;
}
