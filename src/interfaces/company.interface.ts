export interface ICompany {
    id?: number;
    clientId: number;
    name: string;
    code: string;
}

export interface ICreateCompanyArgs {
    clientId: number;
    name: string;
    code: string;
}

export interface IUpdateCompanyArgs {
    clientId?: number;
    name?: string;
    code?: string;
}
