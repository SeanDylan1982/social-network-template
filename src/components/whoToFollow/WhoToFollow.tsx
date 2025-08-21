import React from 'react';
import { 
  Box, 
  Typography, 
  Avatar, 
  Button, 
  List, 
  ListItem, 
  ListItemAvatar, 
  ListItemText, 
  ListItemSecondaryAction,
  Divider,
  IconButton
} from '@mui/material';
import Link from 'next/link';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const Container = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: 12,
  padding: '12px 0',
  marginBottom: 16,
  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
}));

const Header = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 16px 12px',
});

const Title = styled(Typography)({
  fontSize: '1.0625rem',
  fontWeight: 700,
  lineHeight: 1.2,
});

const StyledListItem = styled(ListItem)({
  padding: '8px 16px',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
  },
});

const StyledAvatar = styled(Avatar)({
  width: 40,
  height: 40,
  marginRight: 12,
});

const Username = styled(Typography)({
  fontWeight: 600,
  fontSize: '0.9375rem',
  lineHeight: 1.2,
  marginBottom: 2,
  '& a': {
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
});

const UserInfo = styled(Typography)(({ theme }) => ({
  fontSize: '0.8125rem',
  color: theme.palette.text.secondary,
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}));

const FollowButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '0.875rem',
  padding: '4px 12px',
  borderRadius: 6,
  minWidth: 'auto',
  '&.MuiButton-contained': {
    backgroundColor: theme.palette.grey[900],
    color: theme.palette.common.white,
    '&:hover': {
      backgroundColor: theme.palette.grey[800],
    },
  },
  '&.MuiButton-outlined': {
    borderColor: theme.palette.grey[300],
    color: theme.palette.text.primary,
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
      borderColor: theme.palette.grey[400],
    },
  },
}));

const ShowMoreLink = styled(Typography)(({ theme }) => ({
  display: 'block',
  padding: '12px 16px 4px',
  fontSize: '0.9375rem',
  color: theme.palette.primary.main,
  cursor: 'pointer',
  '&:hover': {
    textDecoration: 'underline',
    backgroundColor: 'transparent',
  },
}));

interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio: string;
  isFollowing?: boolean;
}

interface WhoToFollowProps {
  users: User[];
  onFollow?: (userId: string) => void;
  onDismiss?: (userId: string) => void;
  onShowMore?: () => void;
}

const WhoToFollow: React.FC<WhoToFollowProps> = ({
  users,
  onFollow,
  onDismiss,
  onShowMore,
}) => {
  const handleFollowClick = (userId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onFollow) onFollow(userId);
  };

  const handleDismiss = (userId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onDismiss) onDismiss(userId);
  };

  const handleUserClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Handle user click (e.g., navigate to profile)
  };

  return (
    <Container>
      <Header>
        <Title>Who to follow</Title>
        <IconButton size="small" edge="end">
          <MoreHorizIcon />
        </IconButton>
      </Header>
      
      <List disablePadding>
        {users.map((user, index) => (
          <React.Fragment key={user.id}>
            <StyledListItem 
              button 
              component={Link} 
              to={`/${user.username}`}
              onClick={handleUserClick}
            >
              <ListItemAvatar>
                <StyledAvatar src={user.avatar} alt={user.name} />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Username>
                    <Link to={`/${user.username}`}>{user.name}</Link>
                  </Username>
                }
                secondary={
                  <UserInfo>
                    @{user.username} • {user.bio}
                  </UserInfo>
                }
                disableTypography
              />
              <ListItemSecondaryAction>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <FollowButton
                    variant={user.isFollowing ? 'outlined' : 'contained'}
                    onClick={(e) => handleFollowClick(user.id, e)}
                    size="small"
                  >
                    {user.isFollowing ? 'Following' : 'Follow'}
                  </FollowButton>
                  <IconButton 
                    size="small" 
                    onClick={(e) => handleDismiss(user.id, e)}
                    sx={{ ml: 1 }}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </Box>
              </ListItemSecondaryAction>
            </StyledListItem>
            {index < users.length - 1 && <Divider component="li" />}
          </React.Fragment>
        ))}
      </List>
      
      {onShowMore && (
        <ShowMoreLink onClick={onShowMore}>
          Show more
        </ShowMoreLink>
      )}
    </Container>
  );
};

export default WhoToFollow;
