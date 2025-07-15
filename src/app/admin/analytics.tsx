import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AnalyticsDashboard } from '@/components/admin/analytics';

const AnalyticsPage: NextPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin?callbackUrl=/admin/analytics');
    }
  }, [status, router]);

  // Show loading state while checking authentication
  if (status === 'loading' || !session) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      </AdminLayout>
    );
  }

  // Check if user is admin
  // Note: You'll need to implement proper role checking based on your auth setup
  // const isAdmin = session.user.role === 'admin';
  // if (!isAdmin) {
  //   return (
  //     <AdminLayout>
  //       <div className="p-6">
  //         <div className="rounded-md bg-red-50 p-4">
  //           <div className="flex">
  //             <div className="ml-3">
  //               <h3 className="text-sm font-medium text-red-800">Access Denied</h3>
  //               <div className="mt-2 text-sm text-red-700">
  //                 <p>You don't have permission to view this page.</p>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </AdminLayout>
  //   );
  // }

  return (
    <AdminLayout>
      <div className="p-6">
        <AnalyticsDashboard />
      </div>
    </AdminLayout>
  );
};

export default AnalyticsPage;
