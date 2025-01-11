// src/services/notification/notificationService.ts
import { useAuth } from '@/context/AuthContext';

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  action?: {
    label: string;
    url: string;
  };
}

class NotificationService {
  private static instance: NotificationService;
  private subscribers: ((notifications: Notification[]) => void)[] = [];
  private notifications: Notification[] = [];

  private constructor() {
    // Initialize with some mock notifications
    this.notifications = [
      {
        id: '1',
        type: 'info',
        title: 'New Document Shared',
        message: 'Speech therapy assessment report has been uploaded',
        timestamp: new Date(),
        read: false,
        action: {
          label: 'View Document',
          url: '/dashboard/documents'
        }
      },
      {
        id: '2',
        type: 'success',
        title: 'Goal Achieved',
        message: 'Reading comprehension goal has been met',
        timestamp: new Date(),
        read: false,
        action: {
          label: 'View Progress',
          url: '/dashboard/progress'
        }
      }
    ];
  }

  public static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  public subscribe(callback: (notifications: Notification[]) => void) {
    this.subscribers.push(callback);
    callback(this.notifications);
    return () => {
      this.subscribers = this.subscribers.filter(sub => sub !== callback);
    };
  }

  public async getNotifications(): Promise<Notification[]> {
    // In production, this would fetch from an API
    return this.notifications;
  }

  public async markAsRead(notificationId: string): Promise<void> {
    this.notifications = this.notifications.map(notification =>
      notification.id === notificationId
        ? { ...notification, read: true }
        : notification
    );
    this.notifySubscribers();
  }

  public async addNotification(notification: Omit<Notification, 'id' | 'timestamp' | 'read'>): Promise<void> {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false
    };
    this.notifications = [newNotification, ...this.notifications];
    this.notifySubscribers();
  }

  private notifySubscribers() {
    this.subscribers.forEach(callback => callback(this.notifications));
  }
}

export const notificationService = NotificationService.getInstance();