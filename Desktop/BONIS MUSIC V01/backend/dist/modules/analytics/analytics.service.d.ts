export declare class AnalyticsService {
    private supabase;
    constructor();
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
    private generateRevenueData;
    private generateUserGrowthData;
}
