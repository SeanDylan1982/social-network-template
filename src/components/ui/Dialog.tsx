import * as React from 'react';
import {
  Dialog as MuiDialog,
  DialogTitle as MuiDialogTitle,
  DialogContent as MuiDialogContent,
  DialogActions as MuiDialogActions,
  DialogProps as MuiDialogProps,
} from '@mui/material';

const Dialog = React.forwardRef<HTMLDivElement, MuiDialogProps>(
  ({ children, ...props }, ref) => (
    <MuiDialog ref={ref} {...props}>
      {children}
    </MuiDialog>
  )
);
Dialog.displayName = 'Dialog';

const DialogTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ children, ...props }, ref) => (
  <button ref={ref} {...props}>
    {children}
  </button>
));
DialogTrigger.displayName = 'DialogTrigger';

const DialogContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof MuiDialogContent>
>(({ children, ...props }, ref) => (
  <MuiDialogContent ref={ref} {...props}>
    {children}
  </MuiDialogContent>
));
DialogContent.displayName = 'DialogContent';

const DialogHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, ...props }, ref) => (
  <div ref={ref} {...props}>
    {children}
  </div>
));
DialogHeader.displayName = 'DialogHeader';

const DialogTitle = React.forwardRef<
  HTMLHeadingElement,
  React.ComponentProps<typeof MuiDialogTitle>
>(({ children, ...props }, ref) => (
  <MuiDialogTitle ref={ref} {...props}>
    {children}
  </MuiDialogTitle>
));
DialogTitle.displayName = 'DialogTitle';

const DialogDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ children, ...props }, ref) => (
  <p ref={ref} {...props}>
    {children}
  </p>
));
DialogDescription.displayName = 'DialogDescription';

const DialogFooter = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof MuiDialogActions>
>(({ children, ...props }, ref) => (
  <MuiDialogActions ref={ref} {...props}>
    {children}
  </MuiDialogActions>
));
DialogFooter.displayName = 'DialogFooter';

const DialogClose = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ children, ...props }, ref) => (
  <button ref={ref} {...props}>
    {children}
  </button>
));
DialogClose.displayName = 'DialogClose';

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
};
