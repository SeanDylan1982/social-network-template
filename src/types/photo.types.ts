export interface PhotoUser {
  id: string;
  name: string;
  username: string;
  avatar: string;
  isVerified?: boolean;
}

export interface PhotoComment {
  id: string;
  user: PhotoUser;
  content: string;
  timestamp: string;
  likeCount: number;
  isLiked?: boolean;
  replies?: PhotoComment[];
}

export interface Photo {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  width: number;
  height: number;
  aspectRatio: string;
  size: number; // in bytes
  format: string;
  uploadDate: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  isLiked?: boolean;
  isBookmarked?: boolean;
  tags: string[];
  albumId?: string;
  albumName?: string;
  user: PhotoUser;
  location?: string;
  camera?: {
    make?: string;
    model?: string;
    lens?: string;
    focalLength?: string;
    aperture?: string;
    iso?: number;
    shutterSpeed?: string;
  };
  exif?: Record<string, any>;
  metadata: {
    width: number;
    height: number;
    size: number;
    format: string;
    aspectRatio: string;
  };
}

export interface PhotoAlbum {
  id: string;
  title: string;
  description?: string;
  coverPhoto?: string;
  photoCount: number;
  createdAt: string;
  updatedAt: string;
  isPrivate: boolean;
  user: PhotoUser;
}
