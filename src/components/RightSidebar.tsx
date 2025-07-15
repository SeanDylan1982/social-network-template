"use client";

import { Box, Typography, Avatar, Button, Divider, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { MoreHoriz as MoreHorizIcon, Add as AddIcon } from '@mui/icons-material';

const RightSidebarContainer = styled(Box)(({ theme }) => ({
  width: 280,
  flexShrink: 0,
  padding: theme.spacing(3),
  [theme.breakpoints.down('lg')]: {
    display: 'none',
  },
}));

const Section = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: 12,
  padding: theme.spacing(2),
  marginBottom: theme.spacing(3),
  boxShadow: theme.shadows[1],
}));

const UserItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1),
  '&:not(:last-child)': {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}));

const UserInfo = styled(Box)({
  marginLeft: 15,
  flex: 1,
  minWidth: 0,
});

const FollowButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  borderRadius: 20,
  padding: theme.spacing(1, 2),
  fontSize: '0.75rem',
  fontWeight: 600,
}));

const usersToFollow = [
  {
    id: 1,
    name: 'Emma Wilson',
    username: '@emmaw',
    avatar: '/images/avatars/4.jpg',
    isFollowing: false,
  },
  {
    id: 2,
    name: 'David Kim',
    username: '@davidk',
    avatar: '/images/avatars/5.jpg',
    isFollowing: false,
  },
  {
    id: 3,
    name: 'Sophia Chen',
    username: '@sophiac',
    avatar: '/images/avatars/6.jpg',
    isFollowing: true,
  },
];

const trendingTopics = [
  { id: 1, name: '#ReactJS', posts: '12.5K' },
  { id: 2, name: '#WebDev', posts: '8.2K' },
  { id: 3, name: '#UXDesign', posts: '5.7K' },
  { id: 4, name: '#Startup', posts: '4.9K' },
  { id: 5, name: '#TechNews', posts: '3.8K' },
];

export default function RightSidebar() {
  return (
    <RightSidebarContainer>
      {/* Who to Follow */}
      <Section>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Typography variant="subtitle1" fontWeight="bold">Who to follow</Typography>
          <IconButton size="small">
            <MoreHorizIcon fontSize="small" />
          </IconButton>
        </Box>
        
        {usersToFollow.map((user) => (
          <UserItem key={user.id}>
            <Avatar src={user.avatar} alt={user.name} />
            <UserInfo>
              <Typography variant="subtitle2" fontWeight="bold" noWrap>{user.name}</Typography>
              <Typography variant="caption" color="text.secondary">{user.username}</Typography>
            </UserInfo>
            <FollowButton 
              variant={user.isFollowing ? 'outlined' : 'contained'} 
              color={user.isFollowing ? 'inherit' : 'primary'}
              size="small"
            >
              {user.isFollowing ? 'Following' : 'Follow'}
            </FollowButton>
          </UserItem>
        ))}
        
        <Button 
          fullWidth 
          color="primary" 
          size="small" 
          sx={{ mt: 1, textTransform: 'none' }}
        >
          Show more
        </Button>
      </Section>
      
      {/* Trending Topics */}
      <Section>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="subtitle1" fontWeight="bold">Trending Topics</Typography>
          <IconButton size="small">
            <MoreHorizIcon fontSize="small" />
          </IconButton>
        </Box>
        
        {trendingTopics.map((topic) => (
          <Box key={topic.id} py={1.5}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography variant="subtitle2" fontWeight="bold">{topic.name}</Typography>
                <Typography variant="caption" color="text.secondary">{topic.posts} posts</Typography>
              </Box>
              <IconButton size="small" sx={{ color: 'text.secondary' }}>
                <AddIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        ))}
        
        <Button 
          fullWidth 
          color="primary" 
          size="small" 
          sx={{ mt: 8, textTransform: 'none' }}
        >
          Show more
        </Button>
      </Section>
      
      {/* Footer Links */}
      <Box display="flex" flexWrap="wrap" gap={1} mt={3}>
        {['Help', 'About', 'Terms', 'Privacy', 'Cookies', 'Ads info', 'Blog', 'Status', 'Careers', 'Brand Resources'].map((item) => (
          <Typography key={item} variant="caption" color="text.secondary" sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>
            {item}
          </Typography>
        ))}
      </Box>
      
      <Typography variant="caption" color="text.secondary" display="block" mt={2}>
        © 2025 Social Network
      </Typography>
    </RightSidebarContainer>
  );
}
