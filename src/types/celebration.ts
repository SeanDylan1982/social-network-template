export type CelebrationType = 'birthday' | 'anniversary' | 'work' | 'achievement' | 'education' | 'other';

export interface User {
  id: string;
  name: string;
  avatar?: string;
  username?: string;
}

export interface Celebration {
  id: string;
  type: CelebrationType;
  title: string;
  description: string;
  date: Date | string;
  user?: User;
  isToday?: boolean;
  isUpcoming?: boolean;
  years?: number;
  image?: string;
  isWished?: boolean;
  isSaved?: boolean;
  likes?: number;
  comments?: number;
  shares?: number;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface CelebrationFilterOptions {
  type?: CelebrationType | 'all';
  date?: 'today' | 'upcoming' | 'past' | 'all';
  sortBy?: 'date' | 'popularity' | 'recent';
  searchQuery?: string;
}
