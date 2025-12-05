import { ContentService } from './content.service';
export declare class ContentController {
    private readonly contentService;
    constructor(contentService: ContentService);
    getAlbums(): Promise<any[]>;
    getVideos(category?: string): Promise<any[]>;
    getTeachings(): Promise<any[]>;
}
