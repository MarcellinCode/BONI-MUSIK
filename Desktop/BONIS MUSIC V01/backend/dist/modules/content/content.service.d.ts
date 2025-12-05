export declare class ContentService {
    private supabase;
    constructor();
    getAllAlbums(): Promise<any[]>;
    getAllVideos(category?: string): Promise<any[]>;
    getAllTeachings(): Promise<any[]>;
}
