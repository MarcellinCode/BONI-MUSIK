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
exports.TeachingsController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const teachings_service_1 = require("./teachings.service");
const uploads_service_1 = require("../uploads/uploads.service");
let TeachingsController = class TeachingsController {
    constructor(teachingsService, uploadsService) {
        this.teachingsService = teachingsService;
        this.uploadsService = uploadsService;
    }
    async getAll(search) {
        return this.teachingsService.getAllTeachings(search);
    }
    async getOne(id) {
        return this.teachingsService.getTeachingById(id);
    }
    async create(createDto, files) {
        if (files.file) {
            const fileUrl = await this.uploadsService.uploadFile('teachings', `teachings/${Date.now()}_${files.file[0].originalname}`, files.file[0]);
            createDto.file_url = fileUrl;
        }
        if (files.thumbnail) {
            const thumbUrl = await this.uploadsService.uploadFile('covers', `teachings/thumbnails/${Date.now()}_${files.thumbnail[0].originalname}`, files.thumbnail[0]);
            createDto.thumbnail_url = thumbUrl;
        }
        return this.teachingsService.createTeaching(createDto);
    }
    async update(id, updateDto, files) {
        if (files.file) {
            const fileUrl = await this.uploadsService.uploadFile('teachings', `teachings/${Date.now()}_${files.file[0].originalname}`, files.file[0]);
            updateDto.file_url = fileUrl;
        }
        if (files.thumbnail) {
            const thumbUrl = await this.uploadsService.uploadFile('covers', `teachings/thumbnails/${Date.now()}_${files.thumbnail[0].originalname}`, files.thumbnail[0]);
            updateDto.thumbnail_url = thumbUrl;
        }
        return this.teachingsService.updateTeaching(id, updateDto);
    }
    async delete(id) {
        return this.teachingsService.deleteTeaching(id);
    }
};
exports.TeachingsController = TeachingsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TeachingsController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TeachingsController.prototype, "getOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'file', maxCount: 1 },
        { name: 'thumbnail', maxCount: 1 },
    ])),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TeachingsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'file', maxCount: 1 },
        { name: 'thumbnail', maxCount: 1 },
    ])),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], TeachingsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TeachingsController.prototype, "delete", null);
exports.TeachingsController = TeachingsController = __decorate([
    (0, common_1.Controller)('api/teachings'),
    __metadata("design:paramtypes", [teachings_service_1.TeachingsService,
        uploads_service_1.UploadsService])
], TeachingsController);
//# sourceMappingURL=teachings.controller.js.map