"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlbumsController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const albums_service_1 = require("./albums.service");
const uploads_service_1 = require("../uploads/uploads.service");
let AlbumsController = class AlbumsController {
    constructor(albumsService, uploadsService) {
        this.albumsService = albumsService;
        this.uploadsService = uploadsService;
    }
    async getAll(search) {
        return this.albumsService.getAllAlbums(search);
    }
    async getOne(id) {
        return this.albumsService.getAlbumById(id);
    }
    async create(createDto, file) {
        try {
            console.log('Creating album with data:', createDto);
            console.log('File received:', file ? file.originalname : 'No file');
            if (file) {
                console.log('Uploading file to Supabase...');
                const sanitizedFilename = file.originalname
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '')
                    .replace(/[^a-zA-Z0-9.]/g, '_');
                const fileUrl = await this.uploadsService.uploadFile('covers', `albums/${Date.now()}_${sanitizedFilename}`, file);
                console.log('File uploaded successfully:', fileUrl);
                createDto.cover_url = fileUrl;
            }
            console.log('Creating album in database...');
            const result = await this.albumsService.createAlbum(createDto);
            console.log('Album created successfully:', result);
            return result;
        }
        catch (error) {
            console.error('Error creating album:', error);
            throw error;
        }
    }
    async update(id, updateDto, file) {
        if (file) {
            const sanitizedFilename = file.originalname
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/[^a-zA-Z0-9.]/g, '_');
            const fileUrl = await this.uploadsService.uploadFile('covers', `albums/${Date.now()}_${sanitizedFilename}`, file);
            updateDto.cover_url = fileUrl;
        }
        return this.albumsService.updateAlbum(id, updateDto);
    }
    async delete(id) {
        return this.albumsService.deleteAlbum(id);
    }
    async addTrack(albumId, trackDto, file) {
        return this.albumsService.addTrack(albumId, trackDto, file);
    }
    async deleteTrack(trackId) {
        return this.albumsService.deleteTrack(trackId);
    }
};
exports.AlbumsController = AlbumsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AlbumsController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AlbumsController.prototype, "getOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AlbumsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], AlbumsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AlbumsController.prototype, "delete", null);
__decorate([
    (0, common_1.Post)(':id/tracks'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], AlbumsController.prototype, "addTrack", null);
__decorate([
    (0, common_1.Delete)('tracks/:trackId'),
    __param(0, (0, common_1.Param)('trackId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AlbumsController.prototype, "deleteTrack", null);
exports.AlbumsController = AlbumsController = __decorate([
    (0, common_1.Controller)('api/albums'),
    __metadata("design:paramtypes", [albums_service_1.AlbumsService,
        uploads_service_1.UploadsService])
], AlbumsController);
//# sourceMappingURL=albums.controller.js.map