export declare class UploadsService {
    private supabase;
    constructor();
    uploadFile(bucket: string, path: string, file: Express.Multer.File): Promise<string>;
}
