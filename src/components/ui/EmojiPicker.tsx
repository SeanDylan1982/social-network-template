import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  Box,
  Paper,
  IconButton,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogContent,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { EmojiPicker as AFEEmojiPicker } from 'animated-fluent-emojis';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    maxWidth: '400px',
    borderRadius: theme.shape.borderRadius * 2,
    boxShadow: theme.shadows[6],
  },
}));

const StyledEmojiPicker = styled(AFEEmojiPicker)(({ theme }) => ({
  '& .emoji-picker': {
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[2],
  },
  '& .emoji-grid': {
    backgroundColor: theme.palette.background.paper,
  },
  '& .emoji': {
    transition: theme.transitions.create(['transform', 'box-shadow']),
    '&:hover': {
      transform: 'scale(1.1)',
      boxShadow: theme.shadows[2],
    },
  },
}));

interface EmojiPickerProps {
  open: boolean;
  onClose: () => void;
  onEmojiSelect: (emoji: string) => void;
  sx?: any;
}

const EmojiPicker: React.FC<EmojiPickerProps> = ({
  open,
  onClose,
  onEmojiSelect,
  sx,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleEmojiSelect = (emoji: string) => {
    onEmojiSelect(emoji);
    onClose();
  };

  return (
    <StyledDialog
      open={open}
      onClose={onClose}
      aria-labelledby="emoji-picker-title"
      maxWidth="sm"
      sx={sx}
    >
      <DialogContent>
        <StyledEmojiPicker
          onEmojiSelect={handleEmojiSelect}
          showSearchBar
          showCategoryTabs
          showEmojiTooltip
          showRecentEmojis
          showSkinTonePicker
          showCategoryIcons
          showEmojiPreview
          showEmojiCategories
          showEmojiGrid
          showEmojiSearch
          showEmojiTabs
          showEmojiTooltip
        />
      </DialogContent>
    </StyledDialog>
  );
};

export default EmojiPicker;
