import { SubscriptionsService } from './subscriptions.service';
export declare class SubscriptionsController {
    private readonly subscriptionsService;
    constructor(subscriptionsService: SubscriptionsService);
    getAllSubscriptions(status?: string): Promise<any[]>;
    getSubscriptionByUserId(userId: string): Promise<any>;
    getPaymentHistory(): Promise<any[]>;
}
