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
exports.TeachingsService = void 0;
const common_1 = require("@nestjs/common");
const supabase_js_1 = require("@supabase/supabase-js");
let TeachingsService = class TeachingsService {
    constructor() {
        this.supabase = (0, supabase_js_1.createClient)(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE);
    }
    async getAllTeachings(search) {
        let query = this.supabase.from('teachings').select('*');
        if (search) {
            query = query.ilike('title', `%${search}%`);
        }
        const { data, error } = await query.order('created_at', { ascending: false });
        if (error)
            throw error;
        return data;
    }
    async getTeachingById(id) {
        const { data, error } = await this.supabase
            .from('teachings')
            .select('*')
            .eq('id', id)
            .single();
        if (error)
            throw error;
        return data;
    }
    async createTeaching(dto) {
        const { data, error } = await this.supabase.from('teachings').insert([dto]).select();
        if (error)
            throw error;
        return data ? data[0] : null;
    }
    async updateTeaching(id, dto) {
        const { data, error } = await this.supabase
            .from('teachings')
            .update(dto)
            .eq('id', id)
            .select();
        if (error)
            throw error;
        return data;
    }
    async deleteTeaching(id) {
        const { data, error } = await this.supabase
            .from('teachings')
            .delete()
            .eq('id', id);
        if (error)
            throw error;
        return { success: true };
    }
};
exports.TeachingsService = TeachingsService;
exports.TeachingsService = TeachingsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], TeachingsService);
//# sourceMappingURL=teachings.service.js.map