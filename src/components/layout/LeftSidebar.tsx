import Image from 'next/image';
import Link from 'next/link';
import { 
  HomeIcon, 
  UserGroupIcon, 
  BookmarkIcon, 
  CalendarIcon, 
  UserIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
  PlusIcon
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Feed', href: '/feed', icon: HomeIcon, active: true },
  { name: 'Connections', href: '/connections', icon: UserGroupIcon },
  { name: 'Bookmarks', href: '/bookmarks', icon: BookmarkIcon },
  { name: 'Events', href: '/events', icon: CalendarIcon },
  { name: 'Profile', href: '/profile', icon: UserIcon },
  { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
];

export default function LeftSidebar() {
  return (
    <div className="space-y-6">
      {/* User Profile Card */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="relative h-24 bg-gradient-to-r from-blue-500 to-blue-600">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
        </div>
        <div className="px-4 pb-4 -mt-12 relative">
          <div className="flex justify-center">
            <div className="h-20 w-20 rounded-full border-4 border-white overflow-hidden bg-white shadow-md">
              <Image
                src="https://randomuser.me/api/portraits/men/1.jpg"
                alt="Profile picture"
                width={80}
                height={80}
                className="h-full w-full object-cover"
                priority
              />
            </div>
          </div>
          <div className="mt-4 text-center">
            <h2 className="text-lg font-bold text-gray-900">Sam Lanson</h2>
            <p className="text-sm text-gray-500">@samlanson</p>
            <p className="mt-2 text-sm text-gray-600">Web Developer | UI/UX Enthusiast | Coffee Lover</p>
            
            {/* Stats */}
            <div className="mt-4 flex justify-between text-sm text-gray-500 border-t border-gray-100 pt-3">
              <div className="text-center px-2">
                <div className="font-semibold text-gray-900">1,234</div>
                <div className="text-xs">Posts</div>
              </div>
              <div className="text-center px-2">
                <div className="font-semibold text-gray-900">5.6K</div>
                <div className="text-xs">Followers</div>
              </div>
              <div className="text-center px-2">
                <div className="font-semibold text-gray-900">789</div>
                <div>Following</div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="mt-4 flex space-x-2">
              <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-2 px-3 rounded-lg transition-colors duration-200 flex items-center justify-center">
                <UserGroupIcon className="h-4 w-4 mr-1" />
                <span>Connect</span>
              </button>
              <button className="flex-1 bg-white border border-gray-300 text-gray-700 text-sm font-medium py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center">
                <PlusIcon className="h-4 w-4 mr-1" />
                <span>Follow</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <nav className="p-2">
          <ul className="space-y-1">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link href={item.href}>
                  <div className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    item.active 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}>
                    <item.icon className={`h-5 w-5 mr-3 ${item.active ? 'text-blue-500' : 'text-gray-400'}`} />
                    {item.name}
                    {item.active && (
                      <span className="ml-auto w-1.5 h-1.5 bg-blue-500 rounded-full" />
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          
          {/* Logout Button */}
          <div className="border-t border-gray-100 mt-2 pt-2">
            <button className="w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors duration-200">
              <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-3 text-red-500" />
              Logout
            </button>
          </div>
        </nav>
      </div>
      
      {/* Create Post Button - Only visible on mobile */}
      <button className="lg:hidden fixed bottom-6 right-6 h-14 w-14 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center transition-colors duration-200">
        <PlusIcon className="h-6 w-6" />
        <span className="sr-only">Create Post</span>
      </button>
    </div>
  );
}
