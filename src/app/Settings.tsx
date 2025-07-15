import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Switch,
  Tab,
  Tabs,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Snackbar,
  Alert,
  useTheme,
  useMediaQuery,
  styled,
} from '@mui/material';
import {
  Person as PersonIcon,
  Lock as LockIcon,
  Notifications as NotificationsIcon,
  Email as EmailIcon,
  Security as SecurityIcon,
  Block as BlockedUsersIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  AddAPhoto as AddPhotoIcon,
  Check as CheckIcon,
  Phone as PhoneIcon,
  Add as AddIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';

// Styled Components
const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: 600,
  margin: theme.spacing(4, 0, 3),
  '&:first-of-type': {
    marginTop: theme.spacing(2),
  },
  color: theme.palette.primary.main,
  borderBottom: `2px solid ${theme.palette.primary.main}`,
  paddingBottom: theme.spacing(1),
  '&::before': {
    content: '""',
    display: 'inline-block',
    width: 30,
    height: 30,
    marginRight: theme.spacing(2),
    borderRadius: '50%',
    backgroundColor: theme.palette.primary.main,
  },
}));

const SettingItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(3, 0),
  borderBottom: `1px solid ${theme.palette.divider}`,
  transition: theme.transitions.create(['background-color', 'transform']),
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    transform: 'translateX(4px)',
  },
  '&:last-child': {
    borderBottom: 'none',
  },
  '& .MuiFormControl-root': {
    flex: 1,
    minWidth: 200,
  },
  '& .MuiSelect-root': {
    fontSize: '1rem',
    fontWeight: 500,
  },
}));

const SettingLabel = styled(Box)({
  flex: 1,
  '& .MuiTypography-subtitle1': {
    fontWeight: 600,
    fontSize: '1.125rem',
    marginBottom: theme.spacing(1),
    color: theme.palette.text.primary,
  },
  '& .MuiTypography-body2': {
    color: theme.palette.text.secondary,
    fontSize: '0.9375rem',
    lineHeight: 1.5,
  },
});

const AvatarWrapper = styled(Box)({
  position: 'relative',
  display: 'inline-block',
  '&:hover .MuiIconButton-root': {
    opacity: 1,
  },
  '& .MuiAvatar-root': {
    transition: theme.transitions.create(['box-shadow', 'transform']),
    '&:hover': {
      boxShadow: theme.shadows[4],
      transform: 'scale(1.05)',
    },
  },
});

const AvatarEditButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  right: 0,
  backgroundColor: theme.palette.background.paper,
  opacity: 0.8,
  transition: theme.transitions.create(['opacity', 'transform']),
  '&:hover': {
    backgroundColor: theme.palette.background.paper,
    opacity: 1,
    transform: 'scale(1.1)',
  },
  '& .MuiSvgIcon-root': {
    color: theme.palette.primary.main,
  },
}));

const StyledAvatar = styled(Avatar)({
  width: 150,
  height: 150,
  border: '4px solid',
  borderColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
  transition: theme.transitions.create(['box-shadow', 'transform']),
  '&:hover': {
    boxShadow: theme.shadows[5],
  },
});

// Mock Data
const blockedUsers = [
  { id: 1, name: 'John Doe', username: '@johndoe', avatar: '/avatar-1.jpg' },
  { id: 2, name: 'Jane Smith', username: '@janesmith', avatar: '/avatar-2.jpg' },
];

const Settings: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [tabValue, setTabValue] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [openAvatarDialog, setOpenAvatarDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'info' | 'warning'>('success');
  const [showPassword, setShowPassword] = React.useState(false);
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  // Using LockIcon from @mui/icons-material instead of Lock
  const Lock = LockIcon;

  // Form state
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    bio: 'Digital designer & photographer. Love to travel and capture moments.',
    location: 'San Francisco, CA',
    website: 'johndoe.design',
    phone: '+1 (555) 123-4567',
    birthDate: '1990-05-15',
    gender: 'male',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    emailNotifications: true,
    pushNotifications: true,
    friendRequests: true,
    comments: true,
    mentions: true,
    profileVisibility: 'public',
    activityStatus: 'all',
    blockedUsers: [...blockedUsers],
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSaveChanges = () => {
    // In a real app, you would save the changes to your backend here
    setEditMode(false);
    showSnackbar('Settings saved successfully', 'success');
  };

  const handleCancelEdit = () => {
    // Reset form data or fetch from server
    setEditMode(false);
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // In a real app, you would upload the image to your server
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        // Update avatar preview
        console.log('New avatar:', event.target?.result);
        setOpenAvatarDialog(false);
        showSnackbar('Profile picture updated successfully', 'success');
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleDeleteAccount = () => {
    // In a real app, you would handle account deletion
    console.log('Account deletion requested');
    setOpenDeleteDialog(false);
    showSnackbar('Your account has been scheduled for deletion', 'info');
  };

  const handleUnblockUser = (userId: number) => {
    setFormData(prev => ({
      ...prev,
      blockedUsers: prev.blockedUsers.filter(user => user.id !== userId)
    }));
    showSnackbar('User unblocked successfully', 'success');
  };

  const showSnackbar = (message: string, severity: 'success' | 'error' | 'info' | 'warning') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const renderProfileTab = () => (
    <Box>
      <Box display="flex" flexDirection={isMobile ? 'column' : 'row'} alignItems="flex-start" mb={4}>
        <Box mr={isMobile ? 0 : 4} mb={isMobile ? 2 : 0} display="flex" flexDirection="column" alignItems="center">
          <AvatarWrapper>
            <StyledAvatar src="/avatar-1.jpg" alt={formData.firstName} />
            {editMode && (
              <>
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="avatar-upload"
                  type="file"
                  onChange={handleAvatarUpload}
                />
                <label htmlFor="avatar-upload">
                  <AvatarEditButton component="span">
                    <AddPhotoIcon />
                  </AvatarEditButton>
                </label>
              </>
            )}
          </AvatarWrapper>
          {!editMode && (
            <Button
              variant="outlined"
              startIcon={<EditIcon />}
              onClick={() => setEditMode(true)}
              sx={{ mt: 2 }}
            >
              Edit Profile
            </Button>
          )}
        </Box>
        
        <Box flex={1} width="100%">
          {editMode ? (
            <Box>
              <Box display="flex" flexDirection={isMobile ? 'column' : 'row'} gap={2} mb={2}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  margin="normal"
                  variant="outlined"
                />
              </Box>
              
              <TextField
                fullWidth
                label="Bio"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                margin="normal"
                multiline
                rows={3}
                variant="outlined"
              />
              
              <Box display="flex" flexDirection={isMobile ? 'column' : 'row'} gap={2} mt={2}>
                <TextField
                  fullWidth
                  label="Location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Website"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  margin="normal"
                  variant="outlined"
                />
              </Box>
              
              <Box display="flex" flexDirection={isMobile ? 'column' : 'row'} gap={2} mt={2}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  margin="normal"
                  variant="outlined"
                />
              </Box>
              
              <Box display="flex" flexDirection={isMobile ? 'column' : 'row'} gap={2} mt={2}>
                <TextField
                  fullWidth
                  label="Date of Birth"
                  name="birthDate"
                  type="date"
                  value={formData.birthDate}
                  onChange={handleInputChange}
                  margin="normal"
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <FormControl fullWidth margin="normal" variant="outlined">
                  <InputLabel id="gender-label">Gender</InputLabel>
                  <Select
                    labelId="gender-label"
                    name="gender"
                    value={formData.gender}
                    onChange={handleSelectChange}
                    label="Gender"
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                    <MenuItem value="prefer-not-to-say">Prefer not to say</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              
              <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
                <Button
                  variant="outlined"
                  startIcon={<CancelIcon />}
                  onClick={handleCancelEdit}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<SaveIcon />}
                  onClick={handleSaveChanges}
                >
                  Save Changes
                </Button>
              </Box>
            </Box>
          ) : (
            <Box>
              <Typography variant="h4" gutterBottom>
                {formData.firstName} {formData.lastName}
                <Typography variant="body1" color="text.secondary">
                  @{formData.email.split('@')[0].toLowerCase()}
                </Typography>
              </Typography>
              
              <Typography variant="body1" paragraph>
                {formData.bio}
              </Typography>
              
              <Box display="flex" flexWrap="wrap" gap={4} mt={2}>
                <Box display="flex" alignItems="center">
                  <PersonIcon color="action" sx={{ mr: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    {formData.gender === 'male' ? 'He/Him' : formData.gender === 'female' ? 'She/Her' : 'They/Them'}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center">
                  <PersonIcon color="action" sx={{ mr: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    {new Date().getFullYear() - new Date(formData.birthDate).getFullYear()} years old
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center">
                  <PersonIcon color="action" sx={{ mr: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    {formData.location}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center">
                  <PersonIcon color="action" sx={{ mr: 1 }} />
                  <a href={`https://${formData.website}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Typography variant="body2" color="primary">
                      {formData.website}
                    </Typography>
                  </a>
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );

  const renderPasswordTab = () => (
    <Box maxWidth={600}>
      <SectionTitle>Change Password</SectionTitle>
      <Box component="form" noValidate autoComplete="off">
        <TextField
          fullWidth
          label="Current Password"
          name="currentPassword"
          type={showPassword ? 'text' : 'password'}
          value={formData.currentPassword}
          onChange={handleInputChange}
          margin="normal"
          variant="outlined"
          InputProps={{
            endAdornment: (
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
              >
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            ),
          }}
        />
        
        <TextField
          fullWidth
          label="New Password"
          name="newPassword"
          type={showNewPassword ? 'text' : 'password'}
          value={formData.newPassword}
          onChange={handleInputChange}
          margin="normal"
          variant="outlined"
          InputProps={{
            endAdornment: (
              <IconButton
                aria-label="toggle new password visibility"
                onClick={() => setShowNewPassword(!showNewPassword)}
                edge="end"
              >
                {showNewPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            ),
          }}
          helperText="Must be at least 8 characters long"
        />
        
        <TextField
          fullWidth
          label="Confirm New Password"
          name="confirmPassword"
          type={showConfirmPassword ? 'text' : 'password'}
          value={formData.confirmPassword}
          onChange={handleInputChange}
          margin="normal"
          variant="outlined"
          InputProps={{
            endAdornment: (
              <IconButton
                aria-label="toggle confirm password visibility"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                edge="end"
              >
                {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            ),
          }}
        />
        
        <Box mt={3}>
          <Button 
            variant="contained" 
            color="primary"
            startIcon={<SaveIcon />}
            disabled={!formData.currentPassword || !formData.newPassword || formData.newPassword !== formData.confirmPassword}
          >
            Update Password
          </Button>
        </Box>
      </Box>
      
      <SectionTitle>Two-Factor Authentication</SectionTitle>
      <SettingItem>
        <SettingLabel>
          <Typography variant="subtitle1">Two-Factor Authentication</Typography>
          <Typography variant="body2">Add an extra layer of security to your account</Typography>
        </SettingLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch 
                checked={false} 
                onChange={handleSwitchChange}
                name="twoFactorAuth"
                color="primary"
              />
            }
            label="Enable 2FA"
          />
        </FormGroup>
      </SettingItem>
    </Box>
  );

  const renderPrivacyTab = () => (
    <Box maxWidth={800}>
      <SectionTitle>Profile Privacy</SectionTitle>
      <SettingItem>
        <SettingLabel>
          <Typography variant="subtitle1">Profile Visibility</Typography>
          <Typography variant="body2">Who can see your profile and posts</Typography>
        </SettingLabel>
        <FormControl variant="outlined" size="small" sx={{ minWidth: 200 }}>
          <Select
            name="profileVisibility"
            value={formData.profileVisibility}
            onChange={handleSelectChange}
            label="Profile Visibility"
          >
            <MenuItem value="public">Public</MenuItem>
            <MenuItem value="friends">Friends Only</MenuItem>
            <MenuItem value="friends-of-friends">Friends of Friends</MenuItem>
            <MenuItem value="only-me">Only Me</MenuItem>
          </Select>
        </FormControl>
      </SettingItem>
      
      <SettingItem>
        <SettingLabel>
          <Typography variant="subtitle1">Activity Status</Typography>
          <Typography variant="body2">Show when you're active on the site</Typography>
        </SettingLabel>
        <FormControl variant="outlined" size="small" sx={{ minWidth: 200 }}>
          <Select
            name="activityStatus"
            value={formData.activityStatus}
            onChange={handleSelectChange}
            label="Activity Status"
          >
            <MenuItem value="all">Show to Everyone</MenuItem>
            <MenuItem value="friends">Show to Friends Only</MenuItem>
            <MenuItem value="none">Hide from Everyone</MenuItem>
          </Select>
        </FormControl>
      </SettingItem>
      
      <SectionTitle>Blocked Users</SectionTitle>
      {formData.blockedUsers.length > 0 ? (
        <Paper variant="outlined">
          <List>
            {formData.blockedUsers.map((user) => (
              <React.Fragment key={user.id}>
                <ListItem>
                  <Box display="flex" alignItems="center" flex={1}>
                    <Avatar src={user.avatar} alt={user.name} sx={{ mr: 2 }} />
                    <Box>
                      <Typography variant="subtitle1">{user.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {user.username}
                      </Typography>
                    </Box>
                  </Box>
                  <Button 
                    variant="outlined" 
                    size="small"
                    onClick={() => handleUnblockUser(user.id)}
                  >
                    Unblock
                  </Button>
                </ListItem>
                <Divider component="li" />
              </React.Fragment>
            ))}
          </List>
        </Paper>
      ) : (
        <Box textAlign="center" py={4}>
          <BlockedUsersIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 1 }} />
          <Typography variant="h6" gutterBottom>No blocked users</Typography>
          <Typography variant="body2" color="text.secondary" maxWidth={400} mx="auto">
            When you block someone, they won't be able to see your profile, posts, or contact you.
          </Typography>
        </Box>
      )}
    </Box>
  );

  const renderNotificationsTab = () => (
    <Box maxWidth={800}>
      <SectionTitle>Email Notifications</SectionTitle>
      <SettingItem>
        <SettingLabel>
          <Typography variant="subtitle1">Email Notifications</Typography>
          <Typography variant="body2">Receive email notifications for important updates</Typography>
        </SettingLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch 
                checked={formData.emailNotifications} 
                onChange={handleSwitchChange}
                name="emailNotifications"
                color="primary"
              />
            }
            label={formData.emailNotifications ? "On" : "Off"}
          />
        </FormGroup>
      </SettingItem>
      
      <SectionTitle>Push Notifications</SectionTitle>
      <SettingItem>
        <SettingLabel>
          <Typography variant="subtitle1">Push Notifications</Typography>
          <Typography variant="body2">Receive push notifications on this device</Typography>
        </SettingLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch 
                checked={formData.pushNotifications} 
                onChange={handleSwitchChange}
                name="pushNotifications"
                color="primary"
              />
            }
            label={formData.pushNotifications ? "On" : "Off"}
          />
        </FormGroup>
      </SettingItem>
      
      <SectionTitle>Notification Settings</SectionTitle>
      <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch 
                checked={formData.friendRequests} 
                onChange={handleSwitchChange}
                name="friendRequests"
                color="primary"
              />
            }
            label="Friend Requests"
          />
          <FormHelperText>Get notified when someone sends you a friend request</FormHelperText>
          
          <FormControlLabel
            control={
              <Switch 
                checked={formData.comments} 
                onChange={handleSwitchChange}
                name="comments"
                color="primary"
                sx={{ mt: 1 }}
              />
            }
            label="Comments"
          />
          <FormHelperText>Get notified when someone comments on your posts</FormHelperText>
          
          <FormControlLabel
            control={
              <Switch 
                checked={formData.mentions} 
                onChange={handleSwitchChange}
                name="mentions"
                color="primary"
                sx={{ mt: 1 }}
              />
            }
            label="Mentions"
          />
          <FormHelperText>Get notified when someone mentions you</FormHelperText>
        </FormGroup>
      </Paper>
    </Box>
  );

  const renderAccountTab = () => (
    <Box maxWidth={800}>
      <SectionTitle>Account Information</SectionTitle>
      <Paper variant="outlined" sx={{ p: 3, mb: 4 }}>
        <Box mb={3}>
          <Typography variant="subtitle1" gutterBottom>Email Address</Typography>
          <Box display="flex" alignItems="center">
            <EmailIcon color="action" sx={{ mr: 1 }} />
            <Typography>{formData.email}</Typography>
            <Button 
              variant="text" 
              color="primary"
              size="small"
              sx={{ ml: 'auto' }}
              startIcon={<EditIcon />}
            >
              Change
            </Button>
          </Box>
        </Box>
        
        <Divider sx={{ my: 3 }} />
        
        <Box>
          <Typography variant="subtitle1" gutterBottom>Phone Number</Typography>
          <Box display="flex" alignItems="center">
            <PhoneIcon color="action" sx={{ mr: 1 }} />
            <Typography>{formData.phone || 'Not added'}</Typography>
            <Button 
              variant="text" 
              color="primary"
              size="small"
              sx={{ ml: 'auto' }}
              startIcon={formData.phone ? <EditIcon /> : <AddIcon />}
            >
              {formData.phone ? 'Change' : 'Add'}
            </Button>
          </Box>
        </Box>
      </Paper>
      
      <SectionTitle>Danger Zone</SectionTitle>
      <Paper variant="outlined" sx={{ p: 3, borderColor: 'error.main' }}>
        <Box mb={3}>
          <Typography variant="subtitle1" gutterBottom color="error">
            Deactivate Account
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Your profile will be hidden but not deleted. You can reactivate your account by logging back in.
          </Typography>
          <Button 
            variant="outlined" 
            color="error"
            onClick={() => {}}
          >
            Deactivate Account
          </Button>
        </Box>
        
        <Divider sx={{ my: 3 }} />
        
        <Box>
          <Typography variant="subtitle1" gutterBottom color="error">
            Delete Account
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Permanently delete your account and all of your content. This action cannot be undone.
          </Typography>
          <Button 
            variant="contained" 
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => setOpenDeleteDialog(true)}
          >
            Delete Account
          </Button>
        </Box>
      </Paper>
    </Box>
  );

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Settings
      </Typography>
      
      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="settings tabs"
        >
          <Tab icon={<PersonIcon />} label="Profile" />
          <Tab icon={<Lock />} label="Password" />
          <Tab icon={<SecurityIcon />} label="Privacy" />
          <Tab icon={<NotificationsIcon />} label="Notifications" />
          <Tab icon={<SettingsIcon />} label="Account" />
        </Tabs>
      </Paper>
      
      <Box>
        {tabValue === 0 && renderProfileTab()}
        {tabValue === 1 && renderPasswordTab()}
        {tabValue === 2 && renderPrivacyTab()}
        {tabValue === 3 && renderNotificationsTab()}
        {tabValue === 4 && renderAccountTab()}
      </Box>
      
      {/* Avatar Update Dialog */}
      <Dialog 
        open={openAvatarDialog} 
        onClose={() => setOpenAvatarDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Update Profile Photo</DialogTitle>
        <DialogContent>
          <Box textAlign="center" py={4}>
            <Avatar 
              src="/avatar-1.jpg" 
              sx={{ 
                width: 160, 
                height: 160, 
                mx: 'auto',
                mb: 3,
                border: '4px solid',
                borderColor: 'background.paper',
                boxShadow: 3,
              }} 
            />
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="avatar-upload-dialog"
              type="file"
              onChange={handleAvatarUpload}
            />
            <label htmlFor="avatar-upload-dialog">
              <Button 
                variant="contained" 
                component="span"
                startIcon={<AddPhotoIcon />}
                sx={{ mr: 2 }}
              >
                Upload Photo
              </Button>
            </label>
            <Button 
              variant="outlined"
              onClick={() => {
                // In a real app, you would remove the avatar
                console.log('Remove avatar');
                setOpenAvatarDialog(false);
                showSnackbar('Profile picture removed', 'info');
              }}
            >
              Remove
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAvatarDialog(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
      
      {/* Delete Account Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        aria-labelledby="delete-account-dialog"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle id="delete-account-dialog">
          Delete Your Account?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete your account? This action cannot be undone. All of your data will be permanently removed from our servers.
          </DialogContentText>
          <Box mt={2}>
            <FormControlLabel
              control={
                <Checkbox
                  value="confirm"
                  color="primary"
                />
              }
              label="I understand that this action cannot be undone"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
            Cancel
          </Button>
          <Button 
            onClick={handleDeleteAccount} 
            color="error"
            variant="contained"
            startIcon={<DeleteIcon />}
          >
            Delete My Account
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Snackbar for notifications */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Settings;
