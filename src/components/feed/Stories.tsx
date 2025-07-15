import React from 'react';
import Image from 'next/image';

const Stories = () => {
  const stories = [
    { id: 2, name: 'Elon Musk', avatar: '/images/elon.jpg' },
    { id: 3, name: 'Vitalik B.', avatar: '/images/vitalik.jpg' },
    { id: 4, name: 'Naval', avatar: '/images/naval.jpg' },
    { id: 5, name: 'User Five', avatar: '/images/user5.jpg' },
    { id: 6, name: 'User Six', avatar: '/images/user6.jpg' },
    { id: 7, name: 'User Seven', avatar: '/images/user7.jpg' },
    { id: 8, name: 'User Eight', avatar: '/images/user8.jpg' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg px-6 py-4">
      <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar">
        {/* Post a Story card */}
        <div className="flex flex-col items-center flex-shrink-0">
          <button className="w-24 h-36 bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center shadow group hover:bg-gray-200 transition">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mb-3">
              <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <span className="text-xs font-semibold text-gray-600">Post a Story</span>
          </button>
        </div>
        {/* User stories */}
        {stories.map((story) => (
          <div key={story.id} className="flex flex-col items-center flex-shrink-0">
            <div className="relative w-24 h-36 rounded-xl overflow-hidden shadow group bg-gray-200">
              <Image
                src={story.avatar}
                alt={story.name}
                fill
                className="object-cover"
                sizes="96px"
                priority
              />
              <div className="absolute bottom-0 left-0 w-full px-2 py-1 bg-gradient-to-t from-black/80 to-transparent">
                <span className="text-xs text-white font-medium truncate block text-center">{story.name}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stories;
