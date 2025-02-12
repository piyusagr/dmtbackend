"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var FilesValidationPipe_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesValidationPipe = void 0;
const common_1 = require("@nestjs/common");
let FilesValidationPipe = FilesValidationPipe_1 = class FilesValidationPipe {
    constructor() {
        this.defaultSizeLimit = 5 * 1000 * 1000;
        this.defaultValidFileTypes = [
            'image/jpeg',
            'image/webp',
            'image/png',
            'image/jpg',
            'image/bmp',
        ];
        this.logger = new common_1.Logger(FilesValidationPipe_1.name);
    }
    transform(files, metadata) {
        if (files && typeof files === 'object') {
            Object.keys(files).forEach((fieldname) => {
                const fileArray = files[fieldname];
                if (Array.isArray(fileArray)) {
                    this.validateFilesArray(fileArray);
                }
                else {
                    this.validateFile(fileArray);
                }
            });
        }
        return files;
    }
    isValidSize(file) {
        return file.size <= this.defaultSizeLimit;
    }
    isValidType(file) {
        return this.defaultValidFileTypes.includes(file.mimetype);
    }
    validateFilesArray(files) {
        if (!files?.length)
            return undefined;
        if (!files.every((file) => this.isValidSize(file)))
            throw new common_1.BadRequestException('File size is too large');
        if (!files.every((file) => this.isValidType(file)))
            throw new common_1.BadRequestException('Contains invalid file type');
        return files;
    }
    validateFile(file) {
        if (!file)
            return undefined;
        if (!this.isValidSize(file))
            throw new common_1.BadRequestException('File size is too large');
        if (!this.isValidType(file))
            throw new common_1.BadRequestException('Contains invalid file type');
        return file;
    }
};
exports.FilesValidationPipe = FilesValidationPipe;
exports.FilesValidationPipe = FilesValidationPipe = FilesValidationPipe_1 = __decorate([
    (0, common_1.Injectable)()
], FilesValidationPipe);
//# sourceMappingURL=files-validation.pipe.js.map