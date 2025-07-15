import { alpha } from '@mui/material/styles';

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  xxl: '48px',
};

export const borderRadius = {
  small: '4px',
  medium: '8px',
  large: '16px',
  xlarge: '24px',
  full: '9999px',
};

export const shadows = {
  small: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
  medium: '0 3px 6px rgba(0,0,0,0.15), 0 2px 4px rgba(0,0,0,0.12)',
  large: '0 10px 20px rgba(0,0,0,0.1), 0 3px 6px rgba(0,0,0,0.08)',
  xlarge: '0 15px 25px rgba(0,0,0,0.1), 0 5px 10px rgba(0,0,0,0.08)',
};

export const transitions = {
  quick: 'all 0.2s ease-in-out',
  normal: 'all 0.3s ease-in-out',
  slow: 'all 0.5s ease-in-out',
};

export const zIndex = {
  appBar: 1200,
  drawer: 1100,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500,
};

export const getHoverBackground = (color: string) => (theme: any) =>
  alpha(theme.palette[color].main, theme.palette.action.hoverOpacity);

export const getActiveBackground = (color: string) => (theme: any) =>
  alpha(theme.palette[color].main, theme.palette.action.activatedOpacity);

export const focusStyles = {
  '&:focus-visible': {
    outline: 'none',
    boxShadow: (theme: any) => `0 0 0 2px ${theme.palette.primary.main}`,
  },
};

export const commonButtonStyles = (theme: any) => ({
  textTransform: 'none',
  fontWeight: 600,
  borderRadius: borderRadius.medium,
  padding: `${theme.spacing(0.75)} ${theme.spacing(2)}`,
  transition: transitions.quick,
  '&:hover': {
    boxShadow: 'none',
  },
  '&.MuiButton-contained': {
    boxShadow: 'none',
    '&:hover': {
      boxShadow: shadows.medium,
    },
  },
  '&.MuiButton-outlined': {
    borderWidth: '1.5px',
    '&:hover': {
      borderWidth: '1.5px',
    },
  },
  ...focusStyles,
});

export const cardStyles = (theme: any) => ({
  borderRadius: borderRadius.large,
  boxShadow: shadows.small,
  transition: transitions.normal,
  backgroundColor: theme.palette.background.paper,
  '&:hover': {
    boxShadow: shadows.medium,
  },
  '&.MuiPaper-elevation1': {
    boxShadow: shadows.small,
  },
});

export const inputStyles = (theme: any) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: borderRadius.medium,
    '& fieldset': {
      borderColor: theme.palette.divider,
    },
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
    '&.Mui-focused fieldset': {
      borderWidth: '1.5px',
    },
  },
  '& .MuiInputLabel-root': {
    color: theme.palette.text.secondary,
  },
});

export const avatarStyles = {
  width: 40,
  height: 40,
  cursor: 'pointer',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
};

export const linkStyles = (theme: any) => ({
  color: theme.palette.primary.main,
  textDecoration: 'none',
  cursor: 'pointer',
  '&:hover': {
    textDecoration: 'underline',
  },
  ...focusStyles,
});
