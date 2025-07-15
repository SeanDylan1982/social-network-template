import React from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Typography,
  Avatar,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Button,
  useTheme,
  Divider,
  Badge,
  Skeleton,
  useMediaQuery,
} from '@mui/material';
import {
  Cake as CakeIcon,
  Favorite as HeartIcon,
  Event as EventIcon,
  MoreVert as MoreVertIcon,
  Star as StarIcon,
  EmojiEvents as TrophyIcon,
  Work as WorkIcon,
  School as SchoolIcon,
  LocalFireDepartment as FireIcon,
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';
import { format } from 'date-fns';

// Types
type CelebrationType = 'birthday' | 'anniversary' | 'work' | 'achievement' | 'education' | 'other';

interface Celebration {
  id: string;
  type: CelebrationType;
  title: string;
  description: string;
  date: Date;
  user?: {
    id: string;
    name: string;
    avatar?: string;
    username?: string;
  };
  isToday?: boolean;
  isUpcoming?: boolean;
  years?: number;
  image?: string;
}

// Mock data - replace with real data from your API
const mockCelebrations: Celebration[] = [
  {
    id: '1',
    type: 'birthday',
    title: 'Birthday',
    description: "It's Sarah's birthday today!",
    date: new Date(),
    user: {
      id: 'user1',
      name: 'Sarah Johnson',
      username: 'sarahj',
      avatar: '/avatars/1.jpg',
    },
    isToday: true,
    years: 28,
  },
  {
    id: '2',
    type: 'anniversary',
    title: 'Work Anniversary',
    description: 'Celebrating 5 years at Company Inc.',
    date: new Date(),
    user: {
      id: 'user2',
      name: 'Michael Chen',
      username: 'michaelc',
      avatar: '/avatars/2.jpg',
    },
    isToday: true,
    years: 5,
  },
  {
    id: '3',
    type: 'birthday',
    title: 'Birthday',
    description: 'Wish Alex a happy birthday tomorrow!',
    date: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
    user: {
      id: 'user3',
      name: 'Alex Morgan',
      username: 'alexm',
      avatar: '/avatars/3.jpg',
    },
    isUpcoming: true,
    years: 32,
  },
  {
    id: '4',
    type: 'achievement',
    title: 'Achievement Unlocked',
    description: 'Completed 100 days of coding!',
    date: new Date(),
    user: {
      id: 'user4',
      name: 'Jamie Wilson',
      username: 'jamiew',
      avatar: '/avatars/4.jpg',
    },
    isToday: true,
  },
  {
    id: '5',
    type: 'education',
    title: 'Graduation',
    description: 'Congratulations on your graduation!',
    date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    user: {
      id: 'user5',
      name: 'Taylor Swift',
      username: 'taylors',
      avatar: '/avatars/5.jpg',
    },
    isUpcoming: true,
  },
];

const getCelebrationIcon = (type: CelebrationType) => {
  switch (type) {
    case 'birthday':
      return <CakeIcon color="primary" />;
    case 'anniversary':
      return <HeartIcon color="error" />;
    case 'work':
      return <WorkIcon color="info" />;
    case 'achievement':
      return <TrophyIcon color="warning" />;
    case 'education':
      return <SchoolIcon color="success" />;
    default:
      return <EventIcon color="action" />;
  }
};

const getCelebrationColor = (type: CelebrationType, theme: any) => {
  switch (type) {
    case 'birthday':
      return theme.palette.primary.main;
    case 'anniversary':
      return theme.palette.error.main;
    case 'work':
      return theme.palette.info.main;
    case 'achievement':
      return theme.palette.warning.main;
    case 'education':
      return theme.palette.success.main;
    default:
      return theme.palette.text.primary;
  }
};

const Celebrations: React.FC = () => {
  const theme = useTheme();
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [expanded, setExpanded] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  // Filter celebrations
  const todayCelebrations = mockCelebrations.filter(c => c.isToday);
  const upcomingCelebrations = mockCelebrations.filter(c => c.isUpcoming);
  const showViewAll = todayCelebrations.length + upcomingCelebrations.length > 2;
  const displayCelebrations = expanded ? [...todayCelebrations, ...upcomingCelebrations] : 
    [...todayCelebrations, ...upcomingCelebrations].slice(0, 2);

  const handleViewProfile = (username: string) => {
    router.push(`/profile/${username}`);
  };

  const handleViewAll = () => {
    setExpanded(!expanded);
  };

  const handleWish = (id: string) => {
    console.log(`Wishing for celebration ${id}`);
    // Implement wish functionality
  };

  const handleRemindMe = (id: string) => {
    console.log(`Setting reminder for celebration ${id}`);
    // Implement reminder functionality
  };

  if (isLoading) {
    return (
      <Card sx={{ mb: 3, borderRadius: 2, boxShadow: 1 }}>
        <CardHeader
          title={
            <Skeleton variant="text" width="40%" height={28} sx={{ bgcolor: 'grey.200' }} />
          }
          action={
            <Skeleton variant="circular" width={32} height={32} sx={{ bgcolor: 'grey.200' }} />
          }
        />
        <CardContent>
          {[1, 2].map((item) => (
            <Box key={item} sx={{ mb: 2 }}>
              <Box display="flex" alignItems="center" mb={1}>
                <Skeleton variant="circular" width={48} height={48} sx={{ bgcolor: 'grey.200' }} />
                <Box ml={2} flexGrow={1}>
                  <Skeleton variant="text" width="60%" height={20} sx={{ bgcolor: 'grey.200' }} />
                  <Skeleton variant="text" width="80%" height={16} sx={{ bgcolor: 'grey.200' }} />
                </Box>
              </Box>
              <Box display="flex" justifyContent="space-between" mt={1}>
                <Skeleton variant="rectangular" width="48%" height={36} sx={{ borderRadius: 1, bgcolor: 'grey.200' }} />
                <Skeleton variant="rectangular" width="48%" height={36} sx={{ borderRadius: 1, bgcolor: 'grey.200' }} />
              </Box>
            </Box>
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ mb: 3, borderRadius: 2, boxShadow: 1, overflow: 'visible' }}>
      <CardHeader
        title={
          <Box display="flex" alignItems="center">
            <FireIcon sx={{ color: theme.palette.warning.main, mr: 1 }} />
            <Typography variant="h6" component="div">
              Celebrations
            </Typography>
          </Box>
        }
        titleTypographyProps={{
          variant: 'h6',
          fontWeight: 600,
        }}
        action={
          <IconButton aria-label="settings" size="small">
            <MoreVertIcon />
          </IconButton>
        }
        sx={{
          '& .MuiCardHeader-action': {
            alignSelf: 'center',
            m: 0,
          },
          pb: 1,
        }}
      />
      
      <Divider />
      
      <CardContent sx={{ pt: 1, pb: '8px !important' }}>
        {displayCelebrations.length === 0 ? (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            py={4}
            textAlign="center"
          >
            <EventIcon
              sx={{
                fontSize: 48,
                color: 'text.disabled',
                mb: 2,
                opacity: 0.5,
              }}
            />
            <Typography variant="body1" color="textSecondary" gutterBottom>
              No celebrations today
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Check back later for upcoming events
            </Typography>
          </Box>
        ) : (
          <>
            {displayCelebrations.map((celebration) => (
              <Box key={celebration.id} mb={2}>
                <Box display="flex" alignItems="flex-start" mb={1}>
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    badgeContent={
                      <Box
                        sx={{
                          bgcolor: getCelebrationColor(celebration.type, theme),
                          color: theme.palette.getContrastText(
                            getCelebrationColor(celebration.type, theme)
                          ),
                          borderRadius: '50%',
                          width: 24,
                          height: 24,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: `2px solid ${theme.palette.background.paper}`,
                          '& svg': {
                            fontSize: '0.9rem',
                          },
                        }}
                      >
                        {getCelebrationIcon(celebration.type)}
                      </Box>
                    }
                  >
                    <Avatar
                      src={celebration.user?.avatar}
                      alt={celebration.user?.name}
                      sx={{
                        width: 56,
                        height: 56,
                        border: `2px solid ${theme.palette.primary.light}`,
                        cursor: 'pointer',
                        '&:hover': {
                          transform: 'scale(1.05)',
                          transition: 'transform 0.2s ease-in-out',
                        },
                      }}
                      onClick={() => celebration.user?.username && handleViewProfile(celebration.user.username)}
                    >
                      {celebration.user?.name?.charAt(0) || 'U'}
                    </Avatar>
                  </Badge>
                  
                  <Box ml={2} flexGrow={1}>
                    <Box display="flex" alignItems="center" mb={0.5}>
                      <Typography
                        variant="subtitle2"
                        fontWeight={600}
                        sx={{
                          cursor: 'pointer',
                          '&:hover': {
                            textDecoration: 'underline',
                            color: theme.palette.primary.main,
                          },
                        }}
                        onClick={() => celebration.user?.username && handleViewProfile(celebration.user.username)}
                      >
                        {celebration.user?.name}
                      </Typography>
                      {celebration.years && (
                        <Box
                          sx={{
                            bgcolor: theme.palette.grey[200],
                            color: theme.palette.text.primary,
                            borderRadius: 1,
                            px: 1,
                            ml: 1,
                            fontSize: '0.7rem',
                            fontWeight: 600,
                          }}
                        >
                          {celebration.years} {celebration.years === 1 ? 'year' : 'years'}
                        </Box>
                      )}
                    </Box>
                    
                    <Typography variant="body2" color="text.primary" fontWeight={500} mb={0.5}>
                      {celebration.title}
                    </Typography>
                    
                    <Typography variant="body2" color="text.secondary" mb={1.5}>
                      {celebration.description}
                    </Typography>
                    
                    <Box display="flex" gap={1} flexWrap={isMobile ? 'wrap' : 'nowrap'}>
                      <Button
                        variant="contained"
                        size="small"
                        color="primary"
                        startIcon={<StarIcon />}
                        onClick={() => handleWish(celebration.id)}
                        fullWidth={isMobile}
                        sx={{
                          borderRadius: 2,
                          textTransform: 'none',
                          fontWeight: 500,
                          px: 2,
                          py: 0.5,
                          '& .MuiButton-startIcon': {
                            mr: 0.5,
                          },
                        }}
                      >
                        {celebration.isToday ? 'Send Wishes' : 'Pre-wish'}
                      </Button>
                      
                      <Button
                        variant="outlined"
                        size="small"
                        color="inherit"
                        onClick={() => handleRemindMe(celebration.id)}
                        fullWidth={isMobile}
                        sx={{
                          borderRadius: 2,
                          textTransform: 'none',
                          fontWeight: 500,
                          px: 2,
                          py: 0.5,
                          color: 'text.secondary',
                          borderColor: 'divider',
                          '&:hover': {
                            borderColor: 'text.secondary',
                            bgcolor: 'transparent',
                          },
                        }}
                      >
                        Remind me
                      </Button>
                    </Box>
                  </Box>
                </Box>
                
                {celebration !== displayCelebrations[displayCelebrations.length - 1] && (
                  <Divider sx={{ my: 2, opacity: 0.5 }} />
                )}
              </Box>
            ))}
            
            {showViewAll && (
              <Box textAlign="center" mt={1}>
                <Button
                  size="small"
                  color="primary"
                  endIcon={
                    <ChevronRightIcon
                      sx={{
                        transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s ease-in-out',
                      }}
                    />
                  }
                  onClick={handleViewAll}
                  sx={{
                    textTransform: 'none',
                    fontWeight: 500,
                    '&:hover': {
                      bgcolor: 'transparent',
                    },
                  }}
                >
                  {expanded ? 'Show less' : `View all (${todayCelebrations.length + upcomingCelebrations.length})`}
                </Button>
              </Box>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default Celebrations;
