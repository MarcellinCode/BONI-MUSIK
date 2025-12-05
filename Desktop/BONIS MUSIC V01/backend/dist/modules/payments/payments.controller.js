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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsController = void 0;
const common_1 = require("@nestjs/common");
const payments_service_1 = require("./payments.service");
let PaymentsController = class PaymentsController {
    constructor(paymentsService) {
        this.paymentsService = paymentsService;
    }
    async initiatePayment(body) {
        const { amount, description, userId, plan, returnUrl } = body;
        return this.paymentsService.createTransaction(amount, description, userId, plan, returnUrl);
    }
    async handleCallback(query, res) {
        console.log('=== FEDAPAY CALLBACK RECEIVED ===');
        console.log('Query parameters:', JSON.stringify(query, null, 2));
        console.log('================================');
        const returnUrl = query.returnUrl || 'bonismusic://payment-return';
        const { status, id, transaction_id } = query;
        const transactionId = id || transaction_id;
        if (status === 'approved' && transactionId) {
            try {
                console.log(`Callback received for transaction ${transactionId}, status: ${status}. Processing payment...`);
                await this.paymentsService.processSuccessfulPayment(parseInt(transactionId));
            }
            catch (error) {
                console.error('Error processing payment in callback:', error);
            }
        }
        else {
            console.log(`No payment processing: status=${status}, transactionId=${transactionId}`);
        }
        const htmlContent = `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Paiement Confirmé - BONI MUSIK</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        .container {
            background: linear-gradient(145deg, #1e1e1e 0%, #2a2a2a 100%);
            border-radius: 24px;
            padding: 48px 32px;
            max-width: 440px;
            width: 100%;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
            text-align: center;
            position: relative;
            overflow: hidden;
        }
        .container::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, #FFC107 0%, #FF8C00 100%);
        }
        .checkmark-circle {
            width: 80px;
            height: 80px;
            margin: 0 auto 24px;
            background: linear-gradient(135deg, #FFC107 0%, #FF8C00 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: scaleIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .checkmark {
            width: 40px;
            height: 40px;
            stroke: #000;
            stroke-width: 3;
            stroke-linecap: round;
            stroke-linejoin: round;
            fill: none;
            animation: drawCheck 0.5s ease-in-out 0.3s forwards;
            stroke-dasharray: 100;
            stroke-dashoffset: 100;
        }
        h1 {
            color: #ffffff;
            font-size: 28px;
            font-weight: 700;
            margin-bottom: 12px;
        }
        .subtitle {
            color: #FFC107;
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 24px;
        }
        .message {
            color: #b0b0b0;
            font-size: 15px;
            line-height: 1.6;
            margin-bottom: 32px;
        }
        .info-box {
            background: rgba(255, 193, 7, 0.1);
            border: 1px solid rgba(255, 193, 7, 0.3);
            border-radius: 12px;
            padding: 16px;
            margin-bottom: 32px;
        }
        .info-box p {
            color: #e0e0e0;
            font-size: 14px;
        }
        .action-box {
            background: rgba(255, 193, 7, 0.15);
            border: 2px solid #FFC107;
            border-radius: 16px;
            padding: 20px;
            margin-bottom: 20px;
        }
        .action-box p {
            color: #FFC107;
            font-weight: 700;
            font-size: 15px;
            margin-bottom: 8px;
        }
        .action-box span {
            color: #e0e0e0;
            font-size: 14px;
        }
        .btn {
            display: block;
            background: linear-gradient(135deg, #FFC107 0%, #FF8C00 100%);
            color: #000;
            padding: 16px 40px;
            text-decoration: none;
            border-radius: 30px;
            font-weight: 700;
            font-size: 16px;
            box-shadow: 0 4px 15px rgba(255, 193, 7, 0.3);
            cursor: pointer;
            border: none;
            width: 100%;
        }
        .btn:active {
            transform: scale(0.98);
        }
        @keyframes scaleIn {
            from { transform: scale(0); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
        @keyframes drawCheck {
            to { stroke-dashoffset: 0; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="checkmark-circle">
            <svg class="checkmark" viewBox="0 0 52 52">
                <path d="M14 27l7.5 7.5L38 18"/>
            </svg>
        </div>
        <h1>Paiement Confirmé !</h1>
        <p class="subtitle">Merci pour votre abonnement</p>
        <p class="message">
            Votre paiement a été traité avec succès.<br>
            Vous avez maintenant accès à tous les contenus premium de BONI MUSIK.
        </p>
        <div class="info-box">
            <p><strong>✨ Profitez de :</strong><br>
            Accès illimité • Téléchargements • Qualité HD • Sans publicité</p>
        </div>
        <div class="action-box">
            <p>📱 Prochaine étape</p>
            <span>Fermez cette page et retournez à l'application BONI MUSIK pour profiter de votre abonnement premium.</span>
        </div>
        <button class="btn" onclick="closeWindow()">Retourner à l'application</button>
    </div>
    <script>
        function closeWindow() {
            // Redirect to the app using deep link
            const returnUrl = "${returnUrl}";
            window.location.href = returnUrl;
            
            // Fallback if deep link doesn't work immediately
            setTimeout(function() {
                document.querySelector('.btn').textContent = 'Ouvrir l\\'application';
                document.querySelector('.action-box span').textContent = 'Si l\\'application ne s\\'ouvre pas automatiquement, cliquez sur le bouton ci-dessous.';
                
                // Add a direct link button as fallback
                const container = document.querySelector('.container');
                // Remove existing fallback if any
                const existingFallback = container.querySelector('.fallback-btn');
                if (!existingFallback) {
                    const fallbackBtn = document.createElement('a');
                    fallbackBtn.href = returnUrl;
                    fallbackBtn.className = 'btn fallback-btn';
                    fallbackBtn.style.marginTop = '10px';
                    fallbackBtn.style.background = 'transparent';
                    fallbackBtn.style.border = '2px solid #FFC107';
                    fallbackBtn.style.color = '#FFC107';
                    fallbackBtn.textContent = 'Cliquez ici pour ouvrir l\\'app';
                    container.appendChild(fallbackBtn);
                }
            }, 500);
        }
        
        // Auto-redirect after 2 seconds
        setTimeout(closeWindow, 2000);
    </script>
</body>
</html>`;
        res.send(htmlContent);
    }
    async handleWebhook(payload, signature) {
        return this.paymentsService.handleWebhook(payload, signature);
    }
};
exports.PaymentsController = PaymentsController;
__decorate([
    (0, common_1.Post)('initiate'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "initiatePayment", null);
__decorate([
    (0, common_1.Get)('callback'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "handleCallback", null);
__decorate([
    (0, common_1.Post)('webhook'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)('x-fedapay-signature')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "handleWebhook", null);
exports.PaymentsController = PaymentsController = __decorate([
    (0, common_1.Controller)('api/payments'),
    __metadata("design:paramtypes", [payments_service_1.PaymentsService])
], PaymentsController);
//# sourceMappingURL=payments.controller.js.map