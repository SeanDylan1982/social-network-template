import React, { useState } from 'react';
import Image from 'next/image';
import { User, PostType } from '../../types';
import { MoreVert as MoreVertIcon } from '@mui/icons-material';
import ReportPostModal from './ReportPostModal';

interface PostCardProps {
  id: string;
  user: User;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
  timeAgo: string;
  onLike?: (postId: string, liked: boolean) => void;
  onComment?: (postId: string, comment: string) => void;
  onShare?: (postId: string) => void;
  onSave?: (postId: string, saved: boolean) => void;
  onReport?: (postId: string, reason: string) => void;
  className?: string;
}

const PostCard: React.FC<PostCardProps> = ({
  id,
  user,
  content,
  image,
  likes: initialLikes,
  comments: initialComments,
  shares: initialShares,
  timeAgo,
  onLike,
  onComment,
  onShare,
  onSave,
  onReport,
  className = '',
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [currentLikes, setCurrentLikes] = useState(initialLikes);
  const [currentComments, setCurrentComments] = useState(initialComments);
  const [currentShares, setCurrentShares] = useState(initialShares);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const handleLike = () => {
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    setCurrentLikes(newLikedState ? currentLikes + 1 : currentLikes - 1);
    if (onLike) onLike(id, newLikedState);
  };

  const handleCommentClick = () => {
    setShowCommentBox(!showCommentBox);
  };

  const handleShare = () => {
    setCurrentShares(currentShares + 1);
    if (onShare) onShare(id);
    
    // Web Share API if available
    if (navigator.share) {
      navigator.share({
        title: 'Check out this post',
        text: content.length > 100 ? `${content.substring(0, 100)}...` : content,
        url: window.location.href,
      }).catch(console.error);
    }
  };

  const handleSave = () => {
    const newSavedState = !isSaved;
    setIsSaved(newSavedState);
    if (onSave) onSave(id, newSavedState);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      setCurrentComments(currentComments + 1);
      if (onComment) onComment(id, commentText);
      setCommentText('');
      setShowCommentBox(false);
    }
  };
  return (
    <div className={`bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg ${className}`}>
      {/* Post Header */}
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Image
                src={user.avatar}
                alt={user.name}
                width={40}
                height={40}
                className="h-10 w-10 rounded-full object-cover"
              />
              <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-400 ring-2 ring-white"></span>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">{user.name}</h3>
              <p className="text-xs text-gray-500">{user.role} • {timeAgo}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-500">{timeAgo}</span>
            <button 
              onClick={handleSave}
              className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
              aria-label={isSaved ? 'Unsave post' : 'Save post'}
            >
              <svg 
                className="h-5 w-5" 
                fill={isSaved ? 'currentColor' : 'none'} 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" 
                />
              </svg>
            </button>
            <button 
              onClick={() => setIsReportModalOpen(true)}
              className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
              aria-label="Report post"
            >
              <MoreVertIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        <ReportPostModal
          open={isReportModalOpen}
          onClose={() => setIsReportModalOpen(false)}
          postId={id}
          onReport={onReport || (() => {})}
        />
        
        {/* Post Content */}
        <div className="mt-3">
          <p className="text-sm text-gray-800">{content}</p>
        </div>
        
        {/* Post Image */}
        {image && (
          <div className="mt-3 rounded-lg overflow-hidden">
            <Image
              src={image}
              alt="Post content"
              width={600}
              height={400}
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
        )}
        
        {/* Post Stats */}
        <div className="mt-3 flex items-center justify-between text-sm text-gray-500 border-t border-b border-gray-100 py-2 px-4">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <svg className="h-4 w-4 mr-1 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
              {currentLikes}
            </span>
            <span>{currentComments} comments</span>
            <span>{currentShares} shares</span>
          </div>
        </div>
        
        {/* Post Actions */}
        <div className="mt-1 grid grid-cols-3 gap-1 px-2">
          <button 
            onClick={handleLike}
            className={`flex items-center justify-center space-x-1 py-2 rounded-lg transition-colors ${
              isLiked 
                ? 'text-red-500 hover:bg-red-50' 
                : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            <svg 
              className="h-5 w-5" 
              fill={isLiked ? 'currentColor' : 'none'} 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
              />
            </svg>
            <span className="text-sm">Like</span>
          </button>
          
          <button 
            onClick={handleCommentClick}
            className="flex items-center justify-center space-x-1 py-2 text-gray-500 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span className="text-sm">Comment</span>
          </button>
          
          <button 
            onClick={handleShare}
            className="flex items-center justify-center space-x-1 py-2 text-gray-500 hover:bg-green-50 rounded-lg transition-colors"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            <span className="text-sm">Share</span>
          </button>
        </div>
        
        {/* Comment Box */}
        {showCommentBox && (
          <div className="border-t border-gray-100 p-3">
            <form onSubmit={handleCommentSubmit} className="flex items-center space-x-2">
              <div className="flex-1">
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Write a comment..."
                  className="w-full px-3 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button
                type="submit"
                disabled={!commentText.trim()}
                className="px-3 py-1.5 bg-blue-500 text-white text-sm font-medium rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Post
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;
