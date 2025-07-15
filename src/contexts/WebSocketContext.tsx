'use client';

import { createContext, useContext, useEffect, useRef, useState, ReactNode } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';

type Notification = {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
};

type WebSocketContextType = {
  socket: WebSocket | null;
  isConnected: boolean;
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
};

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export function WebSocketProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const [isConnected, setIsConnected] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const socketRef = useRef<WebSocket | null>(null);
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 5;
  const queryClient = useQueryClient();

  // Load notifications from localStorage on initial load
  useEffect(() => {
    try {
      const savedNotifications = localStorage.getItem('adminNotifications');
      if (savedNotifications) {
        setNotifications(JSON.parse(savedNotifications));
      }
    } catch (error) {
      console.error('Failed to load notifications from localStorage', error);
    }
  }, []);

  // Save notifications to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('adminNotifications', JSON.stringify(notifications));
    } catch (error) {
      console.error('Failed to save notifications to localStorage', error);
    }
  }, [notifications]);

  const connectWebSocket = () => {
    if (status !== 'authenticated' || !session?.user?.id) {
      return;
    }

    // Close existing connection if any
    if (socketRef.current) {
      socketRef.current.close();
    }

    // Create a new WebSocket connection
    const wsProtocol = window.location.protocol === 'https:' ? 'wss://' : 'ws://';
    const wsUrl = `${wsProtocol}${window.location.host}/api/ws?token=${session.accessToken}`;
    
    const socket = new WebSocket(wsUrl);
    socketRef.current = socket;

    socket.onopen = () => {
      console.log('WebSocket Connected');
      setIsConnected(true);
      reconnectAttempts.current = 0; // Reset reconnect attempts on successful connection
      
      // Send initial message to identify as admin client
      socket.send(JSON.stringify({
        type: 'identify',
        userId: session.user.id,
        role: 'admin',
      }));
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        handleWebSocketMessage(data);
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    socket.onclose = () => {
      console.log('WebSocket Disconnected');
      setIsConnected(false);
      
      // Attempt to reconnect with exponential backoff
      if (reconnectAttempts.current < maxReconnectAttempts) {
        const delay = Math.min(1000 * Math.pow(2, reconnectAttempts.current), 30000);
        reconnectAttempts.current += 1;
        
        console.log(`Attempting to reconnect in ${delay}ms...`);
        setTimeout(connectWebSocket, delay);
      }
    };

    socket.onerror = (error) => {
      console.error('WebSocket Error:', error);
    };
  };

  const handleWebSocketMessage = (data: any) => {
    if (!data.type) return;

    switch (data.type) {
      case 'new_user':
        handleNewUserNotification(data);
        break;
      case 'new_post':
        handleNewPostNotification(data);
        break;
      case 'report_created':
        handleReportNotification(data);
        break;
      case 'system_alert':
        handleSystemAlert(data);
        break;
      case 'admin_mention':
        handleAdminMention(data);
        break;
      default:
        console.log('Unhandled WebSocket message type:', data.type);
    }
  };

  const handleNewUserNotification = (data: any) => {
    const notification: Notification = {
      id: `user-${data.userId}-${Date.now()}`,
      type: 'info',
      title: 'New User Registered',
      message: `${data.username} (${data.email}) has just signed up.`,
      timestamp: new Date().toISOString(),
      read: false,
      action: {
        label: 'View User',
        onClick: () => {
          // Navigate to user profile
          window.location.href = `/admin/users/${data.userId}`;
        },
      },
    };
    
    addNotification(notification);
    showToast(notification);
    
    // Invalidate users query to refresh the list
    queryClient.invalidateQueries({ queryKey: ['users'] });
  };

  const handleNewPostNotification = (data: any) => {
    // Only show notifications for posts that might need moderation
    if (data.requiresModeration) {
      const notification: Notification = {
        id: `post-${data.postId}-${Date.now()}`,
        type: 'warning',
        title: 'Post Requires Moderation',
        message: `New post by ${data.authorName} requires review.`,
        timestamp: new Date().toISOString(),
        read: false,
        action: {
          label: 'Review Post',
          onClick: () => {
            // Open post in moderation queue
            window.location.href = `/admin/moderation?postId=${data.postId}`;
          },
        },
      };
      
      addNotification(notification);
      showToast(notification);
    }
  };

  const handleReportNotification = (data: any) => {
    const notification: Notification = {
      id: `report-${data.reportId}-${Date.now()}`,
      type: 'error',
      title: 'New Content Report',
      message: `${data.reportedBy} reported ${data.contentType} for ${data.reason}.`,
      timestamp: new Date().toISOString(),
      read: false,
      action: {
        label: 'View Report',
        onClick: () => {
          // Navigate to reports page
          window.location.href = `/admin/reports/${data.reportId}`;
        },
      },
    };
    
    addNotification(notification);
    showToast(notification);
    
    // Invalidate reports query to refresh the list
    queryClient.invalidateQueries({ queryKey: ['reports'] });
  };

  const handleSystemAlert = (data: any) => {
    const notification: Notification = {
      id: `system-${Date.now()}`,
      type: data.alertLevel || 'warning',
      title: data.title || 'System Alert',
      message: data.message,
      timestamp: new Date().toISOString(),
      read: false,
    };
    
    if (data.action) {
      notification.action = data.action;
    }
    
    addNotification(notification);
    showToast(notification);
  };

  const handleAdminMention = (data: any) => {
    const notification: Notification = {
      id: `mention-${data.mentionId}-${Date.now()}`,
      type: 'info',
      title: 'You were mentioned',
      message: `${data.mentionedBy} mentioned you in a ${data.context}.`,
      timestamp: new Date().toISOString(),
      read: false,
      action: {
        label: 'View',
        onClick: () => {
          // Navigate to the mentioned content
          window.location.href = data.url;
        },
      },
    };
    
    addNotification(notification);
    showToast(notification);
  };

  const showToast = (notification: Notification) => {
    const { type, title, message, action } = notification;
    
    switch (type) {
      case 'success':
        toast.success(title, {
          description: message,
          action: action ? {
            label: action.label,
            onClick: action.onClick,
          } : undefined,
        });
        break;
      case 'error':
        toast.error(title, {
          description: message,
          action: action ? {
            label: action.label,
            onClick: action.onClick,
          } : undefined,
        });
        break;
      case 'warning':
        toast.warning(title, {
          description: message,
          action: action ? {
            label: action.label,
            onClick: action.onClick,
          } : undefined,
        });
        break;
      default:
        toast.info(title, {
          description: message,
          action: action ? {
            label: action.label,
            onClick: action.onClick,
          } : undefined,
        });
    }
  };

  const addNotification = (notification: Notification) => {
    setNotifications(prev => [notification, ...prev].slice(0, 100)); // Keep only the 100 most recent
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => 
        n.id === id ? { ...n, read: true } : n
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, read: true }))
    );
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  // Connect to WebSocket when user is authenticated
  useEffect(() => {
    if (status === 'authenticated' && session?.user?.id) {
      connectWebSocket();
    }

    // Clean up WebSocket connection on unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [status, session]);

  // Reconnect when window gains focus if disconnected
  useEffect(() => {
    const handleFocus = () => {
      if (!isConnected && status === 'authenticated' && reconnectAttempts.current < maxReconnectAttempts) {
        connectWebSocket();
      }
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [isConnected, status]);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <WebSocketContext.Provider
      value={{
        socket: socketRef.current,
        isConnected,
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        clearNotifications,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
}

export function useWebSocket() {
  const context = useContext(WebSocketContext);
  if (context === undefined) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
}
