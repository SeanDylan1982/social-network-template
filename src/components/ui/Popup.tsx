import React from 'react';
import { styled } from '@mui/material/styles';
import {
  Paper,
  Typography,
  Box,
  useTheme,
  IconButton,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

interface PopupProps {
  open: boolean;
  title: string;
  content: React.ReactNode;
  onClose: () => void;
  sx?: any;
}

const StyledPopup = styled(Paper)(({ theme }) => ({
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: '90vw',
  maxHeight: '90vh',
  overflow: 'auto',
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[8],
  backgroundColor: theme.palette.background.paper,
  zIndex: 1300,
}));

const StyledHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const StyledContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  maxHeight: 'calc(90vh - 64px)',
  overflowY: 'auto',
}));

const Popup: React.FC<PopupProps> = ({ open, title, content, onClose, sx }) => {
  const theme = useTheme();

  if (!open) return null;

  return (
    <StyledPopup sx={sx}>
      <StyledHeader>
        <Typography variant="h6" fontWeight="bold">
          {title}
        </Typography>
        <IconButton
          size="small"
          onClick={onClose}
          sx={{
            color: theme.palette.text.secondary,
            '&:hover': {
              backgroundColor: theme.palette.action.hover,
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </StyledHeader>
      <StyledContent>{content}</StyledContent>
    </StyledPopup>
  );
};

export default Popup;
