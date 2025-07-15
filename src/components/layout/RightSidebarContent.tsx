import React from 'react';
import { Box, Typography, Avatar, IconButton, Button, Divider, List, ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Add as AddIcon, MoreHoriz as MoreHorizIcon } from '@mui/icons-material';

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.1rem',
  fontWeight: 600,
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(1, 1),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 600,
  color: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: 'transparent',
    textDecoration: 'underline',
  },
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(1, 1),
  '&:hover': {
    backgroundColor: 'transparent',
    '& .MuiListItemText-primary': {
      color: theme.palette.primary.main,
    },
  },
}));

const NewsItem = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1, 1),
  '&:not(:last-child)': {
    borderBottom: `1px solid ${theme.palette.divider}`,
    marginBottom: theme.spacing(1, 1),
  },
  '&:hover': {
    '& .news-title': {
      color: theme.palette.primary.main,
    },
  },
}));

const usersToFollow = [
  { id: 1, name: 'John Doe', role: 'UI/UX Designer', avatar: '/images/avatars/6.jpg' },
  { id: 2, name: 'Sarah Smith', role: 'Frontend Developer', avatar: '/images/avatars/7.jpg' },
  { id: 3, name: 'Mike Johnson', role: 'Backend Developer', avatar: '/images/avatars/8.jpg' },
];

const latestNews = [
  { id: 1, title: 'New features coming soon!', time: '2 hours ago' },
  { id: 2, title: 'Community guidelines updated', time: '5 hours ago' },
  { id: 3, title: 'Meetup event next week', time: '1 day ago' },
  { id: 4, title: 'Platform maintenance', time: '2 days ago' },
];

const RightSidebarContent = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, p: '0.5rem' }}>
      {/* Who to follow section */}
      <Box>
        <SectionTitle>
          Who to follow
          <StyledButton size="small">See all</StyledButton>
        </SectionTitle>
        
        <List disablePadding>
          {usersToFollow.map((user) => (
            <StyledListItem key={user.id} disableGutters>
              <ListItemAvatar>
                <Avatar 
                  src={user.avatar} 
                  alt={user.name}
                  sx={{ width: 48, height: 48 }}
                />
              </ListItemAvatar>
              <ListItemText 
                primary={user.name}
                secondary={user.role}
                primaryTypographyProps={{
                  fontWeight: 600,
                  fontSize: '0.95rem',
                }}
                secondaryTypographyProps={{
                  fontSize: '0.75rem',
                  color: 'text.secondary',
                }}
              />
              <ListItemSecondaryAction>
                <IconButton size="small" edge="end">
                  <AddIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </StyledListItem>
          ))}
        </List>
      </Box>
      
      <Divider />
      
      {/* Latest news section */}
      <Box>
        <SectionTitle>
          Latest News
          <StyledButton size="small">View all</StyledButton>
        </SectionTitle>
        
        <Box>
          {latestNews.map((news, index) => (
            <NewsItem key={news.id}>
              <Typography 
                variant="subtitle2" 
                className="news-title"
                sx={{ 
                  fontWeight: 500, 
                  mb: 0.5,
                  cursor: 'pointer',
                  transition: 'color 0.2s',
                }}
              >
                {news.title}
              </Typography>
              <Typography 
                variant="caption" 
                color="text.secondary"
                sx={{ display: 'block' }}
              >
                {news.time}
              </Typography>
            </NewsItem>
          ))}
        </Box>
      </Box>
      
      <Divider />
      
      {/* Footer links */}
      <Box sx={{ fontSize: '0.75rem', color: 'text.secondary', textAlign: 'center' }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1, mb: 2 }}>
          <StyledButton size="small">Privacy</StyledButton>
          <StyledButton size="small">Terms</StyledButton>
          <StyledButton size="small">Advertising</StyledButton>
          <StyledButton size="small">Ad Choices</StyledButton>
        </Box>
        <Typography variant="caption">
          © {new Date().getFullYear()} Social Network
        </Typography>
      </Box>
    </Box>
  );
};

export default RightSidebarContent;
