import * as React from 'react';
import { TextField, TextFieldProps } from '@mui/material';

export interface InputProps extends Omit<TextFieldProps, 'variant'> {
  className?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', ...props }, ref) => {
    return (
      <TextField
        type={type}
        variant="outlined"
        size="small"
        inputRef={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };