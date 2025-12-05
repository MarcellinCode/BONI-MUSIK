import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getAllUsers(): Promise<any[]>;
    create(body: any): Promise<any>;
    blockUser(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
    unblockUser(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
