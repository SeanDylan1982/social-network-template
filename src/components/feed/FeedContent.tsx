import { useState } from 'react';
import { 
  PlusIcon, 
  PhotoIcon, 
  VideoCameraIcon, 
  CalendarIcon, 
  FaceSmileIcon,
  EllipsisHorizontalIcon, 
  HeartIcon, 
  ChatBubbleOvalLeftIcon, 
  PaperAirplaneIcon, 
  BookmarkIcon,
  UserGroupIcon,
  StarIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid, BookmarkIcon as BookmarkIconSolid } from '@heroicons/react/24/solid';
import Image from 'next/image';

interface Story {
  id: number;
  name: string;
  image: string;
  hasNew: boolean;
}

interface User {
  name: string;
  role: string;
  avatar: string;
}

interface Post {
  id: number;
  user: User;
  time: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
}

const stories: Story[] = [
  { 
    id: 1, 
    name: 'Your Story', 
    image: 'https://picsum.photos/seed/1/200/200',
    hasNew: true
  },
  { 
    id: 2, 
    name: 'Alex', 
    image: 'https://picsum.photos/seed/2/200/200',
    hasNew: true
  },
  { 
    id: 3, 
    name: 'Jamie', 
    image: 'https://picsum.photos/seed/3/200/200',
    hasNew: false
  },
  { 
    id: 4, 
    name: 'Taylor', 
    image: 'https://picsum.photos/seed/4/200/200',
    hasNew: true
  },
  { 
    id: 5, 
    name: 'Jordan', 
    image: 'https://picsum.photos/seed/5/200/200',
    hasNew: false
  },
  { 
    id: 6, 
    name: 'Casey', 
    image: 'https://picsum.photos/seed/6/200/200',
    hasNew: true
  },
];

const posts: Post[] = [
  {
    id: 1,
    user: {
      name: 'Alex Morgan',
      role: 'UI/UX Designer',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    },
    time: '2h ago',
    content: 'Just finished this amazing design project! Can\'t wait to share more details with you all soon. #Design #UIUX',
    image: 'https://picsum.photos/seed/design/600/400',
    likes: 124,
    comments: 24,
  },
  {
    id: 2,
    user: {
      name: 'Jordan Smith',
      role: 'Senior Developer',
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    },
    time: '4h ago',
    content: 'Just pushed a major update to our open-source project. Check it out and let me know what you think!',
    image: 'https://picsum.photos/seed/code/600/400',
    likes: 89,
    comments: 15,
  },
];

const FeedContent = () => {
  const [activeTab, setActiveTab] = useState<'trending' | 'following'>('trending');
  const [postContent, setPostContent] = useState('');
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [savedPosts, setSavedPosts] = useState<number[]>([]);

  const toggleLike = (postId: number) => {
    setLikedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  const toggleSave = (postId: number) => {
    setSavedPosts(prev => 
      prev.includes(postId)
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Stories */}
      <div className="bg-white rounded-lg md:rounded-xl shadow-sm p-3 md:p-4">
        <div className="flex space-x-3 md:space-x-4 overflow-x-auto pb-2 -mx-2 px-2 scrollbar-hide">
          <h2 className="text-lg font-semibold text-gray-900">Stories</h2>
          <button className="text-sm text-blue-500 hover:text-blue-600 font-medium">
            See All
          </button>
        </div>
        <div className="relative">
          <div className="flex space-x-4 pb-2 overflow-x-auto scrollbar-hide">
            {/* Add Story Card */}
            <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors duration-200">
              <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mb-2">
                <PlusIcon className="h-5 w-5 text-blue-500" />
              </div>
              <span className="text-xs font-medium text-gray-500">Add Story</span>
            </div>

            {/* User Stories */}
            {stories.map((story) => (
              <div 
                key={story.id} 
                className={`relative flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-full p-0.5 ${story.hasNew ? 'bg-gradient-to-tr from-yellow-400 to-pink-500' : 'border-2 border-gray-200'}`}
              >
                <div className="bg-white p-0.5 rounded-full">
                  <div className="relative w-full h-full rounded-full overflow-hidden">
                    <Image 
                      src={story.image} 
                      alt={story.name} 
                      fill 
                      className="object-cover"
                      sizes="(max-width: 768px) 4rem, 5rem"
                    />
                  </div>
                </div>
                <span className="absolute -bottom-6 left-0 right-0 text-[10px] md:text-xs text-center text-gray-700 truncate w-16 md:w-20">{story.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Post Composer */}
      <div className="bg-white rounded-lg md:rounded-xl shadow-sm p-3 md:p-4">
        <div className="flex items-start space-x-3">
          <div className="h-11 w-11 rounded-full overflow-hidden bg-gray-100 border-2 border-white shadow-sm">
            <Image
              src="https://randomuser.me/api/portraits/men/1.jpg"
              alt="Your profile"
              width={44}
              height={44}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="relative">
              <textarea
                className="w-full border-0 focus:ring-0 resize-none text-sm text-gray-700 placeholder-gray-400 bg-gray-50 rounded-xl p-3 pr-10 focus:bg-white focus:ring-1 focus:ring-blue-500 transition-all duration-200"
                rows={1}
                placeholder="What's on your mind, John?"
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                onFocus={(e) => e.target.rows = 3}
                onBlur={(e) => !e.target.value && (e.target.rows = 1)}
              />
              <FaceSmileIcon className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
            </div>
            <div className="flex justify-between mt-3 md:mt-4 pt-3 border-t border-gray-100">
              <div className="flex space-x-0.5 md:space-x-1">
                <button 
                  className="flex items-center justify-center p-1.5 md:p-2 text-gray-500 hover:text-blue-500 rounded-lg hover:bg-blue-50 transition-colors duration-200"
                  aria-label="Add photo"
                >
                  <PhotoIcon className="h-5 w-5" />
                  <span className="sr-only md:not-sr-only md:ml-1.5 md:text-sm">Photo</span>
                </button>
                <button 
                  className="p-1.5 md:p-2 text-gray-500 hover:text-green-500 rounded-lg hover:bg-green-50 transition-colors duration-200"
                  aria-label="Add video"
                >
                  <VideoCameraIcon className="h-5 w-5" />
                  <span className="sr-only md:not-sr-only md:ml-1.5 md:text-sm">Video</span>
                </button>
                <button 
                  className="p-1.5 md:p-2 text-gray-500 hover:text-yellow-500 rounded-lg hover:bg-yellow-50 transition-colors duration-200"
                  aria-label="Add event"
                >
                  <CalendarIcon className="h-5 w-5" />
                  <span className="sr-only md:not-sr-only md:ml-1.5 md:text-sm">Event</span>
                </button>
              </div>
              <button 
                className="px-3 py-1 text-sm md:px-4 md:py-1.5 bg-blue-500 text-white text-sm font-medium rounded-full hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                disabled={!postContent.trim()}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Feed */}
      <div className="space-y-4">
        {/* Content Tabs */}
        <div className="bg-white rounded-lg md:rounded-xl shadow-sm overflow-hidden">
          <div className="flex border-b border-gray-100">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('trending')}
                className={`flex-1 py-4 px-1 text-center border-b-2 font-medium text-sm ${activeTab === 'trending' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <StarIcon className="h-4 w-4" />
                  <span>Trending</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('following')}
                className={`flex-1 py-4 px-1 text-center border-b-2 font-medium text-sm ${activeTab === 'following' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <UserGroupIcon className="h-4 w-4" />
                  <span>Following</span>
                </div>
              </button>
            </nav>
          </div>
        </div>

        {/* Posts */}
        <div className="divide-y divide-gray-100 -mx-3 md:mx-0">
          {posts.map((post) => {
            const isLiked = likedPosts.includes(post.id);
            const isSaved = savedPosts.includes(post.id);
            
            return (
              <div key={post.id} className="bg-white rounded-2xl shadow-sm overflow-hidden">
                {/* Post Header */}
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="relative h-9 w-9 md:h-10 md:w-10 rounded-full overflow-hidden flex-shrink-0">
                        <Image 
                          src={post.user.avatar} 
                          alt={post.user.name} 
                          fill 
                          className="object-cover"
                          sizes="(max-width: 768px) 2.25rem, 2.5rem"
                        />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 truncate">{post.user.name}</h4>
                        <p className="text-xs text-gray-500 truncate">{post.time} · {post.user.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors duration-200">
                        <EllipsisHorizontalIcon className="h-5 w-5" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors duration-200">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-gray-700 leading-relaxed">{post.content}</p>
                </div>

                {/* Post Image */}
                {post.image && (
                  <div className="mt-3 -mx-3 md:mx-0">
                    <div className="relative w-full aspect-[4/3] md:rounded-xl overflow-hidden">
                      <Image 
                        src={post.image} 
                        alt="Post content" 
                        fill 
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 600px"
                      />
                    </div>
                  </div>
                )}

                {/* Post Actions */}
                <div className="px-4 py-3">
                  <div className="flex items-center border-t border-b border-gray-100 -mx-4 px-4 py-1.5">
                    <button 
                      onClick={() => toggleLike(post.id)}
                      className={`flex-1 flex items-center justify-center space-x-2 py-2 rounded-lg transition-colors duration-200 ${
                        isLiked ? 'text-red-500 hover:bg-red-50' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                      }`}
                      aria-label={isLiked ? 'Unlike this post' : 'Like this post'}
                    >
                      {isLiked ? (
                        <HeartIconSolid className="h-5 w-5" />
                      ) : (
                        <HeartIcon className="h-5 w-5" />
                      )}
                      <span className="text-sm font-medium">Like</span>
                    </button>
                    <button className="flex-1 flex items-center justify-center space-x-2 py-2 text-gray-500 hover:bg-gray-50 hover:text-gray-700 rounded-lg transition-colors duration-200">
                      <ChatBubbleOvalLeftIcon className="h-5 w-5" />
                      <span className="text-sm font-medium">Comment</span>
                    </button>
                    <button className="flex-1 flex items-center justify-center space-x-2 py-2 text-gray-500 hover:bg-gray-50 hover:text-gray-700 rounded-lg transition-colors duration-200">
                      <PaperAirplaneIcon className="h-5 w-5 -rotate-45" />
                      <span className="text-sm font-medium">Share</span>
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-gray-500 text-sm mt-3">
                    <div className="flex items-center space-x-3 md:space-x-4">
                      <button 
                        className={`flex items-center space-x-1 ${likedPosts.includes(post.id) ? 'text-red-500' : ''}`}
                        onClick={() => toggleLike(post.id)}
                        aria-label={likedPosts.includes(post.id) ? 'Unlike' : 'Like'}
                      >
                        {likedPosts.includes(post.id) ? 
                          <HeartIconSolid className="h-5 w-5 text-red-500" /> : 
                          <HeartIcon className="h-5 w-5" />
                        }
                        <span className="hidden sm:inline">{post.likes + (likedPosts.includes(post.id) ? 1 : 0)}</span>
                      </button>
                      <button className="flex items-center space-x-1" aria-label="Comment">
                        <ChatBubbleOvalLeftIcon className="h-5 w-5" />
                        <span className="hidden sm:inline">{post.comments}</span>
                      </button>
                      <button className="flex items-center space-x-1" aria-label="Share">
                        <PaperAirplaneIcon className="h-5 w-5 transform rotate-45 -translate-y-0.5" />
                        <span className="hidden sm:inline">Share</span>
                      </button>
                    </div>
                    <button 
                      className={`${savedPosts.includes(post.id) ? 'text-yellow-500' : ''}`}
                      onClick={() => toggleSave(post.id)}
                      aria-label={savedPosts.includes(post.id) ? 'Unsave post' : 'Save post'}
                    >
                      {savedPosts.includes(post.id) ? 
                        <BookmarkIconSolid className="h-5 w-5" /> : 
                        <BookmarkIcon className="h-5 w-5" />
                      }
                    </button>
                  </div>

                  {/* Comments Preview */}
                  <div className="px-4 pb-3 pt-1">
                    <div className="flex items-start space-x-3">
                      <div className="h-8 w-8 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                        <Image
                          src="https://randomuser.me/api/portraits/women/2.jpg"
                          alt="Commenter"
                          width={32}
                          height={32}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="bg-gray-50 rounded-2xl px-3 py-2">
                          <p className="text-xs font-medium text-gray-900">Sarah Johnson</p>
                          <p className="text-xs text-gray-600">This is amazing! Great work 👏</p>
                        </div>
                        <div className="flex items-center space-x-3 mt-1 px-1">
                          <button className="text-xs text-gray-500 hover:text-gray-700">Like</button>
                          <span className="text-gray-300">•</span>
                          <span className="text-xs text-gray-500">2h</span>
                        </div>
                      </div>
                      <button 
                        className="text-gray-400 hover:text-yellow-500 p-1 rounded-full hover:bg-yellow-50 transition-colors duration-200"
                        aria-label={isSaved ? 'Unsave post' : 'Save post'}
                      >
                        {isSaved ? (
                          <BookmarkIconSolid className="h-4 w-4 text-yellow-500" />
                        ) : (
                          <BookmarkIcon className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Add Comment */}
                  <div className="px-4 pb-3">
                    <div className="flex items-center space-x-2">
                      <div className="relative h-9 w-9 md:h-10 md:w-10 rounded-full overflow-hidden flex-shrink-0">
                        <Image 
                          src="https://randomuser.me/api/portraits/women/44.jpg" 
                          alt="Your profile" 
                          fill 
                          className="object-cover"
                          sizes="2.25rem"
                        />
                      </div>
                      <input 
                        type="text" 
                        placeholder="What's on your mind?" 
                        className="flex-1 bg-gray-100 rounded-full px-3 py-1.5 md:px-4 md:py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                        onClick={() => document.getElementById('postContent')?.focus()}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FeedContent;
