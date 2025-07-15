import React, { useState } from 'react';
import {
  Box,
  Typography,
  Avatar,
  Button,
  Tabs,
  Tab,
  InputBase,
  IconButton,
  Divider,
  useTheme,
  styled,
  Paper,
  Skeleton,
  useMediaQuery,
  Tooltip,
} from '@mui/material';
import {
  Search as SearchIcon,
  PersonAdd as PersonAddIcon,
  MoreVert as MoreVertIcon,
  Check as CheckIcon,
  Close as CloseIcon,
  People as PeopleIcon,
  Person as PersonIcon,
  Group as GroupIcon,
  Link as LinkIcon,
} from '@mui/icons-material';
import { StyledButton } from '@/components/ui/StyledComponents';

// Styled Components
const PageContainer = styled(Box)(({ theme }) => ({
  maxWidth: '1200px',
  margin: '0 auto',
  padding: theme.spacing(4),
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(3),
  },
  '& .header-section': {
    marginBottom: theme.spacing(4),
    '& .MuiTypography-h1': {
      fontWeight: 600,
      marginBottom: theme.spacing(1),
    },
    '& .MuiTypography-body1': {
      color: theme.palette.text.secondary,
      opacity: 0.8,
    },
  },
  '& .search-section': {
    marginBottom: theme.spacing(3),
    '& .MuiPaper-root': {
      boxShadow: theme.shadows[1],
      '&:focus-within': {
        boxShadow: `0 0 0 2px ${theme.palette.primary.main}40`,
      },
    },
  },
  '& .tabs-section': {
    marginBottom: theme.spacing(3),
    '& .MuiTabs-root': {
      minHeight: 48,
      '& .MuiTab-root': {
        minHeight: 48,
        textTransform: 'none',
        fontWeight: 500,
        fontSize: '0.9375rem',
        '&.Mui-selected': {
          fontWeight: 600,
        },
      },
    },
  },
  '& .connections-list': {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    '& .MuiSkeleton-root': {
      borderRadius: theme.shape.borderRadius * 1.5,
    },
  },
  '& .empty-state': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    py: theme.spacing(8),
    textAlign: 'center',
    '& .MuiTypography-h6': {
      marginBottom: theme.spacing(2),
    },
    '& .MuiButton-root': {
      marginTop: theme.spacing(2),
    },
  },
}));

const Header = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  '& h1': {
    fontWeight: 700,
    marginBottom: theme.spacing(1),
    color: theme.palette.text.primary,
  },
  '& p': {
    color: theme.palette.text.secondary,
  },
}));

const SearchBar = styled(Paper)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0.5, 2),
  borderRadius: theme.shape.borderRadius * 2,
  maxWidth: '100%',
  width: '400px',
  marginBottom: theme.spacing(3),
  boxShadow: theme.shadows[1],
  backgroundColor: theme.palette.background.paper,
  transition: theme.transitions.create(['box-shadow', 'border-color']),
  '&:focus-within': {
    boxShadow: `0 0 0 2px ${theme.palette.primary.main}40`,
  },
  '& .MuiSvgIcon-root': {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(1.5),
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));

const StyledTabs = styled(Tabs)(({ theme }) => ({
  minHeight: '48px',
  '& .MuiTabs-indicator': {
    height: '3px',
    backgroundColor: theme.palette.primary.main,
    borderRadius: '3px 3px 0 0',
  },
  '& .MuiTab-root': {
    textTransform: 'none',
    minWidth: 'auto',
    minHeight: '48px',
    padding: theme.spacing(1, 2.5),
    marginRight: theme.spacing(1),
    fontSize: '0.9375rem',
    fontWeight: 500,
    color: theme.palette.text.secondary,
    '&.Mui-selected': {
      color: theme.palette.primary.main,
      fontWeight: 600,
    },
    '& .MuiSvgIcon-root': {
      marginRight: theme.spacing(1),
      fontSize: '1.25rem',
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1, 1.5),
      fontSize: '0.875rem',
      '& .MuiSvgIcon-root': {
        marginRight: theme.spacing(0.5),
        fontSize: '1rem',
      },
    },
  },
}));

const ConnectionCard = styled(Paper)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2.5),
  marginBottom: theme.spacing(2),
  borderRadius: theme.shape.borderRadius * 1.5,
  transition: theme.transitions.create(['box-shadow', 'transform']),
  '&:hover': {
    boxShadow: theme.shadows[4],
    transform: 'translateY(-2px)',
  },
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    textAlign: 'center',
    padding: theme.spacing(2),
  },
  '& .MuiAvatar-root': {
    width: 64,
    height: 64,
    border: `2px solid ${theme.palette.background.paper}`,
    boxShadow: theme.shadows[1],
  },
  '& .user-info': {
    flex: 1,
    marginRight: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      marginRight: 0,
      marginBottom: theme.spacing(2),
      textAlign: 'center',
    },
    '& .MuiTypography-h6': {
      fontWeight: 600,
      marginBottom: theme.spacing(0.5),
      fontSize: '1.125rem',
    },
    '& .MuiTypography-body1': {
      color: theme.palette.text.secondary,
      fontSize: '0.875rem',
      opacity: 0.8,
    },
    '& .mutual-connections': {
      display: 'flex',
      alignItems: 'center',
      gap: theme.spacing(0.5),
      color: theme.palette.text.secondary,
      fontSize: '0.875rem',
      '& .MuiSvgIcon-root': {
        fontSize: '1rem',
        color: theme.palette.primary.main,
      },
    },
  },
  '& .action-buttons': {
    display: 'flex',
    gap: theme.spacing(1.5),
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      '& > *': {
        flex: 1,
      },
    },
    '& .MuiButton-root': {
      textTransform: 'none',
      fontSize: '0.9375rem',
      fontWeight: 500,
      padding: theme.spacing(0.75, 2),
      borderRadius: theme.shape.borderRadius,
      '&.primary': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        '&:hover': {
          backgroundColor: theme.palette.primary.dark,
        },
      },
      '&.outlined': {
        borderColor: theme.palette.divider,
        '&:hover': {
          borderColor: theme.palette.primary.main,
        },
      },
      '&.disabled': {
        color: theme.palette.text.secondary,
        backgroundColor: theme.palette.action.disabledBackground,
      },
    },
  },
}));

const UserInfo = styled(Box)(({ theme }) => ({
  flex: 1,
  marginRight: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    marginRight: 0,
    marginBottom: theme.spacing(2),
    textAlign: 'center',
  },
}));

const ActionButtons = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1.5),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    '& > *': {
      flex: 1,
    },
  },
}));

// Mock Data
const connections = [
  {
    id: 1,
    name: 'John Doe',
    username: 'johndoe',
    avatar: '/avatar-1.jpg',
    mutualConnections: 12,
    status: 'connected',
  },
  {
    id: 2,
    name: 'Jane Smith',
    username: 'janesmith',
    avatar: '/avatar-2.jpg',
    mutualConnections: 8,
    status: 'pending',
  },
  {
    id: 3,
    name: 'Mike Johnson',
    username: 'mikej',
    avatar: '/avatar-3.jpg',
    mutualConnections: 5,
    status: 'suggested',
  },
];

const ConnectionsPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading] = useState(false); // Simulate loading state

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredConnections = connections.filter(
    (connection) =>
      connection.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      connection.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Loading state skeleton
  if (isLoading) {
    return (
      <PageContainer>
        <Skeleton variant="rectangular" width={200} height={40} sx={{ mb: 2 }} />
        <Skeleton variant="text" width={300} height={24} sx={{ mb: 4 }} />
        <Skeleton variant="rectangular" width={400} height={56} sx={{ mb: 3, borderRadius: 4 }} />
        <Skeleton variant="rectangular" width={200} height={40} sx={{ mb: 3 }} />
        {[1, 2, 3].map((item) => (
          <Skeleton 
            key={item} 
            variant="rectangular" 
            height={120} 
            sx={{ 
              mb: 2, 
              borderRadius: 2,
              opacity: 1 - (item * 0.2)
            }} 
          />
        ))}
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Header>
        <Typography variant="h4" component="h1">
          My Network
        </Typography>
        <Typography variant="body1">
          Manage your connections and find new ones
        </Typography>
      </Header>

      <SearchBar component="form" onSubmit={(e) => e.preventDefault()}>
        <SearchIcon />
        <InputBase
          placeholder="Search connections..."
          value={searchQuery}
          onChange={handleSearch}
          fullWidth
          inputProps={{
            'aria-label': 'Search connections',
          }}
        />
      </SearchBar>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3, overflowX: 'auto' }}>
        <Box sx={{ minWidth: 'fit-content' }}>
          <StyledTabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="connection tabs"
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
          >
            <Tab
              icon={!isMobile && <PeopleIcon />}
              iconPosition="start"
              label="Connections"
              {...a11yProps(0)}
            />
            <Tab
              icon={!isMobile && <PersonIcon />}
              iconPosition="start"
              label="Requests"
              {...a11yProps(1)}
            />
            <Tab
              icon={!isMobile && <GroupIcon />}
              iconPosition="start"
              label="Suggestions"
              {...a11yProps(2)}
            />
          </StyledTabs>
        </Box>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <Box>
          <Typography variant="h6" gutterBottom>
            Your Connections ({filteredConnections.length})
          </Typography>
          {filteredConnections
            .filter((c) => c.status === 'connected')
            .map((connection) => (
              <ConnectionCard key={connection.id} elevation={1}>
                <Avatar
                  src={connection.avatar}
                  alt={`${connection.name}'s avatar`}
                  sx={{ 
                    width: 72, 
                    height: 72, 
                    mr: 3,
                    [theme.breakpoints.down('sm')]: {
                      width: 80,
                      height: 80,
                      mb: 1.5,
                      mr: 0,
                    },
                  }}
                />
                <UserInfo>
                  <Typography 
                    variant="subtitle1" 
                    component="h3"
                    sx={{ 
                      fontWeight: 600,
                      mb: 0.5,
                      '& a': {
                        color: 'inherit',
                        textDecoration: 'none',
                        '&:hover': {
                          textDecoration: 'underline',
                        },
                      },
                    }}
                  >
                    <a href={`/profile/${connection.username}`}>
                      {connection.name}
                    </a>
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    gutterBottom
                    sx={{ 
                      mb: 1,
                      '& a': {
                        color: 'inherit',
                        textDecoration: 'none',
                        '&:hover': {
                          textDecoration: 'underline',
                        },
                      },
                    }}
                  >
                    <a href={`/profile/${connection.username}`}>
                      @{connection.username}
                    </a>
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                    <PeopleIcon fontSize="small" sx={{ mr: 0.5, fontSize: '1rem' }} />
                    <Typography variant="body2" component="span">
                      {connection.mutualConnections} mutual connection{connection.mutualConnections !== 1 ? 's' : ''}
                    </Typography>
                  </Box>
                </UserInfo>
                <ActionButtons>
                  <Tooltip title={connection.status === 'connected' ? 'Connected' : 'Connect'}>
                    <span>
                      <StyledButton
                        variant={connection.status === 'connected' ? 'outlined' : 'contained'}
                        color={connection.status === 'connected' ? 'primary' : 'primary'}
                        startIcon={connection.status === 'connected' ? <CheckIcon /> : <PersonAddIcon />}
                        size={isMobile ? 'medium' : 'small'}
                        fullWidth={isMobile}
                        disabled={connection.status === 'connected'}
                        sx={{
                          whiteSpace: 'nowrap',
                          ...(connection.status === 'connected' && {
                            '&.Mui-disabled': {
                              color: theme.palette.primary.main,
                              borderColor: theme.palette.primary.main,
                              opacity: 0.9,
                            },
                          }),
                        }}
                      >
                        {connection.status === 'connected' ? 'Connected' : 'Connect'}
                      </StyledButton>
                    </span>
                  </Tooltip>
                  <Tooltip title="More options">
                    <IconButton 
                      size={isMobile ? 'medium' : 'small'}
                      aria-label="More options"
                      sx={{
                        border: `1px solid ${theme.palette.divider}`,
                        [theme.breakpoints.down('sm')]: {
                          minWidth: '48px',
                          width: '48px',
                        },
                      }}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </Tooltip>
                </ActionButtons>
              </ConnectionCard>
            ))}
        </Box>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Box>
          <Typography variant="h6" gutterBottom>
            Pending Requests
          </Typography>
          {filteredConnections
            .filter((c) => c.status === 'pending')
            .map((connection) => (
              <ConnectionCard key={connection.id}>
                <Avatar
                  src={connection.avatar}
                  alt={connection.name}
                  sx={{ width: 64, height: 64, mr: 2 }}
                />
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle1" fontWeight={600}>
                    {connection.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    @{connection.username}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {connection.mutualConnections} mutual connections
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<CheckIcon />}
                    size="small"
                  >
                    Accept
                  </Button>
                  <Button
                    variant="outlined"
                    color="inherit"
                    startIcon={<CloseIcon />}
                    size="small"
                  >
                    Decline
                  </Button>
                </Box>
              </ConnectionCard>
            ))}
        </Box>
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <Box>
          <Typography variant="h6" gutterBottom>
            People You May Know
          </Typography>
          {filteredConnections
            .filter((c) => c.status === 'suggested')
            .map((connection) => (
              <ConnectionCard key={connection.id}>
                <Avatar
                  src={connection.avatar}
                  alt={connection.name}
                  sx={{ width: 64, height: 64, mr: 2 }}
                />
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle1" fontWeight={600}>
                    {connection.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    @{connection.username}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {connection.mutualConnections} mutual connections
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<PersonAddIcon />}
                    size="small"
                  >
                    Connect
                  </Button>
                  <IconButton size="small">
                    <MoreVertIcon />
                  </IconButton>
                </Box>
              </ConnectionCard>
            ))}
        </Box>
      </TabPanel>
    </PageContainer>
  );
};

// TabPanel and a11yProps helper components
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  className?: string;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`connection-tabpanel-${index}`}
      aria-labelledby={`connection-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box 
          sx={{ 
            pt: 3,
            animation: 'fadeIn 0.3s ease-in-out',
            '@keyframes fadeIn': {
              '0%': { opacity: 0, transform: 'translateY(10px)' },
              '100%': { opacity: 1, transform: 'translateY(0)' },
            },
          }}
        >
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `connection-tab-${index}`,
    'aria-controls': `connection-tabpanel-${index}`,
  };
}

export default ConnectionsPage;
