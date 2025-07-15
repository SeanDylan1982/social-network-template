import React, { useState } from 'react';
import {
  Box,
  Typography,
  Avatar,
  Button,
  Tabs,
  Tab,
  Divider,
  Grid,
  Card,
  CardContent,
  IconButton,
  TextField,
  InputAdornment,
  Paper,
  styled
} from '@mui/material';
import {
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  PhotoCamera as PhotoCameraIcon,
  Work as WorkIcon,
  School as SchoolIcon,
  LocationOn as LocationIcon,
  Link as LinkIcon,
  CalendarToday as CalendarIcon,
  People as PeopleIcon,
  PhotoLibrary as PhotoLibraryIcon,
  EmojiEmotions as EmojiIcon,
  Check as CheckIcon,
} from '@mui/icons-material';

// Styled Components
const ProfileHeader = styled(Box)(({ theme }) => ({
  position: 'relative',
  marginBottom: theme.spacing(2),
  '& .cover-photo': {
    width: '100%',
    height: 280,
    objectFit: 'cover',
    borderRadius: theme.shape.borderRadius,
  },
  '& .profile-info': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: -80,
    position: 'relative',
    zIndex: 1,
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      padding: theme.spacing(0, 4),
    },
  },
  '& .avatar-container': {
    position: 'relative',
    '& .MuiAvatar-root': {
      width: 150,
      height: 150,
      border: '4px solid white',
      boxShadow: theme.shadows[3],
      [theme.breakpoints.down('md')]: {
        width: 120,
        height: 120,
      },
    },
    '& .edit-avatar-btn': {
      position: 'absolute',
      bottom: 10,
      right: 10,
      backgroundColor: theme.palette.background.paper,
      '&:hover': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  },
  '& .profile-details': {
    flex: 1,
    textAlign: 'center',
    marginTop: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      textAlign: 'left',
      marginLeft: theme.spacing(3),
      marginTop: 0,
    },
    '& h1': {
      margin: 0,
      fontSize: '1.75rem',
      fontWeight: 700,
      [theme.breakpoints.down('sm')]: {
        fontSize: '1.5rem',
      },
    },
    '& p': {
      color: theme.palette.text.secondary,
      margin: '4px 0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      [theme.breakpoints.up('md')]: {
        justifyContent: 'flex-start',
      },
      '& svg': {
        marginRight: theme.spacing(1),
        fontSize: '1rem',
      },
    },
  },
  '& .profile-stats': {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing(0),
    },
    '& > *': {
      margin: theme.spacing(0, 1.5),
      textAlign: 'center',
      '& h4': {
        margin: 0,
        fontSize: '1.25rem',
        fontWeight: 600,
      },
      '& p': {
        margin: 0,
        fontSize: '0.8125rem',
        color: theme.palette.text.secondary,
      },
    },
  },
  '& .action-buttons': {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      justifyContent: 'flex-end',
      marginTop: 0,
    },
    '& .MuiButton-root': {
      marginLeft: theme.spacing(1),
      textTransform: 'none',
      borderRadius: 20,
      fontWeight: 500,
      '&:first-of-type': {
        backgroundColor: theme.palette.primary.main,
        color: 'white',
        '&:hover': {
          backgroundColor: theme.palette.primary.dark,
        },
      },
    },
  },
}));

const StyledTabs = styled(Tabs)(({ theme }) => ({
  '& .MuiTabs-indicator': {
    height: 3,
  },
  '& .MuiTab-root': {
    textTransform: 'none',
    minWidth: 'auto',
    padding: '12px 16px',
    fontSize: '0.9375rem',
    fontWeight: 500,
    '&.Mui-selected': {
      color: theme.palette.primary.main,
    },
  },
}));

const ProfileTabPanel = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3, 0),
}));

// Mock Data
const userProfile = {
  name: 'John Doe',
  username: '@johndoe',
  bio: 'Digital Designer & Developer',
  location: 'San Francisco, CA',
  website: 'johndoe.design',
  joinDate: 'Joined March 2018',
  coverPhoto: '/cover-photo.jpg',
  avatar: '/avatar-1.jpg',
  following: 542,
  followers: 1284,
  posts: 86,
  about: {
    work: [
      {
        company: 'TechCorp',
        position: 'Senior UI/UX Designer',
        duration: '2019 - Present',
      },
      {
        company: 'DesignStudio',
        position: 'UI/UX Designer',
        duration: '2017 - 2019',
      },
    ],
    education: [
      {
        school: 'Stanford University',
        degree: 'Master of Science in Computer Science',
        duration: '2015 - 2017',
      },
      {
        school: 'University of California',
        degree: 'Bachelor of Science in Design',
        duration: '2011 - 2015',
      },
    ],
  },
};

const Profile: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(userProfile);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    // In a real app, you would save the changes to the server here
  };

  const handleInputChange = (field: string, value: string) => {
    setEditedProfile({
      ...editedProfile,
      [field]: value,
    });
  };

  return (
    <Box>
      {/* Profile Header */}
      <ProfileHeader>
        <img 
          src={editedProfile.coverPhoto} 
          alt="Cover" 
          className="cover-photo"
        />
        <Box className="profile-info">
          <Box className="avatar-container">
            <Avatar 
              src={editedProfile.avatar} 
              alt={editedProfile.name} 
            />
            <IconButton 
              className="edit-avatar-btn" 
              size="small"
              onClick={() => document.getElementById('avatar-upload')?.click()}
            >
              <PhotoCameraIcon fontSize="small" />
              <input 
                type="file" 
                id="avatar-upload" 
                accept="image/*" 
                style={{ display: 'none' }} 
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      setEditedProfile({
                        ...editedProfile,
                        avatar: event.target?.result as string,
                      });
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </IconButton>
          </Box>
          
          <Box className="profile-details">
            {isEditing ? (
              <TextField
                value={editedProfile.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                variant="outlined"
                size="small"
                sx={{ mb: 1 }}
              />
            ) : (
              <Typography variant="h1">{editedProfile.name}</Typography>
            )}
            
            {isEditing ? (
              <TextField
                value={editedProfile.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                variant="outlined"
                size="small"
                fullWidth
                sx={{ mb: 1 }}
              />
            ) : (
              <Typography variant="body1">{editedProfile.bio}</Typography>
            )}
            
            <Typography variant="body2">
              <LocationIcon fontSize="inherit" />
              {isEditing ? (
                <TextField
                  value={editedProfile.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  variant="standard"
                  size="small"
                  sx={{ ml: 1, width: 200 }}
                />
              ) : (
                editedProfile.location
              )}
            </Typography>
            
            <Typography variant="body2">
              <LinkIcon fontSize="inherit" />
              {isEditing ? (
                <TextField
                  value={editedProfile.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  variant="standard"
                  size="small"
                  sx={{ ml: 1, width: 200 }}
                />
              ) : (
                <a 
                  href={`https://${editedProfile.website}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ color: 'inherit', textDecoration: 'none' }}
                >
                  {editedProfile.website}
                </a>
              )}
            </Typography>
            
            <Typography variant="body2">
              <CalendarIcon fontSize="inherit" />
              {editedProfile.joinDate}
            </Typography>
          </Box>
          
          <Box className="profile-stats">
            <Box>
              <Typography variant="h4">{editedProfile.following}</Typography>
              <Typography>Following</Typography>
            </Box>
            <Box>
              <Typography variant="h4">{editedProfile.followers}</Typography>
              <Typography>Followers</Typography>
            </Box>
            <Box>
              <Typography variant="h4">{editedProfile.posts}</Typography>
              <Typography>Posts</Typography>
            </Box>
          </Box>
          
          <Box className="action-buttons">
            {isEditing ? (
              <Button 
                variant="contained" 
                color="primary"
                onClick={handleSaveProfile}
                startIcon={<CheckIcon />}
              >
                Save Changes
              </Button>
            ) : (
              <Button 
                variant="contained" 
                color="primary"
                startIcon={<EditIcon />}
                onClick={handleEditProfile}
              >
                Edit Profile
              </Button>
            )}
            <Button 
              variant="outlined" 
              color="primary"
              startIcon={<PeopleIcon />}
              onClick={() => setTabValue(2)}
            >
              Friends
            </Button>
          </Box>
        </Box>
      </ProfileHeader>
      
      {/* Tabs */}
      <Paper elevation={0} sx={{ borderRadius: 2, mb: 3, overflow: 'hidden' }}>
        <StyledTabs
          value={tabValue}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="profile tabs"
        >
          <Tab label="Timeline" />
          <Tab label="About" />
          <Tab label="Friends" />
          <Tab label="Photos" />
          <Tab label="Videos" />
          <Tab label="More" />
        </StyledTabs>
      </Paper>
      
      {/* Tab Panels */}
      <ProfileTabPanel hidden={tabValue !== 0}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            {/* Create Post */}
            <Card sx={{ mb: 3, p: 2 }}>
              <Box display="flex" alignItems="center" mb={2}>
                <Avatar src={editedProfile.avatar} alt={editedProfile.name} sx={{ mr: 1.5 }} />
                <TextField
                  fullWidth
                  placeholder="What's on your mind?"
                  variant="outlined"
                  size="small"
                  InputProps={{
                    sx: { borderRadius: 4 },
                  }}
                />
              </Box>
              <Divider sx={{ my: 1.5 }} />
              <Box display="flex" justifyContent="space-between">
                <Button startIcon={<PhotoLibraryIcon color="error" />}>Photo/Video</Button>
                <Button startIcon={<PeopleIcon color="primary" />}>Tag Friends</Button>
                <Button startIcon={<EmojiIcon color="warning" />}>Feeling/Activity</Button>
                <Button 
                  variant="contained" 
                  color="primary" 
                  size="small"
                  sx={{ borderRadius: 4, px: 3 }}
                >
                  Post
                </Button>
              </Box>
            </Card>
            
            {/* Posts */}
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>Recent Activity</Typography>
                <Typography color="textSecondary" variant="body2">
                  No recent activity to show
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </ProfileTabPanel>
      
      <ProfileTabPanel hidden={tabValue !== 1}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="h6">Work and Education</Typography>
                  <IconButton size="small">
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Box>
                
                <Box mb={3}>
                  <Typography variant="subtitle2" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                    <WorkIcon sx={{ mr: 1, color: 'primary.main' }} /> Work
                  </Typography>
                  {editedProfile.about.work.map((job, index) => (
                    <Box key={index} display="flex" alignItems="flex-start" mb={2}>
                      <WorkIcon sx={{ mr: 1.5, mt: 0.5, color: 'primary.main' }} />
                      <Box>
                        <Typography variant="subtitle1">{job.position}</Typography>
                        <Typography>{job.company}</Typography>
                        <Typography variant="caption" color="textSecondary">{job.duration}</Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
                
                <Box>
                  <Typography variant="subtitle2" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                    <SchoolIcon sx={{ mr: 1, color: 'primary.main' }} /> Education
                  </Typography>
                  {editedProfile.about.education.map((edu, index) => (
                    <Box key={index} display="flex" alignItems="flex-start" mb={2}>
                      <SchoolIcon sx={{ mr: 1.5, mt: 0.5, color: 'primary.main' }} />
                      <Box>
                        <Typography variant="subtitle1">{edu.degree}</Typography>
                        <Typography>{edu.school}</Typography>
                        <Typography variant="caption" color="textSecondary">{edu.duration}</Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="h6">Contact Information</Typography>
                  <IconButton size="small">
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Box>
                
                <Box display="flex" alignItems="flex-start" mb={2}>
                  <LocationIcon sx={{ mr: 1.5, mt: 0.5, color: 'primary.main' }} />
                  <Box>
                    <Typography variant="subtitle1">Location</Typography>
                    <Typography>{editedProfile.location}</Typography>
                  </Box>
                </Box>
                
                <Box display="flex" alignItems="flex-start" mb={2}>
                  <LinkIcon sx={{ mr: 1.5, mt: 0.5, color: 'primary.main' }} />
                  <Box>
                    <Typography variant="subtitle1">Website</Typography>
                    <a 
                      href={`https://${editedProfile.website}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      {editedProfile.website}
                    </a>
                  </Box>
                </Box>
                
                <Box display="flex" alignItems="flex-start">
                  <CalendarIcon sx={{ mr: 1.5, mt: 0.5, color: 'primary.main' }} />
                  <Box>
                    <Typography variant="subtitle1">Joined</Typography>
                    <Typography>{editedProfile.joinDate}</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </ProfileTabPanel>
      
      <ProfileTabPanel hidden={tabValue !== 2}>
        <Typography>Friends content will go here</Typography>
      </ProfileTabPanel>
      
      <ProfileTabPanel hidden={tabValue !== 3}>
        <Typography>Photos content will go here</Typography>
      </ProfileTabPanel>
      
      <ProfileTabPanel hidden={tabValue !== 4}>
        <Typography>Videos content will go here</Typography>
      </ProfileTabPanel>
      
      <ProfileTabPanel hidden={tabValue !== 5}>
        <Typography>More content will go here</Typography>
      </ProfileTabPanel>
    </Box>
  );
};

export default Profile;
