import { createTheme, alpha } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    social: {
      lightBlue: string;
      lightGray: string;
      border: string;
    };
  }
  interface PaletteOptions {
    social?: {
      lightBlue?: string;
      lightGray?: string;
      border?: string;
    };
  }
}

// Create the base theme
export const theme = createTheme({
  palette: {
    primary: {
      main: '#2F80ED',
      light: '#5A9AFF',
      dark: '#1E5FCC',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#4F4F4F',
      light: '#828282',
      dark: '#333333',
      contrastText: '#FFFFFF',
    },
    error: {
      main: '#EB5757',
    },
    success: {
      main: '#27AE60',
    },
    background: {
      default: '#F8FAFB',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1A1A1A',
      secondary: '#4F4F4F',
      disabled: '#BDBDBD',
    },
    social: {
      lightBlue: '#E8F2FF',
      lightGray: '#F2F2F2',
      border: '#E0E0E0',
    },
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    h1: {
      fontSize: '1.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
      color: '#1A1A1A',
    },
    h2: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.3,
      color: '#1A1A1A',
    },
    h3: {
      fontSize: '1.125rem',
      fontWeight: 600,
      lineHeight: 1.4,
      color: '#1A1A1A',
    },
    h4: {
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1.4,
      color: '#1A1A1A',
    },
    body1: {
      fontSize: '0.9375rem',
      lineHeight: 1.5,
      color: '#4F4F4F',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
      color: '#828282',
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
      fontSize: '0.875rem',
    },
    caption: {
      fontSize: '0.75rem',
      lineHeight: 1.5,
      color: '#828282',
    },
  },
  spacing: 4, // 4px base unit
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          boxSizing: 'border-box',
          margin: 0,
          padding: 0,
        },
        html: {
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
          height: '100%',
          width: '100%',
        },
        body: {
          backgroundColor: '#F8FAFB',
          height: '100%',
          width: '100%',
          overflowX: 'hidden',
        },
        '#__next': {
          height: '100%',
          width: '100%',
        },
        '*': {
          color: '#1A1A1A',
          '&::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#F1F1F1',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#C4C4C4',
            borderRadius: '4px',
            '&:hover': {
              background: '#A8A8A8',
            },
          },
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
          fontWeight: 600,
          padding: '8px 16px',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-1px)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        },
        contained: {
          boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
          '&:hover': {
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          },
        },
        outlined: {
          borderWidth: '1.5px',
          '&:hover': {
            borderWidth: '1.5px',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
          overflow: 'visible',
          transition: 'box-shadow 0.2s ease-in-out',
          '&:hover': {
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.1)',
          },
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '24px',
          '&:last-child': {
            paddingBottom: '24px',
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          width: 40,
          height: 40,
          fontSize: '1rem',
          fontWeight: 500,
          cursor: 'pointer',
          transition: 'transform 0.2s ease-in-out',
          '&:hover': {
            transform: 'scale(1.05)',
          },
        },
      },
    },
    MuiBadge: {
      styleOverrides: {
        badge: {
          minWidth: 20,
          height: 20,
          borderRadius: 10,
          fontSize: '0.6875rem',
          fontWeight: 600,
          padding: '0 6px',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          '&::placeholder': {
            opacity: 0.8,
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            backgroundColor: 'background.paper',
            '& fieldset': {
              borderColor: 'divider',
              transition: 'border-color 0.2s ease-in-out',
            },
            '&:hover fieldset': {
              borderColor: 'primary.main',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'primary.main',
              borderWidth: '1.5px',
            },
          },
          '& .MuiInputLabel-root': {
            color: 'text.secondary',
            '&.Mui-focused': {
              color: 'primary.main',
            },
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: 'divider',
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          height: 3,
          borderRadius: '3px 3px 0 0',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          fontSize: '0.9375rem',
          minHeight: 48,
          '&.Mui-selected': {
            color: '#2F80ED',
            fontWeight: 600,
          },
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          padding: '8px 12px',
          marginBottom: '4px',
          '&:hover': {
            backgroundColor: 'action.hover',
          },
          '&.Mui-selected': {
            backgroundColor: 'action.selected',
            '&:hover': {
              backgroundColor: 'action.selected',
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          fontWeight: 500,
        },
        outlined: {
          borderColor: 'divider',
          '&:hover': {
            backgroundColor: 'action.hover',
          },
        },
      },
    },
  },
});
