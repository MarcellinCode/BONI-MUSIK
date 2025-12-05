import { AnalyticsService } from './analytics.service';
export declare class AnalyticsController {
    private readonly analyticsService;
    constructor(analyticsService: AnalyticsService);
    getOverview(): Promise<{
        stats: {
            totalSubscribers: number;
            activeSubscriptions: number;
            monthlyRevenue: any;
            annualRevenue: any;
            newUsersThisMonth: number;
        };
        revenueData: any[];
        planDistribution: {
            name: string;
            value: number;
        }[];
        userGrowth: any[];
    }>;
}
