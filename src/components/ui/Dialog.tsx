import React from 'react';
import { styled } from '@mui/material/styles';
import {
  Dialog as MuiDialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  useTheme,
  IconButton,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

interface DialogProps {
  open: boolean;
  title: string;
  content: React.ReactNode;
  actions?: React.ReactNode;
  onClose: () => void;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  sx?: any;
}

const StyledDialog = styled(MuiDialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[8],
  },
}));

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  padding: theme.spacing(3),
  borderBottom: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  padding: theme.spacing(4),
  '&:last-child': {
    paddingBottom: theme.spacing(4),
  },
}));

const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
  padding: theme.spacing(3),
  borderTop: `1px solid ${theme.palette.divider}`,
  justifyContent: 'flex-end',
}));

const Dialog: React.FC<DialogProps> = ({
  open,
  title,
  content,
  actions,
  onClose,
  maxWidth = 'md',
  fullWidth = true,
  sx,
}) => {
  const theme = useTheme();

  return (
    <StyledDialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      sx={sx}
    >
      <StyledDialogTitle>
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
      </StyledDialogTitle>
      <StyledDialogContent>{content}</StyledDialogContent>
      {actions && <StyledDialogActions>{actions}</StyledDialogActions>}
    </StyledDialog>
  );
};

export default Dialog;
