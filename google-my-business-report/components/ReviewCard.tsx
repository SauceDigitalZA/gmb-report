
import React, { useState, useCallback } from 'react';
import type { Review } from '../types';
import { generateReviewReply } from '../services/geminiService';
import { ICONS } from '../constants';
import Spinner from './Spinner';

interface ReviewCardProps {
  review: Review;
  onReply: (reviewId: number, reply: string) => void;
}

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <span key={i} className={i < rating ? 'text-yellow-400' : 'text-gray-500'}>
            {ICONS.star}
        </span>
      ))}
    </div>
  );
};

const ReviewCard: React.FC<ReviewCardProps> = ({ review, onReply }) => {
  const [replyText, setReplyText] = useState(review.reply || '');
  const [isReplying, setIsReplying] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateReply = useCallback(async () => {
    setIsGenerating(true);
    const generated = await generateReviewReply(review.content, review.rating);
    setReplyText(generated);
    setIsGenerating(false);
  }, [review.content, review.rating]);

  const handleSendReply = () => {
    onReply(review.id, replyText);
    setIsReplying(false);
  };

  return (
    <div className="bg-surface p-5 rounded-lg shadow-md transition-all duration-300">
      <div className="flex items-start">
        <img src={review.avatar} alt={review.author} className="w-12 h-12 rounded-full mr-4" />
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <h4 className="font-bold text-on-surface">{review.author}</h4>
            <span className="text-xs text-on-muted">{review.date}</span>
          </div>
          <StarRating rating={review.rating} />
          <p className="mt-2 text-on-surface text-sm">{review.content}</p>
        </div>
      </div>

      <div className="mt-4 pl-16">
        {review.reply && !isReplying && (
          <div className="bg-muted p-3 rounded-lg">
            <p className="font-bold text-sm text-on-surface">Your reply:</p>
            <p className="text-sm text-on-surface mt-1">{review.reply}</p>
          </div>
        )}

        {!review.reply && !isReplying && (
            <button onClick={() => setIsReplying(true)} className="text-sm font-medium text-primary-400 hover:text-primary-300">
                Reply
            </button>
        )}

        {isReplying && (
          <div className="space-y-3">
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="w-full p-2 bg-muted border border-slate-600 rounded-md text-on-surface focus:ring-2 focus:ring-primary-500 outline-none transition"
              rows={3}
              placeholder="Write your reply..."
            />
            <div className="flex items-center justify-between gap-2">
                <button
                    onClick={handleGenerateReply}
                    disabled={isGenerating}
                    className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 disabled:bg-muted disabled:cursor-not-allowed"
                >
                    {isGenerating ? <Spinner size="sm" /> : ICONS.magic}
                    <span>{isGenerating ? 'Generating...' : 'AI Suggest'}</span>
                </button>
              <div className="flex gap-2">
                 <button onClick={() => setIsReplying(false)} className="px-3 py-2 text-sm font-medium text-on-muted hover:bg-muted rounded-md">Cancel</button>
                 <button onClick={handleSendReply} className="px-3 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md">Send</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewCard;
