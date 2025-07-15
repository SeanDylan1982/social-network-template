import { Metadata } from 'next';
import { PlusIcon, MagnifyingGlassIcon, BellIcon } from '@heroicons/react/24/outline';
import LeftSidebar from '@/components/layout/LeftSidebar';
import FeedContent from '@/components/feed/FeedContent';
import RightSidebar from '@/components/layout/RightSidebar';

export const metadata: Metadata = {
  title: 'Home | Social Network',
  description: 'Your social feed - Connect with friends and the world around you',
};

export default function FeedPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold text-blue-600">SocialNetwork</h1>
            </div>

            {/* Search Bar - Visible on medium screens and up */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-4">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full bg-gray-50 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Search SocialNetwork"
                />
              </div>
            </div>

            {/* Right side icons */}
            <div className="flex items-center space-x-4">
              <button className="p-1 rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100">
                <BellIcon className="h-6 w-6" />
              </button>
              <button className="hidden md:flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <PlusIcon className="h-4 w-4 mr-1" />
                Create
              </button>
              <div className="ml-3 relative">
                <div>
                  <button className="flex items-center max-w-xs text-sm rounded-full focus:outline-none">
                    <img
                      className="h-8 w-8 rounded-full"
                      src="https://randomuser.me/api/portraits/men/1.jpg"
                      alt="User profile"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Sidebar - Sticky */}
          <aside className="w-full lg:w-72 xl:w-80 flex-shrink-0">
            <div className="sticky top-6 space-y-6">
              <LeftSidebar />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0 max-w-2xl mx-auto w-full">
            <FeedContent />
          </div>

          {/* Right Sidebar - Sticky */}
          <aside className="hidden lg:block w-80 xl:w-96 flex-shrink-0">
            <div className="sticky top-6 space-y-6">
              <RightSidebar />
            </div>
          </aside>
        </div>
      </main>

      {/* Mobile bottom navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center py-3 px-4 lg:hidden z-20">
        <button className="p-2 text-blue-600">
          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
        </button>
        <button className="p-2 text-gray-500 hover:text-gray-700">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
        <button className="p-2 text-gray-500 hover:text-gray-700">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>
        <button className="p-2 text-gray-500 hover:text-gray-700">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </button>
      </nav>
    </div>
  );
}
