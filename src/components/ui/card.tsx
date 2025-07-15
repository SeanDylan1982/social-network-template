import React from 'react';
import { styled } from '@mui/material/styles';
import {
  Paper as MuiPaper,
  Typography,
  Box,
  useTheme,
} from '@mui/material';

const StyledPaper = styled(MuiPaper)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
  transition: theme.transitions.create(['box-shadow']),
  '&:hover': {
    boxShadow: theme.shadows[4],
  },
}));

const CardHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const CardContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
}));

const CardFooter = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  borderTop: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
}));

const CardTitle = styled(Typography)({
  fontWeight: 'bold',
  marginBottom: '8px',
});

const CardDescription = styled(Typography)({
  color: 'text.secondary',
  marginBottom: '16px',
});

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  sx?: any;
}

const Card: React.FC<CardProps> = ({ children, sx }) => {
  const theme = useTheme();

  return <StyledPaper sx={sx}>{children}</StyledPaper>;
};

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
