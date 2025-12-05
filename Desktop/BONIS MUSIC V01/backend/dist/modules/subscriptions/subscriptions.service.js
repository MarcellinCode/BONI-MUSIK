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
exports.SubscriptionsService = void 0;
const common_1 = require("@nestjs/common");
const supabase_js_1 = require("@supabase/supabase-js");
let SubscriptionsService = class SubscriptionsService {
    constructor() {
        this.supabase = (0, supabase_js_1.createClient)(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE);
    }
    async getAllSubscriptions(status) {
        let query = this.supabase
            .from('subscriptions')
            .select(`
                *,
                user:users(phone_number, full_name)
            `)
            .order('created_at', { ascending: false });
        if (status) {
            query = query.eq('status', status);
        }
        const { data, error } = await query;
        if (error)
            throw error;
        return data.map((sub) => (Object.assign(Object.assign({}, sub), { user: sub.user })));
    }
    async getSubscriptionByUserId(userId) {
        try {
            const { data, error } = await this.supabase
                .from('subscriptions')
                .select('*')
                .eq('user_id', userId)
                .order('created_at', { ascending: false })
                .limit(1);
            if (error)
                throw error;
            return data && data.length > 0 ? data[0] : null;
        }
        catch (error) {
            console.error('Error getting subscription:', error);
            throw error;
        }
    }
    async createSubscription(userId, plan, transactionId) {
        const dbPlan = plan === 'yearly' ? 'annual' : plan;
        const amount = dbPlan === 'monthly' ? 1000 : 12000;
        const startDate = new Date();
        const endDate = new Date();
        if (dbPlan === 'monthly') {
            endDate.setDate(endDate.getDate() + 30);
        }
        else {
            endDate.setFullYear(endDate.getFullYear() + 1);
        }
        const { data, error } = await this.supabase
            .from('subscriptions')
            .insert({
            user_id: userId,
            plan: dbPlan,
            status: 'active',
            start_date: startDate.toISOString(),
            end_date: endDate.toISOString(),
            amount,
            cinetpay_transaction_id: transactionId,
        })
            .select()
            .single();
        if (error)
            throw error;
        return data;
    }
    async getPaymentHistory() {
        const { data, error } = await this.supabase
            .from('subscriptions')
            .select(`
                *,
                user:users(phone_number, full_name)
            `)
            .order('created_at', { ascending: false });
        if (error)
            throw error;
        return data;
    }
};
exports.SubscriptionsService = SubscriptionsService;
exports.SubscriptionsService = SubscriptionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], SubscriptionsService);
//# sourceMappingURL=subscriptions.service.js.map