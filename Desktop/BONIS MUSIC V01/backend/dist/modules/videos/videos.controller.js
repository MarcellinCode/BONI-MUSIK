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
exports.VideosController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const videos_service_1 = require("./videos.service");
const uploads_service_1 = require("../uploads/uploads.service");
let VideosController = class VideosController {
    constructor(videosService, uploadsService) {
        this.videosService = videosService;
        this.uploadsService = uploadsService;
    }
    async getAll(search) {
        return this.videosService.getAllVideos(search);
    }
    async getOne(id) {
        return this.videosService.getVideoById(id);
    }
    async create(createDto, files) {
        if (files.video) {
            const videoUrl = await this.uploadsService.uploadFile('videos', `videos/${Date.now()}_${files.video[0].originalname}`, files.video[0]);
            createDto.url = videoUrl;
        }
        if (files.thumbnail) {
            const thumbUrl = await this.uploadsService.uploadFile('covers', `thumbnails/${Date.now()}_${files.thumbnail[0].originalname}`, files.thumbnail[0]);
            createDto.thumbnail_url = thumbUrl;
        }
        return this.videosService.createVideo(createDto);
    }
    async update(id, updateDto, files) {
        if (files.video) {
            const videoUrl = await this.uploadsService.uploadFile('videos', `videos/${Date.now()}_${files.video[0].originalname}`, files.video[0]);
            updateDto.url = videoUrl;
        }
        if (files.thumbnail) {
            const thumbUrl = await this.uploadsService.uploadFile('covers', `thumbnails/${Date.now()}_${files.thumbnail[0].originalname}`, files.thumbnail[0]);
            updateDto.thumbnail_url = thumbUrl;
        }
        return this.videosService.updateVideo(id, updateDto);
    }
    async delete(id) {
        return this.videosService.deleteVideo(id);
    }
};
exports.VideosController = VideosController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VideosController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VideosController.prototype, "getOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'video', maxCount: 1 },
        { name: 'thumbnail', maxCount: 1 },
    ])),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], VideosController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'video', maxCount: 1 },
        { name: 'thumbnail', maxCount: 1 },
    ])),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], VideosController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VideosController.prototype, "delete", null);
exports.VideosController = VideosController = __decorate([
    (0, common_1.Controller)('api/videos'),
    __metadata("design:paramtypes", [videos_service_1.VideosService,
        uploads_service_1.UploadsService])
], VideosController);
//# sourceMappingURL=videos.controller.js.map