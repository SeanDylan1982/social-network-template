import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import {
  Box,
  Container,
  Typography,
  IconButton,
  Divider,
  Chip,
  Avatar,
  Button,
  useTheme,
  useMediaQuery,
  Paper,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Bookmark as BookmarkIcon,
  BookmarkBorder as BookmarkBorderIcon,
  Share as ShareIcon,
  AccessTime as AccessTimeIcon,
  Person as PersonIcon,
  Category as CategoryIcon,
} from '@mui/icons-material';
import { mockNewsItems } from '../../mocks/newsMocks';

const NewsDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Find the news item with the matching ID
  const newsItem = mockNewsItems.find(item => item.id === id);

  if (!newsItem) {
    return (
      <Box sx={{ py: 4, textAlign: 'center' }}>
        <Typography variant="h5">News article not found</Typography>
        <Button onClick={() => router.push('/news')} sx={{ mt: 2 }}>
          Back to News
        </Button>
      </Box>
    );
  }

  // Handle save news
  const handleSave = () => {
    // Implement save functionality
    console.log('Saving news:', newsItem.id);
  };

  // Handle share news
  const handleShare = () => {
    // Implement share functionality
    console.log('Sharing news:', newsItem.id);
  };

  return (
    <>
      <Head>
        <title>{newsItem.title} | Social Network</title>
        <meta name="description" content={newsItem.title} />
      </Head>

      <Box sx={{ py: 4 }}>
        <Container maxWidth="lg">
          {/* Back button */}
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => router.back()}
            sx={{ mb: 2 }}
          >
            Back to News
          </Button>

          {/* News header */}
          <Paper elevation={0} sx={{ p: 3, mb: 4, bgcolor: 'background.paper' }}>
            <Box sx={{ mb: 3 }}>
              <Chip
                label={newsItem.category}
                size="small"
                icon={<CategoryIcon fontSize="small" />}
                sx={{ mb: 2 }}
              />
              <Typography variant="h3" component="h1" gutterBottom>
                {newsItem.title}
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Avatar sx={{ width: 32, height: 32 }}>
                    <PersonIcon />
                  </Avatar>
                  <Typography variant="body2" color="text.secondary">
                    {newsItem.source}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AccessTimeIcon color="action" fontSize="small" />
                  <Typography variant="body2" color="text.secondary">
                    {newsItem.timeAgo}
                  </Typography>
                </Box>
              </Box>

              {/* Action buttons */}
              <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
                <Button
                  variant="outlined"
                  startIcon={newsItem.isSaved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                  onClick={handleSave}
                >
                  {newsItem.isSaved ? 'Saved' : 'Save'}
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<ShareIcon />}
                  onClick={handleShare}
                >
                  Share
                </Button>
              </Box>
            </Box>

            {/* Featured image */}
            {newsItem.image && (
              <Box 
                component="img"
                src={newsItem.image}
                alt={newsItem.title}
                sx={{
                  width: '100%',
                  maxHeight: '500px',
                  objectFit: 'cover',
                  borderRadius: 2,
                  mb: 4,
                }}
              />
            )}

            {/* News content */}
            <Box sx={{ lineHeight: 1.8 }}>
              <Typography paragraph>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. 
                Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus 
                rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna 
                non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut 
                dapibus. Mauris iaculis porttitor posuere. Praesent id metus massa, ut blandit odio.
              </Typography>
              <Typography paragraph>
                Proin at tortor eros. Phasellus porta, ante et porta viverra, eros lorem egestas 
                nisl, et faucibus dui lorem in nisl. Maecenas tincidunt tincidunt arcu non suscipit. 
                Nullam velit dui, semper et tincidunt a, aliquam vitae diam. Donec ultricies 
                sollicitudin augue, et interdum eros tempus non. Nunc eleifend, nunc eget 
                elementum ultrices, augue orci dapibus risus, eu tincidunt lorem nisl in orci.
              </Typography>
              <Typography paragraph>
                Quisque viverra, nisl eget tincidunt lacinia, nunc urna egestas neque, 
                vel vehicula nisl dui vitae justo. Aliquam erat volutpat. Nullam auctor, 
                turpis id tincidunt ultrices, nunc nisl ultricies nisl, eget aliquam nisl 
                nunc sit amet nisl. Nullam auctor, turpis id tincidunt ultrices, nunc nisl 
                ultricies nisl, eget aliquam nisl nunc sit amet nisl.
              </Typography>
            </Box>

            {/* Tags */}
            <Box sx={{ mt: 4, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {['Technology', 'Social Media', 'Updates', 'Community'].map((tag) => (
                <Chip key={tag} label={`#${tag}`} variant="outlined" />
              ))}
            </Box>
          </Paper>

          {/* Related news */}
          <Box sx={{ mt: 6 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Related News
            </Typography>
            <Divider sx={{ mb: 3 }} />
            
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3 }}>
              {mockNewsItems
                .filter(item => item.id !== id)
                .slice(0, 2)
                .map((item) => (
                  <Paper 
                    key={item.id} 
                    elevation={0}
                    sx={{ 
                      p: 3, 
                      display: 'flex', 
                      flexDirection: 'column',
                      gap: 2,
                      cursor: 'pointer',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                      }
                    }}
                    onClick={() => router.push(`/news/${item.id}`)}
                  >
                    {item.image && (
                      <Box 
                        component="img"
                        src={item.image}
                        alt={item.title}
                        sx={{
                          width: '100%',
                          height: '200px',
                          objectFit: 'cover',
                          borderRadius: 1,
                          mb: 2,
                        }}
                      />
                    )}
                    <Chip 
                      label={item.category} 
                      size="small" 
                      sx={{ alignSelf: 'flex-start', mb: 1 }}
                    />
                    <Typography variant="h6" component="h3">
                      {item.title}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 'auto' }}>
                      <AccessTimeIcon color="action" fontSize="small" />
                      <Typography variant="body2" color="text.secondary">
                        {item.timeAgo}
                      </Typography>
                    </Box>
                  </Paper>
                ))}
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default NewsDetailPage;
