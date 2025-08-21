import * as React from 'react';
import { FormControl, Select as MuiSelect, MenuItem, SelectProps as MuiSelectProps } from '@mui/material';

interface SelectProps extends Omit<MuiSelectProps, 'children'> {
  children: React.ReactNode;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ children, ...props }, ref) => (
    <FormControl size="small">
      <MuiSelect ref={ref} {...props}>
        {children}
      </MuiSelect>
    </FormControl>
  )
);
Select.displayName = 'Select';

const SelectContent = ({ children }: { children: React.ReactNode }) => <>{children}</>;
SelectContent.displayName = 'SelectContent';

const SelectItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<typeof MenuItem> & { value: string }
>(({ children, ...props }, ref) => (
  <MenuItem ref={ref} {...props}>
    {children}
  </MenuItem>
));
SelectItem.displayName = 'SelectItem';

const SelectTrigger = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, ...props }, ref) => (
  <div ref={ref} {...props}>
    {children}
  </div>
));
SelectTrigger.displayName = 'SelectTrigger';

const SelectValue = ({ placeholder }: { placeholder?: string }) => <span>{placeholder}</span>;
SelectValue.displayName = 'SelectValue';

export {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
};