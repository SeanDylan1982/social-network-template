import React, { useState } from 'react';
import { Avatar, Badge, Box, Button, Card, CardContent, Divider, IconButton, InputAdornment, List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, Paper, TextField, Typography, styled } from '@mui/material';
import {
  Search as SearchIcon,
  MoreVert as MoreVertIcon,
  Send as SendIcon,
  AttachFile as AttachFileIcon,
  EmojiEmotions as EmojiIcon,
  Videocam as VideocamIcon,
  Call as CallIcon,
  Info as InfoIcon,
  Block as BlockIcon,
  Delete as DeleteIcon,
  Report as ReportIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';

// Styled Components
const MessagesContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  height: 'calc(100vh - 64px)',
  backgroundColor: theme.palette.background.default,
  borderRadius: theme.shape.borderRadius * 2,
  overflow: 'hidden',
  boxShadow: theme.shadows[2],
  transition: theme.transitions.create(['box-shadow', 'transform']),
  '&:hover': {
    boxShadow: theme.shadows[4],
  },
  '& *': {
    transition: 'all 0.2s ease-in-out',
  },
}));

const ConversationsList = styled(Box)(({ theme }) => ({
  width: 400,
  borderRight: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.down('md')]: {
    width: '100%',
    display: 'none',
    '&.show': {
      display: 'flex',
    },
  },
  '& .MuiListItem-root': {
    borderBottom: `1px solid ${theme.palette.divider}`,
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
    '&.Mui-selected': {
      backgroundColor: theme.palette.primary.light,
      '&:hover': {
        backgroundColor: theme.palette.primary.light,
      },
    },
  },
}));

const ChatContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.background.default,
  [theme.breakpoints.down('md')]: {
    display: 'none',
    '&.show': {
      display: 'flex',
    },
  },
  '& .messages-list': {
    overflowY: 'auto',
    padding: theme.spacing(2),
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
}));

const SearchBar = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
  '& .MuiInputBase-root': {
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius * 2,
    padding: '4px 12px',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 2),
    },
  },
}));

const ConversationItem = styled(ListItem)(({ theme, selected }) => ({
  padding: theme.spacing(1.5, 2.5),
  cursor: 'pointer',
  backgroundColor: selected ? theme.palette.primary.light : 'transparent',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  '& .MuiListItemText-primary': {
    fontWeight: selected ? 600 : 500,
    fontSize: '1rem',
  },
  '& .MuiListItemText-secondary': {
    display: '-webkit-box',
    WebkitLineClamp: 1,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontSize: '0.875rem',
    color: theme.palette.text.secondary,
  },
}));

const ChatHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.paper,
  '& .user-info': {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
    '& h6': {
      margin: 0,
      marginLeft: theme.spacing(1.5),
      fontWeight: 600,
    },
  },
  '& .MuiIconButton-root': {
    color: theme.palette.text.secondary,
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
}));

const MessagesList = styled(Box)(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(2),
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
}));

const MessageBubble = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isCurrentUser',
})<{ isCurrentUser?: boolean }>(({ theme, isCurrentUser }) => ({
  maxWidth: '80%',
  padding: theme.spacing(1.5, 2.5),
  margin: theme.spacing(0.5, 0),
  borderRadius: theme.shape.borderRadius * 2,
  backgroundColor: isCurrentUser ? theme.palette.primary.main : theme.palette.background.paper,
  color: isCurrentUser ? theme.palette.primary.contrastText : theme.palette.text.primary,
  alignSelf: isCurrentUser ? 'flex-end' : 'flex-start',
  position: 'relative',
  boxShadow: theme.shadows[2],
  transition: theme.transitions.create(['box-shadow', 'transform']),
  '&:hover': {
    boxShadow: theme.shadows[4],
    transform: 'translateY(-2px)',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderWidth: '0 16px 16px 0',
    borderColor: 'transparent',
    [isCurrentUser ? 'right' : 'left']: -8,
    top: 0,
    borderRightColor: isCurrentUser ? theme.palette.primary.main : theme.palette.background.paper,
    transform: isCurrentUser ? 'rotate(0)' : 'rotate(90deg)',
    display: isCurrentUser ? 'block' : 'none',
  },
  '& .MuiTypography-root': {
    fontSize: '0.9375rem',
    lineHeight: 1.5,
  },
}));

const MessageInput = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.shape.borderRadius * 2,
    backgroundColor: theme.palette.background.default,
    flex: 1,
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.main,
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.main,
      borderWidth: 1,
    },
    '& .MuiInputBase-input': {
      padding: theme.spacing(1.5, 2),
      fontSize: '1rem',
    },
  },
  '& .MuiIconButton-root': {
    color: theme.palette.text.secondary,
    '&:hover': {
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.action.hover,
    },
  },
  '& .MuiButton-contained': {
    borderRadius: theme.shape.borderRadius * 2,
    textTransform: 'none',
    fontWeight: 600,
    padding: theme.spacing(1, 3),
    boxShadow: 'none',
    '&:hover': {
      boxShadow: theme.shadows[1],
    },
  },
}));

// Mock Data
const conversations = [
  {
    id: 1,
    user: {
      name: 'Alex Johnson',
      avatar: '/avatar-2.jpg',
      isOnline: true,
    },
    lastMessage: 'Hey, how are you doing?',
    time: '2h ago',
    unread: 3,
  },
  {
    id: 2,
    user: {
      name: 'Sarah Williams',
      avatar: '/avatar-3.jpg',
      isOnline: true,
    },
    lastMessage: 'The design looks great!',
    time: '5h ago',
    unread: 0,
  },
  {
    id: 3,
    user: {
      name: 'Michael Chen',
      avatar: '/avatar-4.jpg',
      isOnline: false,
    },
    lastMessage: 'Let\'s schedule a meeting for tomorrow',
    time: '1d ago',
    unread: 0,
  },
  {
    id: 4,
    user: {
      name: 'Emma Davis',
      avatar: '/avatar-5.jpg',
      isOnline: true,
    },
    lastMessage: 'Thanks for your help!',
    time: '2d ago',
    unread: 0,
  },
  {
    id: 5,
    user: {
      name: 'David Wilson',
      avatar: '/avatar-6.jpg',
      isOnline: false,
    },
    lastMessage: 'Check out this article I found',
    time: '3d ago',
    unread: 0,
  },
];

const messages = [
  {
    id: 1,
    sender: 'Alex Johnson',
    text: 'Hey there! How are you?',
    time: '10:30 AM',
    isCurrentUser: false,
  },
  {
    id: 2,
    sender: 'You',
    text: 'I\'m doing great, thanks for asking! How about you?',
    time: '10:32 AM',
    isCurrentUser: true,
  },
  {
    id: 3,
    sender: 'Alex Johnson',
    text: 'I\'m good too! Just wanted to check if you had a chance to look at the design mockups I sent?',
    time: '10:33 AM',
    isCurrentUser: false,
  },
  {
    id: 4,
    sender: 'You',
    text: 'Yes, I did! They look amazing. I especially love the color scheme and the overall layout.',
    time: '10:35 AM',
    isCurrentUser: true,
  },
  {
    id: 5,
    sender: 'Alex Johnson',
    text: 'Great! I was thinking we could add some micro-interactions to make the experience even better. What do you think?',
    time: '10:36 AM',
    isCurrentUser: false,
  },
];

const Messages: React.FC = () => {
  const [selectedConversation, setSelectedConversation] = useState(1);
  const [messageText, setMessageText] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleConversationClick = (id: number) => {
    setSelectedConversation(id);
    setShowChat(true);
  };

  const handleSendMessage = () => {
    if (messageText.trim() === '') return;
    // In a real app, you would send the message to the server here
    console.log('Sending message:', messageText);
    setMessageText('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleMenuOpen = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const selectedUser = conversations.find(conv => conv.id === selectedConversation)?.user;

  return (
    <MessagesContainer>
      <ConversationsList sx={{ display: { xs: showChat ? 'none' : 'flex', md: 'flex' } }}>
        <SearchBar>
          <TextField
            fullWidth
            placeholder="Search messages"
            variant="outlined"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </SearchBar>
        
        <List sx={{ flex: 1, overflowY: 'auto' }}>
          {conversations.map((conversation) => (
            <React.Fragment key={conversation.id}>
              <ConversationItem 
                alignItems="flex-start"
                selected={selectedConversation === conversation.id}
                onClick={() => handleConversationClick(conversation.id)}
              >
                <ListItemAvatar>
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                    color="success"
                    invisible={!conversation.user.isOnline}
                  >
                    <Avatar src={conversation.user.avatar} alt={conversation.user.name} />
                  </Badge>
                </ListItemAvatar>
                <ListItemText
                  primary={conversation.user.name}
                  primaryTypographyProps={{
                    fontWeight: selectedConversation === conversation.id ? 600 : 400,
                  }}
                  secondary={conversation.lastMessage}
                  secondaryTypographyProps={{
                    noWrap: true,
                    color: conversation.unread > 0 ? 'text.primary' : 'text.secondary',
                    fontWeight: conversation.unread > 0 ? 500 : 400,
                  }}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                  <Typography variant="caption" color="text.secondary">
                    {conversation.time}
                  </Typography>
                  {conversation.unread > 0 && (
                    <Box
                      sx={{
                        bgcolor: 'primary.main',
                        color: 'white',
                        borderRadius: '50%',
                        width: 20,
                        height: 20,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mt: 0.5,
                        fontSize: '0.6875rem',
                        fontWeight: 600,
                      }}
                    >
                      {conversation.unread}
                    </Box>
                  )}
                </Box>
              </ConversationItem>
              <Divider component="li" />
            </React.Fragment>
          ))}
        </List>
      </ConversationsList>
      
      <ChatContainer sx={{ display: { xs: showChat ? 'flex' : 'none', md: 'flex' } }}>
        {selectedUser ? (
          <>
            <ChatHeader>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton 
                  onClick={() => setShowChat(false)} 
                  sx={{ display: { md: 'none' }, mr: 1 }}
                >
                  <ArrowBackIcon />
                </IconButton>
                <Avatar 
                  src={selectedUser.avatar} 
                  alt={selectedUser.name} 
                  sx={{ width: 40, height: 40 }}
                />
                <Box sx={{ ml: 1.5 }}>
                  <Typography variant="subtitle1" fontWeight={600}>
                    {selectedUser.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {selectedUser.isOnline ? 'Online' : 'Offline'}
                  </Typography>
                </Box>
              </Box>
              <Box>
                <IconButton color="primary">
                  <CallIcon />
                </IconButton>
                <IconButton color="primary">
                  <VideocamIcon />
                </IconButton>
                <IconButton 
                  color="primary"
                  onClick={handleMenuOpen}
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
                  <MenuItem onClick={handleMenuClose}>
                    <ListItemIcon>
                      <InfoIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>View Profile</ListItemText>
                  </MenuItem>
                  <MenuItem onClick={handleMenuClose}>
                    <ListItemIcon>
                      <BlockIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Block User</ListItemText>
                  </MenuItem>
                  <MenuItem onClick={handleMenuClose}>
                    <ListItemIcon>
                      <DeleteIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Delete Chat</ListItemText>
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleMenuClose}>
                    <ListItemIcon>
                      <ReportIcon fontSize="small" color="error" />
                    </ListItemIcon>
                    <ListItemText primaryTypographyProps={{ color: 'error' }}>
                      Report User
                    </ListItemText>
                  </MenuItem>
                </Menu>
              </Box>
            </ChatHeader>
            
            <MessagesList>
              <Box sx={{ flex: 1 }} />
              {messages.map((message) => (
                <MessageBubble 
                  key={message.id} 
                  isCurrentUser={message.isCurrentUser}
                >
                  {!message.isCurrentUser && (
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                      {message.sender}
                    </Typography>
                  )}
                  <Typography>{message.text}</Typography>
                  <Typography className="time">{message.time}</Typography>
                </MessageBubble>
              ))}
            </MessagesList>
            
            <MessageInput>
              <IconButton>
                <AttachFileIcon />
              </IconButton>
              <TextField
                fullWidth
                placeholder="Type a message"
                variant="outlined"
                size="small"
                multiline
                maxRows={4}
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyPress={handleKeyPress}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <EmojiIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <IconButton 
                color="primary" 
                sx={{ ml: 1 }}
                onClick={handleSendMessage}
                disabled={!messageText.trim()}
              >
                <SendIcon />
              </IconButton>
            </MessageInput>
          </>
        ) : (
          <Box sx={{ 
            flex: 1, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
            textAlign: 'center',
            p: 3,
          }}>
            <Box sx={{ 
              width: 120, 
              height: 120, 
              borderRadius: '50%', 
              bgcolor: 'background.paper',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 2,
            }}>
              <SendIcon sx={{ fontSize: 48, color: 'text.secondary' }} />
            </Box>
            <Typography variant="h6" gutterBottom>
              Your messages
            </Typography>
            <Typography color="text.secondary" paragraph>
              Send private messages to a friend or group.
            </Typography>
            <Button 
              variant="contained" 
              color="primary"
              sx={{ mt: 2, borderRadius: 2, textTransform: 'none' }}
            >
              New Message
            </Button>
          </Box>
        )}
      </ChatContainer>
    </MessagesContainer>
  );
};

export default Messages;
