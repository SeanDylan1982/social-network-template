import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
  Alert,
  styled,
  useTheme,
} from '@mui/material';
import { Report as ReportIcon } from '@mui/icons-material';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: theme.shape.borderRadius * 2,
    boxShadow: theme.shadows[6],
  },
}));

interface ReportPostModalProps {
  open: boolean;
  onClose: () => void;
  postId: string;
  onReport: (postId: string, reason: string) => void;
}

const ReportPostModal: React.FC<ReportPostModalProps> = ({
  open,
  onClose,
  postId,
  onReport,
}) => {
  const [reportReason, setReportReason] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();

  const handleSubmit = async () => {
    if (!reportReason.trim()) {
      setError('Please provide a reason for reporting this post');
      return;
    }

    setSubmitting(true);
    try {
      await onReport(postId, reportReason);
      onClose();
    } catch (err) {
      setError('Failed to report post. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <StyledDialog
      open={open}
      onClose={onClose}
      aria-labelledby="report-post-title"
      maxWidth="sm"
    >
      <DialogTitle id="report-post-title">
        <Box display="flex" alignItems="center" gap={1}>
          <ReportIcon color="error" />
          <Typography variant="h6">Report Post</Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <Typography variant="body1" sx={{ mb: 2 }}>
          Please provide a reason for reporting this post:
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={4}
          value={reportReason}
          onChange={(e) => {
            setReportReason(e.target.value);
            setError(null);
          }}
          placeholder="Please describe why you are reporting this post..."
          variant="outlined"
          sx={{ mb: 2 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={submitting}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="error"
          disabled={submitting || !reportReason.trim()}
        >
          {submitting ? 'Submitting...' : 'Report Post'}
        </Button>
      </DialogActions>
    </StyledDialog>
  );
};

export default ReportPostModal;
