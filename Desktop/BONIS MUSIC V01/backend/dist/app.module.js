"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const auth_module_1 = require("./modules/auth/auth.module");
const users_module_1 = require("./modules/users/users.module");
const subscriptions_module_1 = require("./modules/subscriptions/subscriptions.module");
const payments_module_1 = require("./modules/payments/payments.module");
const content_module_1 = require("./modules/content/content.module");
const admin_module_1 = require("./modules/admin/admin.module");
const analytics_module_1 = require("./modules/analytics/analytics.module");
const lives_module_1 = require("./modules/lives/lives.module");
const notifications_module_1 = require("./modules/notifications/notifications.module");
const uploads_module_1 = require("./modules/uploads/uploads.module");
const albums_module_1 = require("./modules/albums/albums.module");
const videos_module_1 = require("./modules/videos/videos.module");
const teachings_module_1 = require("./modules/teachings/teachings.module");
const playlists_module_1 = require("./modules/playlists/playlists.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            auth_module_1.AuthModule,
            admin_module_1.AdminModule,
            users_module_1.UsersModule,
            subscriptions_module_1.SubscriptionsModule,
            payments_module_1.PaymentsModule,
            content_module_1.ContentModule,
            analytics_module_1.AnalyticsModule,
            lives_module_1.LivesModule,
            notifications_module_1.NotificationsModule,
            uploads_module_1.UploadsModule,
            albums_module_1.AlbumsModule,
            videos_module_1.VideosModule,
            teachings_module_1.TeachingsModule,
            playlists_module_1.PlaylistsModule,
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map