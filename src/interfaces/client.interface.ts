export interface IClient {
    id: number;
    name: string;
    logoUrl?: string | null;
    maxInvestorLevels: number;
    minSearchPercentage: number;
}

export interface ICreateClientArgs {
    name: string;
    logoUrl?: string;
    maxInvestorLevels: number;
    minSearchPercentage: number;
}

export interface IUpdateClientArgs {
    id: number;
    name?: string;
    logoUrl?: string;
    maxInvestorLevels?: number;
    minSearchPercentage?: number;
}
