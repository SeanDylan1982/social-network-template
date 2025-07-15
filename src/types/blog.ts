import { User } from './user';

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  postCount: number;
}

export interface BlogTag {
  id: string;
  name: string;
  slug: string;
}

export interface BlogComment {
  id: string;
  author: User;
  content: string;
  createdAt: string;
  updatedAt: string;
  likes: number;
  isLiked: boolean;
  replies?: BlogComment[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  author: User;
  categories: BlogCategory[];
  tags: BlogTag[];
  readTime: number; // in minutes
  viewCount: number;
  commentCount: number;
  likeCount: number;
  isLiked: boolean;
  isBookmarked: boolean;
  isPublished: boolean;
  publishedAt: string;
  updatedAt: string;
  relatedPosts?: Omit<BlogPost, 'relatedPosts' | 'content' | 'excerpt'>[];
}

export interface BlogListResponse {
  posts: BlogPost[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface BlogFormData {
  title: string;
  excerpt: string;
  content: string;
  featuredImage?: File | null;
  categories: string[];
  tags: string[];
  isPublished: boolean;
  metaTitle?: string;
  metaDescription?: string;
}
