import { Video as BaseVideo, VideoUser as BaseVideoUser } from './video';

export interface VideoUser extends BaseVideoUser {
  subscriberCount?: number;
  isVerified?: boolean;
}

export interface Video extends BaseVideo {
  channel: string;
  channelId: string;
  channelAvatar: string;
  isSubscribed: boolean;
  isSaved: boolean;
  uploadDate: string;
  duration: string; // Format: "HH:MM:SS" or "MM:SS"
  views: number;
  likes: number;
  dislikes: number;
  comments: number;
  isLiked: boolean;
  isDisliked: boolean;
  tags: string[];
  thumbnail: string;
  videoUrl: string;
  description: string;
}

export interface VideoComment {
  id: string;
  user: VideoUser;
  content: string;
  createdAt: string;
  updatedAt: string;
  likes: number;
  dislikes: number;
  isLiked: boolean;
  isDisliked: boolean;
  replies: VideoComment[];
}

export interface VideoCategory {
  id: string;
  name: string;
  slug: string;
}

export interface VideoListResponse {
  items: Video[];
  totalItems: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface VideoUploadResponse {
  id: string;
  title: string;
  description: string;
  url: string;
  thumbnail: string;
  status: 'processing' | 'completed' | 'failed';
  uploadDate: string;
}

export interface VideoFilterParams {
  query?: string;
  category?: string;
  sortBy?: 'recent' | 'popular' | 'trending';
  page?: number;
  pageSize?: number;
  userId?: string;
  isSubscribed?: boolean;
  isSaved?: boolean;
}
