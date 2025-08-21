import * as React from 'react';
import { LinearProgress, LinearProgressProps } from '@mui/material';

interface ProgressProps extends LinearProgressProps {
  value?: number;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ value, ...props }, ref) => (
    <LinearProgress 
      ref={ref} 
      variant={value !== undefined ? "determinate" : "indeterminate"}
      value={value}
      {...props} 
    />
  )
);
Progress.displayName = 'Progress';

export { Progress };