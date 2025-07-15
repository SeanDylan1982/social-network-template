import React from 'react';
import { ArrowUpRight, MessageSquare, Heart, Share2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

type Post = {
  id: string;
  title: string;
  author: {
    name: string;
    avatar?: string;
  };
  likes: number;
  comments: number;
  shares: number;
  publishedAt: string;
  url: string;
};

type TopPostsProps = {
  posts: Post[];
  title?: string;
  maxItems?: number;
};

const TopPosts: React.FC<TopPostsProps> = ({
  posts,
  title = 'Top Performing Posts',
  maxItems = 5,
}) => {
  const displayedPosts = posts.slice(0, maxItems);

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      </div>
      <div className="divide-y divide-gray-200">
        {displayedPosts.length > 0 ? (
          displayedPosts.map((post) => (
            <div key={post.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    {post.author.avatar ? (
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="h-6 w-6 rounded-full"
                      />
                    ) : (
                      <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-500">
                        {post.author.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <span className="text-sm font-medium text-gray-900 truncate">
                      {post.author.name}
                    </span>
                    <span className="text-xs text-gray-500">
                      {formatDistanceToNow(new Date(post.publishedAt), { addSuffix: true })}
                    </span>
                  </div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2">
                    {post.title}
                  </h4>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span className="flex items-center space-x-1">
                      <Heart className="h-3.5 w-3.5" />
                      <span>{post.likes}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <MessageSquare className="h-3.5 w-3.5" />
                      <span>{post.comments}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Share2 className="h-3.5 w-3.5" />
                      <span>{post.shares}</span>
                    </span>
                  </div>
                </div>
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-4 flex-shrink-0 text-indigo-600 hover:text-indigo-800"
                  aria-label="View post"
                >
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          ))
        ) : (
          <div className="p-6 text-center text-gray-500">
            No posts data available
          </div>
        )}
      </div>
      {posts.length > maxItems && (
        <div className="px-6 py-3 bg-gray-50 text-right">
          <a
            href="/admin/posts"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
          >
            View all posts
          </a>
        </div>
      )}
    </div>
  );
};

export default TopPosts;
