// src/app/client-layout.tsx
"use client";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { theme } from "@/theme";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { SnackbarProvider } from 'notistack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import FixedMainLayout from "@/components/layout/FixedMainLayout";
import { AuthProvider } from "@/context/AuthContext";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <QueryClientProvider client={queryClient}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <ThemeProvider theme={theme}>
            <SnackbarProvider 
              maxSnack={3}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              autoHideDuration={3000}
            >
              <CssBaseline />
              <AuthProvider>
                <FixedMainLayout>
                  {children}
                </FixedMainLayout>
              </AuthProvider>
              <ReactQueryDevtools initialIsOpen={false} />
            </SnackbarProvider>
          </ThemeProvider>
        </LocalizationProvider>
      </QueryClientProvider>
    </AppRouterCacheProvider>
  );
}
