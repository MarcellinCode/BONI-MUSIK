export declare class TeachingsService {
    private supabase;
    constructor();
    getAllTeachings(search?: string): Promise<any[]>;
    getTeachingById(id: string): Promise<any>;
    createTeaching(dto: any): Promise<any>;
    updateTeaching(id: string, dto: any): Promise<any[]>;
    deleteTeaching(id: string): Promise<{
        success: boolean;
    }>;
}
