import { LivesService } from './lives.service';
export declare class LivesController {
    private readonly livesService;
    constructor(livesService: LivesService);
    getLiveLinks(): Promise<any[]>;
    updateLiveLinks(body: {
        tiktok: any;
        facebook: any;
    }): Promise<{
        success: boolean;
    }>;
}
