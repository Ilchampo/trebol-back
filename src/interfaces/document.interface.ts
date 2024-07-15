import { FileType } from '@prisma/client';

export interface IDocument {
    id?: number;
    shareId: number;
    fileName: string;
    fileType: FileType;
    fileData: Buffer;
}

export interface ICreateDocumentArgs {
    shareId: number;
    fileName: string;
    fileType: FileType;
    fileData: Buffer;
}

export interface IUpdateDocumentArgs {
    shareId?: number;
    fileName?: string;
    fileType?: FileType;
    fileData?: Buffer;
}
