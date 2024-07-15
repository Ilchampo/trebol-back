export interface IClient {
    id?: number;
    name: string;
    logoUrl: string;
    minimumSearchPercentage: number;
    maxInvestorsLevels: number;
}

export interface ICreateClientArgs {
    name: string;
    logoUrl: string;
    minimumSearchPercentage: number;
    maxInvestorsLevels: number;
}

export interface IUpdateClientArgs {
    name?: string;
    logoUrl?: string;
    minimumSearchPercentage?: number;
    maxInvestorsLevels?: number;
}
