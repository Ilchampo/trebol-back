export interface IClient {
    clientId: number;
    name: string;
    logoUrl?: string;
    minimumSearchPercentage: number;
    maxInvestorLevels: number;
}
