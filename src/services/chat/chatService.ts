// src/services/chat/chatService.ts
interface ChatMessage {
    id: string;
    senderId: string;
    senderName: string;
    content: string;
    timestamp: Date;
    attachments?: {
      type: 'document' | 'image';
      url: string;
      name: string;
    }[];
    mentions?: {
      userId: string;
      username: string;
    }[];
  }
  
  interface ChatThread {
    id: string;
    title: string;
    participants: {
      userId: string;
      name: string;
      role: string;
    }[];
    messages: ChatMessage[];
    lastActivity: Date;
  }
  
  class ChatService {
    private static instance: ChatService;
    private threads: Map<string, ChatThread> = new Map();
    private subscribers: ((threads: ChatThread[]) => void)[] = [];
  
    private constructor() {
      // Initialize with mock data
      this.initializeMockData();
    }
  
    private initializeMockData() {
      const mockThread: ChatThread = {
        id: '1',
        title: 'Student Progress Discussion',
        participants: [
          { userId: '1', name: 'Sarah Wilson', role: 'Teacher' },
          { userId: '2', name: 'Mike Brown', role: 'Therapist' },
          { userId: '3', name: 'Jane Doe', role: 'Parent' }
        ],
        messages: [
          {
            id: '1',
            senderId: '1',
            senderName: 'Sarah Wilson',
            content: 'Great progress in reading comprehension this week!',
            timestamp: new Date('2024-01-10T10:00:00'),
          },
          {
            id: '2',
            senderId: '2',
            senderName: 'Mike Brown',
            content: 'I noticed improvement in social interactions as well.',
            timestamp: new Date('2024-01-10T10:05:00'),
          }
        ],
        lastActivity: new Date('2024-01-10T10:05:00'),
      };
  
      this.threads.set(mockThread.id, mockThread);
    }
  
    public static getInstance(): ChatService {
      if (!ChatService.instance) {
        ChatService.instance = new ChatService();
      }
      return ChatService.instance;
    }
  
    public subscribe(callback: (threads: ChatThread[]) => void) {
      this.subscribers.push(callback);
      callback(Array.from(this.threads.values()));
      return () => {
        this.subscribers = this.subscribers.filter(sub => sub !== callback);
      };
    }
  
    public async getThreads(): Promise<ChatThread[]> {
      return Array.from(this.threads.values());
    }
  
    public async getThread(threadId: string): Promise<ChatThread | undefined> {
      return this.threads.get(threadId);
    }
  
    public async sendMessage(threadId: string, message: Omit<ChatMessage, 'id' | 'timestamp'>): Promise<void> {
      const thread = this.threads.get(threadId);
      if (!thread) return;
  
      const newMessage: ChatMessage = {
        ...message,
        id: Date.now().toString(),
        timestamp: new Date(),
      };
  
      thread.messages.push(newMessage);
      thread.lastActivity = new Date();
      this.notifySubscribers();
    }
  
    public async createThread(participants: ChatThread['participants'], title: string): Promise<string> {
      const newThread: ChatThread = {
        id: Date.now().toString(),
        title,
        participants,
        messages: [],
        lastActivity: new Date(),
      };
  
      this.threads.set(newThread.id, newThread);
      this.notifySubscribers();
      return newThread.id;
    }
  
    private notifySubscribers() {
      const threads = Array.from(this.threads.values());
      this.subscribers.forEach(callback => callback(threads));
    }
  }
  
  export const chatService = ChatService.getInstance();
  export type { ChatMessage, ChatThread };