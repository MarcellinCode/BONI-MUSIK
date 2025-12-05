import { AlbumsService } from './albums.service';
import { UploadsService } from '../uploads/uploads.service';
export declare class AlbumsController {
    private readonly albumsService;
    private readonly uploadsService;
    constructor(albumsService: AlbumsService, uploadsService: UploadsService);
    getAll(search?: string): Promise<any[]>;
    getOne(id: string): Promise<any>;
    create(createDto: any, file: Express.Multer.File): Promise<any>;
    update(id: string, updateDto: any, file: Express.Multer.File): Promise<any[]>;
    delete(id: string): Promise<{
        success: boolean;
    }>;
    addTrack(albumId: string, trackDto: any, file: Express.Multer.File): Promise<any>;
    deleteTrack(trackId: string): Promise<{
        success: boolean;
    }>;
}
