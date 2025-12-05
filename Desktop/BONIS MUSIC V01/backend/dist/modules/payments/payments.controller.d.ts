import { Response } from 'express';
import { PaymentsService } from './payments.service';
export declare class PaymentsController {
    private readonly paymentsService;
    constructor(paymentsService: PaymentsService);
    initiatePayment(body: {
        amount: number;
        description: string;
        userId: string;
        plan: string;
        returnUrl?: string;
    }): Promise<{
        url: any;
        token: any;
    }>;
    handleCallback(query: any, res: Response): Promise<void>;
    handleWebhook(payload: any, signature: string): Promise<{
        success: boolean;
        message: string;
    } | {
        success: boolean;
        message?: undefined;
    }>;
}
