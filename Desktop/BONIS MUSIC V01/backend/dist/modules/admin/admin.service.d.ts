import { JwtService } from '@nestjs/jwt';
export declare class AdminService {
    private jwtService;
    private supabase;
    constructor(jwtService: JwtService);
    login(email: string, password: string): Promise<{
        access_token: string;
        admin: {
            id: any;
            email: any;
            full_name: any;
        };
    }>;
}
