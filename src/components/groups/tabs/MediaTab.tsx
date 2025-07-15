import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
  useTheme,
  useMediaQuery,
  InputAdornment,
  ToggleButtonGroup,
  ToggleButton,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
} from '@mui/material';
import {
  PhotoLibrary as PhotoLibraryIcon,
  VideoLibrary as VideoLibraryIcon,
  MoreVert as MoreVertIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Sort as SortIcon,
  Delete as DeleteIcon,
  Download as DownloadIcon,
  Share as ShareIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Favorite as FavoriteIcon,
  Comment as CommentIcon,
  Collections as CollectionsIcon,
  Image as ImageIcon,
  Movie as MovieIcon,
  InsertDriveFile as FileIcon,
} from '@mui/icons-material';

// Mock data for media items
const mockMedia = [
  {
    id: '1',
    type: 'image',
    url: '/images/media/group-photo-1.jpg',
    thumbnail: '/images/media/group-photo-1-thumb.jpg',
    title: 'Group Meetup',
    uploader: {
      id: 'user1',
      name: 'Alex Johnson',
      avatar: '/images/avatars/user1.jpg',
    },
    uploadDate: '2023-05-15T14:30:00Z',
    likes: 24,
    comments: 5,
    isLiked: false,
  },
  {
    id: '2',
    type: 'video',
    url: '/videos/group-video-1.mp4',
    thumbnail: '/images/media/group-video-1-thumb.jpg',
    title: 'Workshop Highlights',
    uploader: {
      id: 'user2',
      name: 'Maria Garcia',
      avatar: '/images/avatars/user2.jpg',
    },
    uploadDate: '2023-05-10T09:15:00Z',
    likes: 42,
    comments: 12,
    isLiked: true,
    duration: '2:45',
  },
  {
    id: '3',
    type: 'image',
    url: '/images/media/group-photo-2.jpg',
    thumbnail: '/images/media/group-photo-2-thumb.jpg',
    title: 'Team Building',
    uploader: {
      id: 'user3',
      name: 'John Smith',
      avatar: '/images/avatars/user3.jpg',
    },
    uploadDate: '2023-05-05T16:20:00Z',
    likes: 18,
    comments: 3,
    isLiked: false,
  },
  {
    id: '4',
    type: 'document',
    url: '/documents/meeting-notes.pdf',
    thumbnail: '/images/media/pdf-icon.png',
    title: 'Meeting Notes - May 2023',
    uploader: {
      id: 'user1',
      name: 'Alex Johnson',
      avatar: '/images/avatars/user1.jpg',
    },
    uploadDate: '2023-05-01T11:00:00Z',
    fileType: 'PDF',
    fileSize: '2.4 MB',
  },
  // Add more mock media items as needed
];

interface MediaTabProps {
  groupId: string;
}

const MediaTab: React.FC<MediaTabProps> = ({ groupId }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'images' | 'videos' | 'documents'>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'popular'>('newest');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedMedia, setSelectedMedia] = useState<any>(null);
  const [mediaItems, setMediaItems] = useState(mockMedia);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, media: any) => {
    setAnchorEl(event.currentTarget);
    setSelectedMedia(media);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedMedia(null);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const toggleLike = (mediaId: string) => {
    setMediaItems(mediaItems.map(item => 
      item.id === mediaId 
        ? { ...item, isLiked: !item.isLiked, likes: item.isLiked ? item.likes - 1 : item.likes + 1 }
        : item
    ));
  };

  const handleDeleteMedia = (mediaId: string) => {
    // In a real app, this would delete the media item
    console.log(`Delete media: ${mediaId}`);
    setMediaItems(mediaItems.filter(item => item.id !== mediaId));
    handleMenuClose();
  };

  const handleDownloadMedia = (mediaUrl: string, mediaTitle: string) => {
    // In a real app, this would trigger a download
    console.log(`Download media: ${mediaUrl}`);
    const link = document.createElement('a');
    link.href = mediaUrl;
    link.download = mediaTitle || 'download';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    handleMenuClose();
  };

  const handleShareMedia = (mediaId: string) => {
    // In a real app, this would open a share dialog
    console.log(`Share media: ${mediaId}`);
    handleMenuClose();
  };

  const filteredMedia = mediaItems.filter(media => {
    // Filter by search query
    const matchesSearch = media.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      media.uploader.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by media type
    const matchesType = filter === 'all' || 
      (filter === 'images' && media.type === 'image') ||
      (filter === 'videos' && media.type === 'video') ||
      (filter === 'documents' && media.type === 'document');
    
    return matchesSearch && matchesType;
  });

  // Sort media items
  const sortedMedia = [...filteredMedia].sort((a, b) => {
    const dateA = new Date(a.uploadDate).getTime();
    const dateB = new Date(b.uploadDate).getTime();
    
    if (sortBy === 'newest') {
      return dateB - dateA;
    } else if (sortBy === 'oldest') {
      return dateA - dateB;
    } else {
      // Sort by popularity (likes + comments)
      const popularityA = a.likes + (a.comments || 0);
      const popularityB = b.likes + (b.comments || 0);
      return popularityB - popularityA;
    }
  });

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const getMediaIcon = (type: string) => {
    switch (type) {
      case 'image':
        return <ImageIcon color="primary" />;
      case 'video':
        return <MovieIcon color="error" />;
      case 'document':
        return <FileIcon color="action" />;
      default:
        return <CollectionsIcon color="action" />;
    }
  };

  const getMediaTypeLabel = (type: string) => {
    switch (type) {
      case 'image':
        return 'Image';
      case 'video':
        return 'Video';
      case 'document':
        return 'Document';
      default:
        return 'Media';
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
        <Typography variant="h6" component="h2">
          Group Media
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, width: { xs: '100%', sm: 'auto' }, flexWrap: 'wrap' }}>
          <TextField
            size="small"
            placeholder="Search media..."
            value={searchQuery}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ flexGrow: { xs: 1, sm: 0 }, minWidth: 200 }}
          />
          
          <ToggleButtonGroup
            value={filter}
            exclusive
            onChange={(e, newFilter) => newFilter && setFilter(newFilter)}
            aria-label="media filter"
            size="small"
          >
            <ToggleButton value="all" aria-label="all media">
              <CollectionsIcon fontSize="small" sx={{ mr: 0.5 }} />
              <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>All</Box>
            </ToggleButton>
            <ToggleButton value="images" aria-label="images">
              <PhotoLibraryIcon fontSize="small" sx={{ mr: 0.5 }} />
              <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>Images</Box>
            </ToggleButton>
            <ToggleButton value="videos" aria-label="videos">
              <VideoLibraryIcon fontSize="small" sx={{ mr: 0.5 }} />
              <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>Videos</Box>
            </ToggleButton>
            <ToggleButton value="documents" aria-label="documents">
              <FileIcon fontSize="small" sx={{ mr: 0.5 }} />
              <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>Docs</Box>
            </ToggleButton>
          </ToggleButtonGroup>
          
          <Button
            variant="outlined"
            startIcon={<SortIcon />}
            onClick={() => setSortBy(sortBy === 'newest' ? 'oldest' : sortBy === 'oldest' ? 'popular' : 'newest')}
            sx={{ whiteSpace: 'nowrap' }}
          >
            {sortBy === 'newest' ? 'Newest' : sortBy === 'oldest' ? 'Oldest' : 'Popular'}
          </Button>
          
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<PhotoLibraryIcon />}
            sx={{ whiteSpace: 'nowrap' }}
          >
            Add Media
          </Button>
        </Box>
      </Box>
      
      {sortedMedia.length > 0 ? (
        <Grid container spacing={2}>
          {sortedMedia.map((media) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={media.id}>
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: theme.shadows[8],
                    '& .media-actions': {
                      opacity: 1,
                    },
                  },
                }}
              >
                <Box sx={{ position: 'relative', pt: '56.25%' /* 16:9 Aspect Ratio */ }}>
                  {media.type === 'image' && (
                    <CardMedia
                      component="img"
                      image={media.thumbnail || media.url}
                      alt={media.title}
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  )}
                  
                  {media.type === 'video' && (
                    <>
                      <CardMedia
                        component="img"
                        image={media.thumbnail}
                        alt={media.title}
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                      <Box
                        sx={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          width: 64,
                          height: 64,
                          borderRadius: '50%',
                          backgroundColor: 'rgba(0, 0, 0, 0.5)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
                          },
                        }}
                      >
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </Box>
                      {media.duration && (
                        <Chip
                          label={media.duration}
                          size="small"
                          sx={{
                            position: 'absolute',
                            bottom: 8,
                            right: 8,
                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
                            color: 'white',
                            '& .MuiChip-label': {
                              px: 1,
                            },
                          }}
                        />
                      )}
                    </>
                  )}
                  
                  {media.type === 'document' && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'background.paper',
                        p: 2,
                        textAlign: 'center',
                      }}
                    >
                      <FileIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 1 }} />
                      <Typography variant="subtitle2" noWrap sx={{ width: '100%' }}>
                        {media.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {media.fileType} • {media.fileSize}
                      </Typography>
                    </Box>
                  )}
                  
                  <Box 
                    className="media-actions"
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      p: 1,
                      background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      opacity: { xs: 1, sm: 0 },
                      transition: 'opacity 0.2s',
                    }}
                  >
                    <Chip 
                      label={getMediaTypeLabel(media.type)}
                      size="small"
                      sx={{ 
                        color: 'white',
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        '& .MuiChip-label': {
                          px: 1,
                        },
                      }}
                      icon={getMediaIcon(media.type)}
                    />
                    <IconButton 
                      size="small" 
                      sx={{ color: 'white' }}
                      onClick={(e) => handleMenuOpen(e, media)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </Box>
                </Box>
                
                <CardContent sx={{ flexGrow: 1, p: 2 }}>
                  <Typography variant="subtitle2" noWrap sx={{ mb: 0.5 }}>
                    {media.title}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Avatar 
                      src={media.uploader.avatar} 
                      alt={media.uploader.name}
                      sx={{ width: 24, height: 24, mr: 1 }}
                    />
                    <Typography variant="caption" color="text.secondary" noWrap>
                      {media.uploader.name}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="caption" color="text.secondary">
                      {formatDate(media.uploadDate)}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <IconButton 
                          size="small" 
                          onClick={() => toggleLike(media.id)}
                          sx={{ p: 0.5 }}
                        >
                          {media.isLiked ? (
                            <FavoriteIcon color="error" fontSize="small" />
                          ) : (
                            <FavoriteBorderIcon fontSize="small" />
                          )}
                        </IconButton>
                        <Typography variant="caption" color="text.secondary">
                          {media.likes}
                        </Typography>
                      </Box>
                      
                      {media.comments !== undefined && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <CommentIcon fontSize="small" color="action" />
                          <Typography variant="caption" color="text.secondary">
                            {media.comments}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 2 }}>
          <Box sx={{ color: 'text.secondary', mb: 2, '& svg': { fontSize: 60 } }}>
            <PhotoLibraryIcon fontSize="inherit" />
          </Box>
          <Typography variant="h6" gutterBottom>
            No media found
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            {searchQuery 
              ? 'No media match your search. Try a different term.' 
              : 'There are no media items in this group yet.'}
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<PhotoLibraryIcon />}
          >
            Add Media
          </Button>
        </Paper>
      )}
      
      {/* Media Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={() => selectedMedia && handleDownloadMedia(selectedMedia.url, selectedMedia.title)}>
          <DownloadIcon sx={{ mr: 1 }} /> Download
        </MenuItem>
        <MenuItem onClick={() => selectedMedia && handleShareMedia(selectedMedia.id)}>
          <ShareIcon sx={{ mr: 1 }} /> Share
        </MenuItem>
        <MenuItem 
          onClick={() => selectedMedia && toggleLike(selectedMedia.id)}
        >
          {selectedMedia?.isLiked ? (
            <>
              <FavoriteIcon color="error" sx={{ mr: 1 }} /> Unlike
            </>
          ) : (
            <>
              <FavoriteBorderIcon sx={{ mr: 1 }} /> Like
            </>
          )}
        </MenuItem>
        
        <Divider />
        
        <MenuItem 
          onClick={() => selectedMedia && handleDeleteMedia(selectedMedia.id)}
          sx={{ color: 'error.main' }}
        >
          <DeleteIcon sx={{ mr: 1 }} /> Delete
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default MediaTab;
