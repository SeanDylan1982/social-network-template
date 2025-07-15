// Common types used across the application
export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  role?: string;
  bio?: string;
  isFollowing?: boolean;
  isVerified?: boolean;
}

export interface PostType {
  id: string;
  author: User;
  content: string;
  media?: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked?: boolean;
  isBookmarked?: boolean;
}

export interface Story {
  id: string;
  username: string;
  avatar: string;
  seen: boolean;
}

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  timeAgo: string;
  readTime: string;
  image?: string;
  category?: string;
  isTrending?: boolean;
}

// Event handler types
export type FollowUserHandler = (userId: string) => void;
export type ViewAllHandler = () => void;
export type NewsClickHandler = (newsId: string) => void;
