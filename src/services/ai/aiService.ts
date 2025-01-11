// src/services/ai/aiService.ts
import { DocumentListItem } from '@/types/document';

interface EmbeddingResponse {
  embedding: number[];
  error?: string;
}

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface ChatResponse {
  message: string;
  relevantDocs: DocumentListItem[];
  error?: string;
}

class AIService {
  private static instance: AIService;
  private embeddings: Map<string, number[]> = new Map();

  private constructor() {}

  public static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService();
    }
    return AIService.instance;
  }

  public async generateEmbedding(text: string): Promise<EmbeddingResponse> {
    try {
      // In a production environment, this would call Azure OpenAI API
      // For hackathon demo, we'll use a mock embedding
      const mockEmbedding = new Array(1536).fill(0).map(() => Math.random());
      return { embedding: mockEmbedding };
    } catch (error: any) {
      console.error('Embedding generation failed:', error);
      return { embedding: [], error: error.message };
    }
  }

  public async storeDocumentEmbedding(documentId: string, content: string): Promise<void> {
    const { embedding, error } = await this.generateEmbedding(content);
    if (error) throw new Error(error);
    this.embeddings.set(documentId, embedding);
  }

  public async findSimilarDocuments(query: string, documents: DocumentListItem[]): Promise<DocumentListItem[]> {
    const { embedding: queryEmbedding } = await this.generateEmbedding(query);
    
    // Calculate cosine similarity with all stored embeddings
    const similarities = Array.from(this.embeddings.entries()).map(([docId, docEmbedding]) => ({
      docId,
      similarity: this.cosineSimilarity(queryEmbedding, docEmbedding)
    }));

    // Sort by similarity and get top 3 documents
    const topDocs = similarities
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 3)
      .map(({ docId }) => documents.find(doc => doc.id === docId))
      .filter((doc): doc is DocumentListItem => doc !== undefined);

    return topDocs;
  }

  public async chat(messages: ChatMessage[], documents: DocumentListItem[]): Promise<ChatResponse> {
    try {
      const userMessage = messages[messages.length - 1].content;
      const relevantDocs = await this.findSimilarDocuments(userMessage, documents);

      // In production, this would use Azure OpenAI API
      // For hackathon demo, we'll return a mock response
      const mockResponse = `I've analyzed your question and found some relevant documents. 
        Based on the available information, I can help provide guidance on this topic. 
        Let me know if you'd like more specific details from the related documents I found.`;

      return {
        message: mockResponse,
        relevantDocs
      };
    } catch (error: any) {
      return {
        message: '',
        relevantDocs: [],
        error: error.message
      };
    }
  }

  private cosineSimilarity(a: number[], b: number[]): number {
    const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0);
    const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
    const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
    return dotProduct / (magnitudeA * magnitudeB);
  }
}

export const aiService = AIService.getInstance();