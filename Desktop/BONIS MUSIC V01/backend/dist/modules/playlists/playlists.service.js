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
exports.PlaylistsService = void 0;
const common_1 = require("@nestjs/common");
const supabase_js_1 = require("@supabase/supabase-js");
let PlaylistsService = class PlaylistsService {
    constructor() {
        this.supabase = (0, supabase_js_1.createClient)(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE);
    }
    async getAllPlaylists(userId) {
        let query = this.supabase.from('playlists').select('*');
        if (userId) {
            query = query.eq('user_id', userId);
        }
        const { data, error } = await query.order('created_at', { ascending: false });
        if (error)
            throw error;
        return data;
    }
    async getPlaylistById(id) {
        const { data, error } = await this.supabase
            .from('playlists')
            .select('*')
            .eq('id', id)
            .single();
        if (error)
            throw error;
        return data;
    }
    async createPlaylist(createDto) {
        const { data, error } = await this.supabase
            .from('playlists')
            .insert(createDto)
            .select()
            .single();
        if (error)
            throw error;
        return data;
    }
    async updatePlaylist(id, updateDto) {
        const { data, error } = await this.supabase
            .from('playlists')
            .update(updateDto)
            .eq('id', id)
            .select()
            .single();
        if (error)
            throw error;
        return data;
    }
    async deletePlaylist(id) {
        const { error } = await this.supabase
            .from('playlists')
            .delete()
            .eq('id', id);
        if (error)
            throw error;
        return { message: 'Playlist deleted successfully' };
    }
    async getPlaylistItems(playlistId) {
        const { data, error } = await this.supabase
            .from('playlist_items')
            .select('*')
            .eq('playlist_id', playlistId)
            .order('position', { ascending: true });
        if (error)
            throw error;
        return data;
    }
    async addItemToPlaylist(playlistId, item) {
        const { data, error } = await this.supabase
            .from('playlist_items')
            .insert({
            playlist_id: playlistId,
            content_type: item.content_type,
            content_id: item.content_id,
            position: item.position || 0
        })
            .select()
            .single();
        if (error)
            throw error;
        return data;
    }
    async removeItemFromPlaylist(itemId) {
        const { error } = await this.supabase
            .from('playlist_items')
            .delete()
            .eq('id', itemId);
        if (error)
            throw error;
        return { message: 'Item removed from playlist' };
    }
};
exports.PlaylistsService = PlaylistsService;
exports.PlaylistsService = PlaylistsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], PlaylistsService);
//# sourceMappingURL=playlists.service.js.map