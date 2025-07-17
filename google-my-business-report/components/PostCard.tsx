
import React from 'react';
import type { Post } from '../types';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div className="bg-surface rounded-lg shadow-md overflow-hidden transition-all duration-300">
      <img src={post.image} alt="Post image" className="w-full h-48 object-cover" />
      <div className="p-5">
        <p className="text-on-surface text-sm mb-4">{post.content}</p>
        <div className="flex justify-between items-center text-on-muted text-xs">
          <span>{post.date}</span>
          <div className="flex gap-4">
            <span>Views: {post.views.toLocaleString()}</span>
            <span>Clicks: {post.clicks.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
