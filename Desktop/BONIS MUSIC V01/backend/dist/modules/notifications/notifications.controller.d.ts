import { NotificationsService } from './notifications.service';
export declare class NotificationsController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
    registerToken(body: {
        userId: string;
        token: string;
        platform: string;
    }): Promise<{
        success: boolean;
    }>;
    sendToUser(body: {
        userId: string;
        title: string;
        body: string;
        data?: any;
    }): Promise<{
        success: boolean;
        error: string;
        messageId?: undefined;
    } | {
        success: boolean;
        messageId: string;
        error?: undefined;
    }>;
    sendToAll(body: {
        title: string;
        body: string;
        data?: any;
    }): Promise<{
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
    sendToTopic(body: {
        topic: string;
        title: string;
        body: string;
        data?: any;
    }): Promise<{
        success: boolean;
        error: string;
        messageId?: undefined;
    } | {
        success: boolean;
        messageId: string;
        error?: undefined;
    }>;
    testNotification(): Promise<{
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
    sendNotification(body: {
        message: string;
    }): Promise<{
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
