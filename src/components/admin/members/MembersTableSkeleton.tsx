import { Skeleton } from '@/components/ui/skeleton';

export function MembersTableSkeleton() {
  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground w-12">
                  <Skeleton className="h-4 w-4" />
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  <Skeleton className="h-4 w-24" />
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  <Skeleton className="h-4 w-32" />
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  <Skeleton className="h-4 w-20" />
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  <Skeleton className="h-4 w-20" />
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  <Skeleton className="h-4 w-24" />
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  <Skeleton className="h-4 w-24" />
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground w-12">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="border-b transition-colors hover:bg-muted/50">
                  <td className="p-4 align-middle">
                    <Skeleton className="h-4 w-4" />
                  </td>
                  <td className="p-4 align-middle">
                    <div className="flex items-center space-x-3">
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  </td>
                  <td className="p-4 align-middle">
                    <Skeleton className="h-4 w-40" />
                  </td>
                  <td className="p-4 align-middle">
                    <Skeleton className="h-6 w-16 rounded-full" />
                  </td>
                  <td className="p-4 align-middle">
                    <Skeleton className="h-6 w-20 rounded-full" />
                  </td>
                  <td className="p-4 align-middle">
                    <Skeleton className="h-4 w-24" />
                  </td>
                  <td className="p-4 align-middle">
                    <Skeleton className="h-4 w-24" />
                  </td>
                  <td className="p-4 align-middle">
                    <Skeleton className="h-8 w-8 rounded-md" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between p-4 border-t">
          <Skeleton className="h-4 w-32" />
          <div className="flex items-center space-x-2">
            <Skeleton className="h-9 w-24" />
            <Skeleton className="h-9 w-24" />
          </div>
        </div>
        <div className="flex items-center justify-end space-x-2 p-4 border-t">
          <Skeleton className="h-9 w-20" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-9 w-20" />
        </div>
      </div>
    </div>
  );
}
