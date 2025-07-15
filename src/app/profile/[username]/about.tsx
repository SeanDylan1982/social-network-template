import React from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Typography,
  Avatar,
  Paper,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  useTheme,
  useMediaQuery,
  Button,
} from '@mui/material';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Cake as CakeIcon,
  LocationOn as LocationIcon,
  Work as WorkIcon,
  School as SchoolIcon,
  Language as LanguageIcon,
  Link as LinkIcon,
  Edit as EditIcon,
} from '@mui/icons-material';

// Mock user data - in a real app, this would come from an API
const userData = {
  name: 'John Doe',
  username: 'johndoe',
  avatar: '/avatar-1.jpg',
  coverPhoto: '/cover-photo.jpg',
  bio: 'Digital creator | Photography enthusiast | Travel lover ✈️',
  location: 'San Francisco, CA',
  website: 'johndoe.design',
  joinDate: 'March 2023',
  
  // About section
  about: {
    bio: 'I am a passionate digital creator with a love for photography and travel. I enjoy capturing beautiful moments and sharing them with the world. When I\'m not behind the camera, you can find me exploring new places or working on creative projects.',
    work: [
      { company: 'Creative Studio', position: 'Lead Designer', duration: '2020 - Present' },
      { company: 'Digital Agency', position: 'UI/UX Designer', duration: '2018 - 2020' },
    ],
    education: [
      { school: 'University of Design', degree: 'BFA in Graphic Design', year: '2018' },
    ],
    languages: ['English (Native)', 'Spanish (Intermediate)'],
    skills: [
      'UI/UX Design', 'Photography', 'Web Development', 'Branding',
      'Illustration', '3D Modeling', 'Motion Graphics', 'Video Editing'
    ],
    interests: [
      'Photography', 'Travel', 'Technology', 'Art', 'Music', 'Reading', 'Hiking'
    ],
  },
  contact: {
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    social: {
      twitter: 'johndoe',
      instagram: 'johndoe',
      linkedin: 'in/johndoe',
      github: 'johndoe',
    },
  },
};

const AboutPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const router = useRouter();
  const { username } = router.query;

  const handleEditProfile = () => {
    // Navigate to edit profile page
    router.push(`/profile/${username}/edit`);
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
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            p: 3,
            position: 'relative',
          }}
        >
          <Typography variant="h5" component="h1" sx={{ fontWeight: 600 }}>
            About
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            Learn more about {userData.name}
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<EditIcon />}
            onClick={handleEditProfile}
            sx={{
              position: 'absolute',
              right: 16,
              top: 16,
              textTransform: 'none',
              borderRadius: 2,
              px: 2,
              py: 1,
              fontWeight: 600,
              boxShadow: theme.shadows[2],
              '&:hover': {
                boxShadow: theme.shadows[4],
              },
            }}
          >
            Edit Profile
          </Button>
        </Box>

        <Box sx={{ p: { xs: 2, md: 3 } }}>
          <Grid container spacing={4}>
            {/* Left Column */}
            <Grid item xs={12} md={8}>
              {/* Bio Section */}
              <Section title="Bio">
                <Typography variant="body1" color="text.secondary" paragraph>
                  {userData.about.bio}
                </Typography>
              </Section>

              <Divider sx={{ my: 3 }} />

              {/* Work Experience */}
              <Section title="Work Experience">
                <List disablePadding>
                  {userData.about.work.map((job, index) => (
                    <ListItem key={index} disableGutters sx={{ px: 0, py: 1.5 }}>
                      <ListItemIcon sx={{ minWidth: 40, color: 'primary.main' }}>
                        <WorkIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <>
                            <Typography variant="subtitle1" component="span" fontWeight={600}>
                              {job.position}
                            </Typography>
                            {' at '}
                            <Typography variant="subtitle1" component="span" color="primary">
                              {job.company}
                            </Typography>
                          </>
                        }
                        secondary={job.duration}
                        secondaryTypographyProps={{ color: 'text.secondary' }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Section>

              <Divider sx={{ my: 3 }} />

              {/* Education */}
              <Section title="Education">
                <List disablePadding>
                  {userData.about.education.map((edu, index) => (
                    <ListItem key={index} disableGutters sx={{ px: 0, py: 1.5 }}>
                      <ListItemIcon sx={{ minWidth: 40, color: 'primary.main' }}>
                        <SchoolIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <>
                            <Typography variant="subtitle1" component="span" fontWeight={600}>
                              {edu.degree}
                            </Typography>
                            {' at '}
                            <Typography variant="subtitle1" component="span" color="primary">
                              {edu.school}
                            </Typography>
                          </>
                        }
                        secondary={edu.year}
                        secondaryTypographyProps={{ color: 'text.secondary' }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Section>
            </Grid>

            {/* Right Column */}
            <Grid item xs={12} md={4}>
              {/* Details Card */}
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  bgcolor: 'background.paper',
                  border: `1px solid ${theme.palette.divider}`,
                  mb: 3,
                }}
              >
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, display: 'flex', alignItems: 'center' }}>
                  <PersonIcon sx={{ mr: 1, color: 'primary.main' }} />
                  Details
                </Typography>
                
                <List disablePadding>
                  <ListItem disableGutters sx={{ px: 0, py: 1 }}>
                    <ListItemIcon sx={{ minWidth: 36, color: 'text.secondary' }}>
                      <LocationIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Location"
                      secondary={userData.location}
                      secondaryTypographyProps={{ color: 'text.primary' }}
                    />
                  </ListItem>
                  
                  <ListItem disableGutters sx={{ px: 0, py: 1 }}>
                    <ListItemIcon sx={{ minWidth: 36, color: 'text.secondary' }}>
                      <CakeIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Joined"
                      secondary={userData.joinDate}
                      secondaryTypographyProps={{ color: 'text.primary' }}
                    />
                  </ListItem>
                  
                  <ListItem disableGutters sx={{ px: 0, py: 1 }}>
                    <ListItemIcon sx={{ minWidth: 36, color: 'text.secondary' }}>
                      <LanguageIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Languages"
                      secondary={
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
                          {userData.about.languages.map((lang, i) => (
                            <Chip
                              key={i}
                              label={lang}
                              size="small"
                              variant="outlined"
                              sx={{ borderRadius: 1, fontSize: '0.75rem' }}
                            />
                          ))}
                        </Box>
                      }
                      sx={{ '& .MuiListItemText-primary': { mb: 0.5 } }}
                    />
                  </ListItem>
                  
                  <ListItem disableGutters sx={{ px: 0, py: 1 }}>
                    <ListItemIcon sx={{ minWidth: 36, color: 'text.secondary' }}>
                      <LinkIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Website"
                      secondary={
                        <Link
                          href={`https://${userData.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          color="primary"
                          underline="hover"
                        >
                          {userData.website}
                        </Link>
                      }
                      secondaryTypographyProps={{ component: 'div' }}
                    />
                  </ListItem>
                </List>
              </Paper>

              {/* Skills */}
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  bgcolor: 'background.paper',
                  border: `1px solid ${theme.palette.divider}`,
                  mb: 3,
                }}
              >
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  Skills & Expertise
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                  {userData.about.skills.map((skill, index) => (
                    <Chip
                      key={index}
                      label={skill}
                      color="primary"
                      variant="outlined"
                      size="small"
                      sx={{ borderRadius: 1, fontWeight: 500 }}
                    />
                  ))}
                </Box>
              </Paper>

              {/* Interests */}
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  bgcolor: 'background.paper',
                  border: `1px solid ${theme.palette.divider}`,
                }}
              >
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  Interests
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                  {userData.about.interests.map((interest, index) => (
                    <Chip
                      key={index}
                      label={interest}
                      variant="outlined"
                      size="small"
                      sx={{ borderRadius: 1 }}
                    />
                  ))}
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};

// Reusable Section component
const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <Box sx={{ mb: 4 }}>
    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, display: 'flex', alignItems: 'center' }}>
      {title}
    </Typography>
    {children}
  </Box>
);

export default AboutPage;
