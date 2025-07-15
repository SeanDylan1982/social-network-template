'use client';

import { useRouter } from 'next/navigation';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Bookmark,
  Clock,
  MoreHorizontal,
  Play,
  Share2,
  ThumbsUp,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export interface VideoCardProps {
  video: {
    id: string;
    title: string;
    thumbnail: string;
    duration: string;
    viewCount: number;
    publishedAt: string;
    isLive?: boolean;
    isWatched?: boolean;
    isBookmarked?: boolean;
    isLiked?: boolean;
    likeCount?: number;
    user: {
      id: string;
      name: string;
      username: string;
      avatar: string;
      isVerified: boolean;
    };
  };
  variant?: 'grid' | 'list' | 'compact';
  className?: string;
  onLike?: (videoId: string) => void;
  onBookmark?: (videoId: string) => void;
  onShare?: (videoId: string) => void;
  onAddToWatchLater?: (videoId: string) => void;
  onAddToPlaylist?: (videoId: string) => void;
  onReport?: (videoId: string) => void;
}

export function VideoCard({
  video,
  variant = 'grid',
  className,
  onLike,
  onBookmark,
  onShare,
  onAddToWatchLater,
  onAddToPlaylist,
  onReport,
}: VideoCardProps) {
  const router = useRouter();

  const handleVideoClick = () => {
    router.push(`/videos/${video.id}`);
  };

  const handleChannelClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/users/${video.user.id}`);
  };

  const formatViewCount = (count: number): string => {
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + 'M';
    } else if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'K';
    }
    return count.toString();
  };

  if (variant === 'list') {
    return (
      <div 
        className={cn(
          'flex gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer group',
          className
        )}
        onClick={handleVideoClick}
      >
        <div className="relative flex-shrink-0 w-64">
          <div className="aspect-video bg-muted rounded-md overflow-hidden relative">
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
            />
            <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
              {video.duration}
            </div>
            {video.isLive && (
              <div className="absolute top-1 left-1 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded">
                LIVE
              </div>
            )}
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-base line-clamp-2 group-hover:text-primary">
            {video.title}
          </h3>
          
          <div className="mt-1 text-sm text-muted-foreground">
            <button 
              onClick={handleChannelClick}
              className="hover:text-foreground flex items-center gap-1"
            >
              {video.user.name}
              {video.user.isVerified && (
                <svg className="h-3.5 w-3.5 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              )}
            </button>
            
            <div className="flex items-center gap-2 mt-1">
              <span>{formatViewCount(video.viewCount)} views</span>
              <span>•</span>
              <span>{formatDistanceToNow(new Date(video.publishedAt), { addSuffix: true })}</span>
            </div>
            
            {variant !== 'compact' && (
              <p className="mt-2 text-sm line-clamp-2">
                {video.description}
              </p>
            )}
          </div>
          
          <div className="mt-2 flex items-center gap-2">
            {onLike && (
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  'h-8 gap-1.5 text-muted-foreground',
                  video.isLiked && 'text-blue-500'
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  onLike(video.id);
                }}
              >
                <ThumbsUp className="h-4 w-4" />
                {video.likeCount !== undefined && video.likeCount > 0 && (
                  <span>{formatViewCount(video.likeCount)}</span>
                )}
              </Button>
            )}
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => onBookmark?.(video.id)}>
                  <Bookmark className="mr-2 h-4 w-4" />
                  <span>{video.isBookmarked ? 'Remove from saved' : 'Save'}</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onShare?.(video.id)}>
                  <Share2 className="mr-2 h-4 w-4" />
                  <span>Share</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onAddToWatchLater?.(video.id)}>
                  <Clock className="mr-2 h-4 w-4" />
                  <span>Watch later</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onAddToPlaylist?.(video.id)}>
                  <Plus className="mr-2 h-4 w-4" />
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
      </div>
    );
  }

  // Default grid view
  return (
    <div 
      className={cn(
        'group cursor-pointer space-y-2',
        variant === 'compact' ? 'w-full' : 'w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.666rem)] xl:w-[calc(25%-0.75rem)]',
        className
      )}
      onClick={handleVideoClick}
    >
      <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
        />
        <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
          {video.duration}
        </div>
        {video.isLive && (
          <div className="absolute top-1 left-1 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded">
            LIVE
          </div>
        )}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/30 transition-opacity">
          <Play className="h-12 w-12 text-white/90" fill="currentColor" />
        </div>
      </div>
      
      <div className="flex gap-2">
        {variant !== 'compact' && (
          <Avatar className="h-9 w-9 flex-shrink-0">
            <AvatarImage src={video.user.avatar} alt={video.user.name} />
            <AvatarFallback>{video.user.name.charAt(0)}</AvatarFallback>
          </Avatar>
        )}
        
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-sm line-clamp-2 group-hover:text-primary">
            {video.title}
          </h3>
          
          <div className="text-xs text-muted-foreground mt-1">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/users/${video.user.id}`);
              }}
              className="hover:text-foreground flex items-center gap-1"
            >
              {video.user.name}
              {video.user.isVerified && (
                <svg className="h-3 w-3 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              )}
            </button>
            
            <div className="flex items-center gap-1">
              <span>{formatViewCount(video.viewCount)} views</span>
              <span>•</span>
              <span>{formatDistanceToNow(new Date(video.publishedAt), { addSuffix: true })}</span>
            </div>
          </div>
          
          {variant === 'compact' && onBookmark && (
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 absolute top-1 right-1 opacity-0 group-hover:opacity-100"
              onClick={(e) => {
                e.stopPropagation();
                onBookmark(video.id);
              }}
            >
              {video.isBookmarked ? (
                <Bookmark className="h-4 w-4 fill-current" />
              ) : (
                <Bookmark className="h-4 w-4" />
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
