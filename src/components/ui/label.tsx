import * as React from 'react';
import { FormLabel, FormLabelProps } from '@mui/material';

const Label = React.forwardRef<HTMLLabelElement, FormLabelProps>(
  ({ className, ...props }, ref) => (
    <FormLabel ref={ref} {...props} />
  )
);
Label.displayName = 'Label';

export { Label };