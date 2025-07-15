'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Search, Filter, Plus, RefreshCw, Mail, AlertCircle, CheckCircle, MessageSquare, Tag, User, Clock, ArrowUpDown } from 'lucide-react';
import { format } from 'date-fns';

type TicketStatus = 'open' | 'pending' | 'in_progress' | 'resolved' | 'closed';
type TicketPriority = 'low' | 'medium' | 'high' | 'critical';

type SupportTicket = {
  id: string;
  subject: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  category: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  assignedTo?: {
    id: string;
    name: string;
    avatar?: string;
  };
  lastRepliedAt?: string;
  lastRepliedBy?: {
    id: string;
    name: string;
  };
  messages: number;
};

const statuses = {
  open: { label: 'Open', color: 'bg-blue-500' },
  pending: { label: 'Pending', color: 'bg-yellow-500' },
  in_progress: { label: 'In Progress', color: 'bg-purple-500' },
  resolved: { label: 'Resolved', color: 'bg-green-500' },
  closed: { label: 'Closed', color: 'bg-gray-500' },
};

const priorities = {
  low: { label: 'Low', color: 'bg-green-500' },
  medium: { label: 'Medium', color: 'bg-blue-500' },
  high: { label: 'High', color: 'bg-orange-500' },
  critical: { label: 'Critical', color: 'bg-red-500' },
};

const categories = [
  'Account',
  'Billing',
  'Technical',
  'Feature Request',
  'Bug Report',
  'Other',
];

// Mock data - in a real app, this would come from an API
const mockTickets: SupportTicket[] = [
  {
    id: 'T-1001',
    subject: 'Unable to reset password',
    description: 'I\'ve tried resetting my password multiple times but I don\'t receive the reset email.',
    status: 'open',
    priority: 'high',
    category: 'Account',
    createdAt: '2023-06-15T10:30:00Z',
    updatedAt: '2023-06-15T10:30:00Z',
    user: {
      id: 'U-1001',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://i.pravatar.cc/150?u=U-1001',
    },
    messages: 2,
  },
  {
    id: 'T-1002',
    subject: 'Feature request: Dark mode',
    description: 'I would love to see a dark mode option in the app settings.',
    status: 'open',
    priority: 'medium',
    category: 'Feature Request',
    createdAt: '2023-06-14T15:20:00Z',
    updatedAt: '2023-06-14T15:20:00Z',
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
    lastRepliedAt: '2023-06-14T16:45:00Z',
    lastRepliedBy: {
      id: 'A-1001',
      name: 'Admin User',
    },
    messages: 3,
  },
  {
    id: 'T-1003',
    subject: 'Payment failed but money was deducted',
    description: 'I was charged for my subscription but it shows as failed on the website.',
    status: 'in_progress',
    priority: 'critical',
    category: 'Billing',
    createdAt: '2023-06-13T09:15:00Z',
    updatedAt: '2023-06-14T11:30:00Z',
    user: {
      id: 'U-1003',
      name: 'Robert Johnson',
      email: 'robert@example.com',
      avatar: 'https://i.pravatar.cc/150?u=U-1003',
    },
    assignedTo: {
      id: 'A-1002',
      name: 'Support Agent',
      avatar: 'https://i.pravatar.cc/150?u=A-1002',
    },
    lastRepliedAt: '2023-06-14T11:30:00Z',
    lastRepliedBy: {
      id: 'U-1003',
      name: 'Robert Johnson',
    },
    messages: 5,
  },
  {
    id: 'T-1004',
    subject: 'App crashes on iOS 16.5',
    description: 'The app keeps crashing when I try to upload a photo on my iPhone running iOS 16.5.',
    status: 'pending',
    priority: 'high',
    category: 'Bug Report',
    createdAt: '2023-06-12T14:20:00Z',
    updatedAt: '2023-06-13T10:15:00Z',
    user: {
      id: 'U-1004',
      name: 'Emily Chen',
      email: 'emily@example.com',
      avatar: 'https://i.pravatar.cc/150?u=U-1004',
    },
    messages: 1,
  },
  {
    id: 'T-1005',
    subject: 'How to export my data?',
    description: 'I would like to download a copy of all my data from the platform.',
    status: 'resolved',
    priority: 'low',
    category: 'Account',
    createdAt: '2023-06-10T11:05:00Z',
    updatedAt: '2023-06-11T09:45:00Z',
    user: {
      id: 'U-1005',
      name: 'Michael Brown',
      email: 'michael@example.com',
      avatar: 'https://i.pravatar.cc/150?u=U-1005',
    },
    assignedTo: {
      id: 'A-1001',
      name: 'Admin User',
      avatar: 'https://i.pravatar.cc/150?u=A-1001',
    },
    lastRepliedAt: '2023-06-11T09:45:00Z',
    lastRepliedBy: {
      id: 'A-1001',
      name: 'Admin User',
    },
    messages: 4,
  },
];

export function SupportTickets() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<TicketStatus | 'all'>('all');
  const [selectedPriority, setSelectedPriority] = useState<TicketPriority | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTickets, setSelectedTickets] = useState<Set<string>>(new Set());

  // Fetch tickets from API
  const { data: tickets = [], isLoading, refetch } = useQuery<SupportTicket[]>({
    queryKey: ['support-tickets'],
    queryFn: async () => {
      // In a real app, this would be an API call
      // const response = await fetch('/api/admin/support/tickets');
      // if (!response.ok) throw new Error('Failed to fetch tickets');
      // return response.json();
      
      // For demo purposes, return mock data with a delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockTickets;
    },
  });

  // Filter tickets based on search and filters
  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = 
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || ticket.status === selectedStatus;
    const matchesPriority = selectedPriority === 'all' || ticket.priority === selectedPriority;
    const matchesCategory = selectedCategory === 'all' || ticket.category === selectedCategory;
    
    return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
  });

  const toggleSelectTicket = (ticketId: string) => {
    const newSelection = new Set(selectedTickets);
    if (newSelection.has(ticketId)) {
      newSelection.delete(ticketId);
    } else {
      newSelection.add(ticketId);
    }
    setSelectedTickets(newSelection);
  };

  const toggleSelectAll = () => {
    if (selectedTickets.size === filteredTickets.length) {
      setSelectedTickets(new Set());
    } else {
      setSelectedTickets(new Set(filteredTickets.map(ticket => ticket.id)));
    }
  };

  const getStatusBadge = (status: TicketStatus) => {
    const statusInfo = statuses[status];
    return (
      <Badge className={`${statusInfo.color} text-white`}>
        {statusInfo.label}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: TicketPriority) => {
    const priorityInfo = priorities[priority];
    return (
      <Badge variant="outline" className={`border-${priorityInfo.color} text-${priorityInfo.color} hover:bg-${priorityInfo.color}/10`}>
        {priorityInfo.label}
      </Badge>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="flex items-center space-x-2">
          <RefreshCw className="h-4 w-4 animate-spin" />
          <span>Loading tickets...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search tickets..."
            className="pl-9 w-full sm:w-[300px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1">
                <Filter className="h-3.5 w-3.5" />
                <span>Filter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <div className="p-2 space-y-2">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground">Status</p>
                  <select
                    className="w-full p-2 text-sm border rounded"
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value as TicketStatus | 'all')}
                  >
                    <option value="all">All Statuses</option>
                    {Object.entries(statuses).map(([value, { label }]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground">Priority</p>
                  <select
                    className="w-full p-2 text-sm border rounded"
                    value={selectedPriority}
                    onChange={(e) => setSelectedPriority(e.target.value as TicketPriority | 'all')}
                  >
                    <option value="all">All Priorities</option>
                    {Object.entries(priorities).map(([value, { label }]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground">Category</p>
                  <select
                    className="w-full p-2 text-sm border rounded"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="all">All Categories</option>
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button size="sm" variant="outline" onClick={() => refetch()}>
            <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
            <span>Refresh</span>
          </Button>
          
          <Button size="sm" className="ml-auto">
            <Plus className="h-3.5 w-3.5 mr-1.5" />
            <span>New Ticket</span>
          </Button>
        </div>
      </div>
      
      <div className="rounded-md border
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox 
                  checked={selectedTickets.size === filteredTickets.length && filteredTickets.length > 0}
                  onCheckedChange={toggleSelectAll}
                  aria-label="Select all"
                />
              </TableHead>
              <TableHead>Ticket</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTickets.length > 0 ? (
              filteredTickets.map((ticket) => (
                <TableRow key={ticket.id} className="hover:bg-muted/50">
                  <TableCell>
                    <Checkbox 
                      checked={selectedTickets.has(ticket.id)}
                      onCheckedChange={() => toggleSelectTicket(ticket.id)}
                      aria-label={`Select ticket ${ticket.id}`}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{ticket.subject}</div>
                    <div className="text-xs text-muted-foreground line-clamp-1">
                      {ticket.description}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                  <TableCell>{getPriorityBadge(ticket.priority)}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{ticket.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                        {ticket.user.avatar ? (
                          <img 
                            src={ticket.user.avatar} 
                            alt={ticket.user.name}
                            className="h-full w-full rounded-full object-cover"
                          />
                        ) : (
                          <User className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium">{ticket.user.name}</div>
                        <div className="text-xs text-muted-foreground">{ticket.user.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {format(new Date(ticket.updatedAt), 'MMM d, yyyy')}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {format(new Date(ticket.updatedAt), 'h:mm a')}
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <MessageSquare className="mr-2 h-4 w-4" />
                          <span>View Conversation</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <User className="mr-2 h-4 w-4" />
                          <span>View User</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Tag className="mr-2 h-4 w-4" />
                          <span>Change Status</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  No tickets found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {selectedTickets.size > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Checkbox 
                checked={selectedTickets.size === filteredTickets.length}
                onCheckedChange={toggleSelectAll}
                aria-label="Select all"
              />
              <span className="text-sm font-medium">
                {selectedTickets.size} {selectedTickets.size === 1 ? 'ticket' : 'tickets'} selected
              </span>
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="ml-4">
                  Change Status
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {Object.entries(statuses).map(([value, { label }]) => (
                  <DropdownMenuItem key={value}>
                    {label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  Assign To
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem>Unassigned</DropdownMenuItem>
                <DropdownMenuItem>Admin User</DropdownMenuItem>
                <DropdownMenuItem>Support Agent</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button variant="outline" size="sm" className="text-destructive">
              Delete
            </Button>
          </div>
          
          <Button size="sm">
            Apply to {selectedTickets.size} {selectedTickets.size === 1 ? 'ticket' : 'tickets'}
          </Button>
        </div>
      )}
    </div>
  );
}
