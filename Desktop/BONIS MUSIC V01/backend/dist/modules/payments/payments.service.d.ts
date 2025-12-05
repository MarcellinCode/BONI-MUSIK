import { SubscriptionsService } from '../subscriptions/subscriptions.service';
import { Transaction } from 'fedapay';
export declare class PaymentsService {
    private subscriptionsService;
    constructor(subscriptionsService: SubscriptionsService);
    createTransaction(amount: number, description: string, userId: string, plan: string, returnUrl?: string): Promise<{
        url: any;
        token: any;
    }>;
    verifyTransaction(transactionId: number): Promise<Transaction>;
    processSuccessfulPayment(transactionId: number): Promise<boolean>;
    handleWebhook(payload: any, signature: string): Promise<{
        success: boolean;
        message: string;
    } | {
        success: boolean;
        message?: undefined;
    }>;
}
