export declare class VideosService {
    private supabase;
    constructor();
    getAllVideos(search?: string): Promise<any[]>;
    getVideoById(id: string): Promise<any>;
    createVideo(dto: any): Promise<any>;
    updateVideo(id: string, dto: any): Promise<any[]>;
    deleteVideo(id: string): Promise<{
        success: boolean;
    }>;
}
