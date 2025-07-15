import React, { useState } from 'react';
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
  styled
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { 
  PhotoCamera as PhotoCameraIcon, 
  EmojiEmotions as EmojiIcon,
  Send as SendIcon
} from '@mui/icons-material';

// Components
import Post from "@/components/posts/Post";
import Stories from "@/components/stories/Stories";
import WhoToFollow from "@/components/whoToFollow/WhoToFollow";
import News from "@/components/news/News";

// Styled components
const StickySidebar = styled('div')(({ theme }) => ({
  position: 'sticky',
  top: '80px',
  [theme.breakpoints.down('lg')]: {
    display: 'none',
  },
}));

const CreatePostCard = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: 12,
  padding: '16px',
  marginBottom: '16px',
  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
}));

const MainContent = styled('div')({
  maxWidth: '680px',
  width: '100%',
  margin: '0 auto',
  padding: '0 16px',
  '@media (max-width: 900px)': {
    padding: '0 8px',
  },
});

const SidebarContent = styled('div')({
  width: '312px',
  '@media (max-width: 1264px)': {
    width: '280px',
  },
});

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
    bio: 'Web development resources',
    isFollowing: false,
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
];

const initialPosts = [
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

const Home: React.FC = () => {
  const theme = useTheme();
  const [postContent, setPostContent] = useState('');
  const [posts, setPosts] = useState(initialPosts);

  const handleAddStory = () => {
    console.log('Add story clicked');
  };

  const handleStoryClick = (id: string) => {
    console.log(`Story ${id} clicked`);
  };

  const handleFollowUser = (userId: string) => {
    console.log(`Follow user ${userId}`);
  };

  const handleDismissSuggestion = (userId: string) => {
    console.log(`Dismiss suggestion ${userId}`);
  };

  const handleNewsClick = (id: string) => {
    console.log(`News item ${id} clicked`);
  };

  const handleShowMore = (type: string) => {
    console.log(`Show more ${type}`);
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
      
      setPosts([newPost, ...posts]);
      setPostContent('');
    }
  };

  const handleLikePost = (postId: string) => {
    setPosts(posts.map(post => {
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
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isBookmarked: !post.isBookmarked
        };
      }
      return post;
    }));
  };

  return (
    <Box sx={{ pt: 2, pb: 4, backgroundColor: theme.palette.background.default, minHeight: '100vh' }}>
      <Container maxWidth="lg">
        <Grid container spacing={3} justifyContent="center">
          {/* Main Content */}
          <Grid item xs={12} md={8} lg={6}>
            <MainContent>
              {/* Create Post */}
              <CreatePostCard>
                <form onSubmit={handleCreatePost}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Avatar 
                      src="https://randomuser.me/api/portraits/men/1.jpg" 
                      alt="User"
                      sx={{ width: 40, height: 40, mr: 1.5 }}
                    />
                    <TextField
                      fullWidth
                      placeholder="What's on your mind?"
                      variant="outlined"
                      size="small"
                      value={postContent}
                      onChange={(e) => setPostContent(e.target.value)}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '20px',
                          backgroundColor: theme.palette.grey[100],
                          '& fieldset': {
                            border: 'none',
                          },
                          '&:hover fieldset': {
                            border: 'none',
                          },
                          '&.Mui-focused fieldset': {
                            border: 'none',
                            boxShadow: `0 0 0 2px ${theme.palette.primary.main}33`,
                          },
                        },
                      }}
                    />
                    <IconButton 
                      type="submit" 
                      color="primary" 
                      disabled={!postContent.trim()}
                      sx={{ ml: 1 }}
                    >
                      <SendIcon />
                    </IconButton>
                  </Box>
                </form>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1, px: 1 }}>
                  <Button
                    startIcon={<PhotoCameraIcon />}
                    sx={{ color: theme.palette.text.secondary, textTransform: 'none' }}
                  >
                    Photo/Video
                  </Button>
                  <Button
                    startIcon={<EmojiIcon />}
                    sx={{ color: theme.palette.text.secondary, textTransform: 'none' }}
                  >
                    Feeling/Activity
                  </Button>
                </Box>
              </CreatePostCard>

              {/* Stories */}
              <Stories 
                stories={stories} 
                onAddStory={handleAddStory}
                onStoryClick={handleStoryClick}
              />

              {/* Posts */}
              {posts.map((post) => (
                <Post
                  key={post.id}
                  id={post.id}
                  author={post.author}
                  content={post.content}
                  media={post.media}
                  timestamp={post.timestamp}
                  likes={post.likes}
                  comments={post.comments}
                  shares={post.shares}
                  isLiked={post.isLiked}
                  isBookmarked={post.isBookmarked}
                  onLike={handleLikePost}
                  onBookmark={handleBookmarkPost}
                />
              ))}
            </MainContent>
          </Grid>

          {/* Right Sidebar */}
          <Hidden mdDown>
            <Grid item lg={3}>
              <StickySidebar>
                <SidebarContent>
                  <WhoToFollow 
                    users={suggestedUsers}
                    onFollow={handleFollowUser}
                    onDismiss={handleDismissSuggestion}
                    onShowMore={() => handleShowMore('users')}
                  />
                  
                  <News 
                    items={newsItems}
                    onNewsClick={handleNewsClick}
                    onShowMore={() => handleShowMore('news')}
                  />
                  
                  <Box sx={{ mt: 2, px: 1 }}>
                    <Typography variant="body2" color="textSecondary" sx={{ fontSize: '0.75rem', lineHeight: 1.5 }}>
                      © 2025 Social Network App
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
    </Box>
  );
};

export default Home;
