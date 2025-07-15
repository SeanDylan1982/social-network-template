import { Skeleton } from '@/components/ui/skeleton';

export default function VideoLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Video Player Skeleton */}
          <div className="aspect-video bg-muted rounded-lg overflow-hidden">
            <Skeleton className="h-full w-full" />
          </div>
          
          {/* Video Details Skeleton */}
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <div className="flex items-center space-x-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
              <Skeleton className="h-10 w-24 ml-auto" />
            </div>
            <Skeleton className="h-20 w-full" />
          </div>
          
          {/* Comments Section Skeleton */}
          <div className="space-y-4">
            <Skeleton className="h-6 w-32" />
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex space-x-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center space-x-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <div className="flex space-x-4">
                      <Skeleton className="h-4 w-12" />
                      <Skeleton className="h-4 w-12" />
                      <Skeleton className="h-4 w-12" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Sidebar Skeleton */}
        <div className="lg:col-span-1 space-y-4">
          <Skeleton className="h-6 w-32 mb-4" />
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex space-x-3">
              <Skeleton className="h-20 w-36 flex-shrink-0" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-3 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
