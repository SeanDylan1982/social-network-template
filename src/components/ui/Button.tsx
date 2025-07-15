import React from 'react';
import { styled } from '@mui/material/styles';
import { Button as MuiButton, CircularProgress } from '@mui/material';
import { useTheme } from '@mui/material';

type ButtonVariant = 'contained' | 'outlined' | 'text' | 'ghost';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  isLoading?: boolean;
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'secondary' | 'error' | 'success' | 'warning' | 'info';
};

const StyledButton = styled(MuiButton)<ButtonProps>(({ theme, variant, color }) => ({
  borderRadius: theme.shape.borderRadius,
  textTransform: 'none',
  fontWeight: 'bold',
  fontSize: '0.875rem',
  '&.contained': {
    '&.primary': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      '&:hover': {
        backgroundColor: theme.palette.primary.dark,
      },
    },
    '&.secondary': {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText,
      '&:hover': {
        backgroundColor: theme.palette.secondary.dark,
      },
    },
    '&.error': {
      backgroundColor: theme.palette.error.main,
      color: theme.palette.error.contrastText,
      '&:hover': {
        backgroundColor: theme.palette.error.dark,
      },
    },
    '&.success': {
      backgroundColor: theme.palette.success.main,
      color: theme.palette.success.contrastText,
      '&:hover': {
        backgroundColor: theme.palette.success.dark,
      },
    },
    '&.warning': {
      backgroundColor: theme.palette.warning.main,
      color: theme.palette.warning.contrastText,
      '&:hover': {
        backgroundColor: theme.palette.warning.dark,
      },
    },
    '&.info': {
      backgroundColor: theme.palette.info.main,
      color: theme.palette.info.contrastText,
      '&:hover': {
        backgroundColor: theme.palette.info.dark,
      },
    },
  },
  '&.outlined': {
    '&.primary': {
      borderColor: theme.palette.primary.main,
      color: theme.palette.primary.main,
      '&:hover': {
        backgroundColor: theme.palette.primary.light,
      },
    },
    '&.secondary': {
      borderColor: theme.palette.secondary.main,
      color: theme.palette.secondary.main,
      '&:hover': {
        backgroundColor: theme.palette.secondary.light,
      },
    },
    '&.error': {
      borderColor: theme.palette.error.main,
      color: theme.palette.error.main,
      '&:hover': {
        backgroundColor: theme.palette.error.light,
      },
    },
    '&.success': {
      borderColor: theme.palette.success.main,
      color: theme.palette.success.main,
      '&:hover': {
        backgroundColor: theme.palette.success.light,
      },
    },
    '&.warning': {
      borderColor: theme.palette.warning.main,
      color: theme.palette.warning.main,
      '&:hover': {
        backgroundColor: theme.palette.warning.light,
      },
    },
    '&.info': {
      borderColor: theme.palette.info.main,
      color: theme.palette.info.main,
      '&:hover': {
        backgroundColor: theme.palette.info.light,
      },
    },
  },
  '&.text': {
    '&.primary': {
      color: theme.palette.primary.main,
      '&:hover': {
        backgroundColor: theme.palette.primary.light,
      },
    },
    '&.secondary': {
      color: theme.palette.secondary.main,
      '&:hover': {
        backgroundColor: theme.palette.secondary.light,
      },
    },
    '&.error': {
      color: theme.palette.error.main,
      '&:hover': {
        backgroundColor: theme.palette.error.light,
      },
    },
    '&.success': {
      color: theme.palette.success.main,
      '&:hover': {
        backgroundColor: theme.palette.success.light,
      },
    },
    '&.warning': {
      color: theme.palette.warning.main,
      '&:hover': {
        backgroundColor: theme.palette.warning.light,
      },
    },
    '&.info': {
      color: theme.palette.info.main,
      '&:hover': {
        backgroundColor: theme.palette.info.light,
      },
    },
  },
  '&.ghost': {
    backgroundColor: 'transparent',
    color: theme.palette.text.primary,
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}));

const Button: React.FC<ButtonProps> = ({
  variant = 'contained',
  isLoading = false,
  children,
  size = 'medium',
  color = 'primary',
  ...props
}) => {
  const theme = useTheme();

  return (
    <StyledButton
      variant={variant}
      size={size}
      color={color}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <CircularProgress size={16} sx={{ mr: 1 }} />
          Loading...
        </>
      ) : (
        children
      )}
    </StyledButton>
  );
};

export default Button;
