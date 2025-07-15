'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { 
  Heart, 
  MessageSquare, 
  Share2, 
  Bookmark, 
  MoreHorizontal, 
  ArrowLeft, 
  Download, 
  Flag, 
  UserPlus,
  Loader2,
  MessageCircle,
  ThumbsUp
} from 'lucide-react';
import { Photo, PhotoComment } from '@/types/photo.types';

// Mock data for the photo
const mockPhoto: Photo = {
  id: 'photo-1',
  title: 'Beautiful Sunset at the Beach',
  description: 'A stunning sunset captured at Malibu Beach during golden hour. The colors were absolutely breathtaking in person!',
  imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  width: 1200,
  height: 800,
  aspectRatio: '3:2',
  size: 2.5 * 1024 * 1024, // 2.5MB
  format: 'jpeg',
  uploadDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
  viewCount: 1245,
  likeCount: 342,
  commentCount: 28,
  isLiked: false,
  isBookmarked: false,
  tags: ['sunset', 'beach', 'ocean', 'nature', 'landscape'],
  albumId: 'album-1',
  albumName: 'Summer Vacation 2023',
  location: 'Malibu, California',
  camera: {
    make: 'Sony',
    model: 'A7R IV',
    lens: '24-70mm f/2.8 GM',
    focalLength: '35mm',
    aperture: 'f/8',
    iso: 100,
    shutterSpeed: '1/250s'
  },
  user: {
    id: 'user-1',
    name: 'Alex Johnson',
    username: 'alexjohnson',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    isVerified: true
  },
  metadata: {
    width: 1200,
    height: 800,
    size: 2.5 * 1024 * 1000,
    format: 'jpeg',
    aspectRatio: '3:2',
  },
};

// Mock comments
const mockComments: PhotoComment[] = [
  {
    id: 'comment-1',
    user: {
      id: 'user-2',
      name: 'Sarah Williams',
      username: 'sarahw',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      isVerified: true
    },
    content: 'Stunning capture! The colors are absolutely breathtaking. Where was this taken?',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    likeCount: 12,
    isLiked: false,
    replies: [
      {
        id: 'reply-1',
        user: {
          id: 'user-1',
          name: 'Alex Johnson',
          username: 'alexjohnson',
          avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
          isVerified: true
        },
        content: 'Thanks Sarah! This was taken at Malibu Beach last weekend. The sunset was magical!',
        timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(), // 1 hour ago
        likeCount: 3,
        isLiked: false,
      },
      {
        id: 'reply-2',
        user: {
          id: 'user-3',
          name: 'Mike Chen',
          username: 'mikechen',
          avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
          isVerified: false
        },
        content: 'I was there too! The colors were even more vibrant in person.',
        timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(), // 45 minutes ago
        likeCount: 1,
        isLiked: true,
      }
    ]
  },
  {
    id: 'comment-2',
    user: {
      id: 'user-4',
      name: 'Emma Davis',
      username: 'emmad',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
      isVerified: false
    },
    content: 'Love the composition! What camera settings did you use?',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
    likeCount: 5,
    isLiked: false,
  },
  {
    id: 'comment-3',
    user: {
      id: 'user-5',
      name: 'David Kim',
      username: 'davidk',
      avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
      isVerified: true
    },
    content: 'This makes me want to book a trip to the beach immediately! 😍',
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8 hours ago
    likeCount: 8,
    isLiked: false,
  }
];

export default function PhotoDetailPage() {
  const params = useParams();
  const router = useRouter();
  
  const [photo, setPhoto] = useState<Photo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('details');
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<PhotoComment[]>([]);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  
  // Fetch photo details
  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        setPhoto(mockPhoto);
        setComments(mockComments);
        setIsLiked(mockPhoto.isLiked || false);
        setIsBookmarked(mockPhoto.isBookmarked || false);
        setLikeCount(mockPhoto.likeCount);
      } catch (error) {
        console.error('Error fetching photo:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPhoto();
  }, [params.id]);
  
  // Handle like action
  const handleLike = () => {
    const newLikeStatus = !isLiked;
    setIsLiked(newLikeStatus);
    setLikeCount(prev => newLikeStatus ? prev + 1 : prev - 1);
    
    // In a real app, you would make an API call here
  };
  
  // Handle bookmark action
  const handleBookmark = () => {
    const newBookmarkStatus = !isBookmarked;
    setIsBookmarked(newBookmarkStatus);
    
    // In a real app, you would make an API call here
  };
  
  // Handle comment submission
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    
    const newComment: PhotoComment = {
      id: `comment-${Date.now()}`,
      user: {
        id: 'current-user',
        name: 'You',
        username: 'currentuser',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      },
      content: commentText,
      timestamp: new Date().toISOString(),
      likeCount: 0,
      isLiked: false,
    };
    
    setComments([newComment, ...comments]);
    setCommentText('');
    
    // In a real app, you would make an API call here
  };
  
  // Handle comment like
  const handleCommentLike = (commentId: string, isReply = false) => {
    setComments(prevComments => {
      if (isReply) {
        return prevComments.map(comment => ({
          ...comment,
          replies: comment.replies?.map(reply => 
            reply.id === commentId 
              ? { ...reply, isLiked: !reply.isLiked, likeCount: reply.isLiked ? reply.likeCount - 1 : reply.likeCount + 1 }
              : reply
          )
        }));
      }
      
      return prevComments.map(comment => 
        comment.id === commentId 
          ? { ...comment, isLiked: !comment.isLiked, likeCount: comment.isLiked ? comment.likeCount - 1 : comment.likeCount + 1 }
          : comment
      );
    });
  };
  
  // Format date to relative time (e.g., "2 hours ago")
  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    const minute = 60;
    const hour = minute * 60;
    const day = hour * 24;
    const month = day * 30;
    const year = day * 365;
    
    if (diffInSeconds < minute) return 'Just now';
    if (diffInSeconds < hour) return `${Math.floor(diffInSeconds / minute)}m ago`;
    if (diffInSeconds < day) return `${Math.floor(diffInSeconds / hour)}h ago`;
    if (diffInSeconds < month) return `${Math.floor(diffInSeconds / day)}d ago`;
    if (diffInSeconds < year) return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };
  
  if (isLoading || !photo) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back button */}
      <Button 
        variant="ghost" 
        className="mb-6"
        onClick={() => router.back()}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to photos
      </Button>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column - Photo */}
        <div className="lg:col-span-2">
          <div className="bg-background rounded-lg overflow-hidden shadow-lg">
            <div className="relative w-full aspect-[3/2] bg-muted">
              <Image
                src={photo.imageUrl}
                alt={photo.title}
                fill
                className="object-contain"
                priority
              />
            </div>
            
            {/* Photo actions */}
            <div className="p-4 border-t">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button 
                    className={`flex items-center space-x-1 ${isLiked ? 'text-red-500' : 'text-muted-foreground hover:text-foreground'}`}
                    onClick={handleLike}
                  >
                    <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
                    <span>{likeCount}</span>
                  </button>
                  
                  <button className="flex items-center space-x-1 text-muted-foreground hover:text-foreground">
                    <MessageCircle className="h-5 w-5" />
                    <span>{photo.commentCount}</span>
                  </button>
                  
                  <button className="text-muted-foreground hover:text-foreground">
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button 
                    className={`text-muted-foreground hover:text-foreground ${isBookmarked ? 'text-amber-500' : ''}`}
                    onClick={handleBookmark}
                  >
                    <Bookmark className={`h-5 w-5 ${isBookmarked ? 'fill-current' : ''}`} />
                  </button>
                  
                  <button className="text-muted-foreground hover:text-foreground">
                    <MoreHorizontal className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Photo info */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-xl">{photo.title}</CardTitle>
              <CardDescription>
                Uploaded by{' '}
                <Link href={`/users/${photo.user.username}`} className="text-primary hover:underline">
                  {photo.user.name}
                </Link>
                {' '}• {formatRelativeTime(photo.uploadDate)}
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              {photo.description && (
                <p className="text-muted-foreground mb-6">{photo.description}</p>
              )}
              
              <div className="flex flex-wrap gap-2 mb-6">
                {photo.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="text-sm">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="comments">Comments ({photo.commentCount})</TabsTrigger>
                  <TabsTrigger value="related">Related</TabsTrigger>
                </TabsList>
                
                <div className="mt-6">
                  <TabsContent value="details">
                    <div className="space-y-4">
                      {photo.location && (
                        <div>
                          <h4 className="font-medium mb-1">Location</h4>
                          <p className="text-muted-foreground">{photo.location}</p>
                        </div>
                      )}
                      
                      {photo.camera && (
                        <div>
                          <h4 className="font-medium mb-1">Camera Details</h4>
                          <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                            <div>
                              <p>Camera</p>
                              <p className="font-medium text-foreground">{photo.camera.make} {photo.camera.model}</p>
                            </div>
                            <div>
                              <p>Lens</p>
                              <p className="font-medium text-foreground">{photo.camera.lens}</p>
                            </div>
                            <div>
                              <p>Aperture</p>
                              <p className="font-medium text-foreground">{photo.camera.aperture}</p>
                            </div>
                            <div>
                              <p>Focal Length</p>
                              <p className="font-medium text-foreground">{photo.camera.focalLength}</p>
                            </div>
                            <div>
                              <p>ISO</p>
                              <p className="font-medium text-foreground">{photo.camera.iso}</p>
                            </div>
                            <div>
                              <p>Shutter Speed</p>
                              <p className="font-medium text-foreground">{photo.camera.shutterSpeed}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="comments">
                    <div className="space-y-6">
                      {/* Comment form */}
                      <form onSubmit={handleCommentSubmit} className="space-y-2">
                        <Textarea 
                          placeholder="Add a comment..." 
                          className="min-h-[100px]"
                          value={commentText}
                          onChange={(e) => setCommentText(e.target.value)}
                        />
                        <div className="flex justify-end">
                          <Button type="submit" disabled={!commentText.trim()}>
                            Post Comment
                          </Button>
                        </div>
                      </form>
                      
                      {/* Comments list */}
                      <div className="space-y-6">
                        {comments.map(comment => (
                          <div key={comment.id} className="space-y-4">
                            {/* Main comment */}
                            <div className="flex items-start space-x-3">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
                                <AvatarFallback>
                                  {comment.user.name
                                    .split(' ')
                                    .map(n => n[0])
                                    .join('')}
                                </AvatarFallback>
                              </Avatar>
                              
                              <div className="flex-1">
                                <div className="bg-muted/50 rounded-lg p-3">
                                  <div className="flex items-center justify-between">
                                    <Link 
                                      href={`/users/${comment.user.username}`} 
                                      className="font-medium hover:underline flex items-center"
                                    >
                                      {comment.user.name}
                                      {comment.user.isVerified && (
                                        <svg className="h-3.5 w-3.5 ml-1 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                                          <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.929.064-1.37.193a6.5 6.5 0 0 1-3.901 2.527 5.98 5.98 0 0 1 1.315 3.74 5.96 5.96 0 0 1-.89 3.15 6.5 6.5 0 0 1-3.66 2.905c-.463.13-.938.205-1.42.205a6.5 6.5 0 0 1-5.201-2.6 5.96 5.96 0 0 1-.89-3.15 6.5 6.5 0 0 1 3.9-5.98 5.98 5.98 0 0 1 1.315-3.74A6.5 6.5 0 0 1 12.5.5c1.58 0 2.95.875 3.6 2.148.435-.154.905-.238 1.4-.238 2.21 0 3.998 1.71 3.998 3.818 0 .47-.064.929-.193 1.37A6.5 6.5 0 0 1 22.5 12.5z" />
                                        </svg>
                                      )}
                                    </Link>
                                    <span className="text-xs text-muted-foreground">
                                      {formatRelativeTime(comment.timestamp)}
                                    </span>
                                  </div>
                                  <p className="mt-1 text-sm">{comment.content}</p>
                                </div>
                                
                                <div className="mt-1 flex items-center space-x-4 text-xs text-muted-foreground pl-1">
                                  <button 
                                    className={`flex items-center space-x-1 ${comment.isLiked ? 'text-blue-500' : 'hover:text-foreground'}`}
                                    onClick={() => handleCommentLike(comment.id, false)}
                                  >
                                    <ThumbsUp className="h-3.5 w-3.5" />
                                    <span>{comment.likeCount > 0 ? comment.likeCount : 'Like'}</span>
                                  </button>
                                  <button className="hover:text-foreground">
                                    Reply
                                  </button>
                                </div>
                              </div>
                            </div>
                            
                            {/* Replies */}
                            {comment.replies && comment.replies.length > 0 && (
                              <div className="pl-14 space-y-4">
                                {comment.replies.map(reply => (
                                  <div key={reply.id} className="flex items-start space-x-3">
                                    <Avatar className="h-8 w-8">
                                      <AvatarImage src={reply.user.avatar} alt={reply.user.name} />
                                      <AvatarFallback>
                                        {reply.user.name
                                          .split(' ')
                                          .map(n => n[0])
                                          .join('')}
                                      </AvatarFallback>
                                    </Avatar>
                                    
                                    <div className="flex-1">
                                      <div className="bg-muted/30 rounded-lg p-3">
                                        <div className="flex items-center justify-between">
                                          <Link 
                                            href={`/users/${reply.user.username}`} 
                                            className="font-medium text-sm hover:underline flex items-center"
                                          >
                                            {reply.user.name}
                                            {reply.user.isVerified && (
                                              <svg className="h-3 w-3 ml-1 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.929.064-1.37.193a6.5 6.5 0 0 1-3.901 2.527 5.98 5.98 0 0 1 1.315 3.74 5.96 5.96 0 0 1-.89 3.15 6.5 6.5 0 0 1-3.66 2.905c-.463.13-.938.205-1.42.205a6.5 6.5 0 0 1-5.201-2.6 5.96 5.96 0 0 1-.89-3.15 6.5 6.5 0 0 1 3.9-5.98 5.98 5.98 0 0 1 1.315-3.74A6.5 6.5 0 0 1 12.5.5c1.58 0 2.95.875 3.6 2.148.435-.154.905-.238 1.4-.238 2.21 0 3.998 1.71 3.998 3.818 0 .47-.064.929-.193 1.37A6.5 6.5 0 0 1 22.5 12.5z" />
                                              </svg>
                                            )}
                                          </Link>
                                          <span className="text-xs text-muted-foreground">
                                            {formatRelativeTime(reply.timestamp)}
                                          </span>
                                        </div>
                                        <p className="mt-1 text-sm">{reply.content}</p>
                                      </div>
                                      
                                      <div className="mt-1 flex items-center space-x-4 text-xs text-muted-foreground pl-1">
                                        <button 
                                          className={`flex items-center space-x-1 ${reply.isLiked ? 'text-blue-500' : 'hover:text-foreground'}`}
                                          onClick={() => handleCommentLike(reply.id, true)}
                                        >
                                          <ThumbsUp className="h-3.5 w-3.5" />
                                          <span>{reply.likeCount > 0 ? reply.likeCount : 'Like'}</span>
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                        
                        {comments.length === 0 && (
                          <div className="text-center py-8 text-muted-foreground">
                            No comments yet. Be the first to comment!
                          </div>
                        )}
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="related">
                    <div className="text-center py-8 text-muted-foreground">
                      Related photos will appear here
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        
        {/* Right column - User info and actions */}
        <div className="space-y-6">
          {/* User card */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={photo.user.avatar} alt={photo.user.name} />
                  <AvatarFallback>
                    {photo.user.name
                      .split(' ')
                      .map(n => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div>
                  <div className="flex items-center">
                    <h3 className="font-medium">
                      <Link href={`/users/${photo.user.username}`} className="hover:underline">
                        {photo.user.name}
                      </Link>
                    </h3>
                    {photo.user.isVerified && (
                      <svg className="h-3.5 w-3.5 ml-1 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.929.064-1.37.193a6.5 6.5 0 0 1-3.901 2.527 5.98 5.98 0 0 1 1.315 3.74 5.96 5.96 0 0 1-.89 3.15 6.5 6.5 0 0 1-3.66 2.905c-.463.13-.938.205-1.42.205a6.5 6.5 0 0 1-5.201-2.6 5.96 5.96 0 0 1-.89-3.15 6.5 6.5 0 0 1 3.9-5.98 5.98 5.98 0 0 1 1.315-3.74A6.5 6.5 0 0 1 12.5.5c1.58 0 2.95.875 3.6 2.148.435-.154.905-.238 1.4-.238 2.21 0 3.998 1.71 3.998 3.818 0 .47-.064.929-.193 1.37A6.5 6.5 0 0 1 22.5 12.5z" />
                      </svg>
                    )}
                  </div>
                  
                  <p className="text-sm text-muted-foreground">@{photo.user.username}</p>
                  
                  <div className="mt-3 flex space-x-2">
                    <Button size="sm" className="flex-1">
                      <UserPlus className="mr-2 h-3.5 w-3.5" />
                      Follow
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageSquare className="mr-2 h-3.5 w-3.5" />
                      Message
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Photo details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Photo Details</CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Uploaded</h4>
                <p className="text-sm">
                  {new Date(photo.uploadDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Dimensions</h4>
                <p className="text-sm">{photo.width} × {photo.height} px</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Size</h4>
                <p className="text-sm">
                  {(photo.size / (1024 * 1024)).toFixed(1)} MB
                </p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Format</h4>
                <p className="text-sm uppercase">{photo.format}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Aspect Ratio</h4>
                <p className="text-sm">{photo.aspectRatio}</p>
              </div>
              
              {photo.albumId && (
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Album</h4>
                  <Link 
                    href={`/albums/${photo.albumId}`}
                    className="text-sm text-primary hover:underline"
                  >
                    {photo.albumName || 'View Album'}
                  </Link>
                </div>
              )}
              
              <div className="pt-2">
                <Button variant="outline" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Report/Flag */}
          <div className="text-center">
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <Flag className="mr-2 h-4 w-4" />
              Report this photo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
