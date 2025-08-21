'use client';

import { useState, useRef, useCallback, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@mui/material';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import {
  Upload,
  X,
  Check,
  AlertCircle,
  Image as ImageIcon,
  Globe,
  Lock,
  Users,
  Clock,
  FileVideo,
  Plus,
  Loader2,
  XCircle,
  CheckCircle2,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';

type PrivacyOption = 'public' | 'private' | 'unlisted';
type VisibilityOption = 'public' | 'private' | 'unlisted';

interface VideoUploadModalProps {
  children: React.ReactNode;
  className?: string;
  onUploadComplete?: (videoId: string) => void;
}



export function VideoUploadModal({
  children,
  className,
  onUploadComplete,
}: VideoUploadModalProps) {
  const router = useRouter();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  
  // Form state
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('upload');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadedVideo, setUploadedVideo] = useState<{
    id: string;
    url: string;
    thumbnailUrl: string;
    duration: number;
    width: number;
    height: number;
  } | null>(null);
  
  // Form fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [category, setCategory] = useState('');
  const [visibility, setVisibility] = useState<VisibilityOption>('public');
  const [isCommentsEnabled, setIsCommentsEnabled] = useState(true);
  const [isRatingsEnabled, setIsRatingsEnabled] = useState(true);
  const [isEmbeddingAllowed, setIsEmbeddingAllowed] = useState(true);
  const [isMonetizationEnabled, setIsMonetizationEnabled] = useState(false);
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduledDate, setScheduledDate] = useState('');
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  
  const categories = [
    { value: 'education', label: 'Education' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'gaming', label: 'Gaming' },
    { value: 'music', label: 'Music' },
    { value: 'news', label: 'News' },
    { value: 'sports', label: 'Sports' },
    { value: 'technology', label: 'Technology' },
    { value: 'cooking', label: 'Cooking' },
    { value: 'travel', label: 'Travel' },
    { value: 'lifestyle', label: 'Lifestyle' },
  ];

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would validate the file type and size here
      startUpload(file);
    }
  };

  const handleThumbnailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: 'Invalid file type',
          description: 'Please upload an image file (JPEG, PNG, etc.)',
          variant: 'destructive',
        });
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: 'File too large',
          description: 'Thumbnail must be less than 5MB',
          variant: 'destructive',
        });
        return;
      }
      
      setThumbnail(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setThumbnailPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const startUpload = async (file: File) => {
    setIsUploading(true);
    setUploadProgress(0);
    setUploadError(null);
    
    try {
      // In a real app, you would upload the file to your server here
      // This is a mock implementation that simulates a file upload
      
      // Simulate upload progress
      const uploadInterval = setInterval(() => {
        setUploadProgress((prev) => {
          const newProgress = prev + Math.random() * 20;
          if (newProgress >= 95) {
            clearInterval(uploadInterval);
            return 95; // Don't go to 100% until the server responds
          }
          return newProgress;
        });
      }, 300);
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 3000));
      
      // Clear the progress interval
      clearInterval(uploadInterval);
      
      // Set upload complete
      setUploadProgress(100);
      
      // Mock response with video details
      const mockVideo = {
        id: `video_${Date.now()}`,
        url: URL.createObjectURL(file),
        thumbnailUrl: thumbnailPreview || '/placeholder-video-thumbnail.jpg',
        duration: 0, // Would be set from the actual video metadata
        width: 1920,
        height: 1080,
      };
      
      setUploadedVideo(mockVideo);
      setTitle(file.name.replace(/\.[^/.]+$/, '')); // Remove file extension for title
      setActiveTab('details');
      
      toast({
        title: 'Upload complete!',
        description: 'Your video has been uploaded. Add details before publishing.',
      });
      
    } catch (error) {
      console.error('Upload failed:', error);
      setUploadError('Failed to upload video. Please try again.');
      toast({
        title: 'Upload failed',
        description: 'There was an error uploading your video. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const newTag = tagInput.trim();
      if (newTag && !tags.includes(newTag) && tags.length < 10) {
        setTags([...tags, newTag]);
        setTagInput('');
      }
    } else if (e.key === 'Backspace' && !tagInput && tags.length > 0) {
      // Remove last tag on backspace when input is empty
      const newTags = [...tags];
      newTags.pop();
      setTags(newTags);
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast({
        title: 'Title is required',
        description: 'Please enter a title for your video',
        variant: 'destructive',
      });
      return;
    }
    
    if (!uploadedVideo) {
      toast({
        title: 'No video uploaded',
        description: 'Please upload a video first',
        variant: 'destructive',
      });
      return;
    }
    
    setIsUploading(true);
    
    try {
      // In a real app, you would submit the form data to your API here
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const videoData = {
        id: uploadedVideo.id,
        title,
        description,
        tags,
        category,
        visibility,
        isCommentsEnabled,
        isRatingsEnabled,
        isEmbeddingAllowed,
        isMonetizationEnabled,
        thumbnail: thumbnail || null,
        scheduledDate: isScheduled && scheduledDate ? new Date(scheduledDate) : null,
      };
      
      console.log('Submitting video:', videoData);
      
      // Call the onUploadComplete callback if provided
      onUploadComplete?.(uploadedVideo.id);
      
      // Show success message
      toast({
        title: 'Video published!',
        description: 'Your video is now live.',
      });
      
      // Close the modal and reset the form
      handleClose();
      
      // Redirect to the video page
      router.push(`/videos/${uploadedVideo.id}`);
      
    } catch (error) {
      console.error('Failed to publish video:', error);
      toast({
        title: 'Failed to publish',
        description: 'There was an error publishing your video. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    
    // Reset form state after a short delay to allow the modal to close smoothly
    setTimeout(() => {
      setActiveTab('upload');
      setUploadProgress(0);
      setUploadError(null);
      setUploadedVideo(null);
      setTitle('');
      setDescription('');
      setTags([]);
      setTagInput('');
      setCategory('');
      setVisibility('public');
      setIsCommentsEnabled(true);
      setIsRatingsEnabled(true);
      setIsEmbeddingAllowed(true);
      setIsMonetizationEnabled(false);
      setIsScheduled(false);
      setScheduledDate('');
      setThumbnail(null);
      setThumbnailPreview(null);
      
      // Reset file inputs
      if (fileInputRef.current) fileInputRef.current.value = '';
      if (thumbnailInputRef.current) thumbnailInputRef.current.value = '';
    }, 300);
  };

  const renderPrivacyIcon = (value: VisibilityOption) => {
    switch (value) {
      case 'public':
        return <Globe className="h-4 w-4" />;
      case 'private':
        return <Lock className="h-4 w-4" />;
      case 'unlisted':
        return <Users className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button className={className}>
            <Plus className="h-4 w-4 mr-2" />
            Upload
          </Button>
        )}
      </DialogTrigger>
      
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Upload video</DialogTitle>
          <DialogDescription>
            {activeTab === 'upload' 
              ? 'Upload a video to share with the community.' 
              : 'Add details to your video before publishing.'}
          </DialogDescription>
        </DialogHeader>
        
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="upload" disabled={isUploading}>
              Upload
            </TabsTrigger>
            <TabsTrigger 
              value="details" 
              disabled={!uploadedVideo || isUploading}
            >
              Details
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload" className="mt-0">
            <Card className="border-dashed border-2">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center justify-center space-y-4 p-8 text-center">
                  {isUploading ? (
                    <div className="w-full space-y-4">
                      <div className="flex items-center justify-center">
                        <div className="relative">
                          {uploadProgress < 100 ? (
                            <div className="h-16 w-16 rounded-full border-4 border-primary/20 border-t-primary flex items-center justify-center">
                              <span className="text-lg font-medium">{Math.round(uploadProgress)}%</span>
                            </div>
                          ) : (
                            <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                              <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <p className="font-medium">
                          {uploadProgress < 100 ? 'Uploading...' : 'Upload complete!'}
                        </p>
                        <Progress value={uploadProgress} className="h-2" />
                        <p className="text-sm text-muted-foreground">
                          {uploadProgress < 100 
                            ? 'Please wait while we upload your video...' 
                            : 'Processing your video...'}
                        </p>
                      </div>
                      
                      {uploadError && (
                        <div className="bg-destructive/10 text-destructive p-3 rounded-md text-sm flex items-center gap-2">
                          <AlertCircle className="h-4 w-4" />
                          <span>{uploadError}</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <>
                      <div className="rounded-full bg-primary/10 p-3">
                        <Upload className="h-8 w-8 text-primary" />
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="text-lg font-medium">Drag and drop video files</h3>
                        <p className="text-sm text-muted-foreground">
                          Your videos will be private until you publish them
                        </p>
                      </div>
                      
                      <Button 
                        type="button" 
                        variant="outline"
                        className="mt-2"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploading}
                      >
                        Select files
                      </Button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="video/*"
                        className="hidden"
                        onChange={handleFileChange}
                        disabled={isUploading}
                      />
                      
                      <p className="text-xs text-muted-foreground">
                        MP4, WebM, or MOV. Up to 10 minutes. Less than 2GB.
                      </p>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="details" className="mt-0">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title (required)</Label>
                    <Input
                      id="title"
                      placeholder="Add a title that describes your video"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      maxLength={100}
                      required
                    />
                    <p className="text-xs text-muted-foreground text-right">
                      {title.length}/100
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Tell viewers about your video"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={5}
                      maxLength={5000}
                      className="resize-none"
                    />
                    <p className="text-xs text-muted-foreground text-right">
                      {description.length}/5000
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Thumbnail</Label>
                    <div className="flex items-center gap-4">
                      <div className="relative group">
                        <div className="w-40 h-24 rounded-md bg-muted overflow-hidden">
                          {thumbnailPreview ? (
                            <img 
                              src={thumbnailPreview} 
                              alt="Thumbnail preview" 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <ImageIcon className="h-8 w-8 text-muted-foreground" />
                            </div>
                          )}
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 bg-black/50 text-white border-0 rounded-none"
                          onClick={() => thumbnailInputRef.current?.click()}
                        >
                          Change
                        </Button>
                        <input
                          ref={thumbnailInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleThumbnailChange}
                        />
                      </div>
                      <div className="flex-1">
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="sm"
                          onClick={() => thumbnailInputRef.current?.click()}
                        >
                          <ImageIcon className="h-4 w-4 mr-2" />
                          {thumbnail ? 'Change thumbnail' : 'Upload thumbnail'}
                        </Button>
                        <p className="text-xs text-muted-foreground mt-2">
                          Recommended size: 1280x720 pixels
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Visibility</Label>
                    <Select 
                      value={visibility} 
                      onValueChange={(value: VisibilityOption) => setVisibility(value)}
                    >
                      <SelectTrigger>
                        <div className="flex items-center gap-2">
                          {renderPrivacyIcon(visibility as VisibilityOption)}
                          <span>
                            {visibility === 'public' && 'Public'}
                            {visibility === 'private' && 'Private'}
                            {visibility === 'unlisted' && 'Unlisted'}
                          </span>
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">
                          <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4" />
                            <div>
                              <p className="font-medium">Public</p>
                              <p className="text-xs text-muted-foreground">Anyone can view this video</p>
                            </div>
                          </div>
                        </SelectItem>
                        <SelectItem value="private">
                          <div className="flex items-center gap-2">
                            <Lock className="h-4 w-4" />
                            <div>
                              <p className="font-medium">Private</p>
                              <p className="text-xs text-muted-foreground">Only you can view this video</p>
                            </div>
                          </div>
                        </SelectItem>
                        <SelectItem value="unlisted">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            <div>
                              <p className="font-medium">Unlisted</p>
                              <p className="text-xs text-muted-foreground">Anyone with the link can view this video</p>
                            </div>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <div className="flex items-center justify-between pt-2">
                      <div className="space-y-1">
                        <Label className="text-sm font-medium">Schedule</Label>
                        <p className="text-xs text-muted-foreground">
                          Set a future date to publish
                        </p>
                      </div>
                      <Switch 
                        checked={isScheduled}
                        onCheckedChange={setIsScheduled}
                      />
                    </div>
                    
                    {isScheduled && (
                      <div className="pt-2">
                        <Input
                          type="datetime-local"
                          value={scheduledDate}
                          onChange={(e) => setScheduledDate(e.target.value)}
                          min={new Date().toISOString().slice(0, 16)}
                        />
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="space-y-6">
                  <Card>
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-sm font-medium">Video</CardTitle>
                      <CardDescription className="text-xs">
                        {uploadedVideo?.url ? 'Ready to publish' : 'No video uploaded'}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      {uploadedVideo && (
                        <div className="relative aspect-video bg-black rounded-md overflow-hidden">
                          <img 
                            src={uploadedVideo.thumbnailUrl} 
                            alt="Video thumbnail" 
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
                            {Math.floor(uploadedVideo.duration / 60)}:{
                              (uploadedVideo.duration % 60).toString().padStart(2, '0')
                            }
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-sm font-medium">Details</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select 
                          value={category} 
                          onValueChange={setCategory}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
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
                        <Label>Tags</Label>
                        <div 
                          className="flex flex-wrap gap-2 p-2 border rounded-md min-h-[40px]"
                          onClick={() => document.getElementById('tag-input')?.focus()}
                        >
                          {tags.map((tag) => (
                            <Badge 
                              key={tag} 
                              variant="secondary"
                              className="flex items-center gap-1"
                            >
                              {tag}
                              <button 
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeTag(tag);
                                }}
                                className="text-muted-foreground hover:text-foreground"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </Badge>
                          ))}
                          <input
                            id="tag-input"
                            type="text"
                            placeholder={tags.length === 0 ? 'Add tags...' : ''}
                            className="flex-1 min-w-[100px] bg-transparent outline-none text-sm"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyDown={handleTagKeyDown}
                            maxLength={30}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Add up to 10 tags. Press Enter or comma to add a tag.
                        </p>
                      </div>
                      
                      <Separator className="my-2" />
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label className="text-sm font-medium">Comments</Label>
                            <p className="text-xs text-muted-foreground">
                              Allow comments on your video
                            </p>
                          </div>
                          <Switch 
                            checked={isCommentsEnabled}
                            onCheckedChange={setIsCommentsEnabled}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label className="text-sm font-medium">Ratings</Label>
                            <p className="text-xs text-muted-foreground">
                              Allow viewers to like/dislike
                            </p>
                          </div>
                          <Switch 
                            checked={isRatingsEnabled}
                            onCheckedChange={setIsRatingsEnabled}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label className="text-sm font-medium">Embedding</Label>
                            <p className="text-xs text-muted-foreground">
                              Allow embedding on other sites
                            </p>
                          </div>
                          <Switch 
                            checked={isEmbeddingAllowed}
                            onCheckedChange={setIsEmbeddingAllowed}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label className="text-sm font-medium">Monetization</Label>
                            <p className="text-xs text-muted-foreground">
                              Enable ads on this video
                            </p>
                          </div>
                          <Switch 
                            checked={isMonetizationEnabled}
                            onCheckedChange={setIsMonetizationEnabled}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              <DialogFooter className="border-t pt-4">
                <div className="flex justify-between w-full">
                  <Button 
                    type="button" 
                    variant="ghost" 
                    onClick={handleClose}
                  >
                    Cancel
                  </Button>
                  
                  <div className="flex items-center gap-2">
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => setActiveTab('upload')}
                    >
                      Back
                    </Button>
                    
                    <Button 
                      type="submit" 
                      disabled={isUploading || !title.trim()}
                    >
                      {isUploading ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Publishing...
                        </>
                      ) : (
                        'Publish'
                      )}
                    </Button>
                  </div>
                </div>
              </DialogFooter>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
