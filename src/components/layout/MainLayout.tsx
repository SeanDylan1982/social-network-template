"use client";

import React from 'react';
import Head from 'next/head';
import { 
  Box, 
  Container, 
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
  styled
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
  MoreHoriz as MoreHorizIcon,
  ThumbUp as ThumbUpIcon,
  ChatBubbleOutline as ChatBubbleOutlineIcon,
  Share as ShareIcon,
  Send as SendIcon,
  EmojiEmotions as EmojiEmotionsIcon,
  Image as ImageIcon,
  Videocam as VideocamIcon,
  EventAvailable as EventAvailableIcon,
  Mood as MoodIcon
} from '@mui/icons-material';

const drawerWidth = 280;
const rightSidebarWidth = 300;

const MainContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  minHeight: '100vh',
  backgroundColor: theme.palette.background.default,
}));

const LeftSidebar = styled(Box)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  borderRight: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  position: 'sticky',
  top: 0,
  overflowY: 'auto',
  [theme.breakpoints.down('md')]: {
    position: 'fixed',
    zIndex: 1200,
    transform: 'translateX(-100%)',
    transition: 'transform 0.3s ease-in-out',
    '&.MuiDrawer-paper': {
      width: drawerWidth,
      boxSizing: 'border-box',
    },
    '&.open': {
      transform: 'translateX(0)',
    },
  },
}));

const MainContent = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  marginLeft: 0,
  marginRight: 0,
  maxWidth: '100%',
  [theme.breakpoints.up('md')]: {
    marginLeft: 0,
    marginRight: 0,
  },
}));

const RightSidebar = styled(Box)(({ theme }) => ({
  width: rightSidebarWidth,
  flexShrink: 0,
  padding: theme.spacing(3),
  borderLeft: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
  height: '100vh',
  position: 'sticky',
  top: 0,
  overflowY: 'auto',
  [theme.breakpoints.down('lg')]: {
    display: 'none',
  },
}));

const MobileHeader = styled(Box)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.down('md')]: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1, 2),
    backgroundColor: theme.palette.background.paper,
    borderBottom: `1px solid ${theme.palette.divider}`,
    position: 'sticky',
    top: 0,
    zIndex: 1100,
  },
}));

const SidebarHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3, 2),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const UserInfo = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  padding: '16px 0',
});

const NavigationList = styled(List)({
  width: '100%',
  padding: 0,
});

const NavigationItem = styled(ListItem)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  margin: theme.spacing(0.5, 2),
  padding: theme.spacing(1, 2),
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  '&.Mui-selected': {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.main,
    '& .MuiListItemIcon-root': {
      color: theme.palette.primary.main,
    },
  },
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

interface MainLayoutProps {
  children: React.ReactNode;
  title?: string;
  rightSidebarContent?: React.ReactNode;
}

const MainContent = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  gap: theme.spacing(3),
  [theme.breakpoints.up("md")]: {
    flexDirection: "row",
  },
}));

const Sidebar = styled(Box)(({ theme }: { theme: any }) => ({
  width: "100%",
  [theme.breakpoints.up("md")]: {
    width: 280,
    flexShrink: 0,
  },
}));

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  title = 'Social Network',
  rightSidebarContent,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleListItemClick = (index: number) => {
    setSelectedIndex(index);
    if (isMobile) {
      setMobileOpen(false);
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

  // Mock user data
  const user = {
    name: 'John Doe',
    role: 'UI/UX Designer',
    avatar: '/images/avatars/1.jpg',
    bio: 'Creating beautiful interfaces and user experiences',
    stats: {
      posts: 124,
      followers: '2.5K',
      following: 342,
    },
  };

  const drawer = (
    <>
      <SidebarHeader>
        <Typography variant="h6" fontWeight="bold" color="primary">
          Social Network
        </Typography>
      </SidebarHeader>
      
      <UserInfo>
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          variant="dot"
          color="success" 
        >
          <Avatar 
            src={user.avatar} 
            alt={user.name}
            sx={{ width: 90, height: 90, mb: 2 }}
          />
        </StyledBadge>
        <Typography variant="subtitle1" fontWeight="bold">
          {user.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {user.role}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, maxWidth: '80%' }}>
          {user.bio}
        </Typography>
        
        <Box display="flex" gap={2} mb={3}>
          <Box textAlign="center">
            <Typography variant="subtitle1" fontWeight="bold">
              {user.stats.posts}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Posts
            </Typography>
          </Box>
          <Box textAlign="center">
            <Typography variant="subtitle1" fontWeight="bold">
              {user.stats.followers}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Followers
            </Typography>
          </Box>
          <Box textAlign="center">
            <Typography variant="subtitle1" fontWeight="bold">
              {user.stats.following}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Following
            </Typography>
          </Box>
        </Box>
        
        <Button 
          variant="contained" 
          color="primary" 
          fullWidth 
          startIcon={<AddIcon />}
          sx={{ mb: 3 }}
        >
          Create Post
        </Button>
      </UserInfo>
      
      <Divider />
      
      <NavigationList>
        {navigationItems.map((item, index) => (
          <NavigationItem
            key={item.text}
            button
            selected={selectedIndex === index}
            onClick={() => handleListItemClick(index)}
          >
            <ListItemIcon>
              {item.badge ? (
                <Badge badgeContent={item.badge} color="error">
                  {item.icon}
                </Badge>
              ) : (
                item.icon
              )}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </NavigationItem>
        ))}
        
        <Divider sx={{ my: 1 }} />
        
        <NavigationItem>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </NavigationItem>
      </NavigationList>
    </>
  );

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Social Network" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <MainContainer>
        {/* Mobile Header */}
        <MobileHeader>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Social Network
          </Typography>
        </MobileHeader>
        
        {/* Left Sidebar */}
        <Box
          component="nav"
          sx={{
            [theme.breakpoints.up('md')]: {
              width: drawerWidth,
              flexShrink: 0,
            },
          }}
        >
          {isMobile ? (
            <Drawer
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
              sx={{
                display: { xs: 'block', md: 'none' },
                '& .MuiDrawer-paper': { 
                  boxSizing: 'border-box',
                  width: drawerWidth,
                },
              }}
            >
              {drawer}
            </Drawer>
          ) : (
            <Box component={LeftSidebar}>
              {drawer}
            </Box>
          )}
        </Box>
        
        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { md: `calc(100% - ${drawerWidth}px - ${rightSidebarWidth}px)` },
            marginLeft: { md: `${drawerWidth}px` },
            marginTop: { xs: '56px', md: 0 },
          }}
        >
          {children}
        </Box>
        
        {/* Right Sidebar */}
        {rightSidebarContent && (
          <Box component={RightSidebar}>
            {rightSidebarContent}
          </Box>
        )}
      </MainContainer>
    </>
  );
};

export default MainLayout;
