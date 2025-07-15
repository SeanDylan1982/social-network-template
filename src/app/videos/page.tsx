'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { VideoList } from '@/components/videos/VideoList';
import { Video } from '@/types/video.types';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { VideoUploadModal } from '@/components/videos/VideoUploadModal';
import { useSession } from 'next-auth/react';
import { toast } from '@/components/ui/use-toast';

// Mock data - in a real app, this would come from an API
const mockVideos: Video[] = Array.from({ length: 12 }, (_, i) => ({
  id: `video-${i + 1}`,
  title: `Amazing Video ${i + 1} - ${['Tutorial', 'Review', 'Vlog', 'Tutorial', 'Review', 'Vlog'][i % 6]}`,
  description: 'This is a sample video description that provides some context about the video content.',
  thumbnailUrl: `https://picsum.photos/seed/video-${i + 1}/640/360`,
  videoUrl: `https://example.com/video-${i + 1}`,
  duration: Math.floor(Math.random() * 3600) + 60, // 1-60 minutes in seconds
  viewCount: Math.floor(Math.random() * 1000000) + 1000,
  likeCount: Math.floor(Math.random() * 10000) + 100,
  commentCount: Math.floor(Math.random() * 500) + 10,
  publishedAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
  userId: `user-${Math.floor(i / 3) + 1}`,
  category: ['education', 'entertainment', 'gaming', 'music', 'news', 'sports', 'technology', 'cooking', 'travel', 'lifestyle'][i % 10],
  tags: ['tutorial', 'howto', 'education', 'learning', 'tips'].slice(0, Math.floor(Math.random() * 3) + 1),
  isLive: i % 5 === 0,
  isFeatured: i % 3 === 0,
  isTrending: i % 4 === 0,
  isBookmarked: i % 7 === 0,
  isLiked: i % 6 === 0,
  user: {
    id: `user-${Math.floor(i / 3) + 1}`,
    name: `Creator ${Math.floor(i / 3) + 1}`,
    username: `creator${Math.floor(i / 3) + 1}`,
    avatar: `https://i.pravatar.cc/150?u=user-${Math.floor(i / 3) + 1}`,
    isVerified: i % 3 === 0,
  },
  metadata: {
    width: 1920,
    height: 1080,
    size: 1024 * 1024 * (Math.floor(Math.random() * 100) + 10), // 10-110MB
    format: 'mp4',
    duration: Math.floor(Math.random() * 3600) + 60, // 1-60 minutes in seconds
    aspectRatio: '16:9',
  },
}));

export default function VideosPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  
  // State for filters and pagination
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || 'all',
    sortBy: searchParams.get('sort') || 'newest',
    duration: searchParams.get('duration') || 'all',
    uploadDate: searchParams.get('date') || 'all',
    features: searchParams.get('features')?.split(',') || [],
  });

  // Fetch videos based on filters and pagination
  const fetchVideos = useCallback(async (reset = false) => {
    try {
      setIsLoading(true);
      const currentPage = reset ? 1 : page;
      
      // Simulate API call with delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Apply filters (in a real app, this would be done on the server)
      let filteredVideos = [...mockVideos];
      
      // Apply search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filteredVideos = filteredVideos.filter(
          video => 
            video.title.toLowerCase().includes(query) ||
            video.description.toLowerCase().includes(query) ||
            video.user.name.toLowerCase().includes(query) ||
            video.tags.some(tag => tag.toLowerCase().includes(query))
        );
      }
      
      // Apply category filter
      if (filters.category && filters.category !== 'all') {
        filteredVideos = filteredVideos.filter(video => 
          video.category === filters.category
        );
      }
      
      // Apply duration filter
      if (filters.duration && filters.duration !== 'all') {
        filteredVideos = filteredVideos.filter(video => {
          const minutes = Math.floor(video.duration / 60);
          if (filters.duration === 'short') return minutes < 4;
          if (filters.duration === 'medium') return minutes >= 4 && minutes <= 20;
          if (filters.duration === 'long') return minutes > 20;
          return true;
        });
      }
      
      // Apply upload date filter
      if (filters.uploadDate && filters.uploadDate !== 'all') {
        const now = new Date();
        filteredVideos = filteredVideos.filter(video => {
          const videoDate = new Date(video.publishedAt);
          const diffTime = now.getTime() - videoDate.getTime();
          const diffDays = diffTime / (1000 * 60 * 60 * 24);
          
          if (filters.uploadDate === 'today') return diffDays < 1;
          if (filters.uploadDate === 'week') return diffDays < 7;
          if (filters.uploadDate === 'month') return diffDays < 30;
          if (filters.uploadDate === 'year') return diffDays < 365;
          return true;
        });
      }
      
      // Apply sorting
      if (filters.sortBy) {
        filteredVideos.sort((a, b) => {
          switch (filters.sortBy) {
            case 'newest':
              return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
            case 'oldest':
              return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
            case 'most_views':
              return b.viewCount - a.viewCount;
            case 'most_likes':
              return b.likeCount - a.likeCount;
            case 'most_comments':
              return (b.commentCount || 0) - (a.commentCount || 0);
            default:
              return 0;
          }
        });
      }
      
      // Apply tab filter
      if (activeTab === 'trending') {
        filteredVideos = filteredVideos.filter(video => video.isTrending);
      } else if (activeTab === 'featured') {
        filteredVideos = filteredVideos.filter(video => video.isFeatured);
      } else if (activeTab === 'live') {
        filteredVideos = filteredVideos.filter(video => video.isLive);
      } else if (activeTab === 'saved' && session?.user) {
        // In a real app, fetch saved videos for the current user
        filteredVideos = filteredVideos.filter(video => video.isBookmarked);
      }
      
      // Pagination
      const startIndex = (currentPage - 1) * 12;
      const paginatedVideos = filteredVideos.slice(0, startIndex + 12);
      
      setVideos(reset ? paginatedVideos : [...videos, ...paginatedVideos]);
      setHasMore(paginatedVideos.length < filteredVideos.length);
      
      if (reset) {
        setPage(1);
      } else {
        setPage(prev => prev + 1);
      }
      
    } catch (error) {
      console.error('Error fetching videos:', error);
      toast({
        title: 'Error',
        description: 'Failed to load videos. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [page, filters, searchQuery, activeTab, session]);
  
  // Initial load
  useEffect(() => {
    fetchVideos(true);
    
    // Update URL with filters
    const params = new URLSearchParams();
    if (filters.category && filters.category !== 'all') params.set('category', filters.category);
    if (filters.sortBy && filters.sortBy !== 'newest') params.set('sort', filters.sortBy);
    if (filters.duration && filters.duration !== 'all') params.set('duration', filters.duration);
    if (filters.uploadDate && filters.uploadDate !== 'all') params.set('date', filters.uploadDate);
    if (filters.features.length > 0) params.set('features', filters.features.join(','));
    
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({ ...window.history.state, as: newUrl, url: newUrl }, '', newUrl);
  }, [filters]);
  
  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchVideos(true);
  };
  
  // Handle filter changes
  const handleFilterChange = (newFilters: any) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters,
    }));
  };
  
  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    fetchVideos(true);
  };
  
  // Handle video upload success
  const handleUploadComplete = (videoId: string) => {
    // Refresh the page to show the new video
    router.refresh();
    
    // In a real app, you might navigate to the video page or show a success message
    toast({
      title: 'Video uploaded successfully!',
      description: 'Your video is now being processed and will be available shortly.',
    });
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header with title and actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Videos</h1>
          <p className="text-muted-foreground mt-1">
            Watch and discover amazing videos from our community
          </p>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <form onSubmit={handleSearch} className="flex-1 md:max-w-md">
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <Input
                type="search"
                placeholder="Search videos..."
                className="pl-10 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={() => {
                    setSearchQuery('');
                    fetchVideos(true);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              )}
            </div>
          </form>
          
          <VideoUploadModal onUploadComplete={handleUploadComplete}>
            <Button className="whitespace-nowrap">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Upload
            </Button>
          </VideoUploadModal>
        </div>
      </div>
      
      {/* Tabs */}
      <Tabs 
        value={activeTab} 
        onValueChange={handleTabChange}
        className="mb-6"
      >
        <TabsList className="w-full justify-start overflow-x-auto">
          <TabsTrigger value="all">All Videos</TabsTrigger>
          <TabsTrigger value="trending">Trending</TabsTrigger>
          <TabsTrigger value="featured">Featured</TabsTrigger>
          <TabsTrigger value="live">Live</TabsTrigger>
          {session?.user && (
            <TabsTrigger value="saved">Saved</TabsTrigger>
          )}
        </TabsList>
      </Tabs>
      
      {/* Video List */}
      <VideoList
        videos={videos}
        hasMore={hasMore}
        onLoadMore={() => fetchVideos()}
        loading={isLoading}
        showFilter={true}
        showTabs={false}
        onFilterChange={handleFilterChange}
        initialFilters={filters}
        showUploadButton={false}
        emptyState={
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="bg-muted p-4 rounded-full mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-muted-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium">No videos found</h3>
            <p className="text-muted-foreground mt-2 max-w-md">
              {searchQuery
                ? 'No videos match your search. Try different keywords.'
                : 'There are no videos to display. Check back later or upload a video.'}
            </p>
            {!searchQuery && (
              <VideoUploadModal onUploadComplete={handleUploadComplete}>
                <Button className="mt-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Upload your first video
                </Button>
              </VideoUploadModal>
            )}
          </div>
        }
      />
    </div>
  );
}
