'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { VideoPlayer } from '@/components/videos/VideoPlayer';
import { VideoMetadata } from '@/components/videos/VideoMetadata';
import { CommentsSection } from '@/components/videos/CommentsSection';
import { RelatedVideos } from '@/components/videos/RelatedVideos';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Video } from '@/types/video.types';

// Mock data for the video
const mockVideo: Video = {
  id: 'video-1',
  title: 'Amazing Video Tutorial - Learn How to Build a Modern Web App',
  description: 'In this comprehensive tutorial, I\'ll show you how to build a modern web application from scratch using Next.js, TypeScript, and Tailwind CSS. We\'ll cover everything from setting up the project to deploying it to production. By the end of this video, you\'ll have a solid understanding of modern web development practices and be able to build your own applications with confidence.',
  thumbnailUrl: 'https://picsum.photos/seed/video-1/1280/720',
  videoUrl: 'https://example.com/sample-video.mp4',
  duration: 1254, // in seconds
  viewCount: 12543,
  likeCount: 1243,
  commentCount: 87,
  publishedAt: '2023-10-15T14:30:00.000Z',
  userId: 'user-1',
  category: 'education',
  tags: ['tutorial', 'web development', 'next.js', 'typescript', 'tailwind css'],
  isLive: false,
  isFeatured: true,
  isTrending: true,
  isBookmarked: false,
  isLiked: false,
  isDisliked: false,
  isSubscribed: false,
  user: {
    id: 'user-1',
    name: 'CodeMaster',
    username: 'codemaster',
    avatar: 'https://i.pravatar.cc/150?u=user-1',
    isVerified: true,
    subscriberCount: 12543,
    videoCount: 87,
    about: 'I create tutorials about web development, programming, and software engineering. Subscribe for weekly content!',
  },
  metadata: {
    width: 1920,
    height: 1080,
    size: 1024 * 1024 * 45, // 45MB
    format: 'mp4',
    duration: 1254,
    aspectRatio: '16:9',
  },
};

// Mock related videos
const mockRelatedVideos: Video[] = Array.from({ length: 6 }, (_, i) => ({
  id: `related-video-${i + 1}`,
  title: `Related Video ${i + 1} - ${['Tutorial', 'Review', 'Vlog', 'Tutorial', 'Review', 'Vlog'][i % 6]}`,
  description: 'This is a related video description that provides some context about the video content.',
  thumbnailUrl: `https://picsum.photos/seed/related-${i + 1}/640/360`,
  videoUrl: `https://example.com/related-video-${i + 1}`,
  duration: Math.floor(Math.random() * 3600) + 60, // 1-60 minutes in seconds
  viewCount: Math.floor(Math.random() * 1000000) + 1000,
  likeCount: Math.floor(Math.random() * 10000) + 100,
  commentCount: Math.floor(Math.random() * 500) + 10,
  publishedAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
  userId: `user-${Math.floor(i / 3) + 2}`,
  category: ['education', 'entertainment', 'gaming', 'music', 'news', 'sports', 'technology', 'cooking', 'travel', 'lifestyle'][i % 10],
  tags: ['tutorial', 'howto', 'education', 'learning', 'tips'].slice(0, Math.floor(Math.random() * 3) + 1),
  isLive: i % 5 === 0,
  isFeatured: i % 3 === 0,
  isTrending: i % 4 === 0,
  isBookmarked: i % 7 === 0,
  isLiked: i % 6 === 0,
  user: {
    id: `user-${Math.floor(i / 3) + 2}`,
    name: `Creator ${Math.floor(i / 3) + 2}`,
    username: `creator${Math.floor(i / 3) + 2}`,
    avatar: `https://i.pravatar.cc/150?u=user-${Math.floor(i / 3) + 2}`,
    isVerified: i % 2 === 0,
    subscriberCount: Math.floor(Math.random() * 100000) + 1000,
    videoCount: Math.floor(Math.random() * 100) + 10,
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

// Mock comments
const mockComments = [
  {
    id: 'comment-1',
    user: {
      id: 'user-2',
      name: 'Jane Smith',
      username: 'janesmith',
      avatar: 'https://i.pravatar.cc/150?u=user-2',
      isVerified: false,
    },
    content: 'This is an amazing tutorial! I learned so much. Thanks for sharing!',
    likeCount: 24,
    isLiked: false,
    timestamp: '2023-10-16T10:30:00.000Z',
    replies: [
      {
        id: 'reply-1',
        user: {
          id: 'user-1',
          name: 'CodeMaster',
          username: 'codemaster',
          avatar: 'https://i.pravatar.cc/150?u=user-1',
          isVerified: true,
        },
        content: 'Thank you! I\'m glad you found it helpful. Let me know if you have any questions!',
        likeCount: 8,
        isLiked: false,
        timestamp: '2023-10-16T11:15:00.000Z',
      },
    ],
  },
  {
    id: 'comment-2',
    user: {
      id: 'user-3',
      name: 'Alex Johnson',
      username: 'alexj',
      avatar: 'https://i.pravatar.cc/150?u=user-3',
      isVerified: true,
    },
    content: 'Great content as always! Could you do a video on state management next?',
    likeCount: 15,
    isLiked: true,
    timestamp: '2023-10-15T16:45:00.000Z',
    replies: [],
  },
];

const StyledContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(4),
  '& .video-header': {
    display: 'flex',
    alignItems: 'flex-start',
    gap: theme.spacing(3),
    '& .video-title': {
      fontWeight: 700,
      fontSize: '1.75rem',
      lineHeight: 1.3,
      color: theme.palette.text.primary,
    },
    '& .video-stats': {
      display: 'flex',
      gap: theme.spacing(2),
      alignItems: 'center',
      color: theme.palette.text.secondary,
      fontSize: '0.875rem',
      '& .stat-item': {
        display: 'flex',
        alignItems: 'center',
        gap: theme.spacing(0.5),
      },
    },
  },
  '& .video-actions': {
    display: 'flex',
    gap: theme.spacing(2),
    '& .action-button': {
      textTransform: 'none',
      borderRadius: 20,
      padding: theme.spacing(0.75, 2),
      '&:hover': {
        backgroundColor: theme.palette.action.hover,
      },
    },
    '& .like-button': {
      color: theme.palette.primary.main,
      '&:hover': {
        backgroundColor: theme.palette.primary.light,
      },
    },
    '& .dislike-button': {
      color: theme.palette.error.main,
      '&:hover': {
        backgroundColor: theme.palette.error.light,
      },
    },
  },
  '& .video-tabs': {
    '& .MuiTabs-root': {
      '& .MuiTabs-indicator': {
        height: 2,
        backgroundColor: theme.palette.primary.main,
      },
      '& .MuiTab-root': {
        textTransform: 'none',
        minWidth: 'auto',
        padding: theme.spacing(1.5, 2),
        fontSize: '1rem',
        fontWeight: 500,
        '&.Mui-selected': {
          color: theme.palette.primary.main,
        },
      },
    },
  },
  '& .video-comments': {
    '& .comment-item': {
      display: 'flex',
      gap: theme.spacing(2),
      padding: theme.spacing(2),
      borderBottom: `1px solid ${theme.palette.divider}`,
      '& .comment-content': {
        flex: 1,
        '& .comment-header': {
          display: 'flex',
          alignItems: 'center',
          gap: theme.spacing(1),
          marginBottom: theme.spacing(1),
          '& .comment-author': {
            fontWeight: 600,
          },
          '& .comment-time': {
            color: theme.palette.text.secondary,
            fontSize: '0.875rem',
          },
        },
      },
    },
  },
  '& .related-videos': {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: theme.spacing(3),
    '& .related-video-card': {
      borderRadius: theme.shape.borderRadius * 2,
      overflow: 'hidden',
      transition: theme.transitions.create(['box-shadow', 'transform']),
      '&:hover': {
        boxShadow: theme.shadows[4],
        transform: 'translateY(-2px)',
      },
      '& .video-thumbnail': {
        width: '100%',
        aspectRatio: '16/9',
        objectFit: 'cover',
      },
      '& .video-info': {
        padding: theme.spacing(2),
        '& .video-title': {
          fontWeight: 600,
          marginBottom: theme.spacing(1),
        },
        '& .video-stats': {
          display: 'flex',
          alignItems: 'center',
          gap: theme.spacing(1),
          color: theme.palette.text.secondary,
          fontSize: '0.875rem',
        },
      },
    },
  },
}));

export default function VideoPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session, status } = useSession();
  
  const [video, setVideo] = useState<Video | null>(null);
  const [relatedVideos, setRelatedVideos] = useState<Video[]>([]);
  const [comments, setComments] = useState(mockComments);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('comments');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [viewCount, setViewCount] = useState(0);
  
  // Fetch video data
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        setIsLoading(true);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // In a real app, you would fetch the video data from your API
        setVideo(mockVideo);
        setRelatedVideos(mockRelatedVideos);
        setViewCount(mockVideo.viewCount + 1); // Increment view count
        
        // Set initial interaction states
        setIsLiked(mockVideo.isLiked || false);
        setIsDisliked(mockVideo.isDisliked || false);
        setIsBookmarked(mockVideo.isBookmarked || false);
        setIsSubscribed(mockVideo.isSubscribed || false);
        
      } catch (error) {
        console.error('Error fetching video:', error);
        toast.error('Failed to load video. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    if (params.id) {
      fetchVideo();
    }
  }, [params.id]);
  
  // Handle like action
  const handleLike = () => {
    if (isLiked) {
      setIsLiked(false);
      setVideo(prev => prev ? { ...prev, likeCount: prev.likeCount - 1 } : null);
    } else {
      setIsLiked(true);
      setVideo(prev => prev ? { ...prev, likeCount: prev.likeCount + 1 } : null);
      
      if (isDisliked) {
        setIsDisliked(false);
        setVideo(prev => prev ? { ...prev, dislikeCount: (prev.dislikeCount || 0) - 1 } : null);
      }
    }
    
    // In a real app, you would update the like status on the server
    toast.success(isLiked ? 'Removed like' : 'Liked video');
  };
  
  // Handle dislike action
  const handleDislike = () => {
    if (isDisliked) {
      setIsDisliked(false);
      setVideo(prev => prev ? { ...prev, dislikeCount: (prev.dislikeCount || 0) - 1 } : null);
    } else {
      setIsDisliked(true);
      setVideo(prev => prev ? { ...prev, dislikeCount: (prev.dislikeCount || 0) + 1 } : null);
      
      if (isLiked) {
        setIsLiked(false);
        setVideo(prev => prev ? { ...prev, likeCount: prev.likeCount - 1 } : null);
      }
    }
    
    // In a real app, you would update the dislike status on the server
    toast.success(isDisliked ? 'Removed dislike' : 'Disliked video');
  };
  
  // Handle bookmark action
  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    
    // In a real app, you would update the bookmark status on the server
    toast.success(isBookmarked ? 'Removed from saved' : 'Saved to watch later');
  };
  
  // Handle subscribe action
  const handleSubscribe = () => {
    setIsSubscribed(!isSubscribed);
    
    // In a real app, you would update the subscription status on the server
    toast.success(isSubscribed ? 'Unsubscribed' : 'Subscribed');
  };
  
  // Handle share action
  const handleShare = () => {
    // In a real app, you would implement share functionality
    if (navigator.share) {
      navigator.share({
        title: video?.title || 'Video',
        text: 'Check out this amazing video!',
        url: window.location.href,
      }).catch(console.error);
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard');
    }
  };
  
  // Handle report action
  const handleReport = () => {
    // In a real app, you would implement report functionality
    toast.info('Report dialog would open here');
  };
  
  // Handle comment submission
  const handleCommentSubmit = (content: string) => {
    if (!session?.user) {
      toast.error('Please sign in to comment');
      return;
    }
    
    const newComment = {
      id: `comment-${Date.now()}`,
      user: {
        id: session.user.id,
        name: session.user.name || 'Anonymous',
        username: session.user.username || 'anonymous',
        avatar: session.user.image || 'https://i.pravatar.cc/150?u=anonymous',
        isVerified: false,
      },
      content,
      likeCount: 0,
      isLiked: false,
      timestamp: new Date().toISOString(),
      replies: [],
    };
    
    setComments([newComment, ...comments]);
    
    // In a real app, you would post the comment to the server
    toast.success('Comment posted');
  };
  
  // Handle comment like
  const handleCommentLike = (commentId: string) => {
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          isLiked: !comment.isLiked,
          likeCount: comment.isLiked ? comment.likeCount - 1 : comment.likeCount + 1,
        };
      }
      return comment;
    }));
    
    // In a real app, you would update the like status on the server
  };
  
  // Handle reply submission
  const handleReplySubmit = (commentId: string, content: string) => {
    if (!session?.user) {
      toast.error('Please sign in to reply');
      return;
    }
    
    const newReply = {
      id: `reply-${Date.now()}`,
      user: {
        id: session.user.id,
        name: session.user.name || 'Anonymous',
        username: session.user.username || 'anonymous',
        avatar: session.user.image || 'https://i.pravatar.cc/150?u=anonymous',
        isVerified: false,
      },
      content,
      likeCount: 0,
      isLiked: false,
      timestamp: new Date().toISOString(),
    };
    
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [...comment.replies, newReply],
        };
      }
      return comment;
    }));
    
    // In a real app, you would post the reply to the server
    toast.success('Reply posted');
  }

  // In a real app, you would update the like status on the server
  toast.success(isLiked ? 'Removed like' : 'Liked video');
};

// Handle dislike action
const handleDislike = () => {
  if (isDisliked) {
    setIsDisliked(false);
    setVideo(prev => prev ? { ...prev, dislikeCount: (prev.dislikeCount || 0) - 1 } : null);
  } else {
    setIsDisliked(true);
    setVideo(prev => prev ? { ...prev, dislikeCount: (prev.dislikeCount || 0) + 1 } : null);

    if (isLiked) {
      setIsLiked(false);
      setVideo(prev => prev ? { ...prev, likeCount: prev.likeCount - 1 } : null);
    }
  }

  // In a real app, you would update the dislike status on the server
  toast.success(isDisliked ? 'Removed dislike' : 'Disliked video');
};

// Handle bookmark action
const handleBookmark = () => {
  setIsBookmarked(!isBookmarked);

  // In a real app, you would update the bookmark status on the server
  toast.success(isBookmarked ? 'Removed from saved' : 'Saved to watch later');
};

// Handle subscribe action
const handleSubscribe = () => {
  setIsSubscribed(!isSubscribed);

  // In a real app, you would update the subscription status on the server
  toast.success(isSubscribed ? 'Unsubscribed' : 'Subscribed');
};

// Handle share action
const handleShare = () => {
  // In a real app, you would implement share functionality
  if (navigator.share) {
    navigator.share({
      title: video?.title || 'Video',
      text: 'Check out this amazing video!',
      url: window.location.href,
    }).catch(console.error);
  } else {
    // Fallback for browsers that don't support the Web Share API
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard');
  }
};

// Handle report action
const handleReport = () => {
  // In a real app, you would implement report functionality
  toast.info('Report dialog would open here');
};

// Handle comment submission
const handleCommentSubmit = (content: string) => {
  if (!session?.user) {
    toast.error('Please sign in to comment');
    return;
  }

  const newComment = {
    id: `comment-${Date.now()}`,
    user: {
      id: session.user.id,
      name: session.user.name || 'Anonymous',
      username: session.user.username || 'anonymous',
      avatar: session.user.image || 'https://i.pravatar.cc/150?u=anonymous',
      isVerified: false,
    },
    content,
    likeCount: 0,
    isLiked: false,
    timestamp: new Date().toISOString(),
    replies: [],
  };

  setComments([newComment, ...comments]);

  // In a real app, you would post the comment to the server
  toast.success('Comment posted');
};

// Handle comment like
const handleCommentLike = (commentId: string) => {
  setComments(comments.map(comment => {
    if (comment.id === commentId) {
      return {
        ...comment,
        isLiked: !comment.isLiked,
        likeCount: comment.isLiked ? comment.likeCount - 1 : comment.likeCount + 1,
      };
    }
    return comment;
  }));

  // In a real app, you would update the like status on the server
};

// Handle reply submission
const handleReplySubmit = (commentId: string, content: string) => {
  if (!session?.user) {
    toast.error('Please sign in to reply');
    return;
  }

  const newReply = {
    id: `reply-${Date.now()}`,
    user: {
      id: session.user.id,
      name: session.user.name || 'Anonymous',
      username: session.user.username || 'anonymous',
      avatar: session.user.image || 'https://i.pravatar.cc/150?u=anonymous',
      isVerified: false,
    },
    content,
    likeCount: 0,
    isLiked: false,
    timestamp: new Date().toISOString(),
  };

  setComments(comments.map(comment => {
    if (comment.id === commentId) {
      return {
        ...comment,
        replies: [...comment.replies, newReply],
      };
    }
    return comment;
  }));

  // In a real app, you would post the reply to the server
  toast.success('Reply posted');
};

if (isLoading) {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="related-videos">
        <div className="lg:col-span-2 space-y-6">
          <Skeleton className="aspect-video rounded-xl" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Category</h3>
                  <p className="text-sm capitalize">{video.category}</p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">License</h3>
                  <p className="text-sm">Standard YouTube License</p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Visibility</h3>
                  <p className="text-sm">Public</p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Date published</h3>
                  <p className="text-sm">
                    {new Date(video.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Sidebar */}
        <div className="space-y-4">
          <RelatedVideos 
            videos={relatedVideos}
            onVideoSelect={(videoId) => {
              // In a real app, you would navigate to the selected video
              router.push(`/videos/${videoId}`);
            }}
            currentVideoId={video.id}
          />
          
          {/* Additional related content */}
          <div className="bg-muted/50 p-4 rounded-lg">
            <h3 className="font-medium mb-3">Playlists</h3>
            <div className="space-y-3">
              {[
                { id: '1', title: 'Web Development Tutorials', videoCount: 12, thumbnail: 'https://picsum.photos/seed/playlist-1/200/112' },
                { id: '2', title: 'React Tips & Tricks', videoCount: 8, thumbnail: 'https://picsum.photos/seed/playlist-2/200/112' },
                { id: '3', title: 'TypeScript Fundamentals', videoCount: 5, thumbnail: 'https://picsum.photos/seed/playlist-3/200/112' },
              ].map(playlist => (
                <div key={playlist.id} className="flex gap-3 p-2 hover:bg-muted rounded-md cursor-pointer transition-colors">
                  <div className="relative w-24 h-16 flex-shrink-0 rounded overflow-hidden">
                    <img 
                      src={playlist.thumbnail} 
                      alt={playlist.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <span className="text-white text-xs font-medium">{playlist.videoCount} videos</span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm line-clamp-2">{playlist.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{playlist.videoCount} videos</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
