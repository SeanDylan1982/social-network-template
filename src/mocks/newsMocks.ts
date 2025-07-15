import { NewsItem } from "@/components/news/News";

export const mockNewsItems: NewsItem[] = [
  {
    id: '1',
    title: 'New Features Coming to Our Platform',
    source: 'Tech News',
    timeAgo: '2h ago',
    category: 'Technology',
    isTrending: true,
    image: '/images/tech-update.jpg'
  },
  {
    id: '2',
    title: 'Community Event: Annual Meetup Announced',
    source: 'Events',
    timeAgo: '5h ago',
    category: 'Community',
    isTrending: true
  },
  {
    id: '3',
    title: 'How to Maximize Your Profile Reach',
    source: 'Tips & Tricks',
    timeAgo: '1d ago',
    category: 'Tutorial'
  },
  {
    id: '4',
    title: 'New Study Shows Benefits of Social Networking',
    source: 'Research',
    timeAgo: '2d ago',
    category: 'Research',
    image: '/images/research.jpg'
  },
  {
    id: '5',
    title: 'Platform Maintenance Scheduled for Next Week',
    source: 'Announcements',
    timeAgo: '3d ago',
    category: 'Update'
  }
];
