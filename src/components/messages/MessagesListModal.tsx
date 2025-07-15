import React from 'react';
import { styled } from '@mui/material/styles';
import {
  Box,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  IconButton,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import {
  MessageSquare as MessageIcon,
  ChevronRight as ChevronIcon,
  Search as SearchIcon,
  MoreVertical as MoreIcon,
} from 'lucide-react';

interface MessageThread {
  id: string;
  avatar: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isOnline: boolean;
}

interface MessagesListModalProps {
  open: boolean;
  onClose: () => void;
  onThreadSelect: (threadId: string) => void;
  searchQuery?: string;
}

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    width: '400px',
    height: '100vh',
    position: 'fixed',
    right: 0,
    top: 0,
    borderRadius: '20px 0 0 20px',
    boxShadow: theme.shadows[8],
  },
}));

const StyledHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
}));

const StyledSearchBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  padding: theme.spacing(1, 2),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.default,
  width: '100%',
  '& input': {
    border: 'none',
    outline: 'none',
    backgroundColor: 'transparent',
    width: '100%',
    fontSize: '0.875rem',
    color: theme.palette.text.primary,
  },
}));

const StyledMessageList = styled(List)(({ theme }) => ({
  height: 'calc(100vh - 120px)',
  overflowY: 'auto',
  padding: 0,
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(1.5, 2),
  borderBottom: `1px solid ${theme.palette.divider}`,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  '&.Mui-selected': {
    backgroundColor: theme.palette.action.selected,
  },
}));

const MessagesListModal: React.FC<MessagesListModalProps> = ({
  open,
  onClose,
  onThreadSelect,
  searchQuery,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Sample message threads (replace with actual data)
  const messageThreads: MessageThread[] = [
    {
      id: '1',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      name: 'Sarah Johnson',
      lastMessage: 'Hey, did you check out the new feature?',
      timestamp: '2m',
      unreadCount: 2,
      isOnline: true,
    },
    {
      id: '2',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      name: 'Mike Thompson',
      lastMessage: 'I love the new design!',
      timestamp: '1h',
      unreadCount: 0,
      isOnline: false,
    },
    {
      id: '3',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
      name: 'Emily Wilson',
      lastMessage: 'Can you help me with this?',
      timestamp: '3h',      unreadCount: 1,
      isOnline: true,
    },
  ];

  return (
    <StyledDialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: isMobile ? '100%' : '400px',
          borderRadius: isMobile ? 0 : '20px 0 0 20px',
        },
      }}
    >
      <StyledHeader>
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="h6" fontWeight="bold">
            Messages
          </Typography>
          <Typography variant="body2" color="text.secondary">
            3 active
          </Typography>
        </Box>
        <Box display="flex" gap={1}>
          <IconButton size="small">
            <SearchIcon size={18} />
          </IconButton>
          <IconButton size="small">
            <MoreIcon size={18} />
          </IconButton>
        </Box>
      </StyledHeader>

      <StyledSearchBox>
        <SearchIcon size={16} color={theme.palette.text.secondary} />
        <input
          type="text"
          placeholder="Search messages..."
          value={searchQuery || ''}
          onChange={(e) => onThreadSelect(e.target.value)}
        />
      </StyledSearchBox>

      <StyledMessageList>
        {messageThreads.map((thread) => (
          <StyledListItem
            key={thread.id}
            button
            selected={false}
            onClick={() => onThreadSelect(thread.id)}
          >
            <ListItemAvatar>
              <Avatar
                src={thread.avatar}
                sx={{
                  bgcolor: thread.isOnline ? theme.palette.success.main : 'transparent',
                  border: thread.isOnline ? 'none' : `2px solid ${theme.palette.background.paper}`,
                }}
              >
                {thread.isOnline && <MessageIcon size={16} color={theme.palette.background.paper} />}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={thread.name}
              secondary={thread.lastMessage}
              primaryTypographyProps={{
                fontWeight: 'bold',
                color: 'text.primary',
              }}
              secondaryTypographyProps={{
                color: thread.unreadCount > 0 ? 'primary' : 'text.secondary',
              }}
            />
            <Box display="flex" alignItems="center" gap={1}>
              {thread.unreadCount > 0 && (
                <Box
                  sx={{
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                  }}
                >
                  {thread.unreadCount}
                </Box>
              )}
              <ChevronIcon size={16} color={theme.palette.text.secondary} />
            </Box>
          </StyledListItem>
        ))}
      </StyledMessageList>
    </StyledDialog>
  );
};

export default MessagesListModal;
