export interface IShare {
    id?: number;
    companyId: number;
    investorId: number;
    sharePercentage: number;
    level: number;
}

export interface ICreateShareArgs {
    companyId: number;
    investorId: number;
    sharePercentage: number;
    level: number;
}

export interface IUpdateShareArgs {
    companyId?: number;
    investorId?: number;
    sharePercentage?: number;
    level?: number;
}
