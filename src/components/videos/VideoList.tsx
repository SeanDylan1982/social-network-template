'use client';

import { useRouter } from 'next/navigation';
import { Video } from '@/types/video.types';
import { VideoCard } from './VideoCard';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { VideoFilter, VideoFilterValues } from './VideoFilter';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { VideoUploadModal } from './VideoUploadModal';

type ViewMode = 'grid' | 'list';

interface VideoListProps {
  videos: Video[];
  hasMore?: boolean;
  onLoadMore?: () => void;
  loading?: boolean;
  showFilter?: boolean;
  showTabs?: boolean;
  onFilterChange?: (filters: VideoFilterValues) => void;
  initialFilters?: VideoFilterValues;
  showUploadButton?: boolean;
  emptyState?: React.ReactNode;
  className?: string;
}

function VideoList({ 
  videos = [], 
  hasMore = false, 
  onLoadMore, 
  loading = false, 
  showFilter = true,
  showTabs = true,
  onFilterChange,
  initialFilters,
  showUploadButton = true,
  emptyState,
  className
}: VideoListProps) {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [activeTab, setActiveTab] = useState('all');
  const [filters, setFilters] = useState<VideoFilterValues>({
    searchQuery: '',
    sortBy: 'newest',
    category: 'all',
    duration: 'all',
    uploadDate: 'all',
    features: [],
    ...initialFilters
  });

  // Sync with initialFilters prop
  useEffect(() => {
    if (initialFilters) {
      setFilters(prev => ({
        ...prev,
        ...initialFilters
      }));
    }
  }, [initialFilters]);

  const handleFilterChange = (newFilters: VideoFilterValues) => {
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleUploadComplete = (videoId: string) => {
    // Refresh the page or update the list when a new video is uploaded
    router.refresh();
  };

  if (loading && videos.length === 0) {
    return (
      <div className={className}>
        {showFilter && <VideoFilterSkeleton />}
        <VideoListSkeleton viewMode={viewMode} />
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className={cn('flex flex-col items-center justify-center py-12 text-center', className)}>
        {emptyState || (
          <>
            <h3 className="text-lg font-medium">No videos found</h3>
            <p className="text-muted-foreground mt-2 max-w-md">
              Try adjusting your search or filter to find what you're looking for.
            </p>
            {showUploadButton && (
              <VideoUploadModal onUploadComplete={handleUploadComplete}>
                <Button className="mt-4">
                  Upload your first video
                </Button>
              </VideoUploadModal>
            )}
          </>
        )}
      </div>
    );
  }

  return (
    <div className={cn('space-y-6', className)}>
      {/* Header with title, tabs, and actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        {showTabs ? (
          <Tabs 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="w-full sm:w-auto"
          >
            <TabsList>
              <TabsTrigger value="all">All Videos</TabsTrigger>
              <TabsTrigger value="popular">Popular</TabsTrigger>
              <TabsTrigger value="recent">Recent</TabsTrigger>
              <TabsTrigger value="saved">Saved</TabsTrigger>
            </TabsList>
          </Tabs>
        ) : (
          <h2 className="text-2xl font-bold tracking-tight">Videos</h2>
        )}
        
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="flex items-center rounded-md bg-muted p-1">
            <button
              type="button"
              className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-background shadow' : 'text-muted-foreground'}`}
              onClick={() => setViewMode('grid')}
              aria-label="Grid view"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="7" height="7" x="3" y="3" rx="1" />
                <rect width="7" height="7" x="14" y="3" rx="1" />
                <rect width="7" height="7" x="14" y="14" rx="1" />
                <rect width="7" height="7" x="3" y="14" rx="1" />
              </svg>
            </button>
            <button
              type="button"
              className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-background shadow' : 'text-muted-foreground'}`}
              onClick={() => setViewMode('list')}
              aria-label="List view"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="8" y1="6" x2="21" y2="6" />
                <line x1="8" y1="12" x2="21" y2="12" />
                <line x1="8" y1="18" x2="21" y2="18" />
                <line x1="3" y1="6" x2="3.01" y2="6" />
                <line x1="3" y1="12" x2="3.01" y2="12" />
                <line x1="3" y1="18" x2="3.01" y2="18" />
              </svg>
            </button>
          </div>
          
          {showUploadButton && (
            <VideoUploadModal onUploadComplete={handleUploadComplete}>
              <Button className="whitespace-nowrap">
                <span className="hidden sm:inline">Upload Video</span>
                <span className="inline sm:hidden">Upload</span>
              </Button>
            </VideoUploadModal>
          )}
        </div>
      </div>
      
      {/* Filter bar */}
      {showFilter && (
        <div className="bg-muted/50 p-4 rounded-lg">
          <VideoFilter 
            value={filters}
            onChange={handleFilterChange}
          />
        </div>
      )}
      
      {/* Video grid/list */}
      <div 
        className={cn(
          'grid gap-4',
          viewMode === 'grid' 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'
            : 'grid-cols-1'
        )}
      >
        {videos.map((video) => (
          <div key={video.id} className={viewMode === 'list' ? 'mb-4 last:mb-0' : ''}>
            <VideoCard 
              video={{
                id: video.id,
                title: video.title,
                thumbnail: video.thumbnailUrl,
                duration: formatDuration(video.duration),
                viewCount: video.viewCount,
                publishedAt: video.publishedAt,
                isLive: video.isLive,
                isWatched: false, // TODO: Implement watched status
                isBookmarked: video.isBookmarked,
                isLiked: video.isLiked,
                likeCount: video.likeCount,
                user: {
                  id: video.userId,
                  name: video.user?.name || 'Unknown User',
                  username: video.user?.username || 'unknown',
                  avatar: video.user?.avatar || '/placeholder-avatar.jpg',
                  isVerified: video.user?.isVerified || false,
                },
              }}
              variant={viewMode === 'list' ? 'list' : 'grid'}
            />
          </div>
        ))}
      </div>
      
      {/* Load more button */}
      {hasMore && onLoadMore && (
        <div className="flex justify-center mt-8">
          <Button 
            variant="outline" 
            onClick={onLoadMore}
            disabled={loading}
            className="min-w-[120px]"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Loading...
              </>
            ) : 'Load More'}
          </Button>
        </div>
      )}
    </div>
  );
}

// Format duration in seconds to MM:SS or HH:MM:SS
function formatDuration(seconds: number): string {
  if (!seconds && seconds !== 0) return '0:00';
  
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  } else {
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
}

// Skeleton component for loading state
export function VideoListSkeleton({ count = 12, viewMode = 'grid' }: { count?: number; viewMode?: ViewMode }) {
  return (
    <div className={cn(
      'grid gap-4',
      viewMode === 'grid' 
        ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'
        : 'grid-cols-1'
    )}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="aspect-video rounded-xl" />
          <div className="flex space-x-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-3 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Skeleton for the filter component
function VideoFilterSkeleton() {
  return (
    <div className="bg-muted/50 p-4 rounded-lg mb-6 space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <Skeleton className="h-10 flex-1" />
        <div className="flex gap-2">
          <Skeleton className="h-10 w-[180px]" />
          <Skeleton className="h-10 w-[100px]" />
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-6 w-20 rounded-full" />
        ))}
      </div>
    </div>
  );
}

// Helper function to merge class names
function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

export { VideoList };
export default VideoList;
