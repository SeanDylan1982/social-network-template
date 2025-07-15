'use client';

import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import {
  Clock,
  MoreHorizontal,
  Play,
  Plus,
  Clock3,
  Bookmark,
  Flag,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  viewCount: number;
  publishedAt: string;
  isWatched?: boolean;
  user: {
    id: string;
    name: string;
    username: string;
    avatar: string;
    isVerified: boolean;
  };
}

interface RelatedVideosProps {
  videos: Video[];
  currentVideoId?: string;
  isLoading?: boolean;
  title?: string;
  className?: string;
  onVideoClick?: (videoId: string) => void;
  onChannelClick?: (userId: string) => void;
  onAddToWatchLater?: (videoId: string) => void;
  onAddToPlaylist?: (videoId: string) => void;
  onReport?: (videoId: string) => void;
}

export function RelatedVideos({
  videos = [],
  currentVideoId,
  isLoading = false,
  title = 'Related Videos',
  className,
  onVideoClick,
  onChannelClick,
  onAddToWatchLater,
  onAddToPlaylist,
  onReport,
}: RelatedVideosProps) {
  const router = useRouter();

  const handleVideoClick = (videoId: string) => {
    if (onVideoClick) {
      onVideoClick(videoId);
    } else {
      router.push(`/videos/${videoId}`);
    }
  };

  const handleChannelClick = (userId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (onChannelClick) {
      onChannelClick(userId);
    } else {
      router.push(`/users/${userId}`);
    }
  };

  const formatViewCount = (count: number): string => {
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + 'M';
    } else if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'K';
    }
    return count.toString();
  };

  if (isLoading) {
    return (
      <div className={cn('space-y-4', className)}>
        <h3 className="font-medium text-lg">{title}</h3>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex gap-3">
            <Skeleton className="w-40 h-24 rounded-lg" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-3 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (videos.length === 0) {
    return null;
  }

  return (
    <div className={cn('space-y-4', className)}>
      <h3 className="font-medium text-lg">{title}</h3>
      
      <div className="space-y-4">
        {videos
          .filter(video => video.id !== currentVideoId)
          .slice(0, 5) // Show max 5 related videos
          .map((video) => (
            <div 
              key={video.id}
              className="flex gap-3 cursor-pointer group"
              onClick={() => handleVideoClick(video.id)}
            >
              <div className="relative flex-shrink-0">
                <div className="relative aspect-video w-40 rounded-lg overflow-hidden bg-muted">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
                  />
                  <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
                    {video.duration}
                  </div>
                  {video.isWatched && (
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <Play className="h-8 w-8 text-white" fill="currentColor" />
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm line-clamp-2 group-hover:text-primary">
                  {video.title}
                </h4>
                
                <button
                  onClick={(e) => handleChannelClick(video.user.id, e)}
                  className="mt-1 text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
                >
                  {video.user.name}
                  {video.user.isVerified && (
                    <svg className="h-3 w-3 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                  )}
                </button>
                
                <div className="flex items-center text-xs text-muted-foreground mt-0.5">
                  <span>{formatViewCount(video.viewCount)} views</span>
                  <span className="mx-1">•</span>
                  <span>{video.publishedAt}</span>
                </div>
                
                <div className="mt-1">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <MoreHorizontal className="h-3.5 w-3.5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem onClick={() => onAddToWatchLater?.(video.id)}>
                        <Clock3 className="mr-2 h-4 w-4" />
                        <span>Save to Watch Later</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onAddToPlaylist?.(video.id)}>
                        <Plus className="mr-2 h-4 w-4" />
                        <span>Add to Playlist</span>
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
          ))}
      </div>
      
      <Separator className="my-4" />
      
      <div className="space-y-2">
        <Button variant="ghost" size="sm" className="w-full justify-start gap-2">
          <Play className="h-4 w-4" />
          <span>Add to queue</span>
        </Button>
        <Button variant="ghost" size="sm" className="w-full justify-start gap-2">
          <Clock className="h-4 w-4" />
          <span>Watch later</span>
        </Button>
        <Button variant="ghost" size="sm" className="w-full justify-start gap-2">
          <Bookmark className="h-4 w-4" />
          <span>Save to playlist</span>
        </Button>
      </div>
    </div>
  );
}
