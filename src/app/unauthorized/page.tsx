import { Button } from '@/components/ui/button';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
      <div className="mx-auto w-full max-w-md space-y-6 rounded-lg border bg-card p-6 shadow-sm">
        <div className="flex flex-col items-center space-y-4">
          <div className="rounded-full bg-destructive/10 p-3">
            <AlertCircle className="h-10 w-10 text-destructive" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight">
              Access Denied
            </h1>
            <p className="text-muted-foreground">
              You don't have permission to access this page. Please contact an
              administrator if you believe this is an error.
            </p>
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <Button asChild className="w-full">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Home
            </Link>
          </Button>
          <Button variant="outline" asChild className="w-full">
            <Link href="/help">Contact Support</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
