import React from 'react';
import Image from 'next/image';
import {
  ChatBubbleOvalLeftIcon,
  HeartIcon as HeartIconOutline,
  ArrowPathRoundedSquareIcon,
  EllipsisHorizontalIcon,
  BookmarkIcon,
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/20/solid';

const PostCard = () => {
  const post = {
    user: {
      name: 'Elon Musk',
      handle: '@elonmusk',
      avatar: '/images/elon.jpg',
    },
    timestamp: '2h ago',
    content: `Great discussion with the team today about the future of AI. The potential to solve some of humanity's biggest challenges is immense, and we're committed to ensuring it's developed safely and for the benefit of all.`,
    image: '/images/post-image.jpg',
    stats: {
      likes: '15.2K',
      comments: '1.8K',
      shares: '980',
    },
    isLiked: false,
  };

  return (
    <div className="bg-white rounded-xl shadow-lg mb-4">
      {/* Post Header */}
      <div className="flex items-center justify-between px-6 pt-5 pb-2">
        <div className="flex items-center gap-3">
          <Image
            src={post.user.avatar}
            alt={post.user.name}
            width={48}
            height={48}
            className="rounded-full object-cover border-2 border-white shadow"
            priority
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base text-gray-900 leading-tight">{post.user.name}</span>
              <span className="text-xs text-gray-400">{post.user.handle}</span>
              <span className="text-xs text-gray-400">· {post.timestamp}</span>
            </div>
          </div>
        </div>
        <button className="text-gray-400 hover:text-blue-500 p-2 rounded-full transition">
          <EllipsisHorizontalIcon className="h-6 w-6" />
        </button>
      </div>

      {/* Post Content */}
      <div className="px-6 pb-2">
        <p className="text-base text-gray-800 leading-relaxed">
          {post.content}
        </p>
      </div>

      {/* Post Image */}
      {post.image && (
        <div className="relative w-full h-64 rounded-xl overflow-hidden mb-2">
          <Image
            src={post.image}
            alt="Post image"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
      )}

      {/* Post Actions */}
      <div className="flex justify-between items-center px-6 py-2 border-t border-gray-100">
        <div className="flex gap-6 text-gray-500">
          <button className="flex items-center gap-1.5 px-2 py-1 rounded-lg hover:bg-pink-50 hover:text-pink-500 transition">
            {post.isLiked ? (
              <HeartIconSolid className="h-5 w-5 text-pink-500" />
            ) : (
              <HeartIconOutline className="h-5 w-5" />
            )}
            <span className="text-sm font-medium">{post.stats.likes}</span>
          </button>
          <button className="flex items-center gap-1.5 px-2 py-1 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition">
            <ChatBubbleOvalLeftIcon className="h-5 w-5" />
            <span className="text-sm font-medium">{post.stats.comments}</span>
          </button>
          <button className="flex items-center gap-1.5 px-2 py-1 rounded-lg hover:bg-green-50 hover:text-green-500 transition">
            <ArrowPathRoundedSquareIcon className="h-5 w-5" />
            <span className="text-sm font-medium">{post.stats.shares}</span>
          </button>
        </div>
        <button className="text-gray-400 hover:text-blue-600 p-2 rounded-full transition">
          <BookmarkIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default PostCard;
