import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  Box,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
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
  TextField,
  Divider,
  Tooltip,
  CircularProgress,
} from '@mui/material';
import {
  MessageSquare as MessageIcon,
  Send as SendIcon,
  EmojiHappy as EmojiIcon,
  Paperclip as PaperclipIcon,
  MoreVertical as MoreIcon,
  Mic as MicIcon,
  Video as VideoIcon,
  Phone as PhoneIcon,
  Image as ImageIcon,
  File as FileIcon,
} from 'lucide-react';

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  isSent: boolean;
  isRead: boolean;
}

interface MessageConversationModalProps {
  open: boolean;
  onClose: () => void;
  threadId: string;
  threadName: string;
  threadAvatar: string;
  messages: Message[];
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
}

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    width: '800px',
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

const StyledMessageContainer = styled(Box)(({ theme }) => ({
  height: 'calc(100vh - 200px)',
  overflowY: 'auto',
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

const StyledMessage = styled(Box)(({ theme, isSent }: { theme: any; isSent: boolean }) => ({
  maxWidth: '70%',
  backgroundColor: isSent ? theme.palette.primary.light : theme.palette.grey[100],
  borderRadius: '16px',
  padding: theme.spacing(1.5),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.5),
  alignSelf: isSent ? 'flex-end' : 'flex-start',
  '& .message-content': {
    color: isSent ? theme.palette.primary.contrastText : theme.palette.text.primary,
  },
  '& .message-timestamp': {
    fontSize: '0.75rem',
    color: theme.palette.text.secondary,
  },
}));

const StyledMessageInput = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  padding: theme.spacing(2),
  borderTop: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
}));

const StyledInputContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flex: 1,
  gap: theme.spacing(1),
  alignItems: 'center',
  borderRadius: '20px',
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(1),
}));

const StyledInput = styled(TextField)({
  '& .MuiInputBase-root': {
    borderRadius: '16px',
    backgroundColor: 'transparent',
    padding: '8px 12px',
  },
});

const StyledActionButtons = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  alignItems: 'center',
}));

const MessageConversationModal: React.FC<MessageConversationModalProps> = ({
  open,
  onClose,
  threadId,
  threadName,
  threadAvatar,
  messages,
  onSendMessage,
  isLoading,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <StyledDialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: isMobile ? '100%' : '800px',
          borderRadius: isMobile ? 0 : '20px 0 0 20px',
        },
      }}
    >
      <StyledHeader>
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar src={threadAvatar} />
          <Box>
            <Typography variant="h6" fontWeight="bold">
              {threadName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Active now
            </Typography>
          </Box>
        </Box>
        <Box display="flex" gap={1}>
          <Tooltip title="Call">
            <IconButton size="small">
              <PhoneIcon size={18} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Video Call">
            <IconButton size="small">
              <VideoIcon size={18} />
            </IconButton>
          </Tooltip>
          <Tooltip title="More options">
            <IconButton size="small">
              <MoreIcon size={18} />
            </IconButton>
          </Tooltip>
        </Box>
      </StyledHeader>

      <StyledMessageContainer>
        {messages.map((msg) => (
          <StyledMessage key={msg.id} isSent={msg.isSent}>
            <Typography className="message-content" variant="body1">
              {msg.content}
            </Typography>
            <Typography className="message-timestamp" variant="caption">
              {msg.timestamp}
            </Typography>
          </StyledMessage>
        ))}
        {isLoading && (
          <Box display="flex" justifyContent="center" mt={2}>
            <CircularProgress size={20} />
          </Box>
        )}
      </StyledMessageContainer>

      <StyledMessageInput>
        <StyledInputContainer>
          <IconButton size="small">
            <EmojiIcon size={18} />
          </IconButton>
          <StyledInput
            fullWidth
            placeholder="Type a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            variant="standard"
          />
          <IconButton size="small">
            <PaperclipIcon size={18} />
          </IconButton>
          <IconButton size="small">
            <MicIcon size={18} />
          </IconButton>
        </StyledInputContainer>
        <StyledActionButtons>
          <Tooltip title="Send photo">
            <IconButton size="small">
              <ImageIcon size={18} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Send file">
            <IconButton size="small">
              <FileIcon size={18} />
            </IconButton>
          </Tooltip>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSendMessage}
            disabled={!message.trim() || isLoading}
            startIcon={<SendIcon size={16} />}
          >
            Send
          </Button>
        </StyledActionButtons>
      </StyledMessageInput>
    </StyledDialog>
  );
};

export default MessageConversationModal;
