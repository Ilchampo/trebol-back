import type { FileType } from '@prisma/client';

export interface IFile {
    id: number;
    investorId: number;
    fileType: FileType;
    fileData: Buffer;
}

export interface ICreateFileArgs {
    investorId: number;
    fileType: FileType;
    fileData: Buffer;
}

export interface IUpdateFileArgs {
    id: number;
    investorId?: number;
    fileType?: FileType;
    fileData?: Buffer;
}
