'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { format, formatDistanceToNow } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { ArrowLeft, Mail, User, Tag, Clock, MessageSquare, Paperclip, Send, MoreVertical, CheckCircle, AlertCircle, UserPlus, Tag as TagIcon } from 'lucide-react';

type Message = {
  id: string;
  content: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    isAdmin?: boolean;
  };
  attachments?: Array<{
    id: string;
    name: string;
    url: string;
    type: string;
    size: number;
  }>;
};

type TicketDetailProps = {
  ticketId: string;
  onBack?: () => void;
};

// Mock data for a single ticket - in a real app, this would come from an API
const mockTicket = {
  id: 'T-1002',
  subject: 'Feature request: Dark mode',
  description: 'I would love to see a dark mode option in the app settings. It would be great for night-time usage and reducing eye strain.',
  status: 'open',
  priority: 'medium',
  category: 'Feature Request',
  createdAt: '2023-06-14T15:20:00Z',
  updatedAt: '2023-06-16T09:15:00Z',
  user: {
    id: 'U-1002',
    name: 'Jane Smith',
    email: 'jane@example.com',
    avatar: 'https://i.pravatar.cc/150?u=U-1002',
  },
  assignedTo: {
    id: 'A-1001',
    name: 'Admin User',
    avatar: 'https://i.pravatar.cc/150?u=A-1001',
  },
  lastRepliedAt: '2023-06-16T09:15:00Z',
  lastRepliedBy: {
    id: 'A-1001',
    name: 'Admin User',
  },
  messages: [
    {
      id: 'M-2001',
      content: 'I would love to see a dark mode option in the app settings. It would be great for night-time usage and reducing eye strain.',
      createdAt: '2023-06-14T15:20:00Z',
      user: {
        id: 'U-1002',
        name: 'Jane Smith',
        email: 'jane@example.com',
        avatar: 'https://i.pravatar.cc/150?u=U-1002',
      },
    },
    {
      id: 'M-2002',
      content: 'Thanks for your suggestion, Jane! We\'ve been considering adding a dark mode and your feedback is valuable. I\'ve passed this along to our design team.',
      createdAt: '2023-06-15T10:30:00Z',
      user: {
        id: 'A-1001',
        name: 'Admin User',
        email: 'admin@example.com',
        avatar: 'https://i.pravatar.cc/150?u=A-1001',
        isAdmin: true,
      },
    },
    {
      id: 'M-2003',
      content: 'That\'s great to hear! Do you have an estimated timeline for when this might be implemented?',
      createdAt: '2023-06-15T16:45:00Z',
      user: {
        id: 'U-1002',
        name: 'Jane Smith',
        email: 'jane@example.com',
        avatar: 'https://i.pravatar.cc/150?u=U-1002',
      },
    },
    {
      id: 'M-2004',
      content: 'We\'re currently working on a major update that includes dark mode. We expect to release it in the next 4-6 weeks. I\'ll keep you updated on our progress!',
      createdAt: '2023-06-16T09:15:00Z',
      user: {
        id: 'A-1001',
        name: 'Admin User',
        email: 'admin@example.com',
        avatar: 'https://i.pravatar.cc/150?u=A-1001',
        isAdmin: true,
      },
    },
  ],
};

const statusOptions = [
  { value: 'open', label: 'Open', icon: <AlertCircle className="h-4 w-4" /> },
  { value: 'pending', label: 'Pending', icon: <Clock className="h-4 w-4" /> },
  { value: 'in_progress', label: 'In Progress', icon: <RefreshCw className="h-4 w-4 animate-spin" /> },
  { value: 'resolved', label: 'Resolved', icon: <CheckCircle className="h-4 w-4" /> },
  { value: 'closed', label: 'Closed', icon: <XCircle className="h-4 w-4" /> },
];

const priorityOptions = [
  { value: 'low', label: 'Low', color: 'bg-green-500' },
  { value: 'medium', label: 'Medium', color: 'bg-blue-500' },
  { value: 'high', label: 'High', color: 'bg-orange-500' },
  { value: 'critical', label: 'Critical', color: 'bg-red-500' },
];

const categoryOptions = [
  'Account',
  'Billing',
  'Technical',
  'Feature Request',
  'Bug Report',
  'Other',
];

export function TicketDetail({ ticketId, onBack }: TicketDetailProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [message, setMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedSubject, setEditedSubject] = useState('');
  const [editedDescription, setEditedDescription] = useState('');

  // Fetch ticket details
  const { data: ticket, isLoading } = useQuery({
    queryKey: ['ticket', ticketId],
    queryFn: async () => {
      // In a real app, this would be an API call
      // const response = await fetch(`/api/admin/support/tickets/${ticketId}`);
      // if (!response.ok) throw new Error('Failed to fetch ticket');
      // return response.json();
      
      // For demo purposes, return mock data with a delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockTicket;
    },
  });

  // Update ticket status
  const { mutate: updateStatus } = useMutation({
    mutationFn: async (status: string) => {
      // In a real app, this would be an API call
      // const response = await fetch(`/api/admin/support/tickets/${ticketId}/status`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ status }),
      // });
      // if (!response.ok) throw new Error('Failed to update status');
      // return response.json();
      
      // For demo purposes, just return with a delay
      await new Promise(resolve => setTimeout(resolve, 300));
      return { ...ticket, status };
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['ticket', ticketId], data);
      toast.success('Status updated successfully');
    },
    onError: () => {
      toast.error('Failed to update status');
    },
  });

  // Update ticket priority
  const { mutate: updatePriority } = useMutation({
    mutationFn: async (priority: string) => {
      // Similar API call as above
      await new Promise(resolve => setTimeout(resolve, 300));
      return { ...ticket, priority };
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['ticket', ticketId], data);
      toast.success('Priority updated successfully');
    },
    onError: () => {
      toast.error('Failed to update priority');
    },
  });

  // Update ticket category
  const { mutate: updateCategory } = useMutation({
    mutationFn: async (category: string) => {
      // Similar API call as above
      await new Promise(resolve => setTimeout(resolve, 300));
      return { ...ticket, category };
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['ticket', ticketId], data);
      toast.success('Category updated successfully');
    },
    onError: () => {
      toast.error('Failed to update category');
    },
  });

  // Assign ticket
  const { mutate: assignTicket } = useMutation({
    mutationFn: async (userId: string) => {
      // Similar API call as above
      await new Promise(resolve => setTimeout(resolve, 300));
      const assignedUser = userId === 'unassigned' 
        ? undefined 
        : { id: 'A-1001', name: 'Admin User', avatar: 'https://i.pravatar.cc/150?u=A-1001' };
      
      return { 
        ...ticket, 
        assignedTo: assignedUser,
        updatedAt: new Date().toISOString() 
      };
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['ticket', ticketId], data);
      toast.success('Ticket assignment updated');
    },
    onError: () => {
      toast.error('Failed to update assignment');
    },
  });

  // Send message
  const { mutate: sendMessage, isPending: isSending } = useMutation({
    mutationFn: async (content: string) => {
      // In a real app, this would be an API call
      // const response = await fetch(`/api/admin/support/tickets/${ticketId}/messages`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ content }),
      // });
      // if (!response.ok) throw new Error('Failed to send message');
      // return response.json();
      
      // For demo purposes, create a mock message
      const newMessage = {
        id: `M-${Date.now()}`,
        content,
        createdAt: new Date().toISOString(),
        user: {
          id: 'A-1001',
          name: 'Admin User',
          email: 'admin@example.com',
          avatar: 'https://i.pravatar.cc/150?u=A-1001',
          isAdmin: true,
        },
      };
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return {
        ...ticket,
        messages: [...ticket.messages, newMessage],
        updatedAt: new Date().toISOString(),
        lastRepliedAt: new Date().toISOString(),
        lastRepliedBy: {
          id: 'A-1001',
          name: 'Admin User',
        },
      };
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['ticket', ticketId], data);
      setMessage('');
      toast.success('Message sent');
    },
    onError: () => {
      toast.error('Failed to send message');
    },
  });

  // Update ticket details
  const { mutate: updateTicket, isPending: isUpdating } = useMutation({
    mutationFn: async () => {
      // Similar API call as above
      await new Promise(resolve => setTimeout(resolve, 500));
      return {
        ...ticket,
        subject: editedSubject,
        description: editedDescription,
        updatedAt: new Date().toISOString(),
      };
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['ticket', ticketId], data);
      setIsEditing(false);
      toast.success('Ticket updated successfully');
    },
    onError: () => {
      toast.error('Failed to update ticket');
    },
  });

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage(message.trim());
    }
  };

  const handleSaveChanges = () => {
    if (editedSubject.trim() && editedDescription.trim()) {
      updateTicket();
    }
  };

  const handleStartEditing = () => {
    setEditedSubject(ticket.subject);
    setEditedDescription(ticket.description);
    setIsEditing(true);
  };

  const handleCancelEditing = () => {
    setIsEditing(false);
  };

  if (isLoading || !ticket) {
    return (
      <div className="space-y-4">
        <Button variant="outline" size="sm" onClick={onBack} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to tickets
        </Button>
        
        <div className="space-y-4">
          <Skeleton className="h-8 w-3/4" />
          <div className="flex items-center space-x-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="h-24 w-full" />
          
          <div className="space-y-4 mt-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex space-x-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-16 w-full" />
                </div>
              </div>
            ))}
          </div>
          
          <div className="pt-4 mt-8 border-t">
            <Skeleton className="h-24 w-full" />
            <div className="flex justify-end mt-2">
              <Skeleton className="h-10 w-24" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to tickets
        </Button>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={handleStartEditing} disabled={isEditing}>
            Edit Ticket
          </Button>
          
          <Select 
            value={ticket.status} 
            onValueChange={updateStatus}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  <div className="flex items-center">
                    {status.icon}
                    <span className="ml-2">{status.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <UserPlus className="h-4 w-4 mr-2" />
                <span>Assign to...</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <TagIcon className="h-4 w-4 mr-2" />
                <span>Change Priority</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="h-4 w-4 mr-2" />
                <span>Delete Ticket</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="space-y-2">
          {isEditing ? (
            <div className="space-y-4">
              <Input
                value={editedSubject}
                onChange={(e) => setEditedSubject(e.target.value)}
                className="text-2xl font-bold"
              />
              <Textarea
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                className="min-h-[100px]"
              />
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={handleCancelEditing}>
                  Cancel
                </Button>
                <Button onClick={handleSaveChanges} disabled={isUpdating}>
                  {isUpdating ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-bold">{ticket.subject}</h1>
              <p className="text-muted-foreground">{ticket.description}</p>
              
              <div className="flex flex-wrap items-center gap-4 pt-2 text-sm">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>Created by {ticket.user.name}</span>
                  <span className="text-muted-foreground">
                    {format(new Date(ticket.createdAt), 'MMM d, yyyy')}
                  </span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  <Badge variant="outline">{ticket.category}</Badge>
                  <Badge variant={ticket.priority === 'high' || ticket.priority === 'critical' ? 'destructive' : 'secondary'}>
                    {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
                  </Badge>
                </div>
                
                {ticket.assignedTo && (
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span>Assigned to {ticket.assignedTo.name}</span>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
        
        <div className="border-t pt-6 mt-6">
          <h2 className="text-lg font-semibold mb-4">Conversation</h2>
          
          <div className="space-y-6">
            {ticket.messages.map((msg) => (
              <div key={msg.id} className="flex space-x-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={msg.user.avatar} alt={msg.user.name} />
                  <AvatarFallback>
                    {msg.user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">
                      {msg.user.name}
                      {msg.user.isAdmin && (
                        <Badge variant="outline" className="ml-2 text-xs">
                          Admin
                        </Badge>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {formatDistanceToNow(new Date(msg.createdAt), { addSuffix: true })}
                    </div>
                  </div>
                  
                  <div className="mt-1 text-sm whitespace-pre-line">
                    {msg.content}
                  </div>
                  
                  {msg.attachments && msg.attachments.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {msg.attachments.map((file) => (
                        <a
                          key={file.id}
                          href={file.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-sm text-blue-600 hover:underline"
                        >
                          <Paperclip className="h-3.5 w-3.5 mr-1.5" />
                          {file.name} ({formatFileSize(file.size)})
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 pt-6 border-t">
            <form onSubmit={handleSendMessage} className="space-y-3">
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your reply..."
                className="min-h-[100px]"
                disabled={isSending}
              />
              <div className="flex items-center justify-between">
                <Button type="button" variant="ghost" size="sm">
                  <Paperclip className="h-4 w-4 mr-2" />
                  Attach file
                </Button>
                <Button type="submit" disabled={!message.trim() || isSending}>
                  {isSending ? 'Sending...' : 'Send Message'}
                  <Send className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Select 
            value={ticket.status} 
            onValueChange={updateStatus}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  <div className="flex items-center">
                    {status.icon}
                    <span className="ml-2">{status.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select 
            value={ticket.priority} 
            onValueChange={updatePriority}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              {priorityOptions.map((priority) => (
                <SelectItem key={priority.value} value={priority.value}>
                  <div className="flex items-center">
                    <div className={`h-2 w-2 rounded-full ${priority.color} mr-2`} />
                    <span>{priority.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select 
            value={ticket.assignedTo?.id || 'unassigned'} 
            onValueChange={assignTicket}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Assign to" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="unassigned">Unassigned</SelectItem>
              <SelectItem value="A-1001">Admin User</SelectItem>
              <SelectItem value="A-1002">Support Agent</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button variant="destructive" size="sm">
          Delete Ticket
        </Button>
      </div>
    </div>
  );
}

// Helper function to format file size
function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}
