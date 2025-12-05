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
exports.AnalyticsService = void 0;
const common_1 = require("@nestjs/common");
const supabase_js_1 = require("@supabase/supabase-js");
let AnalyticsService = class AnalyticsService {
    constructor() {
        this.supabase = (0, supabase_js_1.createClient)(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE);
    }
    async getOverview() {
        const { count: totalSubscribers } = await this.supabase
            .from('users')
            .select('*', { count: 'exact', head: true });
        const { count: activeSubscriptions } = await this.supabase
            .from('subscriptions')
            .select('*', { count: 'exact', head: true })
            .eq('status', 'active');
        const { data: subscriptions } = await this.supabase
            .from('subscriptions')
            .select('amount, plan, created_at');
        const monthlyRevenue = (subscriptions === null || subscriptions === void 0 ? void 0 : subscriptions.filter(s => s.plan === 'monthly').reduce((sum, s) => sum + s.amount, 0)) || 0;
        const annualRevenue = (subscriptions === null || subscriptions === void 0 ? void 0 : subscriptions.filter(s => s.plan === 'annual').reduce((sum, s) => sum + s.amount, 0)) || 0;
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);
        const { count: newUsersThisMonth } = await this.supabase
            .from('users')
            .select('*', { count: 'exact', head: true })
            .gte('created_at', startOfMonth.toISOString());
        const revenueData = this.generateRevenueData(subscriptions || []);
        const planDistribution = [
            { name: 'Mensuel', value: (subscriptions === null || subscriptions === void 0 ? void 0 : subscriptions.filter(s => s.plan === 'monthly').length) || 0 },
            { name: 'Annuel', value: (subscriptions === null || subscriptions === void 0 ? void 0 : subscriptions.filter(s => s.plan === 'annual').length) || 0 },
        ];
        const userGrowth = await this.generateUserGrowthData();
        return {
            stats: {
                totalSubscribers: totalSubscribers || 0,
                activeSubscriptions: activeSubscriptions || 0,
                monthlyRevenue,
                annualRevenue,
                newUsersThisMonth: newUsersThisMonth || 0,
            },
            revenueData,
            planDistribution,
            userGrowth,
        };
    }
    generateRevenueData(subscriptions) {
        const months = [];
        const now = new Date();
        for (let i = 11; i >= 0; i--) {
            const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const monthName = date.toLocaleDateString('fr-FR', { month: 'short' });
            const revenue = subscriptions
                .filter(s => {
                const subDate = new Date(s.created_at);
                return subDate.getMonth() === date.getMonth() &&
                    subDate.getFullYear() === date.getFullYear();
            })
                .reduce((sum, s) => sum + s.amount, 0);
            months.push({ month: monthName, revenue });
        }
        return months;
    }
    async generateUserGrowthData() {
        const months = [];
        const now = new Date();
        for (let i = 11; i >= 0; i--) {
            const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const monthName = date.toLocaleDateString('fr-FR', { month: 'short' });
            const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
            const { count } = await this.supabase
                .from('users')
                .select('*', { count: 'exact', head: true })
                .lte('created_at', endOfMonth.toISOString());
            months.push({ month: monthName, users: count || 0 });
        }
        return months;
    }
};
exports.AnalyticsService = AnalyticsService;
exports.AnalyticsService = AnalyticsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], AnalyticsService);
//# sourceMappingURL=analytics.service.js.map