import { Group, GroupMember, GroupPost, GroupEvent } from '@/types/group';

export const mockGroup: Group = {
  id: '1',
  name: 'React Developers',
  description: 'A community for React developers to share knowledge and collaborate on projects.',
  longDescription: `# Welcome to React Developers Group!

This is a community for developers who work with React, React Native, and related technologies. Whether you're a beginner or an experienced developer, you'll find valuable resources, discussions, and networking opportunities here.

## About This Group

- **Founded**: January 2022
- **Members**: 1,245 developers
- **Location**: Worldwide (Online)
- **Category**: Technology

## Group Rules

1. Be respectful and inclusive
2. No spam or self-promotion
3. Keep discussions relevant to React and web development
4. Share knowledge and help others
5. Follow the code of conduct

## Upcoming Events

- **React Conf 2023 Watch Party** - October 25, 2023
- **Monthly Meetup** - First Tuesday of every month
- **Hackathon** - Coming in November 2023
`,
  coverImage: '/images/groups/react-cover.jpg',
  avatar: '/images/groups/react-logo.png',
  membersCount: 1245,
  postsCount: 342,
  eventsCount: 12,
  isPrivate: false,
  isMember: true,
  isAdmin: false,
  isModerator: false,
  category: 'Technology',
  createdAt: '2022-01-15T10:30:00Z',
  updatedAt: '2023-06-20T14:45:00Z',
  location: 'Worldwide',
  website: 'https://reactjs.org',
  rules: [
    'Be respectful and inclusive',
    'No spam or self-promotion',
    'Keep discussions relevant to React and web development',
    'Share knowledge and help others',
    'Follow the code of conduct',
  ],
  tags: ['react', 'javascript', 'frontend', 'webdev', 'programming'],
  admins: [
    {
      id: 'user1',
      name: 'Alex Johnson',
      avatar: '/images/avatars/user1.jpg',
      title: 'Senior Frontend Developer',
    },
    {
      id: 'user4',
      name: 'Sarah Williams',
      avatar: '/images/avatars/user4.jpg',
      title: 'React Core Team Member',
    },
  ],
};

export const mockMembers: GroupMember[] = [
  {
    id: 'user1',
    name: 'Alex Johnson',
    avatar: '/images/avatars/user1.jpg',
    email: 'alex@example.com',
    title: 'Senior Frontend Developer',
    bio: 'React enthusiast | Open source contributor',
    joinDate: '2022-02-10T14:30:00Z',
    isAdmin: true,
    isModerator: false,
  },
  {
    id: 'user2',
    name: 'Maria Garcia',
    avatar: '/images/avatars/user2.jpg',
    email: 'maria@example.com',
    title: 'UI/UX Designer',
    bio: 'Designing beautiful user experiences',
    joinDate: '2022-02-15T09:20:00Z',
    isAdmin: false,
    isModerator: true,
  },
  {
    id: 'user3',
    name: 'John Smith',
    avatar: '/images/avatars/user3.jpg',
    email: 'john@example.com',
    title: 'Full Stack Developer',
    bio: 'Building awesome web applications',
    joinDate: '2022-03-05T16:45:00Z',
    isAdmin: false,
    isModerator: true,
  },
  {
    id: 'user4',
    name: 'Sarah Williams',
    avatar: '/images/avatars/user4.jpg',
    email: 'sarah@example.com',
    title: 'React Core Team Member',
    bio: 'Helping shape the future of React',
    joinDate: '2022-01-20T11:10:00Z',
    isAdmin: true,
    isModerator: false,
  },
  {
    id: 'user5',
    name: 'David Kim',
    avatar: '/images/avatars/user5.jpg',
    email: 'david@example.com',
    title: 'Frontend Engineer',
    bio: 'Passionate about React and TypeScript',
    joinDate: '2022-04-12T08:30:00Z',
    isAdmin: false,
    isModerator: false,
  },
  {
    id: 'user6',
    name: 'Emma Wilson',
    avatar: '/images/avatars/user6.jpg',
    email: 'emma@example.com',
    title: 'Web Developer',
    bio: 'Learning and sharing knowledge',
    joinDate: '2022-05-18T14:20:00Z',
    isAdmin: false,
    isModerator: false,
  },
];

export const mockPosts: GroupPost[] = [
  {
    id: 'post1',
    author: {
      id: 'user1',
      name: 'Alex Johnson',
      avatar: '/images/avatars/user1.jpg',
    },
    content: 'Just published a new article about React 18 features. Check it out and let me know your thoughts! #react #webdev',
    image: '/images/posts/react-18.jpg',
    likes: 42,
    comments: 8,
    shares: 5,
    timestamp: '2023-06-20T10:30:00Z',
    isLiked: true,
    isSaved: false,
  },
  {
    id: 'post2',
    author: {
      id: 'user2',
      name: 'Maria Garcia',
      avatar: '/images/avatars/user2.jpg',
    },
    content: 'What are your favorite React component libraries? I\'m looking for recommendations for a new project.',
    likes: 28,
    comments: 15,
    shares: 2,
    timestamp: '2023-06-18T14:15:00Z',
    isLiked: false,
    isSaved: true,
  },
  {
    id: 'post3',
    author: {
      id: 'user4',
      name: 'Sarah Williams',
      avatar: '/images/avatars/user4.jpg',
    },
    content: 'Exciting news! React 19 beta is now available for testing. The new concurrent features are game-changers for performance optimization. #reactjs #webdevelopment',
    image: '/images/posts/react-19.jpg',
    likes: 156,
    comments: 42,
    shares: 38,
    timestamp: '2023-06-15T09:45:00Z',
    isLiked: true,
    isSaved: true,
  },
  {
    id: 'post4',
    author: {
      id: 'user5',
      name: 'David Kim',
      avatar: '/images/avatars/user5.jpg',
    },
    content: 'Just finished migrating our codebase from class components to functional components with hooks. The code is so much cleaner now! What was your experience with this migration?',
    likes: 87,
    comments: 23,
    shares: 12,
    timestamp: '2023-06-12T16:30:00Z',
    isLiked: false,
    isSaved: false,
  },
  {
    id: 'post5',
    author: {
      id: 'user3',
      name: 'John Smith',
      avatar: '/images/avatars/user3.jpg',
    },
    content: 'Check out this awesome tutorial on React performance optimization techniques. It covers everything from memoization to code splitting and lazy loading. #react #performance',
    image: '/images/posts/react-performance.jpg',
    likes: 112,
    comments: 18,
    shares: 27,
    timestamp: '2023-06-10T11:20:00Z',
    isLiked: true,
    isSaved: true,
  },
];

export const mockEvents: GroupEvent[] = [
  {
    id: 'event1',
    title: 'React Conf 2023 Watch Party',
    description: 'Join us for a live watch party of React Conf 2023! We\'ll be watching the keynotes and discussing the latest React updates together.',
    date: '2023-10-25',
    time: '18:00',
    timezone: 'UTC-4',
    location: 'Online (Zoom)',
    attendees: 45,
    image: '/images/events/react-conf.jpg',
    isOnline: true,
    meetingLink: 'https://zoom.us/j/1234567890',
    organizer: {
      id: 'user1',
      name: 'Alex Johnson',
      avatar: '/images/avatars/user1.jpg',
    },
    createdAt: '2023-05-30T14:20:00Z',
    updatedAt: '2023-06-10T09:15:00Z',
    tags: ['conference', 'react', 'learning'],
  },
  {
    id: 'event2',
    title: 'Monthly React Meetup',
    description: 'Our monthly meetup for React developers. This month we\'ll have talks on state management solutions and a hands-on workshop.',
    date: '2023-07-05',
    time: '19:00',
    timezone: 'UTC-4',
    location: 'Downtown Tech Hub, 123 Main St',
    address: '123 Main St, Anytown, NY 10001',
    attendees: 32,
    maxAttendees: 50,
    image: '/images/events/meetup.jpg',
    isOnline: false,
    organizer: {
      id: 'user4',
      name: 'Sarah Williams',
      avatar: '/images/avatars/user4.jpg',
    },
    createdAt: '2023-05-28T11:45:00Z',
    updatedAt: '2023-06-15T16:30:00Z',
    tags: ['meetup', 'networking', 'workshop'],
  },
  {
    id: 'event3',
    title: 'React Native Workshop',
    description: 'A full-day workshop on building cross-platform mobile apps with React Native. Bring your laptop and we\'ll build an app together!',
    date: '2023-08-12',
    time: '10:00',
    timezone: 'UTC-4',
    duration: 8, // hours
    location: 'Tech Campus, 456 Innovation Dr',
    address: '456 Innovation Dr, Tech City, NY 10002',
    attendees: 18,
    maxAttendees: 25,
    price: 49.99,
    image: '/images/events/react-native-workshop.jpg',
    isOnline: false,
    organizer: {
      id: 'user3',
      name: 'John Smith',
      avatar: '/images/avatars/user3.jpg',
    },
    createdAt: '2023-06-01T09:15:00Z',
    updatedAt: '2023-06-18T14:20:00Z',
    tags: ['workshop', 'react-native', 'mobile'],
  },
  {
    id: 'event4',
    title: 'Virtual Coffee Chat: State Management in 2023',
    description: 'An informal discussion about the current state of state management in React. Let\'s discuss Redux, Context API, Zustand, Jotai, and more!',
    date: '2023-06-28',
    time: '15:00',
    timezone: 'UTC-4',
    duration: 1.5,
    location: 'Online (Google Meet)',
    attendees: 27,
    image: '/images/events/coffee-chat.jpg',
    isOnline: true,
    meetingLink: 'https://meet.google.com/abc-defg-hij',
    organizer: {
      id: 'user2',
      name: 'Maria Garcia',
      avatar: '/images/avatars/user2.jpg',
    },
    createdAt: '2023-06-10T16:45:00Z',
    updatedAt: '2023-06-20T10:30:00Z',
    tags: ['discussion', 'state-management', 'virtual'],
  },
];
