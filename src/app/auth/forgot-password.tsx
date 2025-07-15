import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Container,
  InputAdornment,
  IconButton,
  useTheme,
  useMediaQuery,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  Email as EmailIcon,
  ArrowBack as ArrowBackIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';
import Head from 'next/head';
import { signIn } from 'next-auth/react';

const ForgotPasswordPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Basic validation
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Simulate API call - replace with your actual password reset API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // If successful
      setEmailSent(true);
      setSuccess(true);
      setError('');
    } catch (err) {
      setError(err.message || 'Failed to send reset email. Please try again.');
      setSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToSignIn = () => {
    router.push('/auth/signin');
  };

  return (
    <>
      <Head>
        <title>Forgot Password | Social Network</title>
        <meta name="description" content="Reset your password" />
      </Head>
      
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'background.default',
          p: 3,
          backgroundImage: 'url(/images/auth-bg.svg)', // Add a subtle background pattern
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Container component="main" maxWidth="sm">
          <Paper
            elevation={3}
            sx={{
              p: { xs: 3, sm: 4, md: 5 },
              borderRadius: 3,
              bgcolor: 'background.paper',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 6,
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              },
            }}
          >
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Box
                component="img"
                src="/logo.svg"
                alt="Logo"
                sx={{
                  height: 50,
                  mb: 2,
                  filter: theme.palette.mode === 'dark' ? 'invert(1)' : 'none',
                }}
              />
              <Typography
                component="h1"
                variant="h4"
                sx={{
                  fontWeight: 700,
                  mb: 1,
                  background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {emailSent ? 'Check Your Email' : 'Forgot Password?'}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {emailSent
                  ? `We've sent a password reset link to ${email}`
                  : 'Enter your email address and we\'ll send you a link to reset your password.'}
              </Typography>
            </Box>

            {error && (
              <Alert
                severity="error"
                sx={{ mb: 3, borderRadius: 2, alignItems: 'center' }}
              >
                {error}
              </Alert>
            )}

            {success && (
              <Alert
                icon={<CheckCircleIcon fontSize="inherit" />}
                severity="success"
                sx={{ mb: 3, borderRadius: 2, alignItems: 'center' }}
              >
                Password reset email sent successfully!
              </Alert>
            )}

            {!emailSent ? (
              <Box component="form" onSubmit={handleSubmit} noValidate>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon color="action" />
                      </InputAdornment>
                    ),
                    sx: { borderRadius: 2, height: 56 },
                  }}
                  sx={{ mb: 2 }}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={isLoading}
                  sx={{
                    mt: 1,
                    mb: 2,
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontSize: '1rem',
                    fontWeight: 600,
                    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    '&:hover': {
                      opacity: 0.9,
                      transform: 'translateY(-1px)',
                      boxShadow: theme.shadows[4],
                    },
                    '&:active': {
                      transform: 'translateY(0)',
                    },
                  }}
                >
                  {isLoading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    'Send Reset Link'
                  )}
                </Button>
              </Box>
            ) : (
              <Box sx={{ textAlign: 'center', mt: 4 }}>
                <CheckCircleIcon
                  sx={{
                    fontSize: 80,
                    color: 'success.main',
                    mb: 2,
                    opacity: 0.9,
                  }}
                />
                <Typography variant="h6" gutterBottom>
                  Check Your Inbox
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  We've sent password reset instructions to your email address.
                  The link will expire in 1 hour.
                </Typography>
                <Button
                  variant="outlined"
                  onClick={handleBackToSignIn}
                  startIcon={<ArrowBackIcon />}
                  sx={{
                    mt: 2,
                    borderRadius: 2,
                    textTransform: 'none',
                    px: 3,
                    py: 1,
                  }}
                >
                  Back to Sign In
                </Button>
              </Box>
            )}

            {!emailSent && (
              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  Remember your password?{' '}
                  <Link
                    href="/auth/signin"
                    style={{
                      color: theme.palette.primary.main,
                      textDecoration: 'none',
                      fontWeight: 600,
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    Sign In
                  </Link>
                </Typography>
              </Box>
            )}

            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <Typography variant="caption" color="text.secondary">
                Need help?{' '}
                <Link
                  href="/support"
                  style={{
                    color: theme.palette.primary.main,
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Contact Support
                </Link>
              </Typography>
            </Box>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default ForgotPasswordPage;
