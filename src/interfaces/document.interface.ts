import type { FileType } from '@prisma/client';

export interface Document {
    documentId: number;
    investorId: number;
    fileName: string;
    fileType: FileType;
    fileData: Buffer;
}
