import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Avatar,
  Typography,
  Divider,
  InputAdornment,
  IconButton,
  useTheme,
  styled,
} from '@mui/material';
import { Edit as EditIcon, CameraAlt as CameraAltIcon } from '@mui/icons-material';

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 100,
  height: 100,
  margin: '0 auto 16px',
  cursor: 'pointer',
  position: 'relative',
  '&:hover .edit-overlay': {
    opacity: 1,
  },
}));

const EditOverlay = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  opacity: 0,
  transition: 'opacity 0.3s',
  color: 'white',
}));

const ProfileSettings: React.FC = () => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    username: 'johndoe',
    email: 'john.doe@example.com',
    bio: 'Digital designer & photographer. Love to travel and capture moments.',
    website: 'johndoe.design',
    phone: '+1 (555) 123-4567',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Profile updated:', formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Box textAlign="center" mb={4}>
        <StyledAvatar
          src="/avatar-placeholder.jpg"
          alt={formData.firstName}
          sx={{ width: 120, height: 120, mb: 2 }}
        >
          <EditOverlay className="edit-overlay">
            <CameraAltIcon />
          </EditOverlay>
        </StyledAvatar>
        <Button
          variant="outlined"
          startIcon={<EditIcon />}
          size="small"
          onClick={() => document.getElementById('avatar-upload')?.click()}
        >
          Change Photo
        </Button>
        <input
          type="file"
          id="avatar-upload"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={(e) => {
            // Handle file upload
            const file = e.target.files?.[0];
            if (file) {
              // Process the file upload
              console.log('Selected file:', file);
            }
          }}
        />
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Typography color="text.secondary">@</Typography>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            multiline
            rows={4}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Website"
            name="website"
            value={formData.website}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Typography color="text.secondary">https://</Typography>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
          />
        </Grid>
      </Grid>

      <Divider sx={{ my: 4 }} />

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Button variant="outlined" color="inherit">
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Save Changes
        </Button>
      </Box>
    </Box>
  );
};

export default ProfileSettings;
