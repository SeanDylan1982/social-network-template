import * as React from 'react';
import { Menu, MenuItem, MenuProps } from '@mui/material';

interface DropdownMenuProps extends Omit<MenuProps, 'open'> {
  children: React.ReactNode;
}

const DropdownMenu = React.forwardRef<HTMLDivElement, DropdownMenuProps>(
  ({ children, ...props }, ref) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    return (
      <div ref={ref}>
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child) && child.type === DropdownMenuTrigger) {
            return React.cloneElement(child, {
              onClick: (e: React.MouseEvent<HTMLElement>) => {
                setAnchorEl(e.currentTarget);
                child.props.onClick?.(e);
              },
            });
          }
          if (React.isValidElement(child) && child.type === DropdownMenuContent) {
            return React.cloneElement(child, {
              anchorEl,
              open,
              onClose: () => setAnchorEl(null),
              ...props,
            });
          }
          return child;
        })}
      </div>
    );
  }
);
DropdownMenu.displayName = 'DropdownMenu';

const DropdownMenuTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ children, ...props }, ref) => (
  <button ref={ref} {...props}>
    {children}
  </button>
));
DropdownMenuTrigger.displayName = 'DropdownMenuTrigger';

const DropdownMenuContent = React.forwardRef<
  HTMLDivElement,
  MenuProps & { children: React.ReactNode }
>(({ children, ...props }, ref) => (
  <Menu ref={ref} {...props}>
    {children}
  </Menu>
));
DropdownMenuContent.displayName = 'DropdownMenuContent';

const DropdownMenuItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<typeof MenuItem>
>(({ children, ...props }, ref) => (
  <MenuItem ref={ref} {...props}>
    {children}
  </MenuItem>
));
DropdownMenuItem.displayName = 'DropdownMenuItem';

const DropdownMenuSeparator = () => <hr style={{ margin: 0, border: 'none', borderTop: '1px solid #e0e0e0' }} />;

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
};