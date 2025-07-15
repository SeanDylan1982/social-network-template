import React from 'react';
import Image from 'next/image';

const RightSidebar = () => {
  const whoToFollow = [
    {
      name: 'Elon Musk',
      handle: '@elonmusk',
      avatar: '/images/elon.jpg',
    },
    {
      name: 'Vitalik Buterin',
      handle: '@VitalikButerin',
      avatar: '/images/vitalik.jpg',
    },
    {
      name: 'Naval Ravikant',
      handle: '@naval',
      avatar: '/images/naval.jpg',
    },
  ];

  const trendingTopics = [
    { category: 'Technology', topic: '#AI', posts: '1.5M' },
    { category: 'Crypto', topic: '#Bitcoin', posts: '2.8M' },
    { category: 'Startups', topic: '#BuildInPublic', posts: '780K' },
    { category: 'Science', topic: '#SpaceX', posts: '998K' },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Who to Follow */}
      <div className="bg-white rounded-xl shadow-lg px-6 py-5 flex flex-col">
        <h3 className="font-bold text-gray-900 mb-4">Who to follow</h3>
        <div className="flex flex-col gap-4">
          {whoToFollow.map((user) => (
            <div key={user.name} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Image
                  src={user.avatar}
                  alt={user.name}
                  width={40}
                  height={40}
                  className="rounded-full object-cover border-2 border-white shadow"
                  priority
                />
                <div>
                  <div className="font-bold text-sm text-gray-900 leading-tight">{user.name}</div>
                  <div className="text-xs text-gray-400">{user.handle}</div>
                </div>
              </div>
              <button className="px-4 py-1.5 text-xs font-bold text-white bg-blue-600 rounded-full shadow hover:bg-blue-700 transition">
                Follow
              </button>
            </div>
          ))}
        </div>
        <button className="mt-5 w-full py-2 bg-blue-50 text-blue-600 font-semibold rounded-lg hover:bg-blue-100 transition">
          View more
        </button>
      </div>

      {/* Latest News / Trending */}
      <div className="bg-white rounded-xl shadow-lg px-6 py-5 flex flex-col">
        <h3 className="font-bold text-gray-900 mb-4">Latest News</h3>
        <div className="flex flex-col gap-4">
          {trendingTopics.map((item) => (
            <div key={item.topic} className="group cursor-pointer rounded-lg px-3 py-2 hover:bg-gray-50 transition">
              <div className="text-xs text-gray-400">{item.category} · Trending</div>
              <div className="font-bold text-base text-gray-900 group-hover:text-blue-600 transition truncate">{item.topic}</div>
              <div className="text-xs text-gray-400">{item.posts} posts</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
