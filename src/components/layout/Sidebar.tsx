import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Drawer,
  Box,
  ListItemButton,
  ListItemText,
  Divider,
  Avatar,
  Typography,
  Button,
  styled,
  IconButton,
  Tooltip,
  MenuItem
} from '@mui/material';
import {
  Home as HomeIcon,
  Person as PersonIcon,
  People as PeopleIcon,
  ChatBubbleOutline as ChatIcon,
  NotificationsNone as NotificationsIcon,
  BookmarkBorder as BookmarkIcon,
  Event as EventIcon,
  Group as GroupIcon,
  MoreHoriz as MoreHorizIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  Close as CloseIcon
} from '@mui/icons-material';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

interface MenuItemProps {
  id: string;
  text: string;
  icon: React.ReactNode;
  path: string;
}

const drawerWidth = 280;

const StyledDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})<{ open: boolean }>(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    backgroundColor: '#fff',
    border: 'none',
    paddingTop: '16px',
    boxShadow: '1px 0 8px rgba(0, 0, 0, 0.05)',
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    [theme.breakpoints.down('md')]: {
      position: 'fixed',
      transition: theme.transitions.create('transform', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      transform: open ? 'translateX(0)' : 'translateX(-100%)',
    },
  },
}));

const SidebarHeader = styled('div')({
  display: 'flex',
  alignItems: 'center',
  padding: '20px',
  borderBottom: '1px solid #f1f3f7',
  marginBottom: '20px',
});

const UserProfile = styled('div')({
  position: 'relative',
  padding: '0 20px 20px',
  marginBottom: '20px',
  borderBottom: '1px solid #f1f3f7',
  textAlign: 'center',
});

const UserCover = styled('div')({
  height: '80px',
  backgroundColor: '#e9ecef',
  borderRadius: '8px 8px 0 0',
  marginBottom: '50px',
  position: 'relative',
  backgroundImage: 'linear-gradient(45deg, #6c5ce7, #a29bfe)',
});

const UserAvatar = styled(Avatar)({
  width: '90px',
  height: '90px',
  border: '4px solid #fff',
  position: 'absolute',
  left: '50%',
  bottom: '-45px',
  transform: 'translateX(-50%)',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
});

const UserInfo = styled('div')({
  marginTop: '50px',
  textAlign: 'center',
  '& h4': {
    fontSize: '18px',
    fontWeight: 600,
    marginBottom: '5px',
    color: '#343a40',
  },
  '& p': {
    color: '#6c757d',
    fontSize: '14px',
    marginBottom: '15px',
  },
});

const UserStats = styled('div')({
  display: 'flex',
  justifyContent: 'space-around',
  padding: '10px 0',
  borderTop: '1px solid #f1f3f7',
  borderBottom: '1px solid #f1f3f7',
  marginBottom: '20px',
});

const StatItem = styled('div')({
  textAlign: 'center',
  padding: '0 10px',
  '&:not(:last-child)': {
    borderRight: '1px solid #f1f3f7',
  },
  '& h5': {
    fontSize: '16px',
    fontWeight: 600,
    marginBottom: '5px',
    color: '#343a40',
  },
  '& p': {
    fontSize: '12px',
    color: '#6c757d',
    margin: 0,
  },
});

const StyledListItem = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active?: boolean }>(({ theme, active }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '12px 20px',
  margin: '4px 10px',
  borderRadius: '8px',
  color: active ? theme.palette.primary.main : '#6c757d',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
    color: theme.palette.primary.main,
  },
  marginBottom: '5px',
  backgroundColor: active ? 'rgba(114, 105, 239, 0.1)' : 'transparent',
  '&:hover': {
    backgroundColor: 'rgba(114, 105, 239, 0.1)',
    color: theme.palette.primary.main,
  },
  '& .MuiListItemIcon-root': {
    minWidth: '40px',
    color: 'inherit',
  },
  '& .MuiListItemText-primary': {
    fontSize: '14px',
    fontWeight: 500,
  },
}));

const MenuIcon = styled('div')({
  marginRight: '10px',
  fontSize: '20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const ViewProfileButton = styled(Button)(({ theme }) => ({
  width: '100%',
  marginTop: '20px',
  color: theme.palette.primary.main,
  borderColor: theme.palette.primary.main,
  textTransform: 'none',
  '&:hover': {
    backgroundColor: 'rgba(114, 105, 239, 0.1)',
    borderColor: theme.palette.primary.main,
  },
}));

const FooterLinks = styled('div')({
  padding: '20px',
  marginTop: 'auto',
  textAlign: 'center',
  '& a': {
    color: '#6c757d',
    fontSize: '12px',
    textDecoration: 'none',
    margin: '0 5px',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  '& p': {
    fontSize: '12px',
    color: '#6c757d',
    marginTop: '10px',
  },
});

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState('home');
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const mainMenuItems: MenuItemProps[] = [
    { id: 'home', text: 'Home', icon: <HomeIcon />, path: '/' },
    { id: 'profile', text: 'Profile', icon: <PersonIcon />, path: '/profile' },
    { id: 'friends', text: 'Friends', icon: <PeopleIcon />, path: '/friends' },
    { id: 'messages', text: 'Messages', icon: <ChatIcon />, path: '/messages' },
    { id: 'notifications', text: 'Notifications', icon: <NotificationsIcon />, path: '/notifications' },
  ];

  const moreMenuItems: MenuItemProps[] = [
    { id: 'events', text: 'Events', icon: <EventIcon />, path: '/events' },
    { id: 'groups', text: 'Groups', icon: <GroupIcon />, path: '/groups' },
    { id: 'saved', text: 'Saved', icon: <BookmarkIcon />, path: '/saved' },
  ];

  // Update active menu when location changes
  useEffect(() => {
    const currentPath = location.pathname;
    const allMenuItems = [...mainMenuItems, ...moreMenuItems];
    const currentItem = allMenuItems.find(item => item.path === currentPath);
    if (currentItem) {
      setActiveMenu(currentItem.id);
    }
    // We're intentionally omitting mainMenuItems and moreMenuItems from deps
    // as they are static and don't change after initial render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const handleMenuClick = (path: string, id: string) => {
    navigate(path);
    setActiveMenu(id);
    onClose();
  };

  const toggleMoreMenu = () => {
    setShowMoreMenu(!showMoreMenu);
  };

  const renderMenuItems = (items: MenuItemProps[]) => {
    return items.map((item) => (
      <MenuItem 
        key={item.id}
        active={activeMenu === item.id}
        onClick={() => handleMenuClick(item.path, item.id)}
      >
        <MenuIcon>{item.icon}</MenuIcon>
        <ListItemText primary={item.text} />
      </MenuItem>
    ));
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <StyledDrawer
        variant="permanent"
        open={open}
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box',
            top: '64px',
            height: 'calc(100vh - 64px)'
          },
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <UserProfile>
            <UserCover />
            <UserAvatar alt="User Avatar" src="https://randomuser.me/api/portraits/men/1.jpg" />
            <UserInfo>
              <h4>Sam Lanson</h4>
              <p>Web Developer at StackBros</p>
              <UserStats>
                <StatItem>
                  <h5>56</h5>
                  <p>Posts</p>
                </StatItem>
                <StatItem>
                  <h5>2,345</h5>
                  <p>Followers</p>
                </StatItem>
                <StatItem>
                  <h5>1,234</h5>
                  <p>Following</p>
                </StatItem>
              </UserStats>
              <ViewProfileButton variant="outlined" size="small">
                View Profile
              </ViewProfileButton>
            </UserInfo>
          </UserProfile>

          <Box sx={{ padding: '0 20px', flex: 1, overflowY: 'auto' }}>
            {renderMenuItems(mainMenuItems)}
            <Divider sx={{ my: 2 }} />
            {showMoreMenu && renderMenuItems(moreMenuItems)}
            
            <MenuItem onClick={toggleMoreMenu}>
              <MenuIcon>
                <MoreHorizIcon />
              </MenuIcon>
              <ListItemText primary={showMoreMenu ? 'Show Less' : 'Show More'} />
              <KeyboardArrowDownIcon 
                sx={{ 
                  transform: showMoreMenu ? 'rotate(180deg)' : 'rotate(0)',
                  transition: 'transform 0.3s ease',
                  fontSize: '1.2rem'
                }} 
              />
            </MenuItem>
          </Box>

          <FooterLinks>
            <Box component="div" sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1 }}>
              <Button component="a" href="/about" sx={{ color: '#6c757d', fontSize: '12px', minWidth: 'auto', p: 0 }}>
                About
              </Button>
              <Button component="a" href="/settings" sx={{ color: '#6c757d', fontSize: '12px', minWidth: 'auto', p: 0 }}>
                Settings
              </Button>
              <Button component="a" href="/support" sx={{ color: '#6c757d', fontSize: '12px', minWidth: 'auto', p: 0 }}>
                Support
              </Button>
              <Button component="a" href="/docs" sx={{ color: '#6c757d', fontSize: '12px', minWidth: 'auto', p: 0 }}>
                Docs
              </Button>
              <Button component="a" href="/help" sx={{ color: '#6c757d', fontSize: '12px', minWidth: 'auto', p: 0 }}>
                Help
              </Button>
              <Button component="a" href="/privacy" sx={{ color: '#6c757d', fontSize: '12px', minWidth: 'auto', p: 0 }}>
                Privacy & terms
              </Button>
            </Box>
            <p>&copy; 2025</p>
          </FooterLinks>
        </Box>
      </StyledDrawer>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={open}
        onClose={onClose}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box',
            width: drawerWidth,
            backgroundColor: '#fff',
            border: 'none',
            boxShadow: '1px 0 8px rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <SidebarHeader>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>Menu</Typography>
            <Tooltip title="Close">
              <IconButton onClick={onClose}>
                <CloseIcon />
              </IconButton>
            </Tooltip>
          </SidebarHeader>

          <Box sx={{ padding: '0 20px', flex: 1, overflowY: 'auto' }}>
            {renderMenuItems([...mainMenuItems, ...moreMenuItems])}
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Sidebar;
