export declare class SubscriptionsService {
    private supabase;
    constructor();
    getAllSubscriptions(status?: string): Promise<any[]>;
    getSubscriptionByUserId(userId: string): Promise<any>;
    createSubscription(userId: string, plan: 'monthly' | 'annual' | 'yearly', transactionId: string): Promise<any>;
    getPaymentHistory(): Promise<any[]>;
}
