
import { useState, useCallback, useEffect } from 'react';
import type { BusinessProfile, Post, Review, AnalyticsData, Location, LocationGroup } from '../types';

const API_BASE_URL = '/api';

export const useBusinessData = (enabled: boolean) => {
  const [profile, setProfile] = useState<BusinessProfile | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [locations, setLocations] = useState<Location[]>([]);
  const [locationGroups, setLocationGroups] = useState<LocationGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllData = async () => {
      if (!enabled) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_BASE_URL}/data`, { credentials: 'include' });
        if (!response.ok) {
          throw new Error(`Failed to fetch business data. Server responded with ${response.status}.`);
        }
        const data = await response.json();
        setProfile(data.profile);
        setPosts(data.posts);
        setReviews(data.reviews);
        setAnalytics(data.analytics);
        setLocations(data.locations);
        setLocationGroups(data.locationGroups);
      } catch (e: any) {
        console.error(e);
        setError(e.message || 'An unknown error occurred.');
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [enabled]);

  const updateProfile = useCallback(async (newProfileData: BusinessProfile) => {
    try {
      const response = await fetch(`${API_BASE_URL}/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProfileData),
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to update profile.');
      const updatedProfile = await response.json();
      setProfile(updatedProfile);
    } catch (e) {
      console.error('Error updating profile:', e);
      // Optionally, show an error to the user
    }
  }, []);

  const addPost = useCallback(async (content: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to create post.');
      const newPost = await response.json();
      setPosts(prevPosts => [newPost, ...prevPosts]);
    } catch (e) {
      console.error('Error adding post:', e);
    }
  }, []);

  const addReviewReply = useCallback(async (reviewId: number, reply: string) => {
    try {
       const response = await fetch(`${API_BASE_URL}/reviews/${reviewId}/reply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reply }),
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to post reply.');
      const updatedReview = await response.json();
      setReviews(prevReviews =>
        prevReviews.map(r => (r.id === reviewId ? updatedReview : r))
      );
    } catch (e) {
      console.error('Error adding review reply:', e);
    }
  }, []);
  
  const businessData = { profile, posts, reviews, analytics, locations, locationGroups, updateProfile, addPost, addReviewReply };

  return { businessData, loading, error };
};
