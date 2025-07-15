import { useState } from 'react';
import { useRouter } from 'next/router';
import { Group } from '@/types/group';
import {
  Box,
  IconButton,
  Button,
  Typography,
  Avatar,
  Chip,
  Menu,
  MenuItem,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  MoreVert as MoreVertIcon,
  Notifications as NotificationsIcon,
  NotificationsActive as NotificationsActiveIcon,
  Edit as EditIcon,
  Settings as SettingsIcon,
  ExitToApp as ExitToAppIcon,
  Report as ReportIcon,
  Link as LinkIcon,
  Lock as LockIcon,
  Public as PublicIcon,
  Group as GroupIcon,
} from '@mui/icons-material';

interface GroupHeaderProps {
  group: Group;
  isMember: boolean;
  isAdmin: boolean;
  onJoin: () => void;
  onLeave: () => void;
}

const GroupHeader: React.FC<GroupHeaderProps> = ({
  group,
  isMember,
  isAdmin,
  onJoin,
  onLeave,
}) => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isNotificationsOn, setIsNotificationsOn] = useState(true);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleToggleNotifications = () => {
    setIsNotificationsOn(!isNotificationsOn);
    // In a real app, update notification preferences via API
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <Box sx={{ position: 'relative', mb: 4 }}>
      {/* Cover Image */}
      <Box
        sx={{
          height: { xs: 200, md: 300 },
          backgroundColor: 'action.hover',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {group.coverImage ? (
          <img
            src={group.coverImage}
            alt={group.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <Box
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'action.hover',
            }}
          >
            <GroupIcon sx={{ fontSize: 80, color: 'text.secondary' }} />
          </Box>
        )}
        
        {/* Back Button */}
        <IconButton
          onClick={() => router.back()}
          sx={{
            position: 'absolute',
            top: 16,
            left: 16,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            color: 'white',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
            },
          }}
        >
          <ArrowBackIcon />
        </IconButton>
        
        {/* Group Actions */}
        <Box sx={{ position: 'absolute', top: 16, right: 16, display: 'flex', gap: 1 }}>
          {isMember && (
            <>
              <IconButton
                onClick={handleToggleNotifications}
                sx={{
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  },
                }}
              >
                {isNotificationsOn ? <NotificationsActiveIcon /> : <NotificationsIcon />}
              </IconButton>
              
              <Button
                variant="contained"
                color="primary"
                startIcon={isAdmin ? <SettingsIcon /> : <EditIcon />}
                onClick={() => {}}
                sx={{
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  },
                }}
              >
                {isAdmin ? 'Manage Group' : 'Edit'}
              </Button>
            </>
          )}
          
          <IconButton
            onClick={handleMenuOpen}
            sx={{
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
              },
            }}
          >
            <MoreVertIcon />
          </IconButton>
          
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
            {isMember ? (
              <>
                <MenuItem onClick={handleToggleNotifications}>
                  {isNotificationsOn ? 'Turn off notifications' : 'Turn on notifications'}
                </MenuItem>
                <MenuItem onClick={() => {}}>
                  <LinkIcon sx={{ mr: 1 }} /> Copy Link
                </MenuItem>
                <Divider />
                <MenuItem 
                  onClick={() => {
                    onLeave();
                    handleMenuClose();
                  }}
                  sx={{ color: 'error.main' }}
                >
                  <ExitToAppIcon sx={{ mr: 1 }} /> Leave Group
                </MenuItem>
              </>
            ) : (
              <MenuItem onClick={() => {
                onJoin();
                handleMenuClose();
              }}>
                Join Group
              </MenuItem>
            )}
            <Divider />
            <MenuItem>
              <ReportIcon sx={{ mr: 1 }} /> Report Group
            </MenuItem>
          </Menu>
        </Box>
      </Box>
      
      {/* Group Info */}
      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'center', md: 'flex-end' },
            mt: -6,
            mb: 3,
            position: 'relative',
            zIndex: 1,
          }}
        >
          <Avatar
            src={group.avatar}
            alt={group.name}
            sx={{
              width: { xs: 120, md: 160 },
              height: { xs: 120, md: 160 },
              border: '4px solid',
              borderColor: 'background.paper',
              backgroundColor: 'background.paper',
              boxShadow: 1,
              mr: { md: 3 },
              mb: { xs: 2, md: 0 },
            }}
          >
            <GroupIcon sx={{ fontSize: 60, color: 'text.secondary' }} />
          </Avatar>
          
          <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' }, mt: { xs: 2, md: 0 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', md: 'flex-start' }, flexWrap: 'wrap', gap: 1, mb: 1 }}>
              <Typography variant="h4" component="h1">
                {group.name}
              </Typography>
              {group.isPrivate && (
                <Chip 
                  icon={<LockIcon fontSize="small" />} 
                  label="Private" 
                  size="small" 
                  variant="outlined" 
                  sx={{ ml: 1 }}
                />
              )}
            </Box>
            
            <Typography variant="body1" color="text.secondary" paragraph>
              {group.description}
            </Typography>
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2, justifyContent: { xs: 'center', md: 'flex-start' } }}>
              <Chip 
                icon={<GroupIcon />} 
                label={`${group.membersCount.toLocaleString()} members`} 
                variant="outlined"
                size="small"
              />
              
              {group.category && (
                <Chip 
                  label={group.category} 
                  variant="outlined"
                  size="small"
                />
              )}
              
              {group.location && (
                <Chip 
                  icon={<LocationOnIcon />}
                  label={group.location} 
                  variant="outlined"
                  size="small"
                />
              )}
            </Box>
            
            {!isMember && (
              <Button 
                variant="contained" 
                color="primary" 
                size="large"
                onClick={onJoin}
                sx={{ mt: 1 }}
              >
                Join Group
              </Button>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default GroupHeader;
