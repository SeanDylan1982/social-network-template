import React from 'react';
import { 
  Box, 
  Typography, 
  List, 
  ListItem, 
  ListItemText,
  Divider,
  IconButton,
  Link,
  styled
} from '@mui/material';
import { MoreHoriz as MoreHorizIcon } from '@mui/icons-material';

const Container = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: 12,
  padding: '12px 0',
  marginBottom: 16,
  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
}));

const Header = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 16px 12px',
});

const Title = styled(Typography)({
  fontSize: '1.0625rem',
  fontWeight: 700,
  lineHeight: 1.2,
});

const StyledListItem = styled(ListItem)({
  padding: '12px 16px',
  alignItems: 'flex-start',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
    cursor: 'pointer',
  },
});

const NewsContent = styled(Box)({
  flex: 1,
  minWidth: 0, // For text overflow
});

const NewsTitle = styled(Typography)({
  fontSize: '0.9375rem',
  fontWeight: 600,
  lineHeight: 1.3,
  marginBottom: 4,
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

const NewsSource = styled(Typography)(({ theme }) => ({
  fontSize: '0.8125rem',
  color: theme.palette.text.secondary,
  marginBottom: 4,
  display: 'flex',
  alignItems: 'center',
  '&:before': {
    content: '"•"',
    margin: '0 4px',
  },
}));

const NewsImage = styled(Box)({
  width: 80,
  height: 80,
  borderRadius: 8,
  overflow: 'hidden',
  marginLeft: 12,
  flexShrink: 0,
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
});

const NewsMeta = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  '& > *': {
    fontSize: '0.75rem',
    color: theme.palette.text.secondary,
    '&:not(:last-child)': {
      marginRight: 8,
      '&:after': {
        content: '"•"',
        marginLeft: 8,
      },
    },
  },
}));

const ShowMoreLink = styled(Typography)(({ theme }) => ({
  display: 'block',
  padding: '12px 16px 4px',
  fontSize: '0.9375rem',
  color: theme.palette.primary.main,
  cursor: 'pointer',
  '&:hover': {
    textDecoration: 'underline',
    backgroundColor: 'transparent',
  },
}));

interface NewsItem {
  id: string;
  title: string;
  source: string;
  timeAgo: string;
  image?: string;
  category?: string;
  isTrending?: boolean;
}

interface NewsProps {
  items: NewsItem[];
  onNewsClick?: (id: string) => void;
  onShowMore?: () => void;
}

const News: React.FC<NewsProps> = ({ items, onNewsClick, onShowMore }) => {
  const handleItemClick = (id: string) => {
    if (onNewsClick) onNewsClick(id);
  };

  return (
    <Container>
      <Header>
        <Title>Trending News</Title>
        <IconButton size="small" edge="end">
          <MoreHorizIcon />
        </IconButton>
      </Header>
      
      <List disablePadding>
        {items.map((item, index) => (
          <React.Fragment key={item.id}>
            <StyledListItem onClick={() => handleItemClick(item.id)}>
              <NewsContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: 'primary.main',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      fontSize: '0.6875rem',
                      letterSpacing: '0.5px',
                    }}
                  >
                    {item.category || 'News'}
                  </Typography>
                  {item.isTrending && (
                    <Box
                      sx={{
                        ml: 1,
                        px: 1,
                        py: 0.25,
                        bgcolor: 'rgba(29, 155, 240, 0.1)',
                        borderRadius: 2,
                        display: 'inline-flex',
                        alignItems: 'center',
                      }}
                    >
                      <Box
                        sx={{
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          bgcolor: 'primary.main',
                          mr: 0.5,
                          animation: 'pulse 1.5s infinite',
                          '@keyframes pulse': {
                            '0%': { opacity: 0.5 },
                            '50%': { opacity: 1 },
                            '100%': { opacity: 0.5 },
                          },
                        }}
                      />
                      <Typography
                        variant="caption"
                        sx={{
                          color: 'primary.main',
                          fontWeight: 600,
                          fontSize: '0.6875rem',
                        }}
                      >
                        Trending
                      </Typography>
                    </Box>
                  )}
                </Box>
                <NewsTitle>{item.title}</NewsTitle>
                <NewsMeta>
                  <span>{item.source}</span>
                  <span>{item.timeAgo}</span>
                </NewsMeta>
              </NewsContent>
              {item.image && (
                <NewsImage>
                  <img src={item.image} alt={item.title} />
                </NewsImage>
              )}
            </StyledListItem>
            {index < items.length - 1 && <Divider component="li" />}
          </React.Fragment>
        ))}
      </List>
      
      {onShowMore && (
        <ShowMoreLink onClick={onShowMore}>
          Show more
        </ShowMoreLink>
      )}
    </Container>
  );
};

export default News;
