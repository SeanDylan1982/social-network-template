import React from 'react';
import {
  Box,
  Button,
  Container,
  Typography,
  useTheme,
  Paper,
  useMediaQuery,
} from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Home as HomeIcon, ArrowBack as ArrowBackIcon } from '@mui/icons-material';

const StyledContainer = styled(Container)(({ theme }) => ({
  maxWidth: 'sm',
  '& .error-paper': {
    p: theme.spacing(6),
    borderRadius: theme.shape.borderRadius * 2,
    boxShadow: theme.shadows[4],
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
      content: '"404"',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      fontSize: '30vw',
      fontWeight: 900,
      color: theme.palette.divider,
      zIndex: 0,
      lineHeight: 1,
      pointerEvents: 'none',
      opacity: 0.1,
    },
    '& .MuiTypography-h1': {
      fontSize: { xs: '4rem', sm: '6rem' },
      fontWeight: 800,
      mb: theme.spacing(2),
      background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    '& .MuiTypography-h4': {
      fontWeight: 700,
      mb: theme.spacing(2),
      color: theme.palette.text.primary,
    },
    '& .MuiTypography-body1': {
      color: theme.palette.text.secondary,
      maxWidth: '600px',
      mx: 'auto',
      mb: theme.spacing(4),
      fontSize: '1.1rem',
      lineHeight: 1.6,
    },
    '& .action-buttons': {
      display: 'flex',
      flexDirection: 'column',
      gap: theme.spacing(2),
      justifyContent: 'center',
      mt: theme.spacing(4),
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
    '& .illustrations': {
      mt: theme.spacing(6),
      display: 'flex',
      justifyContent: 'center',
      gap: theme.spacing(2),
      '& img': {
        width: 120,
        height: 'auto',
        opacity: 0.8,
        transition: theme.transitions.create(['opacity', 'transform']),
        '&:hover': {
          opacity: 1,
          transform: 'translateY(-5px)',
        },
      },
    },
  }),
}));

const Error404: React.FC = () => {
  const theme = useTheme();
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleGoBack = () => {
    router.back();
  };

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <>
      <Head>
        <title>Page Not Found | Social Network</title>
        <meta name="description" content="The page you're looking for doesn't exist or has been moved." />
      </Head>

      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'background.default',
          p: 3,
        }}
      >
        <Container maxWidth="sm">
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 6 },
              borderRadius: 4,
              textAlign: 'center',
              bgcolor: 'background.paper',
              boxShadow: theme.shadows[3],
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '"404"',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                fontSize: '30vw',
                fontWeight: 900,
                color: theme.palette.divider,
                zIndex: 0,
                lineHeight: 1,
                pointerEvents: 'none',
                opacity: 0.5,
              },
            }}
          >
            <Box position="relative" zIndex={1}>
              <Typography
                variant="h1"
                component="h1"
                sx={{
                  fontSize: { xs: '4rem', sm: '6rem' },
                  fontWeight: 800,
                  lineHeight: 1,
                  mb: 2,
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Oops!
              </Typography>
              
              <Typography
                variant="h4"
                component="h2"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  color: 'text.primary',
                }}
              >
                404 - Page Not Found
              </Typography>
              
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                  maxWidth: '600px',
                  mx: 'auto',
                  mb: 4,
                  fontSize: '1.1rem',
                  lineHeight: 1.6,
                }}
              >
                The page you're looking for might have been removed, had its name changed, or is temporarily unavailable.
              </Typography>
              
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: isMobile ? 'column' : 'row',
                  gap: 2,
                  justifyContent: 'center',
                  mt: 4,
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  startIcon={<HomeIcon />}
                  onClick={handleGoHome}
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 600,
                    boxShadow: theme.shadows[2],
                    '&:hover': {
                      boxShadow: theme.shadows[4],
                      transform: 'translateY(-2px)',
                      transition: 'all 0.2s',
                    },
                  }}
                >
                  Go to Homepage
                </Button>
                
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  startIcon={<ArrowBackIcon />}
                  onClick={handleGoBack}
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 600,
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      transition: 'all 0.2s',
                    },
                  }}
                >
                  Go Back
                </Button>
              </Box>
              
              {!isMobile && (
                <Box
                  sx={{
                    mt: 6,
                    display: 'flex',
                    justifyContent: 'center',
                    gap: 2,
                    '& img': {
                      width: 120,
                      height: 'auto',
                      opacity: 0.8,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        opacity: 1,
                        transform: 'translateY(-5px)',
                      },
                    },
                  }}
                >
                  <img
                    src="/images/404-1.svg"
                    alt="404 illustration"
                    style={{ width: '120px' }}
                  />
                  <img
                    src="/images/404-2.svg"
                    alt="404 illustration"
                    style={{ width: '120px', marginTop: '40px' }}
                  />
                </Box>
              )}
              
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{
                  display: 'block',
                  mt: 4,
                  fontSize: '0.8rem',
                }}
              >
                If you think this is a mistake, please{' '}
                <a
                  href="/contact"
                  style={{
                    color: theme.palette.primary.main,
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  contact support
                </a>
                .
              </Typography>
            </Box>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default Error404;
