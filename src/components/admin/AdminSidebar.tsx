'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  Bell,
  BarChart2,
  MessageSquare,
  EyeOff,
  HelpCircle,
  ChevronRight,
  ChevronDown,
} from 'lucide-react';

const navItems = [
  {
    title: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
  },
  {
    title: 'Members',
    href: '/admin/members', 
    icon: Users,
  },
  {
    title: 'Posts',
    href: '/admin/posts',
    icon: FileText,
  },
  {
    title: 'Content',
    icon: EyeOff,
    subItems: [
      { title: 'Sections', href: '/admin/content/sections' },
      { title: 'Moderation', href: '/admin/content/moderation' },
    ],
  },
  {
    title: 'Support',
    href: '/admin/support',
    icon: HelpCircle,
  },
  {
    title: 'Analytics',
    href: '/admin/analytics',
    icon: BarChart2,
  },
  {
    title: 'Settings',
    href: '/admin/settings',
    icon: Settings,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({});

  const toggleSubmenu = (title: string) => {
    setOpenSubmenus(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64 border-r border-gray-200 bg-white">
        <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
          </div>
          <div className="mt-5 flex-1 flex flex-col">
            <nav className="flex-1 px-2 space-y-1">
              {navItems.map((item) => (
                <div key={item.title}>
                  {item.href ? (
                    <Link
                      href={item.href}
                      className={cn(
                        'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
                        pathname === item.href
                          ? 'bg-gray-100 text-gray-900'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                        'transition-colors duration-150'
                      )}
                    >
                      <item.icon
                        className={cn(
                          'mr-3 flex-shrink-0 h-6 w-6',
                          pathname === item.href
                            ? 'text-gray-500'
                            : 'text-gray-400 group-hover:text-gray-500'
                        )}
                        aria-hidden="true"
                      />
                      {item.title}
                    </Link>
                  ) : (
                    <>
                      <button
                        onClick={() => toggleSubmenu(item.title)}
                        className={cn(
                          'w-full group flex items-center px-2 py-2 text-sm font-medium rounded-md',
                          'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                          'transition-colors duration-150',
                          'justify-between'
                        )}
                      >
                        <div className="flex items-center">
                          <item.icon
                            className="mr-3 flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                            aria-hidden="true"
                          />
                          {item.title}
                        </div>
                        {openSubmenus[item.title] ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </button>
                      {openSubmenus[item.title] && item.subItems && (
                        <div className="pl-4 mt-1 space-y-1">
                          {item.subItems.map((subItem) => (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              className={cn(
                                'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
                                pathname === subItem.href
                                  ? 'bg-gray-100 text-gray-900'
                                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                                'transition-colors duration-150',
                                'pl-9' // Extra padding for submenu items
                              )}
                            >
                              {subItem.title}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>
        <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
          <Link
            href="/"
            className="flex-shrink-0 w-full group block"
          >
            <div className="flex items-center">
              <div>
                <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                  Back to Site
                </p>
                <p className="text-xs text-gray-500 group-hover:text-gray-700">
                  Return to the main website
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
