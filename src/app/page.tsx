"use client";

import React, { useState } from 'react';
import { useAuth } from "@/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { CircularProgress } from '@mui/material';
import { 
  Box, 
  Container, 
  Grid, 
  Hidden, 
  Button, 
  TextField, 
  Avatar, 
  IconButton,
  Typography,
  Divider,
  Paper,
  Tabs,
  Tab,

  Stack,
  Skeleton,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { 
  PhotoCamera as PhotoCameraIcon, 
  EmojiEmotions as EmojiIcon,
  Send as SendIcon,
  Add as AddIcon,
  TrendingUp as TrendingUpIcon,
  Notifications as NotificationsIcon,
  Bookmark as BookmarkIcon,
  Chat as ChatIcon,
  Group as GroupIcon,
  VideoCameraFront as VideoCameraFrontIcon,
  Image as ImageIcon,
  Videocam as VideocamIcon,
  EventAvailable as EventAvailableIcon,
  Mood as MoodIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Components
import Post from "@/components/posts/Post";
import PostComposer from "@/components/posts/PostComposer";
import StoriesBar from "@/components/stories/StoriesBar";
import WhoToFollow from "@/components/whoToFollow/WhoToFollow";
import News from "@/components/news/News";
import Trending from "@/components/trending/Trending";
import Notifications from "@/components/notifications/Notifications";
import Bookmarks from "@/components/bookmarks/Bookmarks";
import Chat from "@/components/chat/Chat";
import Groups from "@/components/groups/Groups";
import Events from "@/components/events/Events";
import Celebrations from "@/components/celebrations/Celebrations";
import Videos from "@/components/videos/Videos";
import Photos from "@/components/photos/Photos";

// Styled components
const StickySidebar = styled('div')(({ theme }) => ({
  position: 'sticky',
  top: theme.spacing(10),
  [theme.breakpoints.down('lg')]: {
    display: 'none',
  },
  [theme.breakpoints.down('md')]: {
    display: 'block',
    position: 'relative',
    top: 0,
  },
}));

const CreatePostCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[2],
  transition: theme.transitions.create(['box-shadow']),
  '&:hover': {
    boxShadow: theme.shadows[4],
  },
}));

const MainContent = styled('div')(({ theme }) => ({
  maxWidth: '680px',
  width: '100%',
  margin: '0 auto',
  padding: theme.spacing(2),
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(1),
  },
}));

const SidebarContent = styled(Paper)(({ theme }) => ({
  width: '312px',
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[2],
  [theme.breakpoints.down('md')]: {
    width: '100%',
    margin: theme.spacing(2, 0),
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    margin: theme.spacing(1, 0),
  },
}));

// Mock data
const stories = [
  {
    id: '1',
    username: 'johndoe',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    seen: false,
  },
  {
    id: '2',
    username: 'janesmith',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    seen: false,
  },
  {
    id: '3',
    username: 'mikejohnson',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    seen: true,
  },
  {
    id: '4',
    username: 'sarahwilson',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    seen: false,
  },
  {
    id: '5',
    username: 'davidbrown',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    seen: true,
  },
];

const suggestedUsers = [
  {
    id: '1',
    name: 'Tech News',
    username: 'technews',
    avatar: 'https://picsum.photos/200/200?random=1',
    bio: 'Latest in technology and gadgets',
    isFollowing: false,
  },
  {
    id: '2',
    name: 'Web Dev',
    username: 'webdev',
    avatar: 'https://picsum.photos/200/200?random=2',
    bio: 'Web development resources and tutorials',
    isFollowing: false,
  },
  {
    id: '3',
    name: 'React',
    username: 'reactjs',
    avatar: 'https://picsum.photos/200/200?random=3',
    bio: 'The official React.js account',
    isFollowing: true,
  },
];

const newsItems = [
  {
    id: '1',
    title: 'New JavaScript framework breaks performance records',
    source: 'TechCrunch',
    timeAgo: '2h ago',
    image: 'https://picsum.photos/200/200?random=4',
    category: 'Technology',
    isTrending: true,
  },
  {
    id: '2',
    title: 'The future of remote work in 2025',
    source: 'Forbes',
    timeAgo: '5h ago',
    image: 'https://picsum.photos/200/200?random=5',
    category: 'Business',
  },
  {
    id: '3',
    title: 'How AI is transforming healthcare',
    source: 'Wired',
    timeAgo: '1d ago',
    image: 'https://picsum.photos/200/200?random=6',
    category: 'Health',
    isTrending: true,
  },
];

const posts = [
  {
    id: '1',
    author: {
      name: 'John Doe',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      username: 'johndoe',
    },
    content: 'Just launched my new portfolio website! Check it out and let me know what you think. #webdev #portfolio',
    media: 'https://picsum.photos/800/400?random=1',
    timestamp: '2h ago',
    likes: 42,
    comments: 8,
    shares: 3,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: '2',
    author: {
      name: 'Jane Smith',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      username: 'janesmith',
    },
    content: 'Beautiful day for a hike! Nature always helps me clear my mind and get new ideas. 🏞️ #outdoors #inspiration',
    media: 'https://picsum.photos/800/400?random=2',
    timestamp: '5h ago',
    likes: 128,
    comments: 24,
    shares: 7,
    isLiked: true,
    isBookmarked: false,
  },
];

export default function Home() {
  const { user, isAuthenticated, loading } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [activeTab, setActiveTab] = useState('create');

  const { data: postsData, isLoading: postsLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`);
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      return response.json();
    },
    refetchOnWindowFocus: true,
    staleTime: 300000, // 5 minutes
  });

  const { data: storiesData, isLoading: storiesLoading } = useQuery({
    queryKey: ['stories'],
    queryFn: async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/stories`);
      if (!response.ok) {
        throw new Error('Failed to fetch stories');
      }
      return response.json();
    },
  });

  const { data: suggestedUsersData, isLoading: suggestedUsersLoading } = useQuery({
    queryKey: ['suggestedUsers'],
    queryFn: async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/suggested`);
      if (!response.ok) {
        throw new Error('Failed to fetch suggested users');
      }
      return response.json();
    },
  });

  const { data: newsItemsData, isLoading: newsItemsLoading } = useQuery({
    queryKey: ['newsItems'],
    queryFn: async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/news`);
      if (!response.ok) {
        throw new Error('Failed to fetch news items');
      }
      return response.json();
    },
  });
  const [postContent, setPostContent] = useState('');
  const [localPosts, setLocalPosts] = useState(posts);

  const handleAddStory = () => {
    console.log('Add story clicked');
    // Handle add story
  };

  const handleStoryClick = (id: string) => {
    console.log(`Story ${id} clicked`);
    // Handle story click
  };

  const handleFollowUser = (userId: string) => {
    console.log(`Follow user ${userId}`);
    // Handle follow user
  };

  const handleDismissSuggestion = (userId: string) => {
    console.log(`Dismiss suggestion ${userId}`);
    // Handle dismiss suggestion
  };

  const handleNewsClick = (id: string) => {
    console.log(`News item ${id} clicked`);
    // Handle news item click
  };

  const handleShowMore = (type: string) => {
    console.log(`Show more ${type}`);
    // Handle show more
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (postContent.trim()) {
      const newPost = {
        id: Date.now().toString(),
        author: {
          name: 'Current User',
          avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
          username: 'currentuser',
        },
        content: postContent,
        timestamp: 'Just now',
        likes: 0,
        comments: 0,
        shares: 0,
        isLiked: false,
        isBookmarked: false,
      };
      
      setLocalPosts([newPost, ...localPosts]);
      setPostContent('');
    }
  };

  const handleLikePost = (postId: string) => {
    setLocalPosts(localPosts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isLiked: !post.isLiked,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  const handleBookmarkPost = (postId: string) => {
    setLocalPosts(localPosts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isBookmarked: !post.isBookmarked
        };
      }
      return post;
    }));
  };

  if (loading) {
    return <Box sx={{ pt: 2, pb: 4, backgroundColor: theme.palette.background.default, minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <CircularProgress />
    </Box>;
  }

  if (!isAuthenticated) {
    return (
      <Box sx={{ pt: 2, pb: 4, backgroundColor: theme.palette.background.default, minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography>Please log in to continue</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {/* Left Sidebar */}
        <Grid item xs={12} md={4}>
          <StickySidebar>
            <SidebarContent>
              <Stack spacing={3}>
                <Tabs
                  value={activeTab}
                  onChange={(e, newValue) => setActiveTab(newValue)}
                  variant="scrollable"
                  allowScrollButtonsMobile
                  sx={{ mb: 2 }}
                >
                  <Tab icon={<AddIcon />} label="Create" value="create" />
                  <Tab icon={<TrendingUpIcon />} label="Trending" value="trending" />
                  <Tab icon={<NotificationsIcon />} label="Notifications" value="notifications" />
                  <Tab icon={<BookmarkIcon />} label="Bookmarks" value="bookmarks" />
                  <Tab icon={<ChatIcon />} label="Messages" value="messages" />
                  <Tab icon={<GroupIcon />} label="Groups" value="groups" />
                  <Tab icon={<VideoCameraFrontIcon />} label="Videos" value="videos" />
                  <Tab icon={<ImageIcon />} label="Photos" value="photos" />
                  <Tab icon={<EventAvailableIcon />} label="Events" value="events" />
                  <Tab icon={<MoodIcon />} label="Celebrations" value="celebrations" />
                </Tabs>

                <Box>
                  {activeTab === 'create' && <PostComposer />}
                  {activeTab === 'trending' && <Trending />}
                  {activeTab === 'notifications' && <Notifications />}
                  {activeTab === 'bookmarks' && <Bookmarks />}
                  {activeTab === 'messages' && <Chat />}
                  {activeTab === 'groups' && <Groups />}
                  {activeTab === 'videos' && <Videos />}
                  {activeTab === 'photos' && <Photos />}
                  {activeTab === 'events' && <Events />}
                  {activeTab === 'celebrations' && <Celebrations />}
                </Box>
              </Stack>
            </SidebarContent>
          </StickySidebar>
        </Grid>

        {/* Main Content */}
        <Grid item xs={12} md={8}>
          <MainContent>
            <Stack spacing={4}>
              <PostComposer />
              <StoriesBar stories={storiesData || stories} />
              <Divider />
              {(postsData || localPosts)?.map((post) => (
                <Post 
                  key={post.id} 
                  {...post}
                />
              ))}
            </Stack>
          </MainContent>
        </Grid>

          {/* Right Sidebar */}
          <Hidden mdDown>
            <Grid item lg={3}>
              <StickySidebar>
                <SidebarContent>
                  {suggestedUsersLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
                  <CircularProgress />
                </Box>
              ) : (
                <WhoToFollow 
                  users={suggestedUsersData || []}
                  onFollow={handleFollowUser}
                  onDismiss={handleDismissSuggestion}
                  onShowMore={() => handleShowMore('users')}
                />
              )}
                  
                  {newsItemsLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
                  <CircularProgress />
                </Box>
              ) : (
                <News 
                  items={newsItemsData || []}
                  onNewsClick={handleNewsClick}
                  onShowMore={() => handleShowMore('news')}
                />
              )}
                  
                  <Box sx={{ mt: 2, px: 1 }}>
                    <Typography variant="body2" color="textSecondary" sx={{ fontSize: '0.75rem', lineHeight: 1.5 }}>
                      2025 Social Network App
                      <br />
                      <span style={{ color: theme.palette.text.secondary }}>Privacy • Terms • Advertising • Ad Choices • Cookies • More</span>
                    </Typography>
                  </Box>
                </SidebarContent>
              </StickySidebar>
            </Grid>
          </Hidden>
      </Grid>
    </Container>
  );
}