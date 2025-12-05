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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const supabase_js_1 = require("@supabase/supabase-js");
const bcrypt = require("bcrypt");
const resetCodes = new Map();
let AuthService = class AuthService {
    constructor(jwtService) {
        this.jwtService = jwtService;
        this.supabase = (0, supabase_js_1.createClient)(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE);
    }
    getSupabaseClient() {
        return this.supabase;
    }
    async register(phoneNumber, password, fullName, email) {
        try {
            const { data: existingUser } = await this.supabase
                .from('users')
                .select('id')
                .eq('phone_number', phoneNumber)
                .single();
            if (existingUser) {
                throw new common_1.BadRequestException('Phone number already registered');
            }
            const saltRounds = 10;
            const passwordHash = await bcrypt.hash(password, saltRounds);
            const { data: newUser, error } = await this.supabase
                .from('users')
                .insert({
                phone_number: phoneNumber,
                password_hash: passwordHash,
                full_name: fullName,
                email: email || null,
            })
                .select('id, phone_number, full_name, created_at')
                .single();
            if (error) {
                throw new common_1.BadRequestException(error.message);
            }
            const payload = {
                sub: newUser.id,
                phone_number: newUser.phone_number
            };
            const access_token = this.jwtService.sign(payload);
            return {
                access_token,
                user: {
                    id: newUser.id,
                    phone_number: newUser.phone_number,
                    full_name: newUser.full_name,
                }
            };
        }
        catch (error) {
            throw error;
        }
    }
    async login(phoneNumber, password) {
        const { data: user, error } = await this.supabase
            .from('users')
            .select('id, phone_number, password_hash, full_name')
            .eq('phone_number', phoneNumber)
            .single();
        if (error || !user) {
            throw new common_1.UnauthorizedException('Invalid phone number or password');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid phone number or password');
        }
        const payload = {
            sub: user.id,
            phone_number: user.phone_number
        };
        const access_token = this.jwtService.sign(payload);
        return {
            access_token,
            user: {
                id: user.id,
                phone_number: user.phone_number,
                full_name: user.full_name,
            }
        };
    }
    async sendResetCode(phoneNumber) {
        try {
            const { data: user } = await this.supabase
                .from('users')
                .select('id')
                .eq('phone_number', phoneNumber)
                .single();
            if (!user) {
                throw new common_1.BadRequestException('Phone number not found');
            }
            const code = Math.floor(100000 + Math.random() * 900000).toString();
            resetCodes.set(phoneNumber, {
                code,
                expiresAt: Date.now() + 10 * 60 * 1000
            });
            console.log(`\n🔐 ====== RESET CODE ======`);
            console.log(`📞 Phone: ${phoneNumber}`);
            console.log(`🔑 Code: ${code}`);
            console.log(`⏰ Expires: ${new Date(Date.now() + 10 * 60 * 1000).toLocaleTimeString()}`);
            console.log(`===========================\n`);
            return {
                success: true,
                message: 'Code generated successfully',
                code: code
            };
        }
        catch (error) {
            console.error('Error generating reset code:', error);
            throw error;
        }
    }
    async verifyResetCode(phoneNumber, code) {
        const stored = resetCodes.get(phoneNumber);
        if (!stored) {
            throw new common_1.BadRequestException('No reset code found');
        }
        if (stored.expiresAt < Date.now()) {
            resetCodes.delete(phoneNumber);
            throw new common_1.BadRequestException('Code has expired');
        }
        if (stored.code !== code) {
            throw new common_1.BadRequestException('Invalid code');
        }
        return { success: true, message: 'Code verified' };
    }
    async resetPassword(phoneNumber, code, newPassword) {
        await this.verifyResetCode(phoneNumber, code);
        try {
            const saltRounds = 10;
            const passwordHash = await bcrypt.hash(newPassword, saltRounds);
            const { error } = await this.supabase
                .from('users')
                .update({ password_hash: passwordHash })
                .eq('phone_number', phoneNumber);
            if (error) {
                throw new common_1.BadRequestException('Could not reset password');
            }
            resetCodes.delete(phoneNumber);
            console.log(`✅ Password reset successfully for ${phoneNumber}`);
            return { success: true, message: 'Password reset successfully' };
        }
        catch (error) {
            console.error('Reset password error:', error);
            throw error;
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map