import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { styled } from '@mui/material/styles';
import { Card, CardHeader, CardContent, Box, Typography, IconButton, Divider, useTheme } from '@mui/material';
import { Users, FileText, MessageSquare, BarChart2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Users, FileText, MessageSquare, BarChart2 } from 'lucide-react';

const StyledCard = styled(Card)(({ theme }) => ({
  transition: theme.transitions.create(['box-shadow', 'transform']),
  '&:hover': {
    boxShadow: theme.shadows[6],
    transform: 'translateY(-2px)',
  },
}));

const StyledCardHeader = styled(CardHeader)(({ theme }) => ({
  padding: theme.spacing(2),
  '& .MuiCardHeader-title': {
    fontSize: '1rem',
    fontWeight: 600,
  },
  '& .MuiCardHeader-action': {
    marginRight: 0,
  },
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(2),
  '& .MuiTypography-root': {
    color: theme.palette.text.secondary,
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  width: 32,
  height: 32,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.primary.main,
  marginRight: theme.spacing(2),
}));

const StyledButton = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  transition: theme.transitions.create(['background-color', 'border-color']),
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    borderColor: theme.palette.primary.main,
  },
  '& .MuiSvgIcon-root': {
    fontSize: '1.25rem',
    marginLeft: 'auto',
  },
}));

const AdminDashboard: NextPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin?callbackUrl=/admin');
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

  // Mock data - replace with actual data from your API
  const stats = [
    { 
      title: 'Total Users', 
      value: '1,234', 
      change: '+12% from last month',
      icon: Users,
      link: '/admin/members'
    },
    { 
      title: 'Total Posts', 
      value: '5,678', 
      change: '+8% from last month',
      icon: FileText,
      link: '/admin/posts'
    },
    { 
      title: 'Total Comments', 
      value: '12,345', 
      change: '+15% from last month',
      icon: MessageSquare,
      link: '/admin/posts'
    },
    { 
      title: 'Engagement Rate', 
      value: '4.5%', 
      change: '+0.5% from last month',
      icon: BarChart2,
      link: '/admin/analytics'
    },
  ];

  return (
    <AdminLayout>
      <Box sx={{ py: 4, px: 2 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Dashboard Overview
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Welcome back, {session.user?.name || 'Admin'}. Here's what's happening with your community.
          </Typography>
        </Box>

        {/* Stats Grid */}
        <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' } }}>
          {stats.map((stat, index) => (
            <StyledCard key={index}>
              <StyledCardHeader
                title={stat.title}
                action={
                  <IconWrapper>
                    <stat.icon />
                  </IconWrapper>
                }
              />
              <StyledCardContent>
                <Typography variant="h5" component="div" sx={{ mb: 1 }}>
                  {stat.value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {stat.change}
                </Typography>
              </StyledCardContent>
            </StyledCard>
          ))}
        </Box>

        {/* Recent Activity & Quick Actions */}
        <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', md: '2fr 1fr', lg: '4fr 3fr' } }}>
          <StyledCard>
            <StyledCardHeader title="Recent Activity" />
            <StyledCardContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {[1, 2, 3].map((i) => (
                  <Box key={i} sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, pb: 2, borderBottom: 1, borderColor: 'divider', last: { pb: 0, borderBottom: 0 } }}>
                    <IconWrapper>
                      <Users />
                    </IconWrapper>
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        New user registered
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        New member John Doe joined the community
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
                        2 hours ago
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </StyledCardContent>
          </StyledCard>
          
          <StyledCard>
            <StyledCardHeader title="Quick Actions" />
            <StyledCardContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <StyledButton>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    Create New Post
                  </Typography>
                  <Users />
                </StyledButton>
                <StyledButton>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    Manage Users
                  </Typography>
                  <Users />
                </StyledButton>
                <StyledButton>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    View Reports
                  </Typography>
                  <Users />
                </StyledButton>
                <StyledButton>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    Site Settings
                  </Typography>
                  <Users />
                </StyledButton>
              </Box>
            </StyledCardContent>
          </StyledCard>
        </Box>
      </Box>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard Overview</h1>
          <p className="text-muted-foreground">
            Welcome back, {session.user?.name || 'Admin'}. Here's what's happening with your community.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activity & Quick Actions */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-start pb-4 last:pb-0 border-b last:border-0">
                    <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-3">
                      <Users className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">New user registered</p>
                      <p className="text-sm text-muted-foreground">
                        New member John Doe joined the community
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <button className="w-full flex items-center justify-between rounded-lg border p-4 hover:bg-gray-50 transition-colors">
                  <span>Create New Post</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14"/>
                    <path d="M12 5v14"/>
                  </svg>
                </button>
                <button className="w-full flex items-center justify-between rounded-lg border p-4 hover:bg-gray-50 transition-colors">
                  <span>Manage Users</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </button>
                <button className="w-full flex items-center justify-between rounded-lg border p-4 hover:bg-gray-50 transition-colors">
                  <span>View Reports</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                    <line x1="10" y1="9" x2="8" y2="9"/>
                  </svg>
                </button>
                <button className="w-full flex items-center justify-between rounded-lg border p-4 hover:bg-gray-50 transition-colors">
                  <span>Site Settings</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
