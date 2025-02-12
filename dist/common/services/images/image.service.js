"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageService = exports.IImageService = void 0;
const common_1 = require("@nestjs/common");
const s3_image_service_1 = require("./s3-image.service");
class IImageService {
}
exports.IImageService = IImageService;
class ImageService {
    constructor(provider) {
        this.provider = provider;
        this.provider = provider || new s3_image_service_1.S3ImageService();
    }
    uploadImage(fileOptions) {
        const response = this.provider.uploadImage(fileOptions);
        return response;
    }
    async uploadImages(images) {
        try {
            const transformedImages = this.transformImages(images);
            const imageUris = await this.provider.uploadImages(transformedImages);
            return imageUris;
        }
        catch (error) {
            throw new common_1.BadGatewayException(error);
        }
    }
    transformImages(images) {
        return images.map((image) => ({
            ...image,
            originalname: encodeURIComponent(image.originalname),
        }));
    }
    async deleteImage(imageUUID) {
        return this.provider.deleteImage(imageUUID);
    }
    getImage() {
        return this.provider.getImage();
    }
    getImages() {
        return this.provider.getImages();
    }
}
exports.ImageService = ImageService;
//# sourceMappingURL=image.service.js.map