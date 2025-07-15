import React from 'react';
import { styled } from '@mui/material/styles';
import {
  CircularProgress,
  Box,
  Typography,
  useTheme,
} from '@mui/material';

interface LoadingProps {
  size?: number;
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  message?: string;
  sx?: any;
}

const StyledLoading = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[2],
}));

const Loading: React.FC<LoadingProps> = ({
  size = 24,
  color = 'primary',
  message = 'Loading...',
  sx,
}) => {
  const theme = useTheme();

  return (
    <StyledLoading sx={sx}>
      <CircularProgress size={size} color={color} />
      <Typography variant="body2" color="text.secondary">
        {message}
      </Typography>
    </StyledLoading>
  );
};

export default Loading;
