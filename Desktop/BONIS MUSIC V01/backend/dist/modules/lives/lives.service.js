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
exports.LivesService = void 0;
const common_1 = require("@nestjs/common");
const supabase_js_1 = require("@supabase/supabase-js");
let LivesService = class LivesService {
    constructor() {
        this.supabase = (0, supabase_js_1.createClient)(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE);
    }
    async getLiveLinks() {
        const { data, error } = await this.supabase
            .from('live_links')
            .select('*');
        if (error)
            throw error;
        return data || [];
    }
    async updateLiveLinks(tiktok, facebook) {
        const { error: tiktokError } = await this.supabase
            .from('live_links')
            .upsert({
            platform: 'tiktok',
            url: tiktok.url,
            is_active: tiktok.is_active,
            updated_at: new Date().toISOString(),
        }, { onConflict: 'platform' });
        if (tiktokError)
            throw tiktokError;
        const { error: facebookError } = await this.supabase
            .from('live_links')
            .upsert({
            platform: 'facebook',
            url: facebook.url,
            is_active: facebook.is_active,
            updated_at: new Date().toISOString(),
        }, { onConflict: 'platform' });
        if (facebookError)
            throw facebookError;
        return { success: true };
    }
};
exports.LivesService = LivesService;
exports.LivesService = LivesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], LivesService);
//# sourceMappingURL=lives.service.js.map