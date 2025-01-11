// src/hooks/useUpload.ts
import { useState } from 'react';
import { blobStorageService } from '@/services/azure/blobStorage';
import { useAuth } from '@/context/AuthContext';
import type { DocumentUploadResponse, DocumentType } from '@/types/document';

interface UploadParams {
  file: File;
  title: string;
  type: DocumentType;
}

export const useUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const uploadDocument = async ({ file, title, type }: UploadParams): Promise<DocumentUploadResponse> => {
    if (!user) {
      throw new Error('User must be authenticated to upload documents');
    }

    setUploading(true);
    setProgress(0);
    setError(null);

    try {
      setProgress(10);
      const blobUrl = await blobStorageService.uploadDocument(file, user.id, {
        title,
        type,
      });
      setProgress(100);
      
      return {
        documentId: Date.now().toString(),
        uploadUrl: blobUrl,
        success: true
      };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Upload failed';
      setError(errorMessage);
      return {
        documentId: '',
        uploadUrl: '',
        success: false,
        error: errorMessage
      };
    } finally {
      setUploading(false);
    }
  };

  return {
    uploadDocument,
    uploading,
    progress,
    error
  };
};