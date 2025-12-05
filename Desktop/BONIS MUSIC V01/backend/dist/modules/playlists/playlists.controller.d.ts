import { PlaylistsService } from './playlists.service';
export declare class PlaylistsController {
    private readonly playlistsService;
    constructor(playlistsService: PlaylistsService);
    getAll(userId?: string): Promise<any[]>;
    getOne(id: string): Promise<any>;
    create(createDto: any): Promise<any>;
    update(id: string, updateDto: any): Promise<any>;
    delete(id: string): Promise<{
        message: string;
    }>;
    getItems(id: string): Promise<any[]>;
    addItem(id: string, item: any): Promise<any>;
    removeItem(itemId: string): Promise<{
        message: string;
    }>;
}
