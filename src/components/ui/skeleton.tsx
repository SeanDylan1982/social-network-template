import * as React from 'react';
import { Skeleton as MuiSkeleton, SkeletonProps } from '@mui/material';

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, ...props }, ref) => (
    <MuiSkeleton ref={ref} {...props} />
  )
);
Skeleton.displayName = 'Skeleton';

export { Skeleton };