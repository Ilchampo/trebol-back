import type { InvestorType } from '@prisma/client';

export interface IInvestor {
    investorId: number;
    name: string;
    type: InvestorType;
    code: string;
}
