
import React from 'react';
import type { BusinessDataHook } from '../types';
import ReviewCard from '../components/ReviewCard';

interface ReviewsProps {
  businessData: BusinessDataHook;
}

const Reviews: React.FC<ReviewsProps> = ({ businessData }) => {
  const { reviews, addReviewReply } = businessData;

  const repliedReviews = reviews.filter(r => r.reply);
  const unrepliedReviews = reviews.filter(r => !r.reply);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-on-surface">Awaiting Reply ({unrepliedReviews.length})</h2>
        <p className="text-on-muted mt-1">Respond to your newest reviews first to improve customer satisfaction.</p>
        <div className="mt-4 space-y-4">
          {unrepliedReviews.length > 0 ? (
            unrepliedReviews.map(review => (
              <ReviewCard key={review.id} review={review} onReply={addReviewReply} />
            ))
          ) : (
            <p className="text-on-muted text-center py-8">No unreplied reviews. Great job!</p>
          )}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-on-surface">Replied Reviews ({repliedReviews.length})</h2>
         <div className="mt-4 space-y-4">
          {repliedReviews.map(review => (
              <ReviewCard key={review.id} review={review} onReply={addReviewReply} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
