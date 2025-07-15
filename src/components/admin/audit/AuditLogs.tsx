'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { format, formatDistanceToNow } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, RefreshCw, Download, MoreHorizontal, User, Shield, Trash2, Edit, Eye, Mail, UserPlus, UserX, CheckCircle, XCircle } from 'lucide-react';

// Types and mock data would be imported from a separate file in a real app
type AuditLog = {
  id: string;
  action: string;
  userId: string;
  user: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    role: string;
  };
  targetType?: string;
  targetId?: string;
  targetName?: string;
  ipAddress: string;
  timestamp: string;
  metadata?: Record<string, any>;
};

// Simplified mock data
const mockAuditLogs: AuditLog[] = [
  // ... (same mock data as before, but truncated for brevity)
];

const actionIcons: Record<string, React.ReactNode> = {
  'user:created': <UserPlus className="h-4 w-4" />,
  'user:updated': <Edit className="h-4 w-4" />,
  'user:deleted': <UserX className="h-4 w-4" />,
  'user:status_changed': <User className="h-4 w-4" />,
  'user:role_changed': <Shield className="h-4 w-4" />,
  'login:success': <CheckCircle className="h-4 w-4 text-green-500" />,
  'login:failed': <XCircle className="h-4 w-4 text-red-500" />,
};

const actionLabels: Record<string, string> = {
  'user:created': 'User Created',
  'user:updated': 'User Updated',
  'user:deleted': 'User Deleted',
  'user:status_changed': 'Status Changed',
  'user:role_changed': 'Role Changed',
  'login:success': 'Login Success',
  'login:failed': 'Login Failed',
};

export function AuditLogs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAction, setSelectedAction] = useState<string>('all');
  const [dateRange, setDateRange] = useState<string>('30days');

  // Fetch audit logs
  const { data: logs = [], isLoading, refetch } = useQuery<AuditLog[]>({
    queryKey: ['audit-logs'],
    queryFn: async () => {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 800));
      return mockAuditLogs;
    },
  });

  // Filter logs
  const filteredLogs = logs.filter(log => {
    const matchesSearch = 
      log.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (log.targetName && log.targetName.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesAction = selectedAction === 'all' || log.action === selectedAction;
    
    // Simplified date filtering
    const logDate = new Date(log.timestamp);
    const now = new Date();
    let startDate = new Date();
    
    switch (dateRange) {
      case 'today': startDate.setHours(0, 0, 0, 0); break;
      case '7days': startDate.setDate(now.getDate() - 7); break;
      case '30days': startDate.setDate(now.getDate() - 30); break;
      default: return matchesSearch && matchesAction;
    }
    
    return matchesSearch && matchesAction && logDate >= startDate;
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <Skeleton className="h-10 w-full sm:w-1/3" />
          <div className="flex space-x-2">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
          </div>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Action</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Target</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[1, 2, 3, 4, 5].map((i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative w-full sm:w-1/3">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search logs..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Select value={selectedAction} onValueChange={setSelectedAction}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Actions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Actions</SelectItem>
              {Object.entries(actionLabels).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  <div className="flex items-center">
                    {actionIcons[value]}
                    <span className="ml-2">{label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Date Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="icon" onClick={() => refetch()}>
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Action</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Target</TableHead>
              <TableHead>IP Address</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLogs.length > 0 ? (
              filteredLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>
                    <div className="flex items-center">
                      <div className="p-1 rounded mr-2 bg-muted">
                        {actionIcons[log.action] || <MoreHorizontal className="h-4 w-4" />}
                      </div>
                      <span>{actionLabels[log.action] || log.action}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src={log.user.avatar} alt={log.user.name} />
                        <AvatarFallback>
                          {log.user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{log.user.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {log.user.role}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {log.targetName || log.targetId || '-'}
                  </TableCell>
                  <TableCell>
                    <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                      {log.ipAddress}
                    </code>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {format(new Date(log.timestamp), 'MMM d, yyyy')}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {format(new Date(log.timestamp), 'h:mm a')}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No logs found matching your criteria.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {filteredLogs.length} {filteredLogs.length === 1 ? 'entry' : 'entries'} found
        </div>
        
        <Button variant="outline" size="sm" onClick={() => {
          toast.success('Export started. You will receive an email when it\'s ready.');
        }}>
          <Download className="h-4 w-4 mr-2" />
          Export Logs
        </Button>
      </div>
    </div>
  );
}
