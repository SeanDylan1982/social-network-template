export type AuditAction = 
  | 'user:created' | 'user:updated' | 'user:deleted' | 'user:status_changed' | 'user:role_changed'
  | 'post:created' | 'post:updated' | 'post:deleted' | 'post:status_changed'
  | 'comment:created' | 'comment:deleted'
  | 'login:success' | 'login:failed' | 'logout'
  | 'settings:updated' | 'permissions:updated'
  | 'admin:impersonate' | 'admin:action';

export interface AuditUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: string;
}

export interface AuditLog {
  id: string;
  action: AuditAction;
  userId: string;
  user: AuditUser;
  targetType?: string;
  targetId?: string;
  targetName?: string;
  ipAddress: string;
  userAgent: string;
  metadata?: Record<string, any>;
  timestamp: string;
}

export const actionIcons: Record<string, React.ReactNode> = {
  'user:created': <UserPlus className="h-4 w-4" />,
  'user:updated': <Edit className="h-4 w-4" />,
  'user:deleted': <UserX className="h-4 w-4" />,
  'user:status_changed': <User className="h-4 w-4" />,
  'user:role_changed': <Shield className="h-4 w-4" />,
  'post:created': <Plus className="h-4 w-4" />,
  'post:updated': <Edit className="h-4 w-4" />,
  'post:deleted': <Trash2 className="h-4 w-4" />,
  'post:status_changed': <Eye className="h-4 w-4" />,
  'comment:created': <MessageSquare className="h-4 w-4" />,
  'comment:deleted': <Trash2 className="h-4 w-4" />,
  'login:success': <CheckCircle className="h-4 w-4 text-green-500" />,
  'login:failed': <XCircle className="h-4 w-4 text-red-500" />,
  'logout': <LogOut className="h-4 w-4" />,
  'settings:updated': <Settings className="h-4 w-4" />,
  'permissions:updated': <Lock className="h-4 w-4" />,
  'admin:impersonate': <User className="h-4 w-4" />,
  'admin:action': <AlertCircle className="h-4 w-4" />,
};

export const actionLabels: Record<string, string> = {
  'user:created': 'User Created',
  'user:updated': 'User Updated',
  'user:deleted': 'User Deleted',
  'user:status_changed': 'User Status Changed',
  'user:role_changed': 'User Role Changed',
  'post:created': 'Post Created',
  'post:updated': 'Post Updated',
  'post:deleted': 'Post Deleted',
  'post:status_changed': 'Post Status Changed',
  'comment:created': 'Comment Created',
  'comment:deleted': 'Comment Deleted',
  'login:success': 'Login Success',
  'login:failed': 'Login Failed',
  'logout': 'Logout',
  'settings:updated': 'Settings Updated',
  'permissions:updated': 'Permissions Updated',
  'admin:impersonate': 'Admin Impersonation',
  'admin:action': 'Admin Action',
};

export const actionColors: Record<string, string> = {
  'user:created': 'bg-green-100 text-green-800',
  'user:updated': 'bg-blue-100 text-blue-800',
  'user:deleted': 'bg-red-100 text-red-800',
  'user:status_changed': 'bg-purple-100 text-purple-800',
  'user:role_changed': 'bg-indigo-100 text-indigo-800',
  'post:created': 'bg-green-100 text-green-800',
  'post:updated': 'bg-blue-100 text-blue-800',
  'post:deleted': 'bg-red-100 text-red-800',
  'post:status_changed': 'bg-amber-100 text-amber-800',
  'comment:created': 'bg-green-100 text-green-800',
  'comment:deleted': 'bg-red-100 text-red-800',
  'login:success': 'bg-green-100 text-green-800',
  'login:failed': 'bg-red-100 text-red-800',
  'logout': 'bg-gray-100 text-gray-800',
  'settings:updated': 'bg-blue-100 text-blue-800',
  'permissions:updated': 'bg-purple-100 text-purple-800',
  'admin:impersonate': 'bg-orange-100 text-orange-800',
  'admin:action': 'bg-gray-100 text-gray-800',
};
