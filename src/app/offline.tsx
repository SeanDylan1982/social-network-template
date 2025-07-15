import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Button, Typography, Box, Container, Paper, Grid } from '@mui/material';
import { WifiOff as WifiOffIcon, Refresh as RefreshIcon, Home as HomeIcon } from '@mui/icons-material';
import Link from 'next/link';

const OFFLINE_PAGE_TITLE = 'You\'re Offline | Social Network';
const CACHE_NAME = 'social-network-cache-v1';

const StyledContainer = styled(Container)(({ theme }) => ({
  maxWidth: 'md',
  py: theme.spacing(8),
  '& .offline-paper': {
    p: theme.spacing(4),
    textAlign: 'center',
    boxShadow: theme.shadows[4],
    borderRadius: theme.shape.borderRadius * 2,
    '& .MuiSvgIcon-root': {
      fontSize: '8rem',
      color: theme.palette.error.main,
      mb: theme.spacing(4),
    },
    '& .MuiTypography-h4': {
      fontWeight: 600,
      mb: theme.spacing(2),
    },
    '& .MuiTypography-body1': {
      color: theme.palette.text.secondary,
      opacity: 0.8,
      mb: theme.spacing(4),
    },
    '& .action-buttons': {
      display: 'flex',
      gap: theme.spacing(2),
      justifyContent: 'center',
      mb: theme.spacing(6),
      '& .MuiButton-root': {
        textTransform: 'none',
        fontSize: '0.9375rem',
        fontWeight: 500,
        padding: theme.spacing(1.5, 3),
        borderRadius: theme.shape.borderRadius,
        '&.primary': {
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          '&:hover': {
            backgroundColor: theme.palette.primary.dark,
          },
        },
        '&.outlined': {
          borderColor: theme.palette.divider,
          '&:hover': {
            borderColor: theme.palette.primary.main,
          },
        },
      },
    },
    '& .offline-pages': {
      textAlign: 'left',
      mb: theme.spacing(6),
      '& .MuiTypography-h6': {
        fontWeight: 600,
        mb: theme.spacing(1),
      },
      '& .MuiTypography-body2': {
        color: theme.palette.text.secondary,
        mb: theme.spacing(3),
      },
      '& .MuiGrid-container': {
        '& .MuiButton-root': {
          textTransform: 'none',
          fontSize: '0.875rem',
          fontWeight: 500,
          justifyContent: 'flex-start',
          '& .MuiButton-startIcon': {
            mr: theme.spacing(1.5),
          },
        },
      },
    },
    '& .help-section': {
      pt: theme.spacing(3),
      borderTop: `1px solid ${theme.palette.divider}`,
      '& .MuiTypography-body2': {
        color: theme.palette.text.secondary,
        opacity: 0.8,
      },
    },
  }),
}));

const OfflinePage = () => {
  const router = useRouter();
  const [cachedPages, setCachedPages] = useState<string[]>([]);
  const [isOnline, setIsOnline] = useState(true);

  // Check network status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    // Set initial online status
    setIsOnline(navigator.onLine);

    // Add event listeners
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Get cached pages
    const getCachedPages = async () => {
      try {
        const cache = await caches.open(CACHE_NAME);
        const requests = await cache.keys();
        const pages = requests
          .map(request => {
            const url = new URL(request.url);
            return url.pathname;
          })
          .filter((path, index, self) => 
            path !== '/' && 
            !path.startsWith('/_next') && 
            !path.startsWith('/api') &&
            self.indexOf(path) === index
          );
        setCachedPages(pages);
      } catch (error) {
        console.error('Error accessing cache:', error);
      }
    };

    getCachedPages();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleRetry = () => {
    if (isOnline) {
      router.reload();
    } else {
      // If still offline, show a message
      alert('You are still offline. Please check your internet connection and try again.');
    }
  };

  if (isOnline) {
    // If online, redirect to home
    if (typeof window !== 'undefined') {
      router.push('/');
    }
    return null;
  }

  return (
    <>
      <Head>
        <title>{OFFLINE_PAGE_TITLE}</title>
        <meta name="description" content="You are currently offline. Some features may not be available." />
      </Head>
      
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
          <Box sx={{ mb: 4 }}>
            <WifiOffIcon sx={{ fontSize: 80, color: 'error.main' }} />
          </Box>
          
          <Typography variant="h4" component="h1" gutterBottom>
            You're Offline
          </Typography>
          
          <Typography variant="body1" color="text.secondary" paragraph>
            It seems you're not connected to the internet. Some features may not be available.
          </Typography>
          
          <Box sx={{ mt: 4, mb: 6 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<RefreshIcon />}
              onClick={handleRetry}
              sx={{ mr: 2, mb: { xs: 2, sm: 0 } }}
            >
              Try Again
            </Button>
            
            <Link href="/" passHref>
              <Button
                variant="outlined"
                color="primary"
                size="large"
                startIcon={<HomeIcon />}
                sx={{ mb: { xs: 2, sm: 0 } }}
              >
                Go to Homepage
              </Button>
            </Link>
          </Box>
          
          {cachedPages.length > 0 && (
            <Box sx={{ mt: 6, textAlign: 'left' }}>
              <Typography variant="h6" gutterBottom>
                Available Offline
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                The following pages are available offline:
              </Typography>
              
              <Grid container spacing={2} sx={{ mt: 2 }}>
                {cachedPages.map((page) => (
                  <Grid item xs={12} sm={6} md={4} key={page}>
                    <Button
                      fullWidth
                      variant="outlined"
                      color="inherit"
                      onClick={() => router.push(page)}
                      sx={{ justifyContent: 'flex-start', textTransform: 'none' }}
                    >
                      {page === '/' ? 'Home' : page.split('/').pop()?.replace(/-/g, ' ')}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
          
          <Box sx={{ mt: 6, pt: 3, borderTop: 1, borderColor: 'divider' }}>
            <Typography variant="body2" color="text.secondary">
              Need help? Check your network connection or contact support if the problem persists.
            </Typography>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default OfflinePage;
