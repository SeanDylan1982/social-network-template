import React from 'react';
import Image from 'next/image';
import {
  HomeIcon,
  UserGroupIcon,
  NewspaperIcon,
  CalendarIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';

const LeftSidebar = () => {
  const user = {
    name: 'Sam Lanson',
    role: 'Web Developer at StackBros',
    avatar: '/images/avatar.jpg',
    bio: `I'd love to change the world, but they won’t give me the source code.`,
    stats: {
      posts: 256,
      followers: '2.5K',
      following: 365,
    },
  };

  const navigation = [
    { name: 'Feed', href: '#', icon: HomeIcon, current: true },
    { name: 'Connections', href: '#', icon: UserGroupIcon, current: false },
    { name: 'Latest News', href: '#', icon: NewspaperIcon, current: false },
    { name: 'Events', href: '#', icon: CalendarIcon, current: false },
    { name: 'Groups', href: '#', icon: UsersIcon, current: false },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* User Profile Card */}
      <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center">
        <div className="relative mb-4">
          <Image
            src={user.avatar}
            alt={user.name}
            width={96}
            height={96}
            className="rounded-full border-4 border-white shadow-lg object-cover"
            priority
          />
        </div>
        <h2 className="text-xl font-bold text-gray-900 leading-tight">{user.name}</h2>
        <div className="text-sm text-gray-500 font-medium mb-1">{user.role}</div>
        <div className="text-xs text-gray-400 mb-4 max-w-[180px]">{user.bio}</div>
        <div className="flex justify-center gap-6 w-full border-t border-gray-100 pt-4">
          <div className="text-center">
            <div className="font-bold text-gray-900 text-base">{user.stats.posts}</div>
            <div className="text-xs text-gray-500">Post</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-gray-900 text-base">{user.stats.followers}</div>
            <div className="text-xs text-gray-500">Followers</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-gray-900 text-base">{user.stats.following}</div>
            <div className="text-xs text-gray-500">Following</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white rounded-xl shadow-lg p-3">
        <nav className="flex flex-col gap-1">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium text-base transition-colors duration-150 ${
                item.current
                  ? 'bg-blue-50 text-blue-600 shadow-sm'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
              }`}
              aria-current={item.current ? 'page' : undefined}
            >
              <item.icon className="h-6 w-6 flex-shrink-0" aria-hidden="true" />
              <span>{item.name}</span>
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default LeftSidebar;
