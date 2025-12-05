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
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const subscriptions_service_1 = require("../subscriptions/subscriptions.service");
const fedapay_1 = require("fedapay");
let PaymentsService = class PaymentsService {
    constructor(subscriptionsService) {
        this.subscriptionsService = subscriptionsService;
        fedapay_1.FedaPay.setApiKey(process.env.FEDAPAY_SECRET_KEY);
        fedapay_1.FedaPay.setEnvironment('sandbox');
    }
    async createTransaction(amount, description, userId, plan, returnUrl) {
        try {
            let callbackUrl = 'http://192.168.1.69:3000/api/payments/callback';
            if (returnUrl) {
                callbackUrl += `?returnUrl=${encodeURIComponent(returnUrl)}`;
            }
            const transaction = await fedapay_1.Transaction.create({
                description,
                amount,
                currency: {
                    iso: 'XOF'
                },
                callback_url: callbackUrl,
                customer: {
                    email: 'customer@example.com',
                    lastname: 'Doe',
                    firstname: 'John',
                },
                custom_metadata: {
                    user_id: userId,
                    plan
                }
            });
            const token = await transaction.generateToken();
            return { url: token.url, token: token.token };
        }
        catch (error) {
            console.error('Error creating FedaPay transaction:', error);
            throw error;
        }
    }
    async verifyTransaction(transactionId) {
        try {
            const transaction = await fedapay_1.Transaction.retrieve(transactionId);
            return transaction;
        }
        catch (error) {
            console.error('Error verifying transaction:', error);
            throw error;
        }
    }
    async processSuccessfulPayment(transactionId) {
        var _a, _b;
        try {
            const transaction = await this.verifyTransaction(transactionId);
            console.log('Transaction retrieved:', JSON.stringify(transaction, null, 2));
            if (transaction.status === 'approved') {
                const userId = (_a = transaction.custom_metadata) === null || _a === void 0 ? void 0 : _a.user_id;
                const plan = (_b = transaction.custom_metadata) === null || _b === void 0 ? void 0 : _b.plan;
                if (!userId || !plan) {
                    console.error('Missing userId or plan in custom_metadata:', transaction.custom_metadata);
                    return false;
                }
                console.log(`✅ Processing successful payment for user ${userId}, plan ${plan}`);
                await this.subscriptionsService.createSubscription(userId, plan, transaction.id.toString());
                console.log(`✅ Subscription created successfully!`);
                return true;
            }
            return false;
        }
        catch (error) {
            console.error('Error processing successful payment:', error);
            return false;
        }
    }
    async handleWebhook(payload, signature) {
        console.log('FedaPay webhook received:', payload);
        const { id, status, custom_metadata } = payload.entity;
        if (status === 'approved') {
            const userId = custom_metadata === null || custom_metadata === void 0 ? void 0 : custom_metadata.user_id;
            const plan = custom_metadata === null || custom_metadata === void 0 ? void 0 : custom_metadata.plan;
            if (!userId || !plan) {
                console.error('Missing userId or plan in webhook custom_metadata:', custom_metadata);
                return { success: false, message: 'Missing metadata' };
            }
            console.log(`Payment approved for user ${userId}, plan ${plan}`);
            await this.subscriptionsService.createSubscription(userId, plan, id.toString());
            return { success: true };
        }
        return { success: false, message: 'Transaction not approved' };
    }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [subscriptions_service_1.SubscriptionsService])
], PaymentsService);
//# sourceMappingURL=payments.service.js.map