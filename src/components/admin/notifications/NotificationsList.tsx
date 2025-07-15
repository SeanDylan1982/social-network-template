'use client';

import { useState, useEffect } from 'react';
import { useWebSocket } from '@/contexts/WebSocketContext';
import { format, formatDistanceToNow } from 'date-fns';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Check, AlertTriangle, Info, CheckCircle, X, Bell, Trash2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type NotificationTab = 'all' | 'unread' | 'read';

export function NotificationsList() {
  const { notifications, markAsRead, markAllAsRead, clearNotifications } = useWebSocket();
  const [activeTab, setActiveTab] = useState<NotificationTab>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [isMarkingAll, setIsMarkingAll] = useState(false);
  const [isClearing, setIsClearing] = useState(false);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Filter notifications based on active tab
  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === 'unread') return !notification.read;
    if (activeTab === 'read') return notification.read;
    return true; // 'all' tab
  });

  const unreadCount = notifications.filter(n => !n.read).length;
  const readCount = notifications.length - unreadCount;

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

  const handleClearAll = async () => {
    try {
      setIsClearing(true);
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 300));
      clearNotifications();
    } finally {
      setIsClearing(false);
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <X className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-9 w-24" />
        </div>
        <div className="space-y-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="p-4 border rounded-lg">
              <div className="flex items-start space-x-3">
                <Skeleton className="h-5 w-5 rounded-full mt-0.5" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-2 w-1/2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <Tabs 
          value={activeTab} 
          onValueChange={(value) => setActiveTab(value as NotificationTab)}
          className="w-full sm:w-auto"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">
              All
              {notifications.length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {notifications.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="unread">
              Unread
              {unreadCount > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {unreadCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="read">
              Read
              {readCount > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {readCount}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleMarkAllAsRead}
            disabled={unreadCount === 0 || isMarkingAll}
          >
            {isMarkingAll ? (
              'Marking...'
            ) : (
              <>
                <Check className="h-4 w-4 mr-2" />
                Mark all as read
              </>
            )}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleClearAll}
            disabled={notifications.length === 0 || isClearing}
          >
            {isClearing ? (
              'Clearing...'
            ) : (
              <>
                <Trash2 className="h-4 w-4 mr-2" />
                Clear all
              </>
            )}
          </Button>
        </div>
      </div>

      {filteredNotifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center border rounded-lg">
          <Bell className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">
            {activeTab === 'all' 
              ? 'No notifications yet'
              : activeTab === 'unread' 
                ? 'No unread notifications'
                : 'No read notifications'}
          </h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-md">
            {activeTab === 'all' 
              ? 'When you get notifications, they will appear here.'
              : activeTab === 'unread' 
                ? 'You\'re all caught up! No unread notifications.'
                : 'No notifications have been marked as read yet.'}
          </p>
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <ScrollArea className="h-[calc(100vh-250px)]">
            <div className="divide-y">
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={cn(
                    'p-4 hover:bg-accent/50 transition-colors',
                    !notification.read && 'bg-accent/30',
                  )}
                >
                  <div className="flex items-start">
                    <div className="mr-3 mt-0.5">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium">{notification.title}</h4>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(notification.timestamp), {
                              addSuffix: true,
                            })}
                          </span>
                          {!notification.read && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 px-2 text-xs"
                              onClick={() => markAsRead(notification.id)}
                            >
                              Mark as read
                            </Button>
                          )}
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mt-1">
                        {notification.message}
                      </p>
                      
                      {notification.action && (
                        <div className="mt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              notification.action?.onClick();
                            }}
                          >
                            {notification.action.label}
                          </Button>
                        </div>
                      )}
                      
                      <div className="mt-2 pt-2 border-t text-xs text-muted-foreground">
                        {format(new Date(notification.timestamp), 'MMMM d, yyyy h:mm a')}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          
          <div className="border-t px-4 py-3 text-sm text-muted-foreground text-center">
            Showing {filteredNotifications.length} of {notifications.length} total notifications
          </div>
        </div>
      )}
    </div>
  );
}

function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
