import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Divider,
  useMediaQuery,
  useTheme,
  styled,
} from '@mui/material';
import {
  Person as PersonIcon,
  Lock as LockIcon,
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
  Block as BlockedIcon,
  Delete as DeleteIcon,
  Help as HelpIcon,
} from '@mui/icons-material';

// Styled Components
const PageContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  minHeight: 'calc(100vh - 64px)',
  backgroundColor: theme.palette.background.default,
}));

const Sidebar = styled(Box)(({ theme }) => ({
  width: 240,
  borderRight: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(3, 0),
  [theme.breakpoints.down('md')]: {
    width: 200,
  },
}));

const Content = styled(Box)(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(3),
  maxWidth: 800,
  margin: '0 auto',
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  textTransform: 'none',
  minHeight: 48,
  padding: theme.spacing(1, 3),
  textAlign: 'left',
  justifyContent: 'flex-start',
  '&.Mui-selected': {
    backgroundColor: theme.palette.action.selected,
    fontWeight: 500,
  },
}));

// Tab panel component
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
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

// Tab content components
const ProfileSettings = () => (
  <Box>
    <Typography variant="h5" gutterBottom>
      Profile Information
    </Typography>
    <Typography color="text.secondary" paragraph>
      Update your personal information and profile settings.
    </Typography>
    {/* Profile form will go here */}
  </Box>
);

const AccountSettings = () => (
  <Box>
    <Typography variant="h5" gutterBottom>
      Account Settings
    </Typography>
    <Typography color="text.secondary" paragraph>
      Manage your account preferences and security settings.
    </Typography>
    {/* Account settings will go here */}
  </Box>
);

const NotificationSettings = () => (
  <Box>
    <Typography variant="h5" gutterBottom>
      Notifications
    </Typography>
    <Typography color="text.secondary" paragraph>
      Configure how you receive notifications.
    </Typography>
    {/* Notification settings will go here */}
  </Box>
);

const PrivacySettings = () => (
  <Box>
    <Typography variant="h5" gutterBottom>
      Privacy
    </Typography>
    <Typography color="text.secondary" paragraph>
      Control your privacy settings and data sharing preferences.
    </Typography>
    {/* Privacy settings will go here */}
  </Box>
);

const BlockedAccounts = () => (
  <Box>
    <Typography variant="h5" gutterBottom>
      Blocked Accounts
    </Typography>
    <Typography color="text.secondary" paragraph>
      Manage accounts you've blocked.
    </Typography>
    {/* Blocked accounts list will go here */}
  </Box>
);

const DeleteAccount = () => (
  <Box>
    <Typography variant="h5" gutterBottom color="error">
      Delete Account
    </Typography>
    <Typography color="text.secondary" paragraph>
      Permanently delete your account and all associated data.
    </Typography>
    {/* Delete account confirmation will go here */}
  </Box>
);

const HelpSupport = () => (
  <Box>
    <Typography variant="h5" gutterBottom>
      Help & Support
    </Typography>
    <Typography color="text.secondary" paragraph>
      Get help with your account and app issues.
    </Typography>
    {/* Help content will go here */}
  </Box>
);

const SettingsPage: React.FC = () => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const tabs = [
    { label: 'Profile', icon: <PersonIcon />, component: <ProfileSettings /> },
    { label: 'Account', icon: <LockIcon />, component: <AccountSettings /> },
    {
      label: 'Notifications',
      icon: <NotificationsIcon />,
      component: <NotificationSettings />,
    },
    { label: 'Privacy', icon: <SecurityIcon />, component: <PrivacySettings /> },
    {
      label: 'Blocked Accounts',
      icon: <BlockedIcon />,
      component: <BlockedAccounts />,
    },
    {
      label: 'Delete Account',
      icon: <DeleteIcon />,
      component: <DeleteAccount />,
    },
    { label: 'Help & Support', icon: <HelpIcon />, component: <HelpSupport /> },
  ];

  return (
    <PageContainer>
      <Sidebar>
        <Typography variant="h6" sx={{ px: 3, mb: 2, fontWeight: 600 }}>
          Settings
        </Typography>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={tabValue}
          onChange={handleTabChange}
          aria-label="Settings tabs"
          sx={{
            '& .MuiTabs-indicator': {
              left: 0,
              right: 'auto',
              width: 3,
              backgroundColor: theme.palette.primary.main,
            },
          }}
        >
          {tabs.map((tab, index) => (
            <StyledTab
              key={index}
              icon={tab.icon}
              iconPosition="start"
              label={isMobile ? '' : tab.label}
              aria-label={tab.label}
              sx={{ minHeight: 48 }}
            />
          ))}
        </Tabs>
      </Sidebar>
      <Divider orientation="vertical" flexItem />
      <Content>
        {tabs[tabValue].component}
      </Content>
    </PageContainer>
  );
};

export default SettingsPage;
