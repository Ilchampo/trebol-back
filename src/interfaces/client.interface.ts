export interface IClient {
    clientId: number;
    name: string;
    logoUrl?: string | null;
    minimumSearchPercentage: number;
    maxInvestorLevels: number;
}

export interface ICreateClientArgs {
    name: string;
    logoUrl?: string | null;
    minSearchPercentage: number;
    maxInvestorLevels: number;
}

export interface IUpdateClientArgs {
    clientId: number;
    name?: string;
    logoUrl?: string | null;
    minSearchPercentage?: number;
    maxInvestorLevels?: number;
}
