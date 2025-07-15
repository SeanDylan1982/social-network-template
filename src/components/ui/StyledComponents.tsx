import { styled } from '@mui/material/styles';
import { Button, Card, CardContent, TextField, Avatar, Link } from '@mui/material';
import { commonButtonStyles, cardStyles, inputStyles, avatarStyles, linkStyles } from '@/theme/styleGuide';

export const StyledButton = styled(Button)(({ theme }) => ({
  ...commonButtonStyles(theme),
}));

export const StyledCard = styled(Card)(({ theme }) => ({
  ...cardStyles(theme),
}));

export const StyledCardContent = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(3),
  '&:last-child': {
    paddingBottom: theme.spacing(3),
  },
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  ...inputStyles(theme),
  '& .MuiOutlinedInput-root': {
    backgroundColor: theme.palette.background.paper,
  },
}));

export const StyledAvatar = styled(Avatar)(({ theme }) => ({
  ...avatarStyles,
  backgroundColor: theme.palette.primary.main,
}));

export const StyledLink = styled(Link)(({ theme }) => ({
  ...linkStyles(theme),
  fontWeight: 500,
}));

export const PageContainer = styled('div')(({ theme }) => ({
  padding: theme.spacing(3),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

export const SectionTitle = styled('h2')(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: 600,
  margin: 0,
  marginBottom: theme.spacing(3),
  color: theme.palette.text.primary,
}));

export const FlexContainer = styled('div')<{ gap?: string; justify?: string; align?: string; direction?: string }>(
  ({ theme, gap = '1rem', justify = 'flex-start', align = 'center', direction = 'row' }) => ({
    display: 'flex',
    gap: gap,
    justifyContent: justify,
    alignItems: align,
    flexDirection: direction as any,
    [theme.breakpoints.down('sm')]: {
      flexDirection: direction === 'row' ? 'column' : (direction as any),
    },
  })
);

export const CardAction = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(2),
  borderTop: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.default,
  borderBottomLeftRadius: 'inherit',
  borderBottomRightRadius: 'inherit',
}));
