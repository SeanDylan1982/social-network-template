'use client';

import { useState, useEffect, useRef } from 'react';
import { useWebSocket } from '@/contexts/WebSocketContext';
import { formatDistanceToNow } from 'date-fns';
import { Bell, Check, X, AlertTriangle, Info, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

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

export function NotificationsDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useWebSocket();
  const [isLoading, setIsLoading] = useState(true);
  const [isMarkingAll, setIsMarkingAll] = useState(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
    
    if (notification.action) {
      notification.action.onClick();
    }
    
    setIsOpen(false);
  };

  const handleMarkAllAsRead = async () => {
    try {
      setIsMarkingAll(true);
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 300));
      markAllAsRead();
    } finally {
      setIsMarkingAll(false);
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error':
        return <X className="h-4 w-4 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      default:
        return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        size="icon"
        className="relative rounded-full"
        onClick={() => {
          setIsOpen(!isOpen);
          // Mark all as read when opening the dropdown
          if (!isOpen && unreadCount > 0) {
            markAllAsRead();
          }
        }}
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <Badge 
            variant="destructive" 
            className="absolute -right-1 -top-1 h-5 w-5 flex items-center justify-center p-0"
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </Badge>
        )}
      </Button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 rounded-md border bg-popover shadow-lg z-50">
          <div className="flex items-center justify-between border-b px-4 py-3">
            <h3 className="font-medium">Notifications</h3>
            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleMarkAllAsRead}
                disabled={unreadCount === 0 || isMarkingAll}
                className="h-8 px-2 text-xs"
              >
                {isMarkingAll ? 'Marking...' : 'Mark all as read'}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <ScrollArea className="h-96">
            {isLoading ? (
              <div className="space-y-2 p-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-start space-x-3 p-2 rounded-md">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="flex-1 space-y-1">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-full" />
                      <Skeleton className="h-2 w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-6 text-center">
                <Bell className="h-10 w-10 text-muted-foreground mb-2" />
                <h4 className="text-sm font-medium">No notifications yet</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  We'll notify you when something happens.
                </p>
              </div>
            ) : (
              <div className="divide-y">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={cn(
                      'p-4 hover:bg-accent cursor-pointer transition-colors',
                      !notification.read && 'bg-accent/50',
                    )}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <div className="flex items-start">
                      <div className="mt-0.5 mr-3">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between">
                          <p className="text-sm font-medium truncate">
                            {notification.title}
                          </p>
                          {!notification.read && (
                            <span className="h-2 w-2 rounded-full bg-primary" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {notification.message}
                        </p>
                        <div className="mt-1 flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(notification.timestamp), {
                              addSuffix: true,
                            })}
                          </span>
                          {notification.action && (
                            <Button
                              variant="link"
                              size="sm"
                              className="h-auto p-0 text-xs"
                              onClick={(e) => {
                                e.stopPropagation();
                                notification.action?.onClick();
                                setIsOpen(false);
                              }}
                            >
                              {notification.action.label}
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
          
          {notifications.length > 0 && (
            <div className="border-t p-2 text-center">
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full text-sm"
                onClick={() => {
                  // Navigate to notifications page
                  window.location.href = '/admin/notifications';
                }}
              >
                View all notifications
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
