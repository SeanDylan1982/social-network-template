import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, TextField, Button, Typography, Paper, Link, Snackbar, Alert } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useAuth } from '../context/AuthContext';

const LoginContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  width: '100%',
  background: theme.palette.background.default,
  padding: theme.spacing(3),
  boxSizing: 'border-box',
}));

const LoginPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  width: '100%',
  maxWidth: '420px',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[4],
  position: 'relative',
  overflow: 'hidden',
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: theme.palette.primary.main,
  },
  '&:hover': {
    boxShadow: theme.shadows[6],
    transform: 'translateY(-2px)',
    transition: theme.transitions.create(['box-shadow', 'transform']),
  },
}));

const Logo = styled('div')(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(3),
  '& h1': {
    color: theme.palette.text.primary,
    margin: 0,
    fontSize: '2rem',
    fontWeight: 700,
    background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(1.5, 3),
  fontWeight: 600,
  textTransform: 'none',
  borderRadius: theme.shape.borderRadius,
  background: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[4],
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.shape.borderRadius,
    '& fieldset': {
      borderColor: theme.palette.divider,
    },
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
      boxShadow: `0 0 0 2px ${theme.palette.primary.main}40`,
    },
  },
}));

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      await login(email, password);
      setShowSuccess(true);
      
      // Redirect to home after a short delay to show success message
      setTimeout(() => {
        router.push('/');
      }, 1000);
      
    } catch (err) {
      console.error('Login error:', err);
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred during login';
      setError(errorMessage);
    }
  };

  return (
    <LoginContainer>
      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setShowSuccess(false)} severity="success" sx={{ width: '100%' }}>
          Login successful! Redirecting...
        </Alert>
      </Snackbar>
      
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError('')}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setError('')} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
      
      <LoginPaper elevation={0}>
        <Logo>
          <h1>Social Network</h1>
        </Logo>
        
        <Typography variant="h5" component="h2" align="center" gutterBottom sx={{ mb: 3 }}>
          Welcome back!
        </Typography>
        
        <form onSubmit={handleSubmit}>
          <StyledTextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            variant="outlined"
            required
            sx={{ mb: 2 }}
          />
          
          <StyledTextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            variant="outlined"
            required
            sx={{ mb: 1 }}
          />
          
          <Box textAlign="right" sx={{ mb: 2 }}>
            <Link href="/auth/forgot-password" variant="body2" sx={{ textDecoration: 'none' }}>
              Forgot password?
            </Link>
          </Box>
          
          <StyledButton
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={!email || !password}
          >
            Sign In
          </StyledButton>
          
          <Box textAlign="center" mt={2}>
            <Typography variant="body2" color="text.secondary">
              Don't have an account?{' '}
              <Link href="/auth/signup" sx={{ fontWeight: 600, textDecoration: 'none' }}>
                Sign up
              </Link>
            </Typography>
          </Box>
        </form>
      </LoginPaper>
    </LoginContainer>
  );
};

export default Login;
