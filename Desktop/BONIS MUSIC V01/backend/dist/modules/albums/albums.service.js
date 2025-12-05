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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlbumsService = void 0;
const common_1 = require("@nestjs/common");
const supabase_js_1 = require("@supabase/supabase-js");
const uploads_service_1 = require("../uploads/uploads.service");
let AlbumsService = class AlbumsService {
    constructor(uploadsService) {
        this.uploadsService = uploadsService;
        this.supabase = (0, supabase_js_1.createClient)(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE);
    }
    async getAllAlbums(search) {
        let query = this.supabase.from('albums').select('*');
        if (search) {
            query = query.ilike('title', `%${search}%`);
        }
        const { data, error } = await query.order('created_at', { ascending: false });
        if (error)
            throw error;
        return data;
    }
    async getAlbumById(id) {
        const { data: album, error: albumError } = await this.supabase
            .from('albums')
            .select('*')
            .eq('id', id)
            .single();
        if (albumError)
            throw albumError;
        const { data: tracks, error: tracksError } = await this.supabase
            .from('tracks')
            .select('*')
            .eq('album_id', id);
        if (tracksError)
            throw tracksError;
        return Object.assign(Object.assign({}, album), { tracks });
    }
    async createAlbum(dto) {
        const { data, error } = await this.supabase.from('albums').insert([dto]).select();
        if (error)
            throw error;
        return data ? data[0] : null;
    }
    async updateAlbum(id, dto) {
        const { data, error } = await this.supabase
            .from('albums')
            .update(dto)
            .eq('id', id)
            .select();
        if (error)
            throw error;
        return data;
    }
    async deleteAlbum(id) {
        const { data, error } = await this.supabase
            .from('albums')
            .delete()
            .eq('id', id);
        if (error)
            throw error;
        return { success: true };
    }
    async addTrack(albumId, trackDto, file) {
        const sanitizedFilename = file.originalname
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-zA-Z0-9.]/g, '_');
        const fileUrl = await this.uploadsService.uploadFile('tracks', `albums/${albumId}/${Date.now()}_${sanitizedFilename}`, file);
        const trackData = {
            album_id: albumId,
            title: trackDto.title,
            duration: trackDto.duration,
            file_url: fileUrl,
            track_number: trackDto.track_number,
        };
        const { data, error } = await this.supabase.from('tracks').insert([trackData]).select();
        if (error)
            throw error;
        return data ? data[0] : null;
    }
    async deleteTrack(trackId) {
        const { data, error } = await this.supabase.from('tracks').delete().eq('id', trackId);
        if (error)
            throw error;
        return { success: true };
    }
};
exports.AlbumsService = AlbumsService;
exports.AlbumsService = AlbumsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [uploads_service_1.UploadsService])
], AlbumsService);
//# sourceMappingURL=albums.service.js.map