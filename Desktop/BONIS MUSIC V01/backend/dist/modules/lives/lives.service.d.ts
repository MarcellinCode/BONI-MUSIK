export declare class LivesService {
    private supabase;
    constructor();
    getLiveLinks(): Promise<any[]>;
    updateLiveLinks(tiktok: any, facebook: any): Promise<{
        success: boolean;
    }>;
}
