import React, { FC } from 'react';
import Image from 'next/image';
import { Story as StoryType } from '../../types';
import { styled } from '@mui/material/styles';
import { Box, Typography, useTheme } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

interface StoriesProps {
  stories?: StoryType[];
  onAddStory?: () => void;
  onStoryClick?: (id: string) => void;
  className?: string;
}

const StyledStoryContainer = styled(Box)<{ className?: string }>(({ theme }) => ({
  display: 'flex',
  overflowX: 'auto',
  gap: theme.spacing(2),
  padding: theme.spacing(2, 0),
  marginBottom: theme.spacing(4),
  '&::-webkit-scrollbar': {
    display: 'none',
  },
}));

const StyledStoryItem = styled(Box)<{ className?: string }>(({ theme }) => ({
  flexShrink: 0,
  cursor: 'pointer',
  transition: theme.transitions.create(['transform']),
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const StyledStoryAvatar = styled(Box)<{ seen?: boolean }>(({ theme, seen }) => ({
  width: 80,
  height: 80,
  borderRadius: '50%',
  padding: theme.spacing(0.5),
  marginBottom: theme.spacing(1),
  background: seen 
    ? theme.palette.grey[100]
    : `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  boxShadow: seen ? 'none' : theme.shadows[4],
  position: 'relative',
  overflow: 'hidden',
  transition: theme.transitions.create(['transform', 'box-shadow']),
  '&:hover': {
    transform: 'scale(1.1)',
    boxShadow: seen ? 'none' : theme.shadows[6],
  },
  '& .MuiImage-root': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  '& .MuiAvatar-root': {
    width: '100%',
    height: '100%',
  },
}));

const StyledStoryUsername = styled(Typography)<{ className?: string }>(({ theme }) => ({
  fontSize: '0.75rem',
  color: theme.palette.text.secondary,
  fontWeight: 500,
  textAlign: 'center',
  maxWidth: '100px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  '&:hover': {
    color: theme.palette.text.primary,
  },
}));

const StyledStoryContainer = styled(Box)<{ className?: string }>(({ theme }) => ({
  display: 'flex',
  overflowX: 'auto',
  gap: theme.spacing(2),
  padding: theme.spacing(2, 0),
  marginBottom: theme.spacing(4),
  '&::-webkit-scrollbar': {
    display: 'none',
  },
}));

const StyledStoryItem = styled(Box)<{ className?: string }>(({ theme }) => ({
  flexShrink: 0,
  cursor: 'pointer',
  transition: theme.transitions.create(['transform']),
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const StyledStoryAvatar = styled(Box)<{ seen?: boolean }>(({ theme, seen }) => ({
  width: 80,
  height: 80,
  borderRadius: '50%',
  padding: theme.spacing(0.5),
  marginBottom: theme.spacing(1),
  background: seen 
    ? theme.palette.grey[100]
    : `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  boxShadow: seen ? 'none' : theme.shadows[4],
  position: 'relative',
  overflow: 'hidden',
  transition: theme.transitions.create(['transform', 'box-shadow']),
  '&:hover': {
    transform: 'scale(1.1)',
    boxShadow: seen ? 'none' : theme.shadows[6],
  },
  '& .MuiImage-root': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  '& .MuiAvatar-root': {
    width: '100%',
    height: '100%',
  },
}));

const StyledStoryUsername = styled(Typography)<{ className?: string }>(({ theme }) => ({
  fontSize: '0.75rem',
  color: theme.palette.text.secondary,
  fontWeight: 500,
  textAlign: 'center',
  maxWidth: '100px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  '&:hover': {
    color: theme.palette.text.primary,
  },
}));

const Stories: FC<StoriesProps> = ({ 
  stories = [], 
  onAddStory,
  onStoryClick = () => {},
  className = ''
}) => {
  // Sample data for demonstration
  const sampleStories: StoryType[] = [
    {
      id: '1',
      username: 'jane_doe',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      seen: false
    },
    {
      id: '2',
      username: 'mike_t',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      seen: true
    },
    {
      id: '3',
      username: 'sarah_w',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
      seen: false
    },
    {
      id: '4',
      username: 'alex_j',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
      seen: true
    },
    {
      id: '5',
      username: 'emily_r',
      avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
      seen: false
    }
  ];

  // Use sample data if no stories provided
  const displayStories = stories.length > 0 ? stories : sampleStories;

  return (
    <StyledStoryContainer className={className}>
      {/* Add Story Button */}
      <StyledStoryItem onClick={() => onAddStory?.()}>
        <StyledStoryAvatar seen={true}>
          <Box
            sx={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              backgroundColor: theme.palette.background.paper,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <AddIcon sx={{ fontSize: 32, color: theme.palette.primary.main }} />
          </Box>
        </StyledStoryAvatar>
        <StyledStoryUsername variant="body2">Your Story</StyledStoryUsername>
      </StyledStoryItem>

      {/* Display Stories */}
      {displayStories.map((story: StoryType) => (
        <StyledStoryItem
          key={story.id}
          onClick={() => onStoryClick(story.id)}
        >
          <StyledStoryAvatar seen={story.seen}>
            <Box
              sx={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                backgroundColor: theme.palette.background.paper,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Image
                src={story.avatar}
                alt={story.username}
                width={80}
                height={80}
                style={{ objectFit: 'cover' }}
              />
            </Box>
            {!story.seen && (
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  border: `2px solid ${theme.palette.primary.main}`,
                  animation: 'pulse 2s infinite',
                }}
              />
            )}
          </StyledStoryAvatar>
          <StyledStoryUsername variant="body2">{story.username}</StyledStoryUsername>
        </StyledStoryItem>
      ))}
    </StyledStoryContainer>
  );
          <StyledStoryUsername variant="body2">{story.username}</StyledStoryUsername>
        </StyledStoryItem>
      ))}
          <div 
            className={`relative w-20 h-20 rounded-full p-0.5 mb-1.5 transition-all group-hover:scale-105 ${
              story.seen 
                ? 'bg-gray-200' 
                : 'bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 shadow-lg'
            }`}
          >
            <div className="bg-white p-0.5 rounded-full">
              <div className="relative w-full h-full rounded-full overflow-hidden">
                <Image
                  src={story.avatar}
                  alt={story.username}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </div>
            {!story.seen && (
              <div className="absolute inset-0 rounded-full border-2 border-transparent animate-pulse"></div>
            )}
          </div>
          <span className="text-xs text-gray-600 group-hover:text-gray-900 transition-colors truncate max-w-[80px]">
            {story.username}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Stories;
