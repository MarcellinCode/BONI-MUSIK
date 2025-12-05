import { UploadsService } from '../uploads/uploads.service';
export declare class AlbumsService {
    private readonly uploadsService;
    private supabase;
    constructor(uploadsService: UploadsService);
    getAllAlbums(search?: string): Promise<any[]>;
    getAlbumById(id: string): Promise<any>;
    createAlbum(dto: any): Promise<any>;
    updateAlbum(id: string, dto: any): Promise<any[]>;
    deleteAlbum(id: string): Promise<{
        success: boolean;
    }>;
    addTrack(albumId: string, trackDto: any, file: Express.Multer.File): Promise<any>;
    deleteTrack(trackId: string): Promise<{
        success: boolean;
    }>;
}
