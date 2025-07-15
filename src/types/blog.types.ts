// Blog post type for the form
export interface BlogFormData {
  id?: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  isPublished: boolean;
  featuredImage?: string;
  metaTitle?: string;
  metaDescription?: string;
  slug?: string;
  createdAt?: string;
  updatedAt?: string;
  author?: {
    id: string;
    name: string;
    avatar?: string;
  };
  stats?: {
    views: number;
    likes: number;
    comments: number;
    bookmarks: number;
  };
}

// Blog post type for the API response
export interface BlogPost extends Omit<BlogFormData, 'isPublished'> {
  _id: string;
  isPublished: boolean;
  publishedAt?: string;
  readingTime?: number; // in minutes
}

// Blog category type
export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  postCount?: number;
}

// Blog tag type
export interface BlogTag {
  id: string;
  name: string;
  slug: string;
  postCount?: number;
}

// Blog comment type
export interface BlogComment {
  id: string;
  postId: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  content: string;
  createdAt: string;
  updatedAt?: string;
  likes: number;
  isLiked?: boolean;
  replies?: BlogComment[];
  parentId?: string; // For replies
}

// Blog API response types
export interface BlogListResponse {
  data: BlogPost[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface BlogSingleResponse {
  data: BlogPost;
  relatedPosts?: BlogPost[];
  comments?: BlogComment[];
}

// Blog filter and sort options
export interface BlogFilterOptions {
  category?: string;
  tag?: string;
  author?: string;
  search?: string;
  isPublished?: boolean;
  minReadTime?: number;
  maxReadTime?: number;
  sortBy?: 'latest' | 'popular' | 'trending' | 'alphabetical';
  page?: number;
  limit?: number;
}

// Blog form props
export interface BlogFormProps {
  initialData?: Partial<BlogFormData>;
  onSubmit: (data: BlogFormData) => Promise<void>;
  isSubmitting?: boolean;
  isEdit?: boolean;
  onCancel?: () => void;
}
