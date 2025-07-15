import React, { ReactNode, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Settings, 
  MessageSquare, 
  Bell, 
  BarChart2, 
  Menu, 
  X,
  UserCog,
  LogOut
} from 'lucide-react';

interface AdminLayoutProps {
  children: ReactNode;
}

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Analytics', href: '/admin/analytics', icon: BarChart2 },
  { name: 'Members', href: '/admin/members', icon: Users },
  { name: 'Posts', href: '/admin/posts', icon: FileText },
  { name: 'Messages', href: '/admin/messages', icon: MessageSquare },
  { name: 'Notifications', href: '/admin/notifications', icon: Bell },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect to login if not authenticated
  if (status === 'unauthenticated') {
    router.push('/auth/signin?callbackUrl=' + encodeURIComponent(router.asPath));
    return null;
  }

  // Show loading state while checking authentication
  if (status === 'loading' || !session) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  // Check if user is admin (you'll need to implement proper role checking)
  // if (session.user.role !== 'admin') {
  //   router.push('/');
  //   return null;
  // }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-40 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)}></div>
        <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white">
          <div className="flex h-16 flex-shrink-0 items-center px-4 bg-indigo-600">
            <h1 className="text-xl font-bold text-white">Admin Panel</h1>
            <button
              type="button"
              className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-md p-2 text-indigo-200 hover:bg-indigo-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="flex flex-1 flex-col overflow-y-auto">
            <nav className="flex-1 space-y-1 px-2 py-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    router.pathname === item.href
                      ? 'bg-indigo-100 text-indigo-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon
                    className={`mr-3 h-6 w-6 flex-shrink-0 ${
                      router.pathname === item.href ? 'text-indigo-500' : 'text-gray-400 group-hover:text-gray-500'
                    }`}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex flex-shrink-0 border-t border-gray-200 p-4">
            <div className="group block flex-shrink-0">
              <div className="flex items-center">
                <div>
                  {session.user?.image ? (
                    <img
                      className="inline-block h-9 w-9 rounded-full"
                      src={session.user.image}
                      alt={session.user.name || 'User'}
                    />
                  ) : (
                    <div className="h-9 w-9 rounded-full bg-gray-200 flex items-center justify-center">
                      <UserCog className="h-5 w-5 text-gray-500" />
                    </div>
                  )}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                    {session.user?.name || 'Admin User'}
                  </p>
                  <Link
                    href="/api/auth/signout"
                    className="text-xs font-medium text-gray-500 group-hover:text-gray-700 flex items-center"
                  >
                    <LogOut className="h-3.5 w-3.5 mr-1" /> Sign out
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white">
          <div className="flex h-16 flex-shrink-0 items-center px-4 bg-indigo-600">
            <h1 className="text-xl font-bold text-white">Admin Panel</h1>
          </div>
          <div className="flex flex-1 flex-col overflow-y-auto">
            <nav className="flex-1 space-y-1 bg-white px-2 py-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    router.pathname === item.href
                      ? 'bg-indigo-100 text-indigo-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon
                    className={`mr-3 h-6 w-6 flex-shrink-0 ${
                      router.pathname === item.href ? 'text-indigo-500' : 'text-gray-400 group-hover:text-gray-500'
                    }`}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex flex-shrink-0 border-t border-gray-200 p-4">
            <div className="group block w-full flex-shrink-0">
              <div className="flex items-center">
                <div>
                  {session.user?.image ? (
                    <img
                      className="inline-block h-9 w-9 rounded-full"
                      src={session.user.image}
                      alt={session.user.name || 'User'}
                    />
                  ) : (
                    <div className="h-9 w-9 rounded-full bg-gray-200 flex items-center justify-center">
                      <UserCog className="h-5 w-5 text-gray-500" />
                    </div>
                  )}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                    {session.user?.name || 'Admin User'}
                  </p>
                  <Link
                    href="/api/auth/signout"
                    className="text-xs font-medium text-gray-500 group-hover:text-gray-700 flex items-center"
                  >
                    <LogOut className="h-3.5 w-3.5 mr-1" /> Sign out
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64 flex flex-col flex-1">
        <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow">
          <button
            type="button"
            className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex flex-1 justify-between px-4">
            <div className="flex flex-1">
              {/* Search bar can be added here */}
            </div>
            <div className="ml-4 flex items-center lg:ml-6">
              {/* Notifications and profile dropdown can be added here */}
            </div>
          </div>
        </div>

        <main className="flex-1">
          <div className="py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
