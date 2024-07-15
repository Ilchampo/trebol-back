import { InvestorType } from '@prisma/client';

export interface IInvestor {
    id?: number;
    name: string;
    type: InvestorType;
    code: string;
}

export interface ICreateInvestorArgs {
    name: string;
    type: InvestorType;
    code: string;
}

export interface IUpdateInvestorArgs {
    name?: string;
    type?: InvestorType;
    code?: string;
}
