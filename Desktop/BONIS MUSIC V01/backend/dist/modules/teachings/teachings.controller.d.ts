import { TeachingsService } from './teachings.service';
import { UploadsService } from '../uploads/uploads.service';
export declare class TeachingsController {
    private readonly teachingsService;
    private readonly uploadsService;
    constructor(teachingsService: TeachingsService, uploadsService: UploadsService);
    getAll(search?: string): Promise<any[]>;
    getOne(id: string): Promise<any>;
    create(createDto: any, files: {
        file?: Express.Multer.File[];
        thumbnail?: Express.Multer.File[];
    }): Promise<any>;
    update(id: string, updateDto: any, files: {
        file?: Express.Multer.File[];
        thumbnail?: Express.Multer.File[];
    }): Promise<any[]>;
    delete(id: string): Promise<{
        success: boolean;
    }>;
}
