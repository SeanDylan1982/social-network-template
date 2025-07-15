'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Filter,
  Search,
  X,
  Clock,
  ArrowUpDown,
  Flame,
  TrendingUp,
  Star,
  Calendar,
  BarChart3,
} from 'lucide-react';

type SortOption = 'newest' | 'popular' | 'trending' | 'recommended';
type DurationFilter = 'all' | 'short' | 'medium' | 'long';
type UploadDateFilter = 'all' | 'today' | 'week' | 'month' | 'year';

interface VideoFilterProps {
  className?: string;
  onFilterChange?: (filters: {
    searchQuery: string;
    sortBy: SortOption;
    category: string;
    duration: DurationFilter;
    uploadDate: UploadDateFilter;
    features: string[];
  }) => void;
  defaultValues?: {
    searchQuery?: string;
    sortBy?: SortOption;
    category?: string;
    duration?: DurationFilter;
    uploadDate?: UploadDateFilter;
    features?: string[];
  };
  showAdvancedFilters?: boolean;
}

export function VideoFilter({
  className,
  onFilterChange,
  defaultValues = {},
  showAdvancedFilters = true,
}: VideoFilterProps) {
  const [searchQuery, setSearchQuery] = useState(defaultValues.searchQuery || '');
  const [sortBy, setSortBy] = useState<SortOption>(defaultValues.sortBy || 'newest');
  const [category, setCategory] = useState(defaultValues.category || 'all');
  const [duration, setDuration] = useState<DurationFilter>(defaultValues.duration || 'all');
  const [uploadDate, setUploadDate] = useState<UploadDateFilter>(defaultValues.uploadDate || 'all');
  const [features, setFeatures] = useState<string[]>(defaultValues.features || []);
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'tutorials', label: 'Tutorials' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'education', label: 'Education' },
    { value: 'gaming', label: 'Gaming' },
    { value: 'music', label: 'Music' },
    { value: 'news', label: 'News' },
    { value: 'sports', label: 'Sports' },
    { value: 'technology', label: 'Technology' },
    { value: 'cooking', label: 'Cooking' },
  ];

  const durationOptions = [
    { value: 'all', label: 'Any duration' },
    { value: 'short', label: 'Short (< 4 min)' },
    { value: 'medium', label: 'Medium (4-20 min)' },
    { value: 'long', label: 'Long (> 20 min)' },
  ];

  const uploadDateOptions = [
    { value: 'all', label: 'Any time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This week' },
    { value: 'month', label: 'This month' },
    { value: 'year', label: 'This year' },
  ];

  const featureOptions = [
    { value: 'subtitles', label: 'Subtitles' },
    { value: 'hd', label: 'HD' },
    { value: '4k', label: '4K' },
    { value: 'vr180', label: 'VR180' },
    { value: '360', label: '360°' },
    { value: 'hdr', label: 'HDR' },
  ];

  const sortOptions: { value: SortOption; label: string; icon: React.ReactNode }[] = [
    { value: 'newest', label: 'Newest', icon: <Calendar className="h-4 w-4" /> },
    { value: 'popular', label: 'Most Viewed', icon: <BarChart3 className="h-4 w-4" /> },
    { value: 'trending', label: 'Trending', icon: <Flame className="h-4 w-4" /> },
    { value: 'recommended', label: 'Recommended', icon: <Star className="h-4 w-4" /> },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters();
  };

  const applyFilters = () => {
    onFilterChange?.({
      searchQuery,
      sortBy,
      category,
      duration,
      uploadDate,
      features,
    });
  };

  const toggleFeature = (feature: string) => {
    const newFeatures = features.includes(feature)
      ? features.filter(f => f !== feature)
      : [...features, feature];
    
    setFeatures(newFeatures);
    
    // Only apply filter immediately if the popover is closed
    if (!isAdvancedOpen) {
      onFilterChange?.({
        searchQuery,
        sortBy,
        category,
        duration,
        uploadDate,
        features: newFeatures,
      });
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSortBy('newest');
    setCategory('all');
    setDuration('all');
    setUploadDate('all');
    setFeatures([]);
    
    onFilterChange?.({
      searchQuery: '',
      sortBy: 'newest',
      category: 'all',
      duration: 'all',
      uploadDate: 'all',
      features: [],
    });
  };

  const hasActiveFilters = 
    searchQuery || 
    category !== 'all' || 
    duration !== 'all' || 
    uploadDate !== 'all' || 
    features.length > 0;

  return (
    <div className={cn('space-y-4', className)}>
      {/* Search and sort row */}
      <div className="flex flex-col sm:flex-row gap-3">
        <form onSubmit={handleSearch} className="flex-1 flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search videos..."
              className="pl-10 pr-4 h-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                onClick={() => {
                  setSearchQuery('');
                  onFilterChange?.({
                    searchQuery: '',
                    sortBy,
                    category,
                    duration,
                    uploadDate,
                    features,
                  });
                }}
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <Button type="submit" className="shrink-0">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </form>
        
        <div className="flex items-center gap-2">
          <Select
            value={sortBy}
            onValueChange={(value: SortOption) => {
              setSortBy(value);
              onFilterChange?.({
                searchQuery,
                sortBy: value,
                category,
                duration,
                uploadDate,
                features,
              });
            }}
          >
            <SelectTrigger className="w-[180px] h-10">
              <div className="flex items-center gap-2">
                <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
                <SelectValue placeholder="Sort by" />
              </div>
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  <div className="flex items-center gap-2">
                    {option.icon}
                    <span>{option.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {showAdvancedFilters && (
            <Popover onOpenChange={setIsAdvancedOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="h-10">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                  {hasActiveFilters && (
                    <span className="ml-2 h-5 w-5 flex items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">
                      {[
                        searchQuery ? 1 : 0,
                        category !== 'all' ? 1 : 0,
                        duration !== 'all' ? 1 : 0,
                        uploadDate !== 'all' ? 1 : 0,
                        features.length,
                      ].reduce((a, b) => a + b, 0)}
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0" align="end">
                <div className="p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Filters</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 px-2 text-muted-foreground"
                      onClick={clearFilters}
                      disabled={!hasActiveFilters}
                    >
                      Clear all
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Category</label>
                      <Select
                        value={category}
                        onValueChange={(value) => setCategory(value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat.value} value={cat.value}>
                              {cat.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Duration</label>
                      <Select
                        value={duration}
                        onValueChange={(value: DurationFilter) => setDuration(value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          {durationOptions.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>
                              {opt.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Upload date</label>
                      <Select
                        value={uploadDate}
                        onValueChange={(value: UploadDateFilter) => setUploadDate(value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select upload date" />
                        </SelectTrigger>
                        <SelectContent>
                          {uploadDateOptions.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>
                              {opt.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Features</label>
                      <div className="grid grid-cols-2 gap-2">
                        {featureOptions.map((feature) => (
                          <div key={feature.value} className="flex items-center space-x-2">
                            <Checkbox
                              id={`feature-${feature.value}`}
                              checked={features.includes(feature.value)}
                              onCheckedChange={() => toggleFeature(feature.value)}
                            />
                            <label
                              htmlFor={`feature-${feature.value}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {feature.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <Button className="w-full" onClick={applyFilters}>
                    Apply filters
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
      
      {/* Active filters */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2">
          {searchQuery && (
            <Badge variant="secondary" className="px-2 py-1 text-sm">
              {searchQuery}
              <button
                type="button"
                className="ml-1.5 rounded-full bg-muted-foreground/20 p-0.5 hover:bg-muted-foreground/30"
                onClick={() => {
                  setSearchQuery('');
                  onFilterChange?.({
                    searchQuery: '',
                    sortBy,
                    category,
                    duration,
                    uploadDate,
                    features,
                  });
                }}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          
          {category !== 'all' && (
            <Badge variant="secondary" className="px-2 py-1 text-sm">
              {categories.find(c => c.value === category)?.label}
              <button
                type="button"
                className="ml-1.5 rounded-full bg-muted-foreground/20 p-0.5 hover:bg-muted-foreground/30"
                onClick={() => {
                  setCategory('all');
                  onFilterChange?.({
                    searchQuery,
                    sortBy,
                    category: 'all',
                    duration,
                    uploadDate,
                    features,
                  });
                }}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          
          {duration !== 'all' && (
            <Badge variant="secondary" className="px-2 py-1 text-sm">
              {durationOptions.find(d => d.value === duration)?.label}
              <button
                type="button"
                className="ml-1.5 rounded-full bg-muted-foreground/20 p-0.5 hover:bg-muted-foreground/30"
                onClick={() => {
                  setDuration('all');
                  onFilterChange?.({
                    searchQuery,
                    sortBy,
                    category,
                    duration: 'all',
                    uploadDate,
                    features,
                  });
                }}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          
          {uploadDate !== 'all' && (
            <Badge variant="secondary" className="px-2 py-1 text-sm">
              {uploadDateOptions.find(u => u.value === uploadDate)?.label}
              <button
                type="button"
                className="ml-1.5 rounded-full bg-muted-foreground/20 p-0.5 hover:bg-muted-foreground/30"
                onClick={() => {
                  setUploadDate('all');
                  onFilterChange?.({
                    searchQuery,
                    sortBy,
                    category,
                    duration,
                    uploadDate: 'all',
                    features,
                  });
                }}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          
          {features.map((feature) => (
            <Badge key={feature} variant="secondary" className="px-2 py-1 text-sm">
              {featureOptions.find(f => f.value === feature)?.label}
              <button
                type="button"
                className="ml-1.5 rounded-full bg-muted-foreground/20 p-0.5 hover:bg-muted-foreground/30"
                onClick={() => {
                  const newFeatures = features.filter(f => f !== feature);
                  setFeatures(newFeatures);
                  onFilterChange?.({
                    searchQuery,
                    sortBy,
                    category,
                    duration,
                    uploadDate,
                    features: newFeatures,
                  });
                }}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          
          <Button
            variant="ghost"
            size="sm"
            className="h-7 text-xs text-muted-foreground"
            onClick={clearFilters}
          >
            Clear all
          </Button>
        </div>
      )}
    </div>
  );
}
