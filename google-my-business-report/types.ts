
import type { useBusinessData } from './hooks/useBusinessData';

export interface BusinessProfile {
  name: string;
  category: string;
  address: string;
  phone: string;
  website: string;
  hours: { day: string; time: string }[];
}

export interface Post {
  id: number;
  content: string;
  date: string;
  image: string;
  views: number;
  clicks: number;
}

export interface Review {
  id: number;
  author: string;
  avatar: string;
  rating: number;
  content: string;
  date: string;
  reply?: string;
}

export interface CustomerActions {
  calls: number;
  directions: number;
  websiteVisits: number;
}

export interface AnalyticsData {
  performance: {
    viewsSearch: number;
    viewsMaps: number;
    searches: number;
    customerActions: CustomerActions;
  };
  queries: { query: string; count: number }[];
  photoViews: number;
  lifetimeReviews: number;
}

export interface Location {
  id: string;
  name: string;
  group: string;
}

export interface LocationGroup {
  id: string;
  name: string;
}


export type View = 'dashboard' | 'profile' | 'posts' | 'reviews';

export type BusinessDataHook = ReturnType<typeof useBusinessData>['businessData'];

export interface User {
  name: string;
  email: string;
  photo: string;
}
