'use client';

import { useState } from 'react';
import { 
  MagnifyingGlassIcon, 
  EllipsisHorizontalIcon, 
  CheckIcon,
  SparklesIcon,
  UserGroupIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import Image from 'next/image';

interface Friend {
  id: number;
  name: string;
  username: string;
  avatar: string;
  isFollowing: boolean;
  mutualConnections: number;
}

interface TrendingTopic {
  id: number;
  title: string;
  posts: string;
  category: string;
}

const trendingTopics: TrendingTopic[] = [
  { 
    id: 1, 
    title: 'Web Development', 
    posts: '12.5K',
    category: 'Technology'
  },
  { 
    id: 2, 
    title: 'UI/UX Design', 
    posts: '8.2K',
    category: 'Design'
  },
  { 
    id: 3, 
    title: 'Remote Work', 
    posts: '15.7K',
    category: 'Business'
  },
  { 
    id: 4, 
    title: 'Artificial Intelligence', 
    posts: '21.3K',
    category: 'Technology'
  },
];

const suggestedFriends: Friend[] = [
  { 
    id: 1, 
    name: 'Alex Johnson', 
    username: '@alexj', 
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    isFollowing: false,
    mutualConnections: 12
  },
  { 
    id: 2, 
    name: 'Sarah Williams', 
    username: '@sarahw', 
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    isFollowing: false,
    mutualConnections: 8
  },
  { 
    id: 3, 
    name: 'Michael Chen', 
    username: '@michaelc', 
    avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    isFollowing: false,
    mutualConnections: 5
  },
];

const RightSidebar = () => {
  const [friends, setFriends] = useState<Friend[]>(suggestedFriends);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'trending' | 'suggested'>('trending');

  const handleFollow = (id: number) => {
    setFriends(friends.map(friend => 
      friend.id === id ? { ...friend, isFollowing: !friend.isFollowing } : friend
    ));
  };

  const filteredFriends = friends.filter(friend => 
    friend.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    friend.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="hidden lg:flex lg:flex-col lg:w-80 xl:w-96 h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto no-scrollbar py-6 pl-4 pr-6">
      {/* Search Widget */}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab('trending')}
          className={`flex-1 py-3 px-1 text-center text-sm font-medium border-b-2 ${
            activeTab === 'trending'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          <div className="flex items-center justify-center">
            <SparklesIcon className="h-4 w-4 mr-2" />
            Trending
          </div>
        </button>
        <button
          onClick={() => setActiveTab('suggested')}
          className={`flex-1 py-3 px-1 text-center text-sm font-medium border-b-2 ${
            activeTab === 'suggested'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          <div className="flex items-center justify-center">
            <UserGroupIcon className="h-4 w-4 mr-2" />
            Suggested
          </div>
        </button>
      </div>

      {activeTab === 'trending' ? (
        /* Trending Topics */
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="p-4 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">Trending Topics</h3>
          </div>
          <div className="divide-y divide-gray-100">
            {trendingTopics.map((topic) => (
              <div key={topic.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mb-1">
                      {topic.category}
                    </span>
                    <h4 className="text-sm font-medium text-gray-900 mt-1">
                      {topic.title}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">{topic.posts} posts this week</p>
                  </div>
                  <button className="text-gray-400 hover:text-gray-500 p-1 -mr-2">
                    <EllipsisHorizontalIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-gray-100">
            <button className="w-full text-sm font-medium text-blue-600 hover:text-blue-700 text-center">
              Show more
            </button>
          </div>
        </div>
      ) : (
        /* Who to Follow */
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">Who to Follow</h3>
          </div>
          <div className="divide-y divide-gray-100">
            {filteredFriends.map((friend) => (
              <div key={friend.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative h-12 w-12 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={friend.avatar}
                        alt={friend.name}
                        fill
                        className="object-cover"
                        sizes="3rem"
                      />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 truncate">
                        {friend.name}
                      </h4>
                      <p className="text-xs text-gray-500 truncate">{friend.username}</p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {friend.mutualConnections} mutual connections
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleFollow(friend.id)}
                    className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      friend.isFollowing
                        ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                  >
                    {friend.isFollowing ? (
                      <>
                        <CheckIcon className="h-4 w-4 mr-1" />
                        Following
                      </>
                    ) : (
                      'Follow'
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-gray-100">
            <button className="w-full text-sm font-medium text-blue-600 hover:text-blue-700 text-center">
              View all suggestions
            </button>
          </div>
        </div>
      )}

      {/* Footer Links */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-gray-500">
          <a href="#" className="hover:underline">Terms of Service</a>
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Cookie Policy</a>
          <a href="#" className="hover:underline">Accessibility</a>
          <a href="#" className="hover:underline">Ads info</a>
          <a href="#" className="hover:underline">More</a>
          <span>© 2023 Social Network</span>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
