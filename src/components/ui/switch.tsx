import * as React from 'react';
import { Switch as MuiSwitch, SwitchProps } from '@mui/material';

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ className, ...props }, ref) => (
    <MuiSwitch ref={ref} {...props} />
  )
);
Switch.displayName = 'Switch';

export { Switch };