import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  IconButton,
  Chip,
  useTheme,
  useMediaQuery,
  Button,
  Card,
  CardContent,
  Grid,
} from '@mui/material';
import {
  Favorite as LikeIcon,
  ChatBubbleOutline as CommentIcon,
  Share as ShareIcon,
  Bookmark as BookmarkIcon,
  PersonAdd as FollowIcon,
  MoreVert as MoreIcon,
  Event as EventIcon,
  BarChart as StatsIcon,
  Notifications as NotificationIcon,
  ThumbUp as ThumbUpIcon,
  Comment as CommentFilledIcon,
  Share as ShareFilledIcon,
  Bookmark as BookmarkFilledIcon,
} from '@mui/icons-material';

// Mock data for activity feed
const activityData = [
  {
    id: 1,
    type: 'like',
    user: {
      name: 'Jane Smith',
      username: 'janesmith',
      avatar: '/avatar-2.jpg',
    },
    post: {
      id: 'post123',
      content: 'Beautiful day at the beach! 🏖️ #summer #vacation',
      image: '/post-1.jpg',
      timestamp: '2h ago',
    },
    timestamp: '5 minutes ago',
    read: false,
  },
  {
    id: 2,
    type: 'comment',
    user: {
      name: 'Mike Johnson',
      username: 'mikej',
      avatar: '/avatar-3.jpg',
    },
    post: {
      id: 'post456',
      content: 'Working on some new projects. Stay tuned! #design #work',
      timestamp: '1d ago',
    },
    comment: 'This looks amazing! Can\'t wait to see the final result.',
    timestamp: '1 hour ago',
    read: false,
  },
  {
    id: 3,
    type: 'follow',
    user: {
      name: 'Sarah Wilson',
      username: 'sarahw',
      avatar: '/avatar-4.jpg',
    },
    timestamp: '3 hours ago',
    read: true,
  },
  {
    id: 4,
    type: 'like',
    user: {
      name: 'Alex Chen',
      username: 'alexc',
      avatar: '/avatar-5.jpg',
    },
    post: {
      id: 'post789',
      content: 'Throwback to my trip to Japan last year. Can\'t wait to go back! ✈️ #japan #travel',
      image: '/post-3.jpg',
      timestamp: '3d ago',
    },
    timestamp: '5 hours ago',
    read: true,
  },
  {
    id: 5,
    type: 'share',
    user: {
      name: 'Emily Davis',
      username: 'emilyd',
      avatar: '/avatar-6.jpg',
    },
    post: {
      id: 'post101',
      content: 'Just published my latest article on design systems. Check it out!',
      timestamp: '5h ago',
    },
    timestamp: '1 day ago',
    read: true,
  },
];

// Mock stats data
const statsData = {
  posts: 42,
  likes: 1247,
  comments: 328,
  shares: 156,
  followers: 1287,
  following: 542,
  weeklyActivity: [12, 19, 15, 8, 12, 15, 10], // Last 7 days
  topPosts: [
    { id: 'post123', likes: 124, comments: 23, shares: 15 },
    { id: 'post456', likes: 89, comments: 12, shares: 5 },
    { id: 'post789', likes: 215, comments: 42, shares: 28 },
  ],
};

const ActivityPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const router = useRouter();
  const { username } = router.query;
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'like':
        return <ThumbUpIcon color="primary" sx={{ fontSize: 20 }} />;
      case 'comment':
        return <CommentFilledIcon color="primary" sx={{ fontSize: 20 }} />;
      case 'share':
        return <ShareFilledIcon color="primary" sx={{ fontSize: 20 }} />;
      case 'follow':
        return <FollowIcon color="primary" sx={{ fontSize: 20 }} />;
      default:
        return <NotificationIcon color="primary" sx={{ fontSize: 20 }} />;
    }
  };

  const getActivityText = (activity: any) => {
    switch (activity.type) {
      case 'like':
        return 'liked your post';
      case 'comment':
        return 'commented on your post';
      case 'share':
        return 'shared your post';
      case 'follow':
        return 'started following you';
      default:
        return 'interacted with your content';
    }
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: { xs: 1, sm: 2, md: 3 } }}>
      <Paper
        elevation={0}
        sx={{
          borderRadius: 2,
          overflow: 'hidden',
          mb: 3,
          boxShadow: theme.shadows[1],
        }}
      >
        {/* Header */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            p: 3,
            borderBottom: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="h5" component="h1" sx={{ fontWeight: 600 }}>
                Activity
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Your recent interactions and notifications
              </Typography>
            </Box>
            <Button
              variant="outlined"
              size="small"
              startIcon={<StatsIcon />}
              onClick={() => router.push(`/profile/${username}/stats`)}
              sx={{ textTransform: 'none', borderRadius: 2 }}
            >
              View Stats
            </Button>
          </Box>

          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant={isMobile ? 'scrollable' : 'standard'}
            scrollButtons="auto"
            allowScrollButtonsMobile
            sx={{
              mt: 2,
              '& .MuiTabs-indicator': {
                height: 3,
              },
              '& .MuiTab-root': {
                textTransform: 'none',
                minWidth: 'auto',
                px: 2,
                py: 1,
                mr: 1,
                '&.Mui-selected': {
                  fontWeight: 600,
                },
              },
            }}
          >
            <Tab label="All Activity" />
            <Tab label="Likes" />
            <Tab label="Comments" />
            <Tab label="Mentions" />
            <Tab label="Follows" />
          </Tabs>
        </Box>

        <Grid container>
          {/* Main Content */}
          <Grid item xs={12} md={8}>
            <Box sx={{ p: { xs: 2, md: 3 } }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                Recent Activity
              </Typography>
              
              <List disablePadding>
                {activityData.map((activity) => (
                  <React.Fragment key={activity.id}>
                    <ListItem
                      alignItems="flex-start"
                      sx={{
                        px: 0,
                        py: 2,
                        bgcolor: !activity.read ? 'action.hover' : 'transparent',
                        borderRadius: 1,
                        '&:hover': {
                          bgcolor: 'action.hover',
                        },
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar
                          src={activity.user.avatar}
                          alt={activity.user.name}
                          sx={{
                            width: 48,
                            height: 48,
                            border: `2px solid ${!activity.read ? theme.palette.primary.main : 'transparent'}`,
                          }}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                            <Typography
                              component="span"
                              variant="subtitle2"
                              sx={{ fontWeight: 600, mr: 1 }}
                            >
                              {activity.user.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              @{activity.user.username}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
                              {getActivityIcon(activity.type)}
                              <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{ ml: 1 }}
                              >
                                {activity.timestamp}
                              </Typography>
                            </Box>
                          </Box>
                        }
                        secondary={
                          <Box>
                            <Typography
                              component="span"
                              variant="body2"
                              color="text.secondary"
                              sx={{ display: 'block', mb: 1 }}
                            >
                              {getActivityText(activity)}
                            </Typography>
                            
                            {activity.type === 'comment' && activity.comment && (
                              <Paper
                                elevation={0}
                                sx={{
                                  p: 2,
                                  bgcolor: 'background.paper',
                                  borderRadius: 2,
                                  border: `1px solid ${theme.palette.divider}`,
                                  mb: 1,
                                }}
                              >
                                <Typography variant="body2">{activity.comment}</Typography>
                              </Paper>
                            )}
                            
                            {(activity.type === 'like' || activity.type === 'share') && activity.post && (
                              <Paper
                                elevation={0}
                                sx={{
                                  p: 2,
                                  bgcolor: 'background.paper',
                                  borderRadius: 2,
                                  border: `1px solid ${theme.palette.divider}`,
                                  display: 'flex',
                                  alignItems: 'center',
                                }}
                              >
                                {activity.post.image && (
                                  <Box
                                    component="img"
                                    src={activity.post.image}
                                    alt="Post"
                                    sx={{
                                      width: 60,
                                      height: 60,
                                      borderRadius: 1,
                                      objectFit: 'cover',
                                      mr: 2,
                                    }}
                                  />
                                )}
                                <Box sx={{ flex: 1, minWidth: 0 }}>
                                  <Typography
                                    variant="body2"
                                    sx={{
                                      whiteSpace: 'nowrap',
                                      overflow: 'hidden',
                                      textOverflow: 'ellipsis',
                                    }}
                                  >
                                    {activity.post.content}
                                  </Typography>
                                  <Typography variant="caption" color="text.secondary">
                                    {activity.post.timestamp}
                                  </Typography>
                                </Box>
                              </Paper>
                            )}
                          </Box>
                        }
                        disableTypography
                      />
                      <IconButton size="small" sx={{ ml: 1, alignSelf: 'flex-start' }}>
                        <MoreIcon fontSize="small" />
                      </IconButton>
                    </ListItem>
                    <Divider component="li" sx={{ my: 1 }} />
                  </React.Fragment>
                ))}
              </List>
              
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  sx={{ textTransform: 'none', borderRadius: 2 }}
                >
                  Load More Activity
                </Button>
              </Box>
            </Box>
          </Grid>
          
          {/* Sidebar */}
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                p: 3,
                borderLeft: { md: `1px solid ${theme.palette.divider}` },
                borderTop: { xs: `1px solid ${theme.palette.divider}`, md: 'none' },
                height: '100%',
              }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                Activity Summary
              </Typography>
              
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={6} sm={3} md={6}>
                  <StatCard
                    icon={<ThumbUpIcon color="primary" />}
                    value={statsData.likes}
                    label="Likes"
                  />
                </Grid>
                <Grid item xs={6} sm={3} md={6}>
                  <StatCard
                    icon={<CommentFilledIcon color="primary" />}
                    value={statsData.comments}
                    label="Comments"
                  />
                </Grid>
                <Grid item xs={6} sm={3} md={6}>
                  <StatCard
                    icon={<ShareFilledIcon color="primary" />}
                    value={statsData.shares}
                    label="Shares"
                  />
                </Grid>
                <Grid item xs={6} sm={3} md={6}>
                  <StatCard
                    icon={<BookmarkFilledIcon color="primary" />}
                    value={statsData.posts}
                    label="Posts"
                  />
                </Grid>
              </Grid>
              
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, mt: 3 }}>
                Weekly Activity
              </Typography>
              <Box
                sx={{
                  height: 120,
                  display: 'flex',
                  alignItems: 'flex-end',
                  gap: 1,
                  mb: 3,
                }}
              >
                {statsData.weeklyActivity.map((value, index) => (
                  <Box
                    key={index}
                    sx={{
                      flex: 1,
                      height: `${(value / 20) * 100}%`,
                      bgcolor: 'primary.main',
                      borderRadius: 1,
                      position: 'relative',
                      '&::after': {
                        content: `"${value}"`,
                        position: 'absolute',
                        top: -20,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        fontSize: 10,
                        color: 'text.secondary',
                      },
                    }}
                  />
                ))}
              </Box>
              
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
                Top Posts
              </Typography>
              <List disablePadding>
                {statsData.topPosts.map((post, index) => (
                  <ListItem
                    key={index}
                    disableGutters
                    sx={{
                      px: 0,
                      py: 1,
                      '&:not(:last-child)': {
                        borderBottom: `1px dashed ${theme.palette.divider}`,
                      },
                    }}
                  >
                    <ListItemText
                      primary={
                        <Typography variant="body2" noWrap>
                          Post #{post.id}
                        </Typography>
                      }
                      secondary={
                        <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                          <Chip
                            size="small"
                            icon={<ThumbUpIcon fontSize="small" />}
                            label={post.likes}
                            variant="outlined"
                            sx={{ borderRadius: 1 }}
                          />
                          <Chip
                            size="small"
                            icon={<CommentFilledIcon fontSize="small" />}
                            label={post.comments}
                            variant="outlined"
                            sx={{ borderRadius: 1 }}
                          />
                          <Chip
                            size="small"
                            icon={<ShareFilledIcon fontSize="small" />}
                            label={post.shares}
                            variant="outlined"
                            sx={{ borderRadius: 1 }}
                          />
                        </Box>
                      }
                      secondaryTypographyProps={{ component: 'div' }}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

// Stat Card Component
const StatCard: React.FC<{ icon: React.ReactNode; value: number; label: string }> = ({
  icon,
  value,
  label,
}) => (
  <Card
    elevation={0}
    sx={{
      p: 2,
      textAlign: 'center',
      borderRadius: 2,
      bgcolor: 'background.paper',
      border: `1px solid ${useTheme().palette.divider}`,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Box
      sx={{
        width: 40,
        height: 40,
        borderRadius: '50%',
        bgcolor: 'primary.light',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mb: 1,
        color: 'primary.contrastText',
      }}
    >
      {icon}
    </Box>
    <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
      {value.toLocaleString()}
    </Typography>
    <Typography variant="caption" color="text.secondary">
      {label}
    </Typography>
  </Card>
);

export default ActivityPage;
