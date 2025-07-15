import React, { useState } from 'react';
import {
  Avatar,
  Badge,
  Box,
  Typography,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Paper,
  styled
} from '@mui/material';
import {
  Search as SearchIcon,
  PersonAdd as PersonAddIcon,
  MoreVert as MoreVertIcon,
  Check as CheckIcon,
  Close as CloseIcon,
  PersonRemove as RemoveFriendIcon,
  Block as BlockIcon,
  Report as ReportIcon,
  People as PeopleIcon,
  PersonAddAlt as RequestIcon,
  GroupAdd as SuggestionIcon,
  Person as FriendIcon,
} from '@mui/icons-material';

// Styled Components
const StyledTabs = styled(Tabs)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  '& .MuiTabs-indicator': {
    height: 3,
    backgroundColor: theme.palette.primary.main,
  },
  '& .MuiTab-root': {
    textTransform: 'none',
    minWidth: 'auto',
    padding: '12px 24px',
    fontSize: '0.9375rem',
    fontWeight: 500,
    '&.Mui-selected': {
      color: theme.palette.primary.main,
      fontWeight: 600,
    },
  },
}));

const FriendCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: theme.transitions.create(['box-shadow', 'transform']),
  '&:hover': {
    boxShadow: theme.shadows[6],
    transform: 'translateY(-4px)',
  },
  '& .MuiCardMedia-root': {
    height: 160,
    borderRadius: '8px 8px 0 0',
    '& img': {
      objectFit: 'cover',
    },
  },
  '& .MuiCardContent-root': {
    padding: theme.spacing(3),
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  '& .MuiCardActions-root': {
    padding: theme.spacing(2, 3),
    borderTop: `1px solid ${theme.palette.divider}`,
  },
}));

const FriendAvatar = styled(Avatar)(({ theme }) => ({
  width: 120,
  height: 120,
  margin: '0 auto',
  marginBottom: theme.spacing(2),
  border: `4px solid ${theme.palette.background.paper}`,
  boxShadow: theme.shadows[2],
  '& .MuiBadge-badge': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    fontSize: '0.75rem',
    fontWeight: 500,
    border: `2px solid ${theme.palette.background.paper}`,
  },
}));

const FriendName = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  textAlign: 'center',
  marginBottom: theme.spacing(0.5),
  fontSize: '1.125rem',
  lineHeight: 1.4,
}));

const FriendUsername = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  textAlign: 'center',
  marginBottom: theme.spacing(1.5),
  fontSize: '0.875rem',
  opacity: 0.8,
}));

const MutualFriends = styled(Typography)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.text.secondary,
  fontSize: '0.8125rem',
  marginBottom: theme.spacing(1.5),
  '& .MuiSvgIcon-root': {
    fontSize: '1rem',
    marginRight: theme.spacing(0.5),
    color: theme.palette.primary.main,
  },
}));

// Mock Data
const allFriends = [
  {
    id: 1,
    name: 'Alex Johnson',
    username: '@alexj',
    avatar: '/avatar-2.jpg',
    mutualFriends: 12,
    isOnline: true,
    status: 'friends',
  },
  {
    id: 2,
    name: 'Sarah Williams',
    username: '@sarahw',
    avatar: '/avatar-3.jpg',
    mutualFriends: 8,
    isOnline: true,
    status: 'friends',
  },
  {
    id: 3,
    name: 'Michael Chen',
    username: '@michaelc',
    avatar: '/avatar-4.jpg',
    mutualFriends: 5,
    isOnline: false,
    status: 'friends',
  },
  {
    id: 4,
    name: 'Emma Davis',
    username: '@emmad',
    avatar: '/avatar-5.jpg',
    mutualFriends: 3,
    isOnline: true,
    status: 'friends',
  },
  {
    id: 5,
    name: 'David Wilson',
    username: '@davidw',
    avatar: '/avatar-6.jpg',
    mutualFriends: 7,
    isOnline: false,
    status: 'friends',
  },
  {
    id: 6,
    name: 'Olivia Brown',
    username: '@oliviab',
    avatar: '/avatar-7.jpg',
    mutualFriends: 2,
    isOnline: true,
    status: 'friends',
  },
];

const friendRequests = [
  {
    id: 7,
    name: 'James Wilson',
    username: '@jamesw',
    avatar: '/avatar-8.jpg',
    mutualFriends: 4,
    isOnline: true,
    status: 'request_received',
  },
  {
    id: 8,
    name: 'Sophia Garcia',
    username: '@sophiag',
    avatar: '/avatar-9.jpg',
    mutualFriends: 1,
    isOnline: false,
    status: 'request_received',
  },
];

const suggestions = [
  {
    id: 9,
    name: 'Robert Taylor',
    username: '@robertt',
    avatar: '/avatar-10.jpg',
    mutualFriends: 9,
    isOnline: true,
    status: 'suggested',
  },
  {
    id: 10,
    name: 'Jennifer Lee',
    username: '@jenniferl',
    avatar: '/avatar-11.jpg',
    mutualFriends: 6,
    isOnline: false,
    status: 'suggested',
  },
  {
    id: 11,
    name: 'William Clark',
    username: '@williamc',
    avatar: '/avatar-12.jpg',
    mutualFriends: 3,
    isOnline: true,
    status: 'suggested',
  },
];

const Friends: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedFriend, setSelectedFriend] = useState<number | null>(null);
  const [friends, setFriends] = useState(allFriends);
  const [requests, setRequests] = useState(friendRequests);
  const [suggested, setSuggested] = useState(suggestions);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, id: number) => {
    setAnchorEl(event.currentTarget);
    setSelectedFriend(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedFriend(null);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleAcceptRequest = (id: number) => {
    const request = requests.find(req => req.id === id);
    if (request) {
      setFriends([...friends, { ...request, status: 'friends' }]);
      setRequests(requests.filter(req => req.id !== id));
    }
  };

  const handleDeclineRequest = (id: number) => {
    setRequests(requests.filter(req => req.id !== id));
  };

  const handleAddFriend = (id: number) => {
    const suggestion = suggested.find(sug => sug.id === id);
    if (suggestion) {
      setSuggested(suggested.filter(sug => sug.id !== id));
      // In a real app, you would send a friend request here
      console.log(`Friend request sent to ${suggestion.name}`);
    }
  };

  const handleRemoveFriend = (id: number) => {
    setFriends(friends.filter(friend => friend.id !== id));
    handleMenuClose();
  };

  const handleBlockUser = (id: number) => {
    // In a real app, you would block the user here
    console.log(`User with ID ${id} has been blocked`);
    setFriends(friends.filter(friend => friend.id !== id));
    setRequests(requests.filter(req => req.id !== id));
    setSuggested(suggested.filter(sug => sug.id !== id));
    handleMenuClose();
  };

  const filteredFriends = friends.filter(friend =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    friend.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredRequests = requests.filter(request =>
    request.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    request.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSuggestions = suggested.filter(suggestion =>
    suggestion.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    suggestion.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderFriendCard = (friend: any) => (
    <Grid item xs={12} sm={6} md={4} lg={3} key={friend.id}>
      <FriendCard>
        <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
          <Box position="relative" display="inline-block">
            <FriendAvatar src={friend.avatar} alt={friend.name} />
            {friend.isOnline && (
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 12,
                  right: 12,
                  width: 14,
                  height: 14,
                  bgcolor: '#4caf50',
                  border: '2px solid white',
                  borderRadius: '50%',
                }}
              />
            )}
          </Box>
          <FriendName variant="subtitle1">{friend.name}</FriendName>
          <FriendUsername>{friend.username}</FriendUsername>
          <MutualFriends>
            <PeopleIcon fontSize="inherit" />
            {friend.mutualFriends} mutual friends
          </MutualFriends>
        </CardContent>
        <CardActions sx={{ p: 2, pt: 0 }}>
          {friend.status === 'friends' && (
            <>
              <Button 
                fullWidth 
                variant="contained" 
                color="primary"
                startIcon={<FriendIcon />}
                size="small"
              >
                Friends
              </Button>
              <IconButton 
                size="small" 
                onClick={(e) => handleMenuOpen(e, friend.id)}
                sx={{ ml: 0.5 }}
              >
                <MoreVertIcon />
              </IconButton>
            </>
          )}
          {friend.status === 'request_received' && (
            <>
              <Button 
                fullWidth 
                variant="contained" 
                color="primary"
                startIcon={<CheckIcon />}
                size="small"
                onClick={() => handleAcceptRequest(friend.id)}
              >
                Accept
              </Button>
              <Button 
                fullWidth 
                variant="outlined" 
                color="inherit"
                startIcon={<CloseIcon />}
                size="small"
                sx={{ ml: 1 }}
                onClick={() => handleDeclineRequest(friend.id)}
              >
                Decline
              </Button>
            </>
          )}
          {friend.status === 'suggested' && (
            <Button 
              fullWidth 
              variant="contained" 
              color="primary"
              startIcon={<PersonAddIcon />}
              size="small"
              onClick={() => handleAddFriend(friend.id)}
            >
              Add Friend
            </Button>
          )}
        </CardActions>
      </FriendCard>
    </Grid>
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" component="h1">
          Friends
          <Chip 
            label={friends.length} 
            color="primary" 
            size="small" 
            sx={{ ml: 1, color: 'white', fontWeight: 500 }} 
          />
        </Typography>
        <Button 
          variant="contained" 
          color="primary"
          startIcon={<PersonAddIcon />}
        >
          Add Friend
        </Button>
      </Box>

      <Paper elevation={0} sx={{ borderRadius: 2, overflow: 'hidden', mb: 3 }}>
        <StyledTabs
          value={tabValue}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="friend tabs"
        >
          <Tab icon={<PeopleIcon />} label="All Friends" />
          <Tab 
            icon={
              <Badge badgeContent={requests.length} color="error">
                <RequestIcon />
              </Badge>
            } 
            label="Requests" 
          />
          <Tab icon={<SuggestionIcon />} label="Suggestions" />
        </StyledTabs>
      </Paper>

      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search friends..."
          value={searchQuery}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            sx: { borderRadius: 2 },
          }}
        />
      </Box>

      {tabValue === 0 && (
        <>
          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
            {filteredFriends.length} {filteredFriends.length === 1 ? 'Friend' : 'Friends'}
          </Typography>
          {filteredFriends.length > 0 ? (
            <Grid container spacing={3}>
              {filteredFriends.map(friend => renderFriendCard(friend))}
            </Grid>
          ) : (
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center',
              p: 4,
              textAlign: 'center',
              minHeight: 300,
              bgcolor: 'background.paper',
              borderRadius: 2,
            }}>
              <PeopleIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                No friends found
              </Typography>
              <Typography color="text.secondary" sx={{ maxWidth: 400, mb: 2 }}>
                {searchQuery 
                  ? "We couldn't find any friends matching your search." 
                  : "When you have friends, they'll appear here."}
              </Typography>
              {!searchQuery && (
                <Button 
                  variant="contained" 
                  color="primary"
                  startIcon={<PersonAddIcon />}
                >
                  Find Friends
                </Button>
              )}
            </Box>
          )}
        </>
      )}

      {tabValue === 1 && (
        <>
          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
            {filteredRequests.length} Friend {filteredRequests.length === 1 ? 'Request' : 'Requests'}
          </Typography>
          {filteredRequests.length > 0 ? (
            <Grid container spacing={3}>
              {filteredRequests.map(request => renderFriendCard(request))}
            </Grid>
          ) : (
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center',
              p: 4,
              textAlign: 'center',
              minHeight: 300,
              bgcolor: 'background.paper',
              borderRadius: 2,
            }}>
              <RequestIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                No friend requests
              </Typography>
              <Typography color="text.secondary" sx={{ maxWidth: 400 }}>
                {searchQuery 
                  ? "No friend requests match your search." 
                  : "When you have friend requests, they'll appear here."}
              </Typography>
            </Box>
          )}
        </>
      )}

      {tabValue === 2 && (
        <>
          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
            People You May Know
          </Typography>
          {filteredSuggestions.length > 0 ? (
            <Grid container spacing={3}>
              {filteredSuggestions.map(suggestion => renderFriendCard(suggestion))}
            </Grid>
          ) : (
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center',
              p: 4,
              textAlign: 'center',
              minHeight: 300,
              bgcolor: 'background.paper',
              borderRadius: 2,
            }}>
              <SuggestionIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                No suggestions available
              </Typography>
              <Typography color="text.secondary" sx={{ maxWidth: 400 }}>
                {searchQuery 
                  ? "No suggestions match your search." 
                  : "When we have friend suggestions, they'll appear here."}
              </Typography>
            </Box>
          )}
        </>
      )}

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem>
          <ListItemIcon>
            <FriendIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>View Profile</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <PersonAddIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Message</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => selectedFriend && handleRemoveFriend(selectedFriend)}>
          <ListItemIcon>
            <RemoveFriendIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText primaryTypographyProps={{ color: 'error' }}>
            Remove Friend
          </ListItemText>
        </MenuItem>
        <MenuItem onClick={() => selectedFriend && handleBlockUser(selectedFriend)}>
          <ListItemIcon>
            <BlockIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText primaryTypographyProps={{ color: 'error' }}>
            Block User
          </ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <ReportIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText primaryTypographyProps={{ color: 'error' }}>
            Report
          </ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default Friends;
