export interface ICompany {
    id: number;
    name: string;
    code: string;
    clientId: number;
}

export interface ICreateCompanyArgs {
    name: string;
    code: string;
    clientId: number;
}

export interface IUpdateCompanyArgs {
    id: number;
    name?: string;
    code?: string;
    clientId?: number;
}
