import React, { useState } from 'react';
import { Box, TextField, IconButton, Typography, Avatar } from '@mui/material';
import { Send } from '@mui/icons-material';
import { Card, CardContent } from '../ui/card';

interface Message {
  id: string;
  text: string;
  sender: {
    id: string;
    name: string;
    avatar: string;
  };
  timestamp: Date;
  isOwn: boolean;
}

interface ChatComponentProps {
  messages?: Message[];
  onSendMessage?: (message: string) => void;
}

const ChatComponent: React.FC<ChatComponentProps> = ({
  messages = [],
  onSendMessage
}) => {
  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    if (newMessage.trim() && onSendMessage) {
      onSendMessage(newMessage.trim());
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Card sx={{ height: '500px', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flex: 1, overflow: 'auto', p: 1 }}>
        {messages.length === 0 ? (
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography color="text.secondary">No messages yet</Typography>
          </Box>
        ) : (
          messages.map((message) => (
            <Box
              key={message.id}
              sx={{
                display: 'flex',
                mb: 2,
                justifyContent: message.isOwn ? 'flex-end' : 'flex-start'
              }}
            >
              {!message.isOwn && (
                <Avatar
                  src={message.sender.avatar}
                  sx={{ width: 32, height: 32, mr: 1 }}
                />
              )}
              <Box
                sx={{
                  maxWidth: '70%',
                  p: 1.5,
                  borderRadius: 2,
                  bgcolor: message.isOwn ? 'primary.main' : 'grey.100',
                  color: message.isOwn ? 'white' : 'text.primary'
                }}
              >
                <Typography variant="body2">{message.text}</Typography>
              </Box>
            </Box>
          ))
        )}
      </CardContent>
      
      <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            multiline
            maxRows={3}
          />
          <IconButton
            color="primary"
            onClick={handleSend}
            disabled={!newMessage.trim()}
          >
            <Send />
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
};

export default ChatComponent;