import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  Button,
  Divider,
  CircularProgress,
  useTheme,
  useMediaQuery,
  Tabs,
  Tab,
  Paper,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  ThumbUp as ThumbUpIcon,
  ThumbDown as ThumbDownIcon,
  Share as ShareIcon,
  Bookmark as BookmarkIcon,
  BookmarkBorder as BookmarkBorderIcon,
  MoreVert as MoreVertIcon,
  PlaylistAdd as PlaylistAddIcon,
  Flag as FlagIcon,
  Block as BlockIcon,
} from '@mui/icons-material';
import { formatDistanceToNow } from 'date-fns';
import { Video, Comment } from '@/types/video';
import VideoPlayer from './VideoPlayer';
import VideoMetadata from './VideoMetadata';
import ChannelInfo from './ChannelInfo';
import CommentsSection from './CommentsSection';
import RelatedVideos from './RelatedVideos';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`video-tabpanel-${index}`}
      aria-labelledby={`video-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `video-tab-${index}`,
    'aria-controls': `video-tabpanel-${index}`,
  };
}

interface VideoDetailsProps {
  video: Video;
  relatedVideos: Video[];
  comments: Comment[];
  isLoading?: boolean;
  isSubscribed: boolean;
  isLiked: boolean;
  isDisliked: boolean;
  isBookmarked: boolean;
  onLike: () => void;
  onDislike: () => void;
  onSubscribe: () => void;
  onBookmark: () => void;
  onShare: () => void;
  onAddComment: (content: string) => Promise<void>;
  onLikeComment: (commentId: string) => void;
  onReplyToComment: (commentId: string, content: string) => Promise<void>;
  onEditComment: (commentId: string, content: string) => Promise<void>;
  onDeleteComment: (commentId: string) => Promise<void>;
  onVideoSelect: (videoId: string) => void;
  onChannelSelect: (channelId: string) => void;
}

const VideoDetails: React.FC<VideoDetailsProps> = ({
  video,
  relatedVideos = [],
  comments = [],
  isLoading = false,
  isSubscribed = false,
  isLiked = false,
  isDisliked = false,
  isBookmarked = false,
  onLike,
  onDislike,
  onSubscribe,
  onBookmark,
  onShare,
  onAddComment,
  onLikeComment,
  onReplyToComment,
  onEditComment,
  onDeleteComment,
  onVideoSelect,
  onChannelSelect,
}) => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [tabValue, setTabValue] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const playerRef = useRef<HTMLDivElement>(null);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (event: Event, value: number | number[]) => {
    const newVolume = Array.isArray(value) ? value[0] / 100 : value / 100;
    setVolume(newVolume);
    if (newVolume === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
  };

  const handleProgress = (state: { played: number }) => {
    setProgress(state.played);
  };

  const handleSeekMouseDown = () => {
    setShowControls(true);
  };

  const handleSeekChange = (event: Event, value: number | number[]) => {
    setProgress(Array.isArray(value) ? value[0] : value);
  };

  const handleSeekMouseUp = (event: Event | React.SyntheticEvent, value: number | number[]) => {
    const seekTo = Array.isArray(value) ? value[0] : value;
    setProgress(seekTo);
    // Here you would typically seek the video player to the new position
    // playerRef.current?.seekTo(seekTo);
  };

  const handleDuration = (duration: number) => {
    setDuration(duration);
  };

  const handleFullscreenToggle = () => {
    if (!document.fullscreenElement) {
      playerRef.current?.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const handlePlaybackRateChange = (rate: number) => {
    setPlaybackRate(rate);
  };

  const formatViewCount = (count: number): string => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!video) {
    return (
      <Box textAlign="center" py={10}>
        <Typography variant="h6" color="text.secondary">
          Video not found
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => router.push('/videos')}
          sx={{ mt: 2 }}
        >
          Browse Videos
        </Button>
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => router.back()}
        sx={{ mb: 2 }}
      >
        Back
      </Button>

      <Grid container spacing={3}>
        {/* Main content */}
        <Grid item xs={12} lg={8}>
          {/* Video Player */}
          <Box
            ref={playerRef}
            sx={{
              borderRadius: 2,
              overflow: 'hidden',
              backgroundColor: '#000',
              mb: 2,
            }}
          >
            <VideoPlayer
              url={video.videoUrl}
              playing={isPlaying}
              volume={volume}
              muted={isMuted}
              played={progress}
              playbackRate={playbackRate}
              onPlayPause={handlePlayPause}
              onVolumeChange={handleVolumeChange}
              onMuteToggle={handleMuteToggle}
              onProgress={handleProgress}
              onSeekMouseDown={handleSeekMouseDown}
              onSeekChange={handleSeekChange}
              onSeekMouseUp={handleSeekMouseUp}
              onDuration={handleDuration}
              onFullscreenToggle={handleFullscreenToggle}
              onPlaybackRateChange={handlePlaybackRateChange}
              fullscreen={isFullscreen}
              showControls={showControls}
              duration={duration}
              title={video.title}
            />
          </Box>

          {/* Video Metadata */}
          <VideoMetadata
            title={video.title}
            viewCount={video.views}
            likeCount={video.likes}
            dislikeCount={video.dislikes}
            publishedAt={video.uploadedAt}
            description={video.description}
            tags={video.tags || []}
            isLiked={isLiked}
            isDisliked={isDisliked}
            isBookmarked={isBookmarked}
            onLike={onLike}
            onDislike={onDislike}
            onShare={onShare}
            onBookmark={onBookmark}
          />

          {/* Channel Info */}
          <ChannelInfo
            channelId={video.channel.id}
            name={video.channel.name}
            avatarUrl={video.channel.avatar}
            subscriberCount={video.channel.subscribers || 0}
            videoCount={video.channel.videoCount || 0}
            description={video.channel.description}
            isSubscribed={isSubscribed}
            notificationPreference="all"
            onSubscribe={onSubscribe}
            onUnsubscribe={onSubscribe}
            onNotificationToggle={() => {}}
            onVisitChannel={onChannelSelect}
          />

          {/* Tabs */}
          <Paper sx={{ width: '100%', mb: 3, borderRadius: 2, overflow: 'hidden' }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              aria-label="video details tabs"
              sx={{
                '& .MuiTabs-indicator': {
                  height: 3,
                },
              }}
            >
              <Tab 
                label={`Comments (${video.commentCount || 0})`} 
                {...a11yProps(0)} 
                sx={{ fontWeight: 500 }}
              />
              <Tab 
                label="Description" 
                {...a11yProps(1)} 
                sx={{ fontWeight: 500 }}
              />
              <Tab 
                label="Transcript" 
                {...a11yProps(2)} 
                sx={{ fontWeight: 500 }}
              />
            </Tabs>

            <TabPanel value={tabValue} index={0}>
              <CommentsSection
                comments={comments}
                commentCount={video.commentCount || 0}
                onAddComment={onAddComment}
                onLikeComment={onLikeComment}
                onReply={onReplyToComment}
                onEditComment={onEditComment}
                onDeleteComment={onDeleteComment}
                currentUserId="current-user-id" // Replace with actual current user ID
              />
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <Typography variant="body1" sx={{ whiteSpace: 'pre-line', p: 2 }}>
                {video.description || 'No description available.'}
              </Typography>
              
              {video.tags && video.tags.length > 0 && (
                <Box sx={{ mt: 2, p: 2, pt: 0 }}>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                    Tags:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {video.tags.map((tag) => (
                      <Button
                        key={tag}
                        variant="outlined"
                        size="small"
                        href={`/tags/${tag}`}
                        sx={{ borderRadius: 4, textTransform: 'none' }}
                      >
                        {tag}
                      </Button>
                    ))}
                  </Box>
                </Box>
              )}
            </TabPanel>

            <TabPanel value={tabValue} index={2}>
              <Typography variant="body1" color="text.secondary" sx={{ p: 2 }}>
                Transcript is not available for this video.
              </Typography>
            </TabPanel>
          </Paper>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} lg={4}>
          <RelatedVideos
            videos={relatedVideos}
            onVideoSelect={onVideoSelect}
            onChannelSelect={onChannelSelect}
            title="Up next"
            showDivider={false}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default VideoDetails;
