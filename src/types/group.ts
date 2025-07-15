import { User } from './user';

export interface GroupMember extends User {
  joinDate: string;
  isAdmin: boolean;
  isModerator?: boolean;
}

export interface GroupPost {
  id: string;
  author: User;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
  timestamp: string;
  isLiked: boolean;
}

export interface GroupEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  image?: string;
}

export interface Group {
  id: string;
  name: string;
  description: string;
  coverImage: string;
  avatar: string;
  membersCount: number;
  postsCount: number;
  eventsCount: number;
  isPrivate: boolean;
  isMember: boolean;
  isAdmin: boolean;
  isModerator?: boolean;
  joinRequestPending?: boolean;
  rules?: string[];
  category: string;
  createdAt: string;
  updatedAt: string;
  location?: string;
  website?: string;
  email?: string;
  phone?: string;
  tags?: string[];
}

export interface GroupCategory {
  id: string;
  name: string;
  icon: string;
  count: number;
}

export interface GroupFormData {
  name: string;
  description: string;
  category: string;
  isPrivate: boolean;
  avatar?: File | null;
  coverImage?: File | null;
  rules?: string[];
  tags?: string[];
  location?: string;
  website?: string;
  email?: string;
  phone?: string;
}
