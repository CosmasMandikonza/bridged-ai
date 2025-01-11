// src/services/azure/blobStorage.ts
import { BlobServiceClient, ContainerClient } from "@azure/storage-blob";
import type { DocumentListItem, DocumentType } from '@/types/document';

class BlobStorageService {
  private blobServiceClient: BlobServiceClient;
  private containerClient: ContainerClient;
  private containerName = "documents";

  constructor() {
    const accountName = import.meta.env.VITE_STORAGE_ACCOUNT_NAME;
    const sasToken = import.meta.env.VITE_STORAGE_SAS_TOKEN;

    if (!accountName || !sasToken) {
      throw new Error('Storage credentials are required');
    }

    try {
      const cleanSasToken = sasToken.charAt(0) === '?' ? sasToken.substring(1) : sasToken;
      const blobServiceUrl = `https://${accountName}.blob.core.windows.net`;
      const serviceURL = `${blobServiceUrl}?${cleanSasToken}`;
      
      this.blobServiceClient = new BlobServiceClient(serviceURL);
      this.containerClient = this.blobServiceClient.getContainerClient(this.containerName);
      
      this.initializeContainer().catch(console.error);
    } catch (error) {
      console.error('Failed to initialize blob storage:', error);
      throw new Error('Storage service initialization failed');
    }
  }

  // src/services/azure/blobStorage.ts
private async initializeContainer(): Promise<void> {
    try {
      const exists = await this.containerClient.exists();
      
      if (!exists) {
        console.log(`Creating container: ${this.containerName}`);
        // Create a private container instead of public
        await this.containerClient.create({
          access: undefined  // This creates a private container
        });
        console.log('Container created successfully');
      }
    } catch (error) {
      console.error('Container initialization failed:', error);
      throw error;
    }
  }
  public async uploadDocument(file: File, userId: string): Promise<string> {
    if (!userId || !file) {
      throw new Error('User ID and file are required');
    }

    try {
      const timestamp = new Date().getTime();
      const sanitizedFileName = encodeURIComponent(file.name.replace(/[^a-zA-Z0-9.-]/g, '_'));
      const blobName = `${userId}/${timestamp}-${sanitizedFileName}`;
      const blockBlobClient = this.containerClient.getBlockBlobClient(blobName);

      console.log('Starting upload:', { fileName: sanitizedFileName });

      await blockBlobClient.uploadData(file, {
        blobHTTPHeaders: {
          blobContentType: file.type
        },
        metadata: {
          uploadedBy: userId,
          originalName: file.name,
          timestamp: timestamp.toString()
        }
      });

      console.log('Upload successful');
      return blockBlobClient.url;
    } catch (error: any) {
      console.error('Upload failed:', error);
      if (error.statusCode === 403) {
        throw new Error('Authentication error. Please check your credentials.');
      }
      throw new Error(error.message || 'Upload failed');
    }
  }

  public async listDocuments(userId: string): Promise<DocumentListItem[]> {
    if (!userId) {
      throw new Error('User ID is required');
    }

    try {
      const documents: DocumentListItem[] = [];
      for await (const blob of this.containerClient.listBlobsFlat({ prefix: `${userId}/` })) {
        documents.push({
          id: blob.name,
          title: decodeURIComponent(blob.name.split('/').pop() || ''),
          type: 'report' as DocumentType,
          uploadedAt: blob.properties.createdOn || new Date(),
          uploadedBy: userId
        });
      }
      return documents;
    } catch (error: any) {
      console.error('List documents failed:', error);
      throw new Error('Failed to fetch documents');
    }
  }

  public async downloadDocument(blobName: string): Promise<Blob> {
    if (!blobName) {
      throw new Error('Blob name is required');
    }

    try {
      const blockBlobClient = this.containerClient.getBlockBlobClient(blobName);
      const downloadResponse = await blockBlobClient.download();
      
      if (!downloadResponse.blobBody) {
        throw new Error('No content received');
      }

      return await downloadResponse.blobBody;
    } catch (error: any) {
      console.error('Download failed:', error);
      throw new Error('Failed to download document');
    }
  }

  public async deleteDocument(blobName: string): Promise<void> {
    if (!blobName) {
      throw new Error('Blob name is required');
    }

    try {
      const blockBlobClient = this.containerClient.getBlockBlobClient(blobName);
      await blockBlobClient.delete();
    } catch (error: any) {
      console.error('Delete failed:', error);
      throw new Error('Failed to delete document');
    }
  }
}

// Create and export a single instance
export const blobStorageService = new BlobStorageService();