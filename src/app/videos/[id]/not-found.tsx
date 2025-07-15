import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
      <h1 className="text-4xl font-bold mb-4">Video Not Found</h1>
      <p className="text-muted-foreground text-lg mb-8">
        The video you're looking for doesn't exist or has been removed.
      </p>
      <div className="flex gap-4">
        <Button asChild>
          <Link href="/videos">Browse Videos</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/">Go Home</Link>
        </Button>
      </div>
    </div>
  );
}
