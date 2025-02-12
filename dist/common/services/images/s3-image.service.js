"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var S3ImageService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3ImageService = void 0;
const common_1 = require("@nestjs/common");
const client_s3_1 = require("@aws-sdk/client-s3");
const uuid_1 = require("uuid");
let S3ImageService = S3ImageService_1 = class S3ImageService {
    constructor() {
        this.client = new client_s3_1.S3Client({
            region: 'eu2',
            endpoint: 'https://eu2.contabostorage.com',
            credentials: {
                accessKeyId: process.env.CONTABO_ACCESS_KEY_ID,
                secretAccessKey: process.env.CONTABO_SECRET_ACCESS_KEY,
            },
            forcePathStyle: true,
        });
        this.bucket = process.env.CONTABO_BUCKET_NAME;
        this.folderPath = `user-images`;
        this.S3Uri = 'https://eu2.contabostorage.com';
        this.logger = new common_1.Logger(S3ImageService_1.name);
    }
    async uploadImage(fileData) {
        const { originalname, mimetype, path, buffer, fieldname } = fileData;
        const uuidFileName = (0, uuid_1.v4)();
        const fileKey = `${this.getFilePath(path)}/${uuidFileName}.${this.getFileTypeSuffix(mimetype)}`;
        const CONFIG = {
            Bucket: this.bucket,
            Key: fileKey,
            Body: buffer,
            ContentType: mimetype,
        };
        const command = new client_s3_1.PutObjectCommand(CONFIG);
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
        }
        catch (error) {
            this.logger.error('Error uploading files to S3', error);
            throw new common_1.BadGatewayException(error);
        }
    }
    async uploadImages(images) {
        const imageUrls = await Promise.all(images.map(async (file) => {
            return await this.uploadImage(file);
        }));
        return imageUrls;
    }
    async deleteImage(imageKey) {
        const CONFIG = {
            Bucket: this.bucket,
            Key: imageKey,
        };
        const command = new client_s3_1.DeleteObjectCommand(CONFIG);
        try {
            const response = await this.client.send(command);
            return response;
        }
        catch (error) {
            this.logger.error('Error deleting file in S3');
            throw new common_1.ServiceUnavailableException(`Error deleting file in S3 ${error}`);
        }
    }
    getImage() {
        return '';
    }
    getImages() {
        return [];
    }
    getImageURI(fileKey) {
        return `${this.S3Uri}/${fileKey}`;
    }
    getFilePath(path) {
        return `${this.folderPath}${path ? `/${path}` : ''}`;
    }
    getFileTypeSuffix(type) {
        return type.split('/')[1];
    }
};
exports.S3ImageService = S3ImageService;
exports.S3ImageService = S3ImageService = S3ImageService_1 = __decorate([
    (0, common_1.Injectable)()
], S3ImageService);
//# sourceMappingURL=s3-image.service.js.map