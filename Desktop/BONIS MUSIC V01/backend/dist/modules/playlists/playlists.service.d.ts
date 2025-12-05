export declare class PlaylistsService {
    private supabase;
    constructor();
    getAllPlaylists(userId?: string): Promise<any[]>;
    getPlaylistById(id: string): Promise<any>;
    createPlaylist(createDto: any): Promise<any>;
    updatePlaylist(id: string, updateDto: any): Promise<any>;
    deletePlaylist(id: string): Promise<{
        message: string;
    }>;
    getPlaylistItems(playlistId: string): Promise<any[]>;
    addItemToPlaylist(playlistId: string, item: any): Promise<any>;
    removeItemFromPlaylist(itemId: string): Promise<{
        message: string;
    }>;
}
