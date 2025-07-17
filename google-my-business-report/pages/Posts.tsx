
import React, { useState, useCallback } from 'react';
import type { BusinessDataHook } from '../types';
import PostCard from '../components/PostCard';
import Modal from '../components/Modal';
import Spinner from '../components/Spinner';
import { generatePostContent } from '../services/geminiService';
import { ICONS } from '../constants';

interface PostsProps {
  businessData: BusinessDataHook;
}

const Posts: React.FC<PostsProps> = ({ businessData }) => {
  const { posts, addPost } = businessData;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postContent, setPostContent] = useState('');
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGeneratePost = useCallback(async () => {
    if (!aiPrompt) return;
    setIsGenerating(true);
    const generatedContent = await generatePostContent(aiPrompt);
    setPostContent(generatedContent);
    setIsGenerating(false);
  }, [aiPrompt]);

  const handleCreatePost = () => {
    if (!postContent) return;
    addPost(postContent);
    setIsModalOpen(false);
    setPostContent('');
    setAiPrompt('');
  };
  
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setPostContent('');
    setAiPrompt('');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-on-surface">Your Posts</h2>
        <button onClick={openModal} className="px-4 py-2 font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg>
            <span>Create Post</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map(post => <PostCard key={post.id} post={post} />)}
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} title="Create a New Post">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-on-muted mb-1">AI Prompt (optional)</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="e.g., a special on croissants"
                className="flex-grow bg-muted border-slate-600 rounded-md shadow-sm py-2 px-3 text-on-surface focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              />
              <button 
                onClick={handleGeneratePost}
                disabled={isGenerating || !aiPrompt}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 disabled:bg-muted disabled:cursor-not-allowed">
                {isGenerating ? <Spinner size="sm" /> : ICONS.magic}
                <span>Generate</span>
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-on-muted mb-1">Post Content</label>
            <textarea
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              rows={6}
              className="w-full bg-muted border-slate-600 rounded-md shadow-sm py-2 px-3 text-on-surface focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              placeholder="Write your post content here or use the AI generator above."
            />
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleCreatePost}
              disabled={!postContent}
              className="px-6 py-2 font-medium text-white bg-green-600 rounded-md hover:bg-green-700 disabled:bg-muted disabled:cursor-not-allowed"
            >
              Publish Post
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Posts;
