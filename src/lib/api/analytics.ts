import { getSession } from 'next-auth/react';

// Type for the time range parameter
type TimeRange = '7d' | '30d' | '90d';

// Type for the analytics data response
export interface AnalyticsData {
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
}

/**
 * Fetches analytics data from the server
 * @param timeRange The time range for the analytics data
 * @returns Promise with the analytics data
 */
export const fetchAnalyticsData = async (timeRange: TimeRange = '30d'): Promise<AnalyticsData> => {
  const session = await getSession();
  
  if (!session) {
    throw new Error('Not authenticated');
  }

  try {
    const response = await fetch(`/api/admin/analytics?range=${timeRange}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.accessToken}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch analytics data');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching analytics data:', error);
    throw error;
  }
};

/**
 * Generates mock analytics data for development and testing
 * @param timeRange The time range for the mock data
 * @returns Mock analytics data
 */
const generateMockAnalyticsData = (timeRange: TimeRange): AnalyticsData => {
  // Generate labels based on time range
  const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
  const labels = [];
  const today = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    labels.push(formatDate(date));
  }

  // Generate user growth data
  let baseUsers = 1000;
  const userGrowthData = labels.map((_, index) => {
    // Simulate growth with some randomness
    const growth = Math.floor(Math.random() * 20) + 5;
    baseUsers += growth;
    return baseUsers;
  });

  // Generate top posts
  const topPosts = Array.from({ length: 5 }, (_, i) => ({
    id: `post-${i + 1}`,
    title: `This is a sample post title ${i + 1} that could be quite long and might need to be truncated in the UI`,
    author: {
      name: `User ${i + 1}`,
      avatar: `https://i.pravatar.cc/150?img=${i + 1}`,
    },
    likes: Math.floor(Math.random() * 1000) + 50,
    comments: Math.floor(Math.random() * 100) + 5,
    shares: Math.floor(Math.random() * 50) + 1,
    publishedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    url: `/posts/post-${i + 1}`,
  }));

  // Sort posts by engagement (likes + comments + shares)
  topPosts.sort((a, b) => (b.likes + b.comments + b.shares) - (a.likes + a.comments + a.shares));

  return {
    userGrowth: {
      labels,
      datasets: [
        {
          label: 'Total Users',
          data: userGrowthData,
          borderColor: 'rgb(79, 70, 229)',
          backgroundColor: 'rgba(79, 70, 229, 0.1)',
          tension: 0.4,
          fill: true,
        },
      ],
    },
    topPosts,
    stats: {
      totalUsers: userGrowthData[userGrowthData.length - 1],
      activeUsers: Math.floor(userGrowthData[userGrowthData.length - 1] * 0.7),
      newUsers: userGrowthData[userGrowthData.length - 1] - userGrowthData[0],
      totalPosts: Math.floor(userGrowthData[userGrowthData.length - 1] * 2.5),
      totalEngagement: Math.floor(Math.random() * 10000) + 1000,
    },
  };
};

// Helper function to format dates
const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

// In development, use mock data
if (process.env.NODE_ENV === 'development') {
  // Export a version of fetchAnalyticsData that uses mock data
  export const fetchAnalyticsDataMock = (timeRange: TimeRange = '30d'): Promise<AnalyticsData> => {
    return new Promise((resolve) => {
      // Simulate network delay
      setTimeout(() => {
        resolve(generateMockAnalyticsData(timeRange));
      }, 500);
    });
  };
  
  // Use the mock version in development
  export { fetchAnalyticsDataMock as fetchAnalyticsData };
}
