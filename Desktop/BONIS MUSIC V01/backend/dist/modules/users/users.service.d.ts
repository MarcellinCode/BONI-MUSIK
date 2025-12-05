export declare class UsersService {
    private supabase;
    constructor();
    createUser(userData: any): Promise<any>;
    getAllUsers(): Promise<any[]>;
    blockUser(userId: string): Promise<{
        success: boolean;
        message: string;
    }>;
    unblockUser(userId: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
