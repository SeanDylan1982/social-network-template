import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
  Link,
  IconButton,
  Paper,
  useTheme,
  styled,
} from '@mui/material';
import { Close as CloseIcon, Cookie as CookieIcon } from '@mui/icons-material';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-container': {
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    padding: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2),
    },
  },
  '& .MuiPaper-root': {
    margin: 0,
    maxWidth: 400,
    borderRadius: theme.shape.borderRadius * 2,
    boxShadow: theme.shadows[4],
    position: 'relative',
    overflow: 'visible',
    backgroundColor: theme.palette.background.paper,
  },
}));

const CookieIconContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: -24,
  left: 24,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  width: 48,
  height: 48,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: theme.shadows[4],
  transition: theme.transitions.create(['transform', 'box-shadow']),
  '&:hover': {
    transform: 'scale(1.1)',
    boxShadow: theme.shadows[6],
  },
}));

const CookiePolicyModal: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const theme = useTheme();

  useEffect(() => {
    // Check if user has already accepted cookies
    const hasAccepted = localStorage.getItem('cookieConsent') === 'accepted';
    setOpen(!hasAccepted);
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (!open) return null;

  return (
    <StyledDialog
      open={open}
      onClose={handleClose}
      aria-labelledby="cookie-policy-title"
      maxWidth="sm"
    >
      <CookieIconContainer>
        <CookieIcon fontSize="large" />
      </CookieIconContainer>
      <Box position="relative" pt={4}>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <Typography variant="h6" id="cookie-policy-title" gutterBottom>
            We value your privacy
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ mt: 2 }}>
            For more information, please read our{' '}
            <Link href="/privacy" color="primary" underline="hover">
              Privacy Policy
            </Link>{' '}
            and{' '}
            <Link href="/terms" color="primary" underline="hover">
              Terms of Service
            </Link>
            .
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 3, mt: 3 }}>
          <Button
            onClick={handleClose}
            color="inherit"
            sx={{
              textTransform: 'none',
              fontSize: '0.9375rem',
              fontWeight: 500,
              borderRadius: theme.shape.borderRadius,
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
              },
            }}
          >
            Reject
          </Button>
          <Button
            onClick={handleAccept}
            variant="contained"
            color="primary"
            sx={{
              textTransform: 'none',
              fontSize: '0.9375rem',
              fontWeight: 500,
              borderRadius: theme.shape.borderRadius,
              '&:hover': {
                backgroundColor: theme.palette.primary.dark,
              },
            }}
          >
            Accept All
          </Button>
        </DialogActions>
      </Box>
    </StyledDialog>
  );
};

export default CookiePolicyModal;
