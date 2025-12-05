import { OnModuleInit } from '@nestjs/common';
export declare class NotificationsService implements OnModuleInit {
    private supabase;
    private firebaseApp;
    private firebaseInitialized;
    constructor();
    onModuleInit(): void;
    registerToken(userId: string, token: string, platform: string): Promise<{
        success: boolean;
    }>;
    sendToUser(userId: string, title: string, body: string, data?: any): Promise<{
        success: boolean;
        error: string;
        messageId?: undefined;
    } | {
        success: boolean;
        messageId: string;
        error?: undefined;
    }>;
    sendToAllUsers(title: string, body: string, data?: any): Promise<{
        success: boolean;
        error: string;
        sent?: undefined;
        message?: undefined;
        successCount?: undefined;
        failureCount?: undefined;
        total?: undefined;
    } | {
        success: boolean;
        sent: number;
        message: string;
        error?: undefined;
        successCount?: undefined;
        failureCount?: undefined;
        total?: undefined;
    } | {
        success: boolean;
        successCount: number;
        failureCount: number;
        total: number;
        error?: undefined;
        sent?: undefined;
        message?: undefined;
    }>;
    sendToTopic(topic: string, title: string, body: string, data?: any): Promise<{
        success: boolean;
        error: string;
        messageId?: undefined;
    } | {
        success: boolean;
        messageId: string;
        error?: undefined;
    }>;
    sendPushNotification(message: string): Promise<{
        success: boolean;
        error: string;
        sent?: undefined;
        message?: undefined;
        successCount?: undefined;
        failureCount?: undefined;
        total?: undefined;
    } | {
        success: boolean;
        sent: number;
        message: string;
        error?: undefined;
        successCount?: undefined;
        failureCount?: undefined;
        total?: undefined;
    } | {
        success: boolean;
        successCount: number;
        failureCount: number;
        total: number;
        error?: undefined;
        sent?: undefined;
        message?: undefined;
    }>;
}
