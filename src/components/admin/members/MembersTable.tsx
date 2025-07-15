'use client';

import * as React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { ColumnDef } from '@/components/ui/DataTable';

// Import icons
import { 
  MoreHorizontal, 
  UserX, 
  UserCheck, 
  UserCog, 
  Trash2, 
  Shield, 
  Ban,
  Loader2,
  UserPlus,
  User
} from 'lucide-react';

// Import UI components
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DataTable } from '@/components/ui/DataTable';
import { Badge } from '@/components/ui/badge';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

// Define types for our data and columns
interface UserType {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'moderator' | 'user';
  status: 'active' | 'suspended' | 'pending';
  lastActive: string;
  createdAt: string;
  avatar?: string;
  image?: string;
}

type BulkActionType = 'suspend' | 'activate' | 'makeAdmin' | 'makeModerator' | 'makeUser' | 'delete';

type BadgeVariant = 'default' | 'destructive' | 'success' | 'warning' | 'outline' | 'secondary';

const useUsers = (page: number, limit: number) => {
  return useQuery({
    queryKey: ['admin', 'users', { page, limit }],
    queryFn: async () => {
      const response = await fetch(`/api/admin/users?page=${page}&limit=${limit}`);
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      return response.json();
    },
  });
};

export const MembersTable = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);
  const [page, setPage] = React.useState(1);
  const limit = 10; // Fixed limit for now

  // Handle selection change
  const handleSelectionChange = React.useCallback((ids: string[]) => {
    setSelectedIds(ids);
  }, []);

  // Define bulk update mutation first to avoid 'used before defined' errors
  const { mutate: bulkUpdateUsers } = useMutation({
    mutationFn: async ({ action, userIds }: { action: BulkActionType, userIds: string[] }) => {
      const response = await fetch('/api/admin/users/bulk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action,
          userIds,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update users');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
      setSelectedIds([]);
      toast.success('Users updated successfully');
    },
    onError: (error: Error) => {
      toast.error(`Error updating users: ${error.message}`);
    },
  });

  // Fetch users with pagination
  const { data, isLoading, error } = useUsers(page, limit);
  const users: UserType[] = React.useMemo(() => data?.data || [], [data?.data]);
  const totalUsers = data?.total || 0;

  // Handle page change
  const handlePageChange = React.useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  // Format date for display (memoized)
  const formatDate = React.useCallback((dateString: string): string => {
    try {
      return new Date(dateString).toLocaleDateString();
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString;
    }
  }, []);

  // Get status badge variant
  const getStatusVariant = React.useCallback((status: string): BadgeVariant => {
    switch (status) {
      case 'active':
        return 'success';
      case 'suspended':
        return 'destructive';
      case 'pending':
        return 'warning';
      default:
        return 'default';
    }
  }, []);

  // Get role badge variant
  const getRoleVariant = React.useCallback((role: string): BadgeVariant => {
    switch (role) {
      case 'admin':
        return 'default';
      case 'moderator':
        return 'secondary';
      case 'user':
        return 'outline';
      default:
        return 'default';
    }
  }, []);

  // Memoize the columns to prevent unnecessary re-renders
  // Using 'any' type for now to work around TypeScript issues with the DataTable component
  const handleEditUser = React.useCallback((user: UserType) => {
    router.push(`/admin/users/edit/${user.id}`);
  }, [router]);

  // Handle toggle user status
  const handleToggleStatus = React.useCallback((user: UserType) => {
    const newStatus = user.status === 'active' ? 'suspended' : 'active';
    bulkUpdateUsers({ action: newStatus === 'active' ? 'activate' : 'suspend', userIds: [user.id] });
  }, [bulkUpdateUsers]);

  // Handle delete user
  const handleDeleteUser = React.useCallback((user: UserType) => {
    if (window.confirm(`Are you sure you want to delete ${user.name}? This action cannot be undone.`)) {
      bulkUpdateUsers({ action: 'delete', userIds: [user.id] });
    }
  }, [bulkUpdateUsers]);

  // Define columns after all handlers are defined
  const columns: ColumnDef<UserType>[] = [
    {
      id: 'select',
      header: 'Select',
      cell: ({ row }: { row: { original: UserType } }) => (
        <Checkbox
          checked={selectedIds.includes(row.original.id)}
          onCheckedChange={(checked: boolean) => {
            if (checked) {
              handleSelectionChange([...selectedIds, row.original.id]);
            } else {
              handleSelectionChange(selectedIds.filter(id => id !== row.original.id));
            }
          }}
          aria-label="Select row"
        />
      ),
      size: 50,
    },
    {
      id: 'name',
      header: 'Name',
      cell: (row: UserType) => (
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
            {row.avatar ? (
              <img
                src={row.avatar}
                alt={row.name}
                className="h-8 w-8 rounded-full"
              />
            ) : (
              <span className="text-sm font-medium">
                {row.name.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          <div>
            <div className="font-medium">{row.name}</div>
            <div className="text-sm text-gray-500">{row.email}</div>
          </div>
        </div>
      ),
    },
    {
      id: 'role',
      header: 'Role',
      cell: (row: UserType) => (
        <Badge variant={getRoleVariant(row.role)}>
          {row.role.charAt(0).toUpperCase() + row.role.slice(1)}
        </Badge>
      ),
    },
    {
      id: 'status',
      header: 'Status',
      cell: (row: UserType) => (
        <Badge variant={getStatusVariant(row.status)}>
          {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
        </Badge>
      ),
    },
    {
      id: 'lastActive',
      header: 'Last Active',
      cell: (row: UserType) => formatDate(row.lastActive),
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: (row: UserType) => (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content align="end">
            <DropdownMenu.Item
              onSelect={() => handleEditUser(row)}
              className="flex items-center space-x-2"
            >
              <UserCog className="h-4 w-4" />
              <span>Edit User</span>
            </DropdownMenu.Item>
            <DropdownMenu.Item
              onSelect={() => handleToggleStatus(row)}
              className="flex items-center space-x-2"
            >
              {row.status === 'active' ? (
                <>
                  <Ban className="h-4 w-4" />
                  <span>Suspend User</span>
                </>
              ) : (
                <>
                  <UserCheck className="h-4 w-4" />
                  <span>Activate User</span>
                </>
              )}
            </DropdownMenu.Item>
            <DropdownMenu.Item
              onSelect={() => handleDeleteUser(row)}
              className="flex items-center space-x-2 text-destructive"
            >
              <Trash2 className="h-4 w-4" />
              <span>Delete User</span>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      ),
    },
  ];



  // Bulk actions for the data table
  const bulkActions = [
    {
      label: 'Suspend',
      action: async (ids: string[]) => {
        await bulkUpdateUsers({ action: 'suspend', userIds: ids });
      },
      variant: 'outline' as const,
      icon: <UserX className="mr-2 h-4 w-4" />,
    },
    {
      label: 'Activate',
      action: async (ids: string[]) => {
        await bulkUpdateUsers({ action: 'activate', userIds: ids });
      },
      variant: 'outline' as const,
      icon: <UserCheck className="mr-2 h-4 w-4" />,
    },
    {
      label: 'Make Admin',
      action: async (ids: string[]) => {
        await bulkUpdateUsers({ action: 'makeAdmin', userIds: ids });
      },
      variant: 'outline' as const,
      icon: <Shield className="mr-2 h-4 w-4" />,
    },
    {
      label: 'Make Moderator',
      action: async (ids: string[]) => {
        await bulkUpdateUsers({ action: 'makeModerator', userIds: ids });
      },
      variant: 'outline' as const,
      icon: <Shield className="mr-2 h-4 w-4" />,
    },
    {
      label: 'Make User',
      action: async (ids: string[]) => {
        await bulkUpdateUsers({ action: 'makeUser', userIds: ids });
      },
      variant: 'outline' as const,
      icon: <User className="mr-2 h-4 w-4" />,
    },
    {
      label: 'Delete',
      action: async (ids: string[]) => {
        if (window.confirm(`Are you sure you want to delete ${ids.length} selected users?`)) {
          await bulkUpdateUsers({ action: 'delete', userIds: ids });
        }
      },
      variant: 'destructive' as const,
      icon: <Trash2 className="mr-2 h-4 w-4" />,
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-600 bg-red-100 rounded-md">
        Error loading users: {error.message}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Manage Members</h2>
        <Button onClick={() => router.push('/admin/users/new')}>
          <UserPlus className="mr-2 h-4 w-4" />
          Add New User
        </Button>
      </div>
      
      <div className="rounded-md border">
        <DataTable
          keyField="id"
          columns={columns}
          data={users}
          onSelectionChange={handleSelectionChange}
          selectedIds={selectedIds}
          totalCount={totalUsers}
          currentPage={page}
          onPageChange={handlePageChange}
          bulkActions={bulkActions}
          pageSize={limit}
          showPagination={true}
          emptyMessage="No members found"
          className="w-full"
        />
      </div>
    </div>
  );
};

export default MembersTable;
