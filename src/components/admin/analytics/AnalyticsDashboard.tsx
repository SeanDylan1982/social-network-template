import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UserGrowthChart from './UserGrowthChart';
import TopPosts from './TopPosts';
import { useQuery } from '@tanstack/react-query';
import { fetchAnalyticsData } from '@/lib/api/analytics';
import { format } from 'date-fns';

// Mock data types - replace with your actual API types
type AnalyticsData = {
  userGrowth: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor: string;
      tension: number;
      fill: boolean;
    }[];
  };
  topPosts: Array<{
    id: string;
    title: string;
    author: {
      name: string;
      avatar?: string;
    };
    likes: number;
    comments: number;
    shares: number;
    publishedAt: string;
    url: string;
  }>;
  stats: {
    totalUsers: number;
    activeUsers: number;
    newUsers: number;
    totalPosts: number;
    totalEngagement: number;
  };
};

const AnalyticsDashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');
  
  const { data, isLoading, error } = useQuery<AnalyticsData>({
    queryKey: ['analytics', timeRange],
    queryFn: () => fetchAnalyticsData(timeRange),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  if (error) {
    return (
      <div className="p-6">
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error loading analytics data</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{(error as Error).message || 'Failed to load analytics data. Please try again later.'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const stats = [
    {
      name: 'Total Users',
      value: data?.stats?.totalUsers?.toLocaleString() || '0',
      change: '+12%',
      changeType: 'increase',
    },
    {
      name: 'Active Users',
      value: data?.stats?.activeUsers?.toLocaleString() || '0',
      change: '+5%',
      changeType: 'increase',
    },
    {
      name: 'New Users',
      value: data?.stats?.newUsers?.toLocaleString() || '0',
      change: '+8%',
      changeType: 'increase',
    },
    {
      name: 'Total Posts',
      value: data?.stats?.totalPosts?.toLocaleString() || '0',
      change: '+15%',
      changeType: 'increase',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Analytics Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Tabs
            defaultValue={timeRange}
            onValueChange={(value) => setTimeRange(value as '7d' | '30d' | '90d')}
            className="w-[400px]"
          >
            <TabsList>
              <TabsTrigger value="7d">Last 7 days</TabsTrigger>
              <TabsTrigger value="30d">Last 30 days</TabsTrigger>
              <TabsTrigger value="90d">Last 90 days</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
              <div className="h-4 w-4 text-muted-foreground">
                {/* Add appropriate icon for each stat */}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {isLoading ? <Skeleton className="h-8 w-20" /> : stat.value}
              </div>
              <p className="text-xs text-muted-foreground">
                {stat.change} from last period
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            {isLoading ? (
              <Skeleton className="h-[350px] w-full" />
            ) : data?.userGrowth ? (
              <UserGrowthChart data={data.userGrowth} />
            ) : (
              <div className="flex h-[350px] items-center justify-center text-muted-foreground">
                No data available
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Top Performing Posts</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-20 w-full" />
                ))}
              </div>
            ) : data?.topPosts ? (
              <TopPosts posts={data.topPosts} maxItems={5} />
            ) : (
              <div className="flex h-[350px] items-center justify-center text-muted-foreground">
                No posts data available
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Additional Analytics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Engagement Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-[300px] w-full" />
            ) : (
              <div className="flex h-[300px] items-center justify-center text-muted-foreground">
                Engagement metrics will be displayed here
              </div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>User Demographics</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-[300px] w-full" />
            ) : (
              <div className="flex h-[300px] items-center justify-center text-muted-foreground">
                User demographics will be displayed here
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
