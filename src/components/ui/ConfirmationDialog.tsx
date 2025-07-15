import React from 'react';
import { styled } from '@mui/material/styles';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  useTheme,
} from '@mui/material';
import { Warning as WarningIcon } from '@mui/icons-material';

interface ConfirmationDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: '12px',
    boxShadow: theme.shadows[8],
  },
}));

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  padding: theme.spacing(3),
  borderBottom: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
}));

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  padding: theme.spacing(3),
}));

const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
  padding: theme.spacing(3),
  borderTop: `1px solid ${theme.palette.divider}`,
  justifyContent: 'flex-end',
}));

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  open,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  loading = false,
}) => {
  const theme = useTheme();

  return (
    <StyledDialog open={open} onClose={onCancel}>
      <StyledDialogTitle>
        <WarningIcon color="warning" />
        <Typography variant="h6" fontWeight="bold">
          {title}
        </Typography>
      </StyledDialogTitle>
      <StyledDialogContent>
        <Typography variant="body1" color="text.secondary">
          {message}
        </Typography>
      </StyledDialogContent>
      <StyledDialogActions>
        <Button
          variant="outlined"
          onClick={onCancel}
          disabled={loading}
          sx={{
            textTransform: 'none',
          }}
        >
          {cancelText}
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={onConfirm}
          disabled={loading}
          sx={{
            textTransform: 'none',
          }}
        >
          {confirmText}
        </Button>
      </StyledDialogActions>
    </StyledDialog>
  );
};

export default ConfirmationDialog;
