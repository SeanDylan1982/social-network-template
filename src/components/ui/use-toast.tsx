import { useSnackbar } from 'notistack';

interface ToastProps {
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive' | 'success';
}

export function useToast() {
  const { enqueueSnackbar } = useSnackbar();

  const toast = ({ title, description, variant = 'default' }: ToastProps) => {
    const message = title ? `${title}: ${description || ''}` : description || '';
    const snackbarVariant = variant === 'destructive' ? 'error' : variant === 'success' ? 'success' : 'info';
    
    enqueueSnackbar(message, { variant: snackbarVariant });
  };

  return { toast };
}