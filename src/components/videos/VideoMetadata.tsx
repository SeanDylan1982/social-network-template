'use client';

import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ThumbsUp,
  ThumbsDown,
  Bookmark,
  Share2,
  MoreHorizontal,
  MessageSquare,
  Flag,
  Play,
  Plus,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

interface VideoMetadataProps {
  video: {
    id: string;
    title: string;
    description: string;
    viewCount: number;
    likeCount: number;
    dislikeCount: number;
    commentCount: number;
    publishedAt: string;
    tags: string[];
    isLiked: boolean;
    isDisliked: boolean;
    isBookmarked: boolean;
    isSubscribed: boolean;
    user: {
      id: string;
      name: string;
      username: string;
      avatar: string;
      isVerified: boolean;
      subscriberCount: number;
    };
  };
  className?: string;
  onLike?: (videoId: string) => void;
  onDislike?: (videoId: string) => void;
  onBookmark?: (videoId: string) => void;
  onShare?: (videoId: string) => void;
  onSubscribe?: (userId: string) => void;
  onCommentClick?: () => void;
  onAddToPlaylist?: (videoId: string) => void;
  onReport?: (videoId: string) => void;
}

export function VideoMetadata({
  video,
  className,
  onLike,
  onDislike,
  onBookmark,
  onShare,
  onSubscribe,
  onCommentClick,
  onAddToPlaylist,
  onReport,
}: VideoMetadataProps) {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [localLikes, setLocalLikes] = useState(video.likeCount);
  const [localDislikes, setLocalDislikes] = useState(video.dislikeCount);
  const [isLiked, setIsLiked] = useState(video.isLiked);
  const [isDisliked, setIsDisliked] = useState(video.isDisliked);
  const [isBookmarked, setIsBookmarked] = useState(video.isBookmarked);
  const [isSubscribed, setIsSubscribed] = useState(video.isSubscribed);

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  const handleLike = () => {
    if (isLiked) {
      setLocalLikes(prev => prev - 1);
      setIsLiked(false);
    } else {
      setLocalLikes(prev => prev + 1);
      setIsLiked(true);
      
      if (isDisliked) {
        setLocalDislikes(prev => prev - 1);
        setIsDisliked(false);
      }
    }
    onLike?.(video.id);
  };

  const handleDislike = () => {
    if (isDisliked) {
      setLocalDislikes(prev => prev - 1);
      setIsDisliked(false);
    } else {
      setLocalDislikes(prev => prev + 1);
      setIsDisliked(true);
      
      if (isLiked) {
        setLocalLikes(prev => prev - 1);
        setIsLiked(false);
      }
    }
    onDislike?.(video.id);
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    onBookmark?.(video.id);
  };

  const toggleSubscribe = () => {
    setIsSubscribed(!isSubscribed);
    onSubscribe?.(video.user.id);
  };

  const formatCount = (count: number): string => {
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + 'M';
    } else if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'K';
    }
    return count.toString();
  };

  return (
    <div className={cn('space-y-4', className)}>
      {/* Title */}
      <h1 className="text-2xl font-bold">{video.title}</h1>
      
      {/* Stats and Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        {/* Views and date */}
        <div className="text-sm text-muted-foreground">
          {formatCount(video.viewCount)} views • {formatDistanceToNow(new Date(video.publishedAt), { addSuffix: true })}
        </div>
        
        {/* Action buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Like button */}
          <Button
            variant="ghost"
            size="sm"
            className="gap-2"
            onClick={handleLike}
          >
            <ThumbsUp className={cn('h-4 w-4', isLiked && 'fill-current')} />
            <span>{formatCount(localLikes)}</span>
          </Button>
          
          {/* Dislike button */}
          <Button
            variant="ghost"
            size="sm"
            className="gap-2"
            onClick={handleDislike}
          >
            <ThumbsDown className={cn('h-4 w-4', isDisliked && 'fill-current')} />
            <span>{formatCount(localDislikes)}</span>
          </Button>
          
          {/* Share button */}
          <Button
            variant="ghost"
            size="sm"
            className="gap-2"
            onClick={() => onShare?.(video.id)}
          >
            <Share2 className="h-4 w-4" />
            <span>Share</span>
          </Button>
          
          {/* Bookmark button */}
          <Button
            variant="ghost"
            size="sm"
            className="gap-2"
            onClick={toggleBookmark}
          >
            {isBookmarked ? (
              <Bookmark className="h-4 w-4 fill-current" />
            ) : (
              <Bookmark className="h-4 w-4" />
            )}
            <span>Save</span>
          </Button>
          
          {/* More options */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onAddToPlaylist?.(video.id)}>
                <Play className="mr-2 h-4 w-4" />
                <span>Add to playlist</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onReport?.(video.id)}>
                <Flag className="mr-2 h-4 w-4" />
                <span>Report</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <Separator />
      
      {/* Channel info */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={video.user.avatar} alt={video.user.name} />
            <AvatarFallback>{video.user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-1">
              <span className="font-medium">{video.user.name}</span>
              {video.user.isVerified && (
                <svg className="h-4 w-4 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{formatCount(video.user.subscriberCount)} subscribers</p>
          </div>
        </div>
        <Button
          variant={isSubscribed ? 'outline' : 'default'}
          size="sm"
          onClick={toggleSubscribe}
        >
          {isSubscribed ? 'Subscribed' : 'Subscribe'}
        </Button>
      </div>
      
      {/* Description */}
      <div className="bg-muted/50 rounded-lg p-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <span>{formatCount(video.viewCount)} views</span>
          <span>•</span>
          <span>{formatDistanceToNow(new Date(video.publishedAt), { addSuffix: true })}</span>
        </div>
        
        <div className={cn('whitespace-pre-line', !isDescriptionExpanded && 'line-clamp-3')}>
          {video.description}
        </div>
        
        {video.description.split('\n').length > 3 && (
          <Button
            variant="ghost"
            size="sm"
            className="mt-2 h-auto p-0 text-sm font-medium"
            onClick={toggleDescription}
          >
            {isDescriptionExpanded ? 'Show less' : '...more'}
          </Button>
        )}
        
        {/* Tags */}
        {video.tags && video.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {video.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
      
      {/* Comments header */}
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Comments • {formatCount(video.commentCount)}</h3>
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 text-muted-foreground"
          onClick={onCommentClick}
        >
          <MessageSquare className="h-4 w-4" />
          <span>Add a comment</span>
        </Button>
      </div>
    </div>
  );
}
