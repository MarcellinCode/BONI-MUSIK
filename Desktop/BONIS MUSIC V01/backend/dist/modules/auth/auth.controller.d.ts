import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(body: any): Promise<{
        access_token: string;
        user: {
            id: any;
            phone_number: any;
            full_name: any;
        };
    }>;
    register(body: any): Promise<{
        access_token: string;
        user: {
            id: any;
            phone_number: any;
            full_name: any;
        };
    }>;
    sendResetCode(body: {
        phoneNumber: string;
    }): Promise<{
        success: boolean;
        message: string;
        code: string;
    }>;
    verifyResetCode(body: {
        phoneNumber: string;
        code: string;
    }): Promise<{
        success: boolean;
        message: string;
    }>;
    resetPassword(body: {
        phoneNumber: string;
        code: string;
        newPassword: string;
    }): Promise<{
        success: boolean;
        message: string;
    }>;
}
