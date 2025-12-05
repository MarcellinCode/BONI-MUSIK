import { VideosService } from './videos.service';
import { UploadsService } from '../uploads/uploads.service';
export declare class VideosController {
    private readonly videosService;
    private readonly uploadsService;
    constructor(videosService: VideosService, uploadsService: UploadsService);
    getAll(search?: string): Promise<any[]>;
    getOne(id: string): Promise<any>;
    create(createDto: any, files: {
        video?: Express.Multer.File[];
        thumbnail?: Express.Multer.File[];
    }): Promise<any>;
    update(id: string, updateDto: any, files: {
        video?: Express.Multer.File[];
        thumbnail?: Express.Multer.File[];
    }): Promise<any[]>;
    delete(id: string): Promise<{
        success: boolean;
    }>;
}
