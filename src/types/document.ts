// src/types/document.ts
export type DocumentType = 'report' | 'plan' | 'assessment' | 'note';

export interface Document {
  id: string;
  title: string;
  type: DocumentType;
  content: string;
  uploadedBy: string;
  uploadedAt: Date;
  tags: string[];
  metadata: {
    size: number;
    format: string;
    lastModified: Date;
  };
}

export interface DocumentUploadResponse {
  documentId: string;
  uploadUrl: string;
  success: boolean;
  error?: string;
}

export interface DocumentListItem {
  id: string;
  title: string;
  type: DocumentType;
  uploadedAt: Date;
  uploadedBy: string;
}