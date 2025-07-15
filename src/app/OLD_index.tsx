import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PostCard from '@/components/posts/PostCard';

// Sample data for demonstration
const samplePosts = [
  {
    id: '1',
    user: {
      name: 'Jane Cooper',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      role: 'Digital Creator',
    },
    content: 'Just launched my new website! Check it out and let me know what you think. #webdev #portfolio',
    image: 'https://picsum.photos/seed/website/600/400',
    likes: 124,
    comments: 28,
    shares: 7,
    timeAgo: '2h ago',
  },
  {
    id: '2',
    user: {
      name: 'Alex Morgan',
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
      role: 'UI/UX Designer',
    },
    content: 'Working on some exciting new features for our app. Can\'t wait to share the updates with you all!',
    likes: 89,
    comments: 14,
    shares: 3,
    timeAgo: '5h ago',
  },
  {
    id: '3',
    user: {
      name: 'Sarah Johnson',
      avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
      role: 'Content Creator',
    },
    content: 'Beautiful day for a photoshoot! 📸 Here are some of my favorite shots from today.',
    image: 'https://picsum.photos/seed/photoshoot/600/400',
    likes: 256,
    comments: 42,
    shares: 18,
    timeAgo: '1d ago',
  },
];

const Home: React.FC = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        {samplePosts.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
    </MainLayout>
  );
};

export default Home;
