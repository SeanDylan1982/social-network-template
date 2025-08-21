"use client";

import React, { useState } from 'react';
import Head from 'next/head';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { 
  Box, 
  Typography, 
  Avatar, 
  Button, 
  useMediaQuery, 
  useTheme,
  Drawer,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Badge,
  styled,
  AppBar,
  Toolbar,
  InputBase,
  alpha
} from '@mui/material';
import { 
  Menu as MenuIcon,
  Home as HomeIcon,
  People as PeopleIcon,
  Article as ArticleIcon,
  Event as EventIcon,
  Group as GroupIcon,
  Notifications as NotificationsIcon,
  Message as MessageIcon,
  Bookmark as BookmarkIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  Add as AddIcon,
  Search as SearchIcon,
  MoreVert as MoreVertIcon,
  PersonAdd as PersonAddIcon
} from '@mui/icons-material';

const drawerWidth = 280;
const rightSidebarWidth = 350;

const MainContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  minHeight: '100vh',
  backgroundColor: theme.palette.background.default,
  overflow: 'hidden', // Prevent double scrollbars
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
  },
}));

const LeftSidebar = styled(Box)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  backgroundColor: theme.palette.background.paper,
  borderRight: `1px solid ${theme.palette.social.border}`,
  height: 'calc(100vh - 64px)', // Subtract app bar height
  overflowY: 'auto',
  position: 'sticky',
  top: 64, // Height of the app bar
  '&::-webkit-scrollbar': {
    width: '6px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'transparent',
  },
  '&::-webkit-scrollbar-thumb': {
    background: theme.palette.divider,
    borderRadius: '4px',
  },
  [theme.breakpoints.down('md')]: {
    position: 'fixed',
    zIndex: theme.zIndex.drawer + 1,
    height: '100%',
    boxShadow: theme.shadows[16],
    transform: 'translateX(-100%)',
    transition: 'transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms',
    '&.MuiDrawer-paper': {
      transform: 'translateX(0)',
      transition: 'transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms',
    },
  },
}));

const RightSidebar = styled(Box)(({ theme }) => ({
  width: rightSidebarWidth,
  flexShrink: 0,
  padding: theme.spacing(3, 2),
  backgroundColor: theme.palette.background.paper,
  borderLeft: `1px solid ${theme.palette.social.border}`,
  height: 'calc(100vh - 64px)', // Subtract app bar height
  overflowY: 'auto',
  position: 'sticky',
  '&::-webkit-scrollbar': {
    width: '6px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'transparent',
  },
  '&::-webkit-scrollbar-thumb': {
    background: theme.palette.divider,
    borderRadius: '4px',
  },
  [theme.breakpoints.down('xl')]: {
    position: 'fixed',
    right: 0,
    zIndex: theme.zIndex.drawer + 1,
    height: '100%',
    boxShadow: theme.shadows[16],
    transform: 'translateX(100%)',
    transition: 'transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms',
    '&.MuiDrawer-paper': {
      transform: 'translateX(0)',
      transition: 'transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms',
    },
  },
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(2),
  },
}));

const MainContent = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  width: `calc(100vw - ${drawerWidth}px - ${rightSidebarWidth}px)`,
  padding: theme.spacing(3, 2),
  overflowY: 'auto',
  height: 'calc(100vh - 64px)', // Subtract app bar height
  [theme.breakpoints.down('xl')]: {
    width: `calc(100vw - ${drawerWidth}px)`,
  },
  [theme.breakpoints.down('md')]: {
    width: '100vw',
    padding: theme.spacing(2),
    height: 'auto',
    overflowY: 'visible',
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1),
  },
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.success.main,
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      border: '1px solid currentColor',
      content: '""',
    },
  },
}));

const UserAvatar = styled(Avatar)(({ theme }) => ({
  width: 90,
  height: 90,
  marginBottom: theme.spacing(2),
  border: `3px solid ${theme.palette.primary.main}`,
}));

const SidebarHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3, 2, 2),
  textAlign: 'center',
}));

const UserInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(0, 2, 3),
  textAlign: 'center',
}));

const NavigationList = styled(List)({
  width: '100%',
  padding: theme => theme.spacing(0, 2, 2),
});

const NavigationItem = styled(ListItem)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(0.5),
  '&.Mui-selected': {
    backgroundColor: theme.palette.action.selected,
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

interface MainLayoutProps {
  children: React.ReactNode;
  title?: string;
  rightSidebarContent?: React.ReactNode;
  showRightSidebar?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  title = 'Social Network',
  rightSidebarContent,
  showRightSidebar = true,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('xl'));
  const [mobileLeftOpen, setMobileLeftOpen] = useState(false);
  const [mobileRightOpen, setMobileRightOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();

  const toggleLeftSidebar = () => {
    setMobileLeftOpen(!mobileLeftOpen);
    // Close right sidebar if open
    if (mobileRightOpen) setMobileRightOpen(false);
  };

  const toggleRightSidebar = () => {
    setMobileRightOpen(!mobileRightOpen);
    // Close left sidebar if open
    if (mobileLeftOpen) setMobileLeftOpen(false);
  };

  // Close sidebars when clicking outside
  const handleSidebarClose = () => {
    setMobileLeftOpen(false);
    setMobileRightOpen(false);
  };

  // Handle window resize
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= theme.breakpoints.values.md) {
        setMobileLeftOpen(false);
        setMobileRightOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [theme.breakpoints.values.md]);

  const handleListItemClick = (index: number) => {
    setSelectedIndex(index);
    if (isMobile) {
      setMobileLeftOpen(false);
    }
  };

  const navigationItems = [
    { text: 'Feed', icon: <HomeIcon /> },
    { text: 'Connections', icon: <PeopleIcon /> },
    { text: 'News', icon: <ArticleIcon /> },
    { text: 'Events', icon: <EventIcon /> },
    { text: 'Groups', icon: <GroupIcon /> },
    { text: 'Messages', icon: <MessageIcon />, badge: 3 },
    { text: 'Bookmarks', icon: <BookmarkIcon /> },
    { text: 'Notifications', icon: <NotificationsIcon />, badge: 5 },
    { text: 'Settings', icon: <SettingsIcon /> },
  ];

  // User data from auth context or default
  const userData = user ? {
    name: user.name,
    role: 'Member',
    avatar: '/images/avatar.jpg',
    bio: 'Welcome to our social network',
    stats: {
      posts: 0,
      followers: '0',
      following: 0,
    },
  } : {
    name: 'Guest',
    role: 'Visitor',
    avatar: '/images/avatar.jpg',
    bio: 'Please sign in to continue',
    stats: {
      posts: 0,
      followers: '0',
      following: 0,
    },
  };

  const drawer = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <SidebarHeader>
        <Typography variant="h6" fontWeight="bold" color="primary">
        </Typography>
      </SidebarHeader>
      
      <UserInfo>
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          variant="dot"
          color={isAuthenticated ? "success" : "default"} 
        >
          <UserAvatar 
            src={userData.avatar} 
            alt={userData.name}
          />
        </StyledBadge>
        <Typography variant="h6" fontWeight="bold">
          {userData.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {userData.role}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, maxWidth: '80%' }}>
          {userData.bio}
        </Typography>
        
        <Box display="flex" justifyContent="space-between" width="100%" mb={3}>
          <Box textAlign="center" flex={1}>
            <Typography variant="subtitle1" fontWeight="bold">
              {userData.stats.posts}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Posts
            </Typography>
          </Box>
          <Box textAlign="center" flex={1}>
            <Typography variant="subtitle1" fontWeight="bold">
              {userData.stats.followers}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Followers
            </Typography>
          </Box>
          <Box textAlign="center" flex={1}>
            <Typography variant="subtitle1" fontWeight="bold">
              {userData.stats.following}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Following
            </Typography>
          </Box>
        </Box>
        
        {isAuthenticated ? (
          <Button 
            variant="contained" 
            color="primary" 
            fullWidth 
            startIcon={<AddIcon />}
            sx={{ mb: 3, borderRadius: 2 }}
          >
            Create Post
          </Button>
        ) : (
          <Button 
            variant="contained" 
            color="primary" 
            fullWidth 
            sx={{ mb: 3, borderRadius: 2 }}
            onClick={() => router.push('/auth/signin')}
          >
            Sign In
          </Button>
        )}
      </UserInfo>
      
      <Divider sx={{ mx: 2 }} />
      
      <NavigationList>
        {navigationItems.map((item, index) => (
          <NavigationItem
            key={item.text}
            button
            selected={selectedIndex === index}
            onClick={() => handleListItemClick(index)}
            sx={{ px: 6, py: 1.25 }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              {item.badge ? (
                <Badge badgeContent={item.badge} color="error">
                  {item.icon}
                </Badge>
              ) : (
                item.icon
              )}
            </ListItemIcon>
            <ListItemText 
              primary={item.text} 
              primaryTypographyProps={{
                variant: 'body1',
                fontWeight: selectedIndex === index ? 600 : 400,
              }}
            />
          </NavigationItem>
        ))}
        
        <Divider sx={{ my: 1 }} />
        
        {isAuthenticated ? (
          <NavigationItem 
            button
            sx={{ px: 2, py: 1.25 }}
            onClick={logout}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Logout" 
              primaryTypographyProps={{
                variant: 'body1',
              }}
            />
          </NavigationItem>
        ) : (
          <NavigationItem 
            button
            sx={{ px: 2, py: 1.25 }}
            onClick={() => router.push('/auth/signin')}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              <PersonAddIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Sign In" 
              primaryTypographyProps={{
                variant: 'body1',
              }}
            />
          </NavigationItem>
        )}
      </NavigationList>
    </Box>
  );

  return (
    <>
      <Head>
        <title>{title} | Social Network</title>
        <meta name="description" content="Social Network" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      {/* App Bar */}
      <AppBar 
        position="fixed" 
        elevation={0} 
        sx={{ 
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: (theme) => theme.palette.background.paper,
          color: (theme) => theme.palette.text.primary,
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
          height: { xs: 56, sm: 64 },
          justifyContent: 'center',
        }}
      >
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', ml: { xs: -1, sm: -1 } }}>
            <IconButton
              color="inherit"
              aria-label={mobileLeftOpen ? 'close left sidebar' : 'open left sidebar'}
              edge="start"
              onClick={toggleLeftSidebar}
              sx={{ 
                mr: 1,
                display: { md: 'none' },
                color: mobileLeftOpen ? 'primary.main' : 'inherit',
                p: 1,
                transform: mobileLeftOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s ease, color 0.2s ease',
                '&:hover': {
                  color: 'primary.main',
                  backgroundColor: 'rgba(47, 128, 237, 0.08)',
                },
              }}
            >
              <MenuIcon />
            </IconButton>
            {isMobile && (
              <Typography variant="h6" noWrap component="div" sx={{ display: { xs: 'none', sm: 'block' } }}>
                Social Network
              </Typography>
            )}
          </Box>
          
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ 
              display: { xs: 'none', sm: 'block' },
              fontWeight: 'bold',
              color: theme.palette.primary.main,
            }}
          >
            Social Network
          </Typography>
          
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search..."
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          
          <Box sx={{ flexGrow: 1 }} />
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton 
              color="inherit" 
              sx={{ 
                ml: 1,
                display: { xs: 'none', sm: 'flex' },
                '&:hover': { color: 'primary.main' }
              }}
            >
              <Badge badgeContent={4} color="error">
                <MessageIcon />
              </Badge>
            </IconButton>
            <IconButton 
              color="inherit" 
              sx={{ 
                ml: 1,
                '&:hover': { color: 'primary.main' }
              }}
            >
              <Badge badgeContent={3} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton 
              color="inherit" 
              sx={{ 
                ml: 1,
                display: { xs: 'none', sm: 'flex' },
                '&:hover': { color: 'primary.main' }
              }}
            >
              <SettingsIcon />
            </IconButton>
            <IconButton 
              color="inherit" 
              sx={{ 
                ml: 1,
                '&:hover': { color: 'primary.main' },
                display: { xs: 'none', sm: 'flex' },
              }}
              onClick={() => isAuthenticated ? router.push('/profile') : router.push('/auth/signin')}
            >
              <Avatar 
                src={userData.avatar} 
                alt={userData.name}
                sx={{ width: 32, height: 32 }}
              />
            </IconButton>
            {showRightSidebar && (
              <IconButton
                color="inherit"
                aria-label={mobileRightOpen ? 'close right sidebar' : 'open right sidebar'}
                edge="end"
                onClick={toggleRightSidebar}
                sx={{ 
                  ml: 1,
                  display: { md: 'none' },
                  color: mobileRightOpen ? 'primary.main' : 'inherit',
                  transform: mobileRightOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease, color 0.2s ease',
                  '&:hover': {
                    color: 'primary.main',
                    backgroundColor: 'rgba(47, 128, 237, 0.08)',
                  },
                }}
              >
                <MoreVertIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      
      <MainContainer 
        onClick={handleSidebarClose}
        sx={{
          pt: { xs: '56px', sm: '64px' }, // Account for app bar height
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        {/* Left Sidebar */}
        <Box
          component="nav"
          sx={{
            width: { md: drawerWidth },
            flexShrink: { md: 0 },
            position: 'relative',
            zIndex: 1,
          }}
        >
          <Drawer
            variant={isMobile ? 'temporary' : 'permanent'}
            open={isMobile ? mobileLeftOpen : true}
            onClose={toggleLeftSidebar}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
                borderRight: 'none',
                boxShadow: theme => theme.shadows[4],
                [theme.breakpoints.down('md')]: {
                  width: '80%',
                  maxWidth: 320,
                },
                top: { xs: '56px', sm: '64px' }, // Account for app bar height
                height: { xs: 'calc(100% - 56px)', sm: 'calc(100% - 64px)' }, // Adjust height based on app bar
              },
              display: { xs: 'block', md: 'block' },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
        
        {/* Main Content */}
        <MainContent>
          {children}
        </MainContent>
        
        {/* Right Sidebar */}
        {showRightSidebar && rightSidebarContent && (
          <>
            <Drawer
              anchor="right"
              variant={isLargeScreen ? 'permanent' : 'temporary'}
              open={isLargeScreen ? true : mobileRightOpen}
              onClose={toggleRightSidebar}
              ModalProps={{
                keepMounted: true,
              }}
              sx={{
                '& .MuiDrawer-paper': {
                  boxSizing: 'border-box',
                  width: rightSidebarWidth,
                  borderLeft: 'none',
                  boxShadow: theme => theme.shadows[4],
                  [theme.breakpoints.down('md')]: {
                    width: '90%',
                    maxWidth: 360,
                  },
                },
                display: { xs: 'block', md: 'block' },
              }}
            >
              <Box sx={{ p: 2 }}>
                {rightSidebarContent}
              </Box>
            </Drawer>
            {/* Backdrop for mobile */}
            <Box
              sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: theme.zIndex.drawer,
                opacity: (mobileLeftOpen || mobileRightOpen) ? 1 : 0,
                visibility: (mobileLeftOpen || mobileRightOpen) ? 'visible' : 'hidden',
                transition: 'opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                pointerEvents: (mobileLeftOpen || mobileRightOpen) ? 'auto' : 'none',
                [theme.breakpoints.up('md')]: {
                  display: 'none',
                },
              }}
              onClick={handleSidebarClose}
            />
          </>
        )}
      </MainContainer>
    </>
  );
};

export default MainLayout;
export { MainLayout as FixedMainLayout };
