export interface Organizer {
  id: string;
  name: string;
  avatar?: string;
  title?: string;
  bio?: string;
  website?: string;
  followers?: number;
  email?: string;
  phone?: string;
}

export interface EventAttendee {
  id: string;
  name: string;
  avatar: string;
  joinDate: string;
  status?: 'Going' | 'Interested' | 'Not Going';
}

export interface EventComment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  likes: number;
  liked: boolean;
  replies?: EventComment[];
}

export interface Event {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  startDate: string;
  endDate?: string;
  timezone?: string;
  location: string;
  category: string;
  isOnline: boolean;
  isFree: boolean;
  price?: number;
  capacity?: number;
  attendees: number;
  isInterested?: boolean;
  isSaved?: boolean;
  organizer: Organizer;
  attendeesList?: EventAttendee[];
  comments?: EventComment[];
  tags?: string[];
  similarEvents?: Omit<Event, 'similarEvents'>[];
}
