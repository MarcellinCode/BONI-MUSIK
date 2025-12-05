"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsService = void 0;
const common_1 = require("@nestjs/common");
const supabase_js_1 = require("@supabase/supabase-js");
const admin = require("firebase-admin");
const path_1 = require("path");
let NotificationsService = class NotificationsService {
    constructor() {
        this.firebaseInitialized = false;
        this.supabase = (0, supabase_js_1.createClient)(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE);
    }
    onModuleInit() {
        try {
            const serviceAccountPath = (0, path_1.join)(process.cwd(), 'firebase-admin-key.json');
            this.firebaseApp = admin.initializeApp({
                credential: admin.credential.cert(serviceAccountPath),
            });
            this.firebaseInitialized = true;
            console.log('✅ Firebase Admin SDK initialized successfully');
        }
        catch (error) {
            console.error('❌ Error initializing Firebase Admin SDK:', error.message);
            console.log('⚠️  Make sure firebase-admin-key.json exists in the backend root directory');
            console.log('📝 Push notifications will not work until Firebase is configured');
        }
    }
    async registerToken(userId, token, platform) {
        try {
            const { error } = await this.supabase
                .from('users')
                .update({ fcm_token: token, device_platform: platform })
                .eq('id', userId);
            if (error)
                throw error;
            console.log(`✅ FCM token registered for user ${userId}`);
            return { success: true };
        }
        catch (error) {
            console.error('Error registering FCM token:', error);
            throw error;
        }
    }
    async sendToUser(userId, title, body, data) {
        if (!this.firebaseInitialized) {
            console.log('⚠️  Firebase not initialized, skipping notification');
            return { success: false, error: 'Firebase not initialized' };
        }
        try {
            const { data: user } = await this.supabase
                .from('users')
                .select('fcm_token')
                .eq('id', userId)
                .single();
            if (!user || !user.fcm_token) {
                console.log(`⚠️  No FCM token found for user ${userId}`);
                return { success: false, error: 'No FCM token' };
            }
            const message = {
                notification: {
                    title,
                    body,
                },
                data: data || {},
                token: user.fcm_token,
            };
            const response = await admin.messaging().send(message);
            console.log(`✅ Notification sent to user ${userId}:`, response);
            return { success: true, messageId: response };
        }
        catch (error) {
            console.error('Error sending notification to user:', error);
            throw error;
        }
    }
    async sendToAllUsers(title, body, data) {
        if (!this.firebaseInitialized) {
            console.log('⚠️  Firebase not initialized, skipping notification');
            return { success: false, error: 'Firebase not initialized' };
        }
        try {
            const { data: users } = await this.supabase
                .from('users')
                .select('fcm_token')
                .not('fcm_token', 'is', null);
            if (!users || users.length === 0) {
                return { success: true, sent: 0, message: 'No users with FCM tokens' };
            }
            const tokens = users.map(u => u.fcm_token);
            const message = {
                notification: {
                    title,
                    body,
                },
                data: data || {},
                tokens,
            };
            const response = await admin.messaging().sendEachForMulticast(message);
            console.log(`✅ Sent ${response.successCount}/${tokens.length} notifications`);
            if (response.failureCount > 0) {
                console.log(`⚠️  Failed to send ${response.failureCount} notifications`);
            }
            return {
                success: true,
                successCount: response.successCount,
                failureCount: response.failureCount,
                total: tokens.length,
            };
        }
        catch (error) {
            console.error('Error sending notifications to all users:', error);
            throw error;
        }
    }
    async sendToTopic(topic, title, body, data) {
        if (!this.firebaseInitialized) {
            console.log('⚠️  Firebase not initialized, skipping notification');
            return { success: false, error: 'Firebase not initialized' };
        }
        try {
            const message = {
                notification: {
                    title,
                    body,
                },
                data: data || {},
                topic,
            };
            const response = await admin.messaging().send(message);
            console.log(`✅ Notification sent to topic "${topic}":`, response);
            return { success: true, messageId: response };
        }
        catch (error) {
            console.error('Error sending notification to topic:', error);
            throw error;
        }
    }
    async sendPushNotification(message) {
        return this.sendToAllUsers('BONI MUSIK', message);
    }
};
exports.NotificationsService = NotificationsService;
exports.NotificationsService = NotificationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], NotificationsService);
//# sourceMappingURL=notifications.service.js.map