import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Avatar as MuiAvatar, useTheme } from '@mui/material';
import { Person as PersonIcon } from '@mui/icons-material';

const StyledAvatar = styled(MuiAvatar)(({ theme }) => ({
  width: 40,
  height: 40,
  fontSize: '1rem',
  fontWeight: 'bold',
  transition: theme.transitions.create(['background-color', 'color']),
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const StyledFallback = styled(Box)(({ theme }) => ({
  width: 40,
  height: 40,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.secondary,
  fontSize: '1.25rem',
  fontWeight: 'bold',
}));

interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  src?: string;
  alt?: string;
  fallback?: string;
  sx?: any;
}

const Avatar: React.FC<AvatarProps> = ({ src, alt = '', fallback, sx }) => {
  const theme = useTheme();

  if (!src) {
    return (
      <StyledFallback sx={sx}>
        {fallback ? (
          fallback.charAt(0).toUpperCase()
        ) : (
          <PersonIcon />
        )}
      </StyledFallback>
    );
  }

  return <StyledAvatar src={src} alt={alt} sx={sx} />;
};

export default Avatar;
