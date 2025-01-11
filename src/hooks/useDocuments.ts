// src/hooks/useDocuments.ts
import { useState, useEffect, useCallback } from 'react';
import { blobStorageService } from '@/services/azure/blobStorage';
import { useAuth } from '@/context/AuthContext';
import type { DocumentListItem } from '@/types/document';

export const useDocuments = () => {
  const [documents, setDocuments] = useState<DocumentListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchDocuments = useCallback(async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      setError(null);
      const docs = await blobStorageService.listDocuments(user.id);
      setDocuments(docs);
      console.log('Fetched documents:', docs); // Debug log
    } catch (err) {
      console.error('Failed to fetch documents:', err);
      setError('Failed to fetch documents');
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Initial fetch
  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  const downloadDocument = async (documentId: string) => {
    if (!user) return;
    
    try {
      const blob = await blobStorageService.downloadDocument(documentId);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = documentId.split('/').pop() || 'document';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error('Download failed:', err);
      throw err;
    }
  };

  const deleteDocument = async (documentId: string) => {
    if (!user) return;
    
    try {
      await blobStorageService.deleteDocument(documentId);
      // Refresh the list after deletion
      await fetchDocuments();
    } catch (err) {
      console.error('Delete failed:', err);
      throw err;
    }
  };

  return {
    documents,
    loading,
    error,
    refreshDocuments: fetchDocuments,
    downloadDocument,
    deleteDocument
  };
};