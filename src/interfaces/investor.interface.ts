import type { InvestorType } from '@prisma/client';

export interface IInvestor {
    id: number;
    companyId: number;
    sharePercentage: number;
    name: string;
    code: string;
    type: InvestorType;
    parentInvestorId?: number | null;
}

export interface ICreateInvestorArgs {
    companyId: number;
    sharePercentage: number;
    name: string;
    code: string;
    type: InvestorType;
    parentInvestorId?: number | null;
}

export interface IUpdateInvestorArgs {
    id: number;
    companyId?: number;
    sharePercentage?: number;
    name?: string;
    code?: string;
    type?: InvestorType;
    parentInvestorId?: number | null;
}
