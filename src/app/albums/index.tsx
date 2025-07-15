import React from 'react';
import { Box, Typography, Button, Grid, Card, CardContent, CardMedia } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Styled Components
const PageContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: 1200,
  margin: '0 auto',
  '& .header-section': {
    marginBottom: theme.spacing(4),
    '& .MuiTypography-h4': {
      fontWeight: 600,
      marginBottom: theme.spacing(1),
    },
  },
  '& .albums-grid': {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
    },
  },
  '& .empty-state': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    py: theme.spacing(8),
    textAlign: 'center',
    '& .MuiTypography-h6': {
      marginBottom: theme.spacing(2),
    },
    '& .MuiButton-root': {
      marginTop: theme.spacing(2),
    },
  },
}));

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(3),
}));

const AlbumCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: theme.transitions.create(['box-shadow', 'transform']),
  '&:hover': {
    boxShadow: theme.shadows[6],
    transform: 'translateY(-4px)',
  },
  '& .MuiCardMedia-root': {
    height: 200,
    borderRadius: '8px 8px 0 0',
    position: 'relative',
    overflow: 'hidden',
    '& img': {
      objectFit: 'cover',
    },
    '& .overlay': {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      '& .MuiTypography-root': {
        fontSize: '1.25rem',
        fontWeight: 600,
      },
    },
  },
  '& .MuiCardContent-root': {
    padding: theme.spacing(3),
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  '& .album-actions': {
    display: 'flex',
    gap: theme.spacing(1.5),
    marginTop: theme.spacing(2),
    '& .MuiButton-root': {
      textTransform: 'none',
      fontSize: '0.9375rem',
      fontWeight: 500,
      padding: theme.spacing(0.5, 2),
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
}));

const AlbumCover = styled(CardMedia)({
  paddingTop: '56.25%', // 16:9 aspect ratio
  position: 'relative',
  '& .MuiSvgIcon-root': {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: 48,
    color: 'rgba(255, 255, 255, 0.8)',
  },
});

const AlbumInfo = styled(CardContent)(({ theme }) => ({
  flexGrow: 1,
  '& .MuiTypography-h6': {
    fontWeight: 600,
    marginBottom: theme.spacing(0.5),
    fontSize: '1.125rem',
    lineHeight: 1.4,
  },
  '& .MuiTypography-body2': {
    color: theme.palette.text.secondary,
    fontSize: '0.875rem',
    opacity: 0.8,
  },
  '& .album-stats': {
    display: 'flex',
    gap: theme.spacing(2),
    marginTop: theme.spacing(2),
    '& .stat-item': {
      display: 'flex',
      alignItems: 'center',
      gap: theme.spacing(0.5),
      '& .MuiSvgIcon-root': {
        fontSize: '1rem',
        color: theme.palette.text.secondary,
      },
    },
  },
}));

// Mock Data
const albums = [
  {
    id: 1,
    title: 'Summer Vacation 2023',
    count: 24,
    coverPhoto: '/placeholder-album-1.jpg',
  },
  {
    id: 2,
    title: 'Family Reunion',
    count: 15,
    coverPhoto: '/placeholder-album-2.jpg',
  },
  {
    id: 3,
    title: 'Weekend Getaway',
    count: 8,
    coverPhoto: '/placeholder-album-3.jpg',
  },
  {
    id: 4,
    title: 'Birthday Party',
    count: 12,
    coverPhoto: '/placeholder-album-4.jpg',
  },
];

const AlbumsPage: React.FC = () => {
  return (
    <PageContainer>
      <Header>
        <Typography variant="h4" component="h1" fontWeight={600}>
          My Albums
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          sx={{ textTransform: 'none' }}
        >
          Create Album
        </Button>
      </Header>

      <Grid container spacing={3}>
        {albums.map((album) => (
          <Grid item key={album.id} xs={12} sm={6} md={4} lg={3}>
            <AlbumCard>
              <AlbumCover image={album.coverPhoto}>
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography variant="h6" color="white">
                    {album.count} photos
                  </Typography>
                </Box>
              </AlbumCover>
              <AlbumInfo>
                <Typography variant="h6" noWrap>
                  {album.title}
                </Typography>
                <Typography variant="body2">
                  {album.count} {album.count === 1 ? 'photo' : 'photos'}
                </Typography>
              </AlbumInfo>
            </AlbumCard>
          </Grid>
        ))}
      </Grid>
    </PageContainer>
  );
};

export default AlbumsPage;
