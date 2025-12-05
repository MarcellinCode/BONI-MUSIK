import { JwtService } from '@nestjs/jwt';
import { SupabaseClient } from '@supabase/supabase-js';
export declare class AuthService {
    private jwtService;
    private supabase;
    constructor(jwtService: JwtService);
    getSupabaseClient(): SupabaseClient<any, "public", "public", any, any>;
    register(phoneNumber: string, password: string, fullName: string, email?: string): Promise<{
        access_token: string;
        user: {
            id: any;
            phone_number: any;
            full_name: any;
        };
    }>;
    login(phoneNumber: string, password: string): Promise<{
        access_token: string;
        user: {
            id: any;
            phone_number: any;
            full_name: any;
        };
    }>;
    sendResetCode(phoneNumber: string): Promise<{
        success: boolean;
        message: string;
        code: string;
    }>;
    verifyResetCode(phoneNumber: string, code: string): Promise<{
        success: boolean;
        message: string;
    }>;
    resetPassword(phoneNumber: string, code: string, newPassword: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
