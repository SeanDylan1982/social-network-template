import React from 'react';
import { styled } from '@mui/material/styles';
import { TextField as MuiTextField } from '@mui/material';
import { useTheme } from '@mui/material';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: boolean;
  helperText?: string;
  rows?: number;
  sx?: any;
}

const StyledTextField = styled(MuiTextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.shape.borderRadius,
    '& fieldset': {
      borderColor: theme.palette.divider,
    },
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
  '& .MuiInputLabel-root': {
    color: theme.palette.text.secondary,
  },
  '& .MuiOutlinedInput-input': {
    padding: theme.spacing(1.5, 1),
  },
  '& .MuiFormHelperText-root': {
    color: theme.palette.text.secondary,
  },
}));

const Textarea: React.FC<TextareaProps> = ({
  label,
  error = false,
  helperText,
  rows = 4,
  sx,
  ...props
}) => {
  const theme = useTheme();

  return (
    <StyledTextField
      fullWidth
      multiline
      rows={rows}
      label={label}
      error={error}
      helperText={helperText}
      variant="outlined"
      sx={sx}
      {...props}
    />
  );
};

export default Textarea;
