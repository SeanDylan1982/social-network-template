'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
// UI Components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { 
  Search as SearchIcon, 
  X as XIcon, 
  Upload as UploadIcon, 
  Grid as GridIcon, 
  LayoutGrid as LayoutGridIcon, 
  List as ListIcon, 
  Loader2 as LoaderIcon, 
  Image as ImageIcon 
} from 'lucide-react';
import { PhotoCard } from '@/components/photos/PhotoCard';
import { Photo } from '@/types/photo.types';

// Mock data - in a real app, this would come from an API
const mockPhotos: Photo[] = Array.from({ length: 24 }, (_, i) => ({
  id: `photo-${i + 1}`,
  title: `Beautiful Landscape ${i + 1}`,
  description: 'This is a sample photo description that provides some context about the image content.',
  imageUrl: `https://picsum.photos/seed/photo-${i + 1}/800/600`,
  width: 800,
  height: 600,
  aspectRatio: '4:3',
  size: 1024 * 1024 * (Math.floor(Math.random() * 5) + 1), // 1-5MB
  format: 'jpeg',
  uploadDate: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
  viewCount: Math.floor(Math.random() * 10000) + 100,
  likeCount: Math.floor(Math.random() * 1000) + 10,
  commentCount: Math.floor(Math.random() * 100) + 1,
  isLiked: i % 4 === 0,
  isBookmarked: i % 5 === 0,
  tags: ['landscape', 'nature', 'photography', 'outdoors', 'scenery'].slice(0, Math.floor(Math.random() * 3) + 1),
  user: {
    id: `user-${Math.floor(i / 3) + 1}`,
    name: `Photographer ${Math.floor(i / 3) + 1}`,
    username: `photographer${Math.floor(i / 3) + 1}`,
    avatar: `https://i.pravatar.cc/150?u=photographer-${Math.floor(i / 3) + 1}`,
    isVerified: i % 3 === 0,
  },
  metadata: {
    width: 800,
    height: 600,
    size: 1024 * 1024 * (Math.floor(Math.random() * 5) + 1),
    format: 'jpeg',
    aspectRatio: '4:3',
  },
}));

export default function PhotosPage() {
  // Using useRouter and useSearchParams for future navigation and query params
  const _router = useRouter();
  const _searchParams = useSearchParams();
  
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'masonry'>('grid');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Available categories (in a real app, this would come from an API)
  const categories = [
    { id: 'all', name: 'All Photos' },
    { id: 'nature', name: 'Nature' },
    { id: 'travel', name: 'Travel' },
    { id: 'animals', name: 'Animals' },
    { id: 'food', name: 'Food' },
    { id: 'architecture', name: 'Architecture' },
    { id: 'fashion', name: 'Fashion' },
    { id: 'sports', name: 'Sports' },
  ];

  // Fetch photos based on filters and pagination
  const fetchPhotos = async (reset = false) => {
    try {
      setIsLoading(true);
      const currentPage = reset ? 1 : page;
      
      // Simulate API call with delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Apply filters (in a real app, this would be done on the server)
      let filteredPhotos = [...mockPhotos];
      
      // Apply search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filteredPhotos = filteredPhotos.filter(
          photo => 
            photo.title.toLowerCase().includes(query) ||
            photo.description?.toLowerCase().includes(query) ||
            photo.user.name.toLowerCase().includes(query) ||
            photo.tags.some(tag => tag.toLowerCase().includes(query))
        );
      }
      
      // Apply category filter
      if (selectedCategory && selectedCategory !== 'all') {
        filteredPhotos = filteredPhotos.filter(photo => 
          photo.tags.some(tag => tag.toLowerCase() === selectedCategory.toLowerCase())
        );
      }
      
      // Apply sorting
      if (sortBy) {
        filteredPhotos.sort((a, b) => {
          switch (sortBy) {
            case 'newest':
              return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
            case 'oldest':
              return new Date(a.uploadDate).getTime() - new Date(b.uploadDate).getTime();
            case 'most-liked':
              return b.likeCount - a.likeCount;
            case 'most-viewed':
              return b.viewCount - a.viewCount;
            default:
              return 0;
          }
        });
      }
      
      // Apply tab filter
      if (activeTab === 'popular') {
        filteredPhotos = filteredPhotos.filter(photo => photo.likeCount > 100);
      } else if (activeTab === 'trending') {
        filteredPhotos = filteredPhotos.filter(photo => photo.viewCount > 500);
      } else if (activeTab === 'recent') {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        filteredPhotos = filteredPhotos.filter(photo => new Date(photo.uploadDate) > oneWeekAgo);
      }
      
      // Pagination
      const itemsPerPage = viewMode === 'grid' ? 12 : viewMode === 'list' ? 6 : 15;
      const startIndex = (currentPage - 1) * itemsPerPage;
      const paginatedPhotos = filteredPhotos.slice(0, startIndex + itemsPerPage);
      
      setPhotos(reset ? paginatedPhotos : [...photos, ...paginatedPhotos]);
      setHasMore(paginatedPhotos.length < filteredPhotos.length);
      
      if (reset) {
        setPage(1);
      } else {
        setPage(prev => prev + 1);
      }
      
    } catch (error) {
      console.error('Error fetching photos:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Initial load
  useEffect(() => {
    fetchPhotos(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, sortBy, selectedCategory, viewMode, searchQuery]);
  
  // Handle search
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchPhotos(true);
  };
  
  // Handle photo like
  const handleLike = (photoId: string) => {
    setPhotos(photos.map(photo => {
      if (photo.id === photoId) {
        const newLikeStatus = !photo.isLiked;
        return {
          ...photo,
          isLiked: newLikeStatus,
          likeCount: newLikeStatus ? photo.likeCount + 1 : photo.likeCount - 1,
        };
      }
      return photo;
    }));
  };
  
  // Handle photo bookmark
  const handleBookmark = (photoId: string) => {
    setPhotos(photos.map(photo => ({
      ...photo,
      isBookmarked: photo.id === photoId ? !photo.isBookmarked : photo.isBookmarked,
    })));
  };
  
  // Handle photo share
  const handleShare = (photoId: string) => {
    // In a real app, this would open a share dialog
    console.log('Sharing photo:', photoId);
  };
  
  // Handle load more
  const handleLoadMore = () => {
    fetchPhotos();
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header with title and actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Photos</h1>
          <p className="text-muted-foreground mt-1">
            Discover and share amazing photos from our community
          </p>
        </div>
        
        <Button>
          <UploadIcon className="mr-2 h-4 w-4" />
          Upload Photo
        </Button>
      </div>
      
      {/* Search and filter bar */}
      <Card className="mb-6">
        <div className="p-4">
          <form onSubmit={handleSearch} className="mb-4">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search photos, users, or tags..."
                className="pl-10 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={() => setSearchQuery('')}
                >
                  <XIcon className="h-4 w-4" />
                </button>
              )}
            </div>
          </form>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <Tabs 
              value={activeTab} 
              onValueChange={setActiveTab}
              className="w-full md:w-auto"
            >
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="popular">Popular</TabsTrigger>
                <TabsTrigger value="trending">Trending</TabsTrigger>
                <TabsTrigger value="recent">Recent</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="flex items-center gap-2">
              <Select 
                value={selectedCategory} 
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select 
                value={sortBy} 
                onValueChange={setSortBy}
              >
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                  <SelectItem value="most-liked">Most Liked</SelectItem>
                  <SelectItem value="most-viewed">Most Viewed</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="flex items-center border rounded-md p-1">
                <button
                  type="button"
                  className={`p-1 rounded-sm ${viewMode === 'grid' ? 'bg-muted' : ''}`}
                  onClick={() => setViewMode('grid')}
                  title="Grid view"
                >
                  <GridIcon className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  className={`p-1 rounded-sm ${viewMode === 'masonry' ? 'bg-muted' : ''}`}
                  onClick={() => setViewMode('masonry')}
                  title="Masonry view"
                >
                  <LayoutGridIcon className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  className={`p-1 rounded-sm ${viewMode === 'list' ? 'bg-muted' : ''}`}
                  onClick={() => setViewMode('list')}
                  title="List view"
                >
                  <ListIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Card>
      
      {/* Photos grid */}
      {isLoading && photos.length === 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <div className="aspect-square bg-muted animate-pulse" />
              <div className="p-3">
                <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
              </div>
            </Card>
          ))}
        </div>
      ) : photos.length > 0 ? (
        <>
          {viewMode === 'list' ? (
            <div className="space-y-4">
              {photos.map(photo => (
                <PhotoCard 
                  key={photo.id} 
                  photo={photo} 
                  variant="list"
                  onLike={handleLike}
                  onBookmark={handleBookmark}
                  onShare={handleShare}
                />
              ))}
            </div>
          ) : viewMode === 'masonry' ? (
            <div className="columns-1 sm:columns-2 lg:columns-3 2xl:columns-4 gap-4 space-y-4">
              {photos.map(photo => (
                <div key={photo.id} className="break-inside-avoid">
                  <PhotoCard 
                    photo={photo} 
                    variant="masonry"
                    onLike={handleLike}
                    onBookmark={handleBookmark}
                    onShare={handleShare}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {photos.map(photo => (
                <PhotoCard 
                  key={photo.id} 
                  photo={photo} 
                  variant="grid"
                  onLike={handleLike}
                  onBookmark={handleBookmark}
                  onShare={handleShare}
                />
              ))}
            </div>
          )}
          
          {hasMore && (
            <div className="mt-8 text-center">
              <Button 
                variant="outline" 
                onClick={handleLoadMore}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  'Load More'
                )}
              </Button>
            </div>
          )}
        </>
      ) : (
        <Card className="py-12 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <ImageIcon className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="mt-4 text-lg font-medium">No photos found</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {searchQuery 
              ? 'Try adjusting your search or filter to find what you\'re looking for.'
              : 'There are no photos to display at the moment.'}
          </p>
          {searchQuery && (
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSortBy('newest');
                setActiveTab('all');
              }}
            >
              Clear all filters
            </Button>
          )}
        </Card>
      )}
    </div>
  );
}
