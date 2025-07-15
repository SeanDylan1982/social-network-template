import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

type TimeRange = '7d' | '30d' | '90d';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Check if user is authenticated and has admin role
  const session = await getServerSession(req, res, authOptions);
  
  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // In a real app, you would check the user's role here
  // For now, we'll just check if the user is authenticated
  // if (session.user.role !== 'admin') {
  //   return res.status(403).json({ message: 'Forbidden' });
  // }

  const { range = '30d' } = req.query as { range: TimeRange };

  try {
    // Calculate date range
    const endDate = new Date();
    const startDate = new Date();
    
    if (range === '7d') {
      startDate.setDate(endDate.getDate() - 7);
    } else if (range === '90d') {
      startDate.setDate(endDate.getDate() - 90);
    } else {
      // Default to 30 days
      startDate.setDate(endDate.getDate() - 30);
    }

    // In a real implementation, you would fetch this data from your database
    // For now, we'll return mock data
    const mockData = generateMockAnalyticsData(range);
    
    // Uncomment this in production when you have real data
    // const data = await fetchAnalyticsDataFromDatabase(startDate, endDate);
    
    res.status(200).json(mockData);
  } catch (error) {
    console.error('Error fetching analytics data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// This would be replaced with actual database queries in production
async function fetchAnalyticsDataFromDatabase(startDate: Date, endDate: Date) {
  // Example of how you might fetch data from your database
  const [
    userGrowth,
    topPosts,
    stats
  ] = await Promise.all([
    // Fetch user growth data
    prisma.$queryRaw`
      SELECT 
        DATE(createdAt) as date,
        COUNT(*) as count
      FROM User
      WHERE createdAt BETWEEN ${startDate} AND ${endDate}
      GROUP BY DATE(createdAt)
      ORDER BY date ASC
    `,
    
    // Fetch top posts
    prisma.post.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        author: {
          select: {
            name: true,
            image: true,
          },
        },
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
      },
      orderBy: {
        likes: 'desc',
      },
      take: 5,
    }),
    
    // Fetch stats
    Promise.all([
      // Total users
      prisma.user.count(),
      
      // Active users (users who logged in the last 30 days)
      prisma.user.count({
        where: {
          lastLogin: {
            gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          },
        },
      }),
      
      // New users
      prisma.user.count({
        where: {
          createdAt: {
            gte: startDate,
            lte: endDate,
          },
        },
      }),
      
      // Total posts
      prisma.post.count(),
      
      // Total engagement (likes + comments)
      Promise.all([
        prisma.like.count(),
        prisma.comment.count(),
      ]).then(([likes, comments]) => likes + comments),
    ]),
  ]);

  return {
    userGrowth,
    topPosts: topPosts.map(post => ({
      id: post.id,
      title: post.title,
      author: {
        name: post.author.name,
        avatar: post.author.image,
      },
      likes: post._count.likes,
      comments: post._count.comments,
      shares: 0, // You would need to track shares separately
      publishedAt: post.createdAt.toISOString(),
      url: `/posts/${post.id}`,
    })),
    stats: {
      totalUsers: stats[0],
      activeUsers: stats[1],
      newUsers: stats[2],
      totalPosts: stats[3],
      totalEngagement: stats[4],
    },
  };
}

// Generate mock data for development
function generateMockAnalyticsData(range: TimeRange) {
  const days = range === '7d' ? 7 : range === '30d' ? 30 : 90;
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
}

// Helper function to format dates
function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}
