import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Typography,
  Avatar,
  Button,
  Tabs,
  Tab,
  IconButton,
  Divider,
  Paper,
  useTheme,
  styled,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
} from '@mui/material';
import {
  Edit as EditIcon,
  MoreVert as MoreVertIcon,
  AddAPhoto as AddPhotoIcon,
  Favorite as FavoriteIcon,
  ChatBubbleOutline as CommentIcon,
  Share as ShareIcon,
  BookmarkBorder as BookmarkIcon,
  GridOn as GridIcon,
  BookmarkBorder as BookmarkBorderIcon,
  ListAlt as ListIcon,
  PersonPin as PersonPinIcon,
} from '@mui/icons-material';

// Styled Components
const ProfileHeader = styled(Paper)(({ theme }) => ({
  position: 'relative',
  marginBottom: theme.spacing(4),
  borderRadius: theme.shape.borderRadius * 2,
  overflow: 'hidden',
  boxShadow: theme.shadows[3],
  transition: theme.transitions.create(['box-shadow', 'transform']),
  '&:hover': {
    boxShadow: theme.shadows[5],
    transform: 'translateY(-2px)',
  },
}));

const CoverPhoto = styled(Box)({
  height: 400,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundColor: '#f0f2f5',
  position: 'relative',
  transition: theme.transitions.create(['background-color', 'transform']),
  '&:hover': {
    transform: 'scale(1.02)',
  },
});

const ProfileInfo = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0, 4, 4),
  position: 'relative',
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0, 3, 3),
  },
}));

const AvatarContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: -75,
  left: 32,
  [theme.breakpoints.down('sm')]: {
    left: '50%',
    transform: 'translateX(-50%)',
    textAlign: 'center',
    bottom: -90,
  },
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 160,
  height: 160,
  border: '4px solid white',
  boxShadow: theme.shadows[4],
  transition: theme.transitions.create(['transform', 'box-shadow']),
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: theme.shadows[6],
  },
  [theme.breakpoints.down('sm')]: {
    width: 130,
    height: 130,
  },
}));

const ActionButtons = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  padding: theme.spacing(2, 4),
  gap: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2, 3),
  },
}));

const StyledTabs = styled(Tabs)(({ theme }) => ({
  '& .MuiTabs-indicator': {
    height: 4,
    backgroundColor: theme.palette.primary.main,
  },
  '& .MuiTab-root': {
    textTransform: 'none',
    minWidth: 'auto',
    padding: theme.spacing(2, 3),
    fontSize: '1rem',
    fontWeight: 500,
    '&.Mui-selected': {
      fontWeight: 600,
      color: theme.palette.primary.main,
    },
  },
}));

const PostCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  borderRadius: theme.shape.borderRadius * 2,
  overflow: 'hidden',
  boxShadow: theme.shadows[2],
  transition: theme.transitions.create(['box-shadow', 'transform']),
  '&:hover': {
    boxShadow: theme.shadows[5],
    transform: 'translateY(-2px)',
  },
  '& .MuiCardMedia-root': {
    height: 400,
    objectFit: 'cover',
  },
  '& .MuiCardContent-root': {
    padding: theme.spacing(3),
  },
  '& .MuiCardActions-root': {
    padding: theme.spacing(2, 3),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

// Mock Data
const userData = {
  username: 'johndoe',
  name: 'John Doe',
  avatar: '/avatar-1.jpg',
  coverPhoto: '/cover-photo.jpg',
  bio: 'Digital creator | Photography enthusiast | Travel lover ✈️',
  location: 'San Francisco, CA',
  website: 'johndoe.design',
  joinDate: 'Joined March 2023',
  following: 542,
  followers: 1287,
  posts: [
    {
      id: 1,
      image: '/post-1.jpg',
      likes: 124,
      comments: 23,
      caption: 'Beautiful day at the beach! 🏖️ #summer #vacation',
      timestamp: '2 hours ago',
    },
    {
      id: 2,
      image: '/post-2.jpg',
      likes: 89,
      comments: 12,
      caption: 'Working on some new projects. Stay tuned! #design #work',
      timestamp: '1 day ago',
    },
    {
      id: 3,
      image: '/post-3.jpg',
      likes: 215,
      comments: 42,
      caption: 'Throwback to my trip to Japan last year. Can\'t wait to go back! ✈️ #japan #travel',
      timestamp: '3 days ago',
    },
  ],
};

const ProfilePage: React.FC = () => {
  const router = useRouter();
  const { username } = router.query;
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const toggleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <Box sx={{ maxWidth: 1000, margin: '0 auto', p: { xs: 1, sm: 2, md: 3 } }}>
      <ProfileHeader elevation={0}>
        <CoverPhoto
          style={{
            backgroundImage: `url(${userData.coverPhoto})`,
          }}
        >
          <AvatarContainer>
            <StyledAvatar src={userData.avatar} alt={userData.name} />
          </AvatarContainer>
        </CoverPhoto>

        <ProfileInfo>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <ActionButtons>
              <Button
                variant="contained"
                color="primary"
                onClick={toggleFollow}
                sx={{ minWidth: 120 }}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </Button>
              <Button
                variant="outlined"
                startIcon={<EditIcon />}
                sx={{ ml: 1 }}
              >
                Edit Profile
              </Button>
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            </ActionButtons>
          </Box>

          <Box sx={{ mt: 6, mb: 2 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              {userData.name}
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              @{userData.username}
            </Typography>
            <Typography variant="body1" paragraph>
              {userData.bio}
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
              <Chip
                icon={<PersonPinIcon />}
                label={userData.location}
                variant="outlined"
                size="small"
              />
              <Chip
                icon={<BookmarkBorderIcon />}
                label={userData.website}
                variant="outlined"
                size="small"
                component="a"
                href={`https://${userData.website}`}
                target="_blank"
                clickable
              />
              <Chip
                label={userData.joinDate}
                variant="outlined"
                size="small"
              />
            </Box>
            <Box sx={{ display: 'flex', gap: 3, mb: 2 }}>
              <Typography variant="body2">
                <strong>{userData.posts.length}</strong> posts
              </Typography>
              <Typography variant="body2">
                <strong>{userData.followers}</strong> followers
              </Typography>
              <Typography variant="body2">
                <strong>{userData.following}</strong> following
              </Typography>
            </Box>
          </Box>
        </ProfileInfo>

        <Divider />

        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <StyledTabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="profile tabs"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab icon={<GridIcon />} label="Posts" {...a11yProps(0)} />
            <Tab icon={<BookmarkBorderIcon />} label="Saved" {...a11yProps(1)} />
            <Tab icon={<PersonPinIcon />} label="Tagged" {...a11yProps(2)} />
          </StyledTabs>
        </Box>
      </ProfileHeader>

      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={2}>
          {userData.posts.map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post.id}>
              <PostCard>
                <CardMedia
                  component="img"
                  height="300"
                  image={post.image}
                  alt={post.caption}
                />
                <CardContent sx={{ p: 2 }}>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {post.caption}
                  </Typography>
                </CardContent>
                <CardActions sx={{ px: 2, pb: 2, pt: 0 }}>
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
                      <FavoriteIcon
                        fontSize="small"
                        color="error"
                        sx={{ mr: 0.5 }}
                      />
                      <Typography variant="body2">{post.likes}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CommentIcon fontSize="small" sx={{ mr: 0.5 }} />
                      <Typography variant="body2">{post.comments}</Typography>
                    </Box>
                  </Box>
                </CardActions>
              </PostCard>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <BookmarkBorderIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            Save photos and videos that you want to see again
          </Typography>
          <Typography variant="body2" color="text.secondary" maxWidth={400} mx="auto">
            When you save, they'll appear here. Only you can see what you've saved.
          </Typography>
        </Box>
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <PersonPinIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            Photos and videos of you
          </Typography>
          <Typography variant="body2" color="text.secondary" maxWidth={400} mx="auto">
            When people tag you in photos and videos, they'll appear here.
          </Typography>
        </Box>
      </TabPanel>
    </Box>
  );
};

// TabPanel and a11yProps helper components
function TabPanel(props: {
  children?: React.ReactNode;
  index: number;
  value: number;
}) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `profile-tab-${index}`,
    'aria-controls': `profile-tabpanel-${index}`,
  };
}

export default ProfilePage;
