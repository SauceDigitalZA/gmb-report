
import React from 'react';
import { ICONS } from '../constants';

const LoginPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4 font-sans">
      <div className="w-full max-w-sm text-center">
        <div className="flex justify-center items-center mb-6">
          {ICONS.logo}
          <h1 className="text-3xl font-bold ml-3 text-on-surface">GMB Assistant</h1>
        </div>
        <div className="bg-surface p-8 rounded-2xl shadow-2xl">
          <h2 className="text-xl font-semibold text-on-surface mb-2">Welcome Back</h2>
          <p className="text-on-muted mb-8">Sign in to manage your business profile.</p>

          <a
            href="/api/auth/google"
            className="w-full px-4 py-3 font-semibold text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface focus:ring-primary-500 flex items-center justify-center"
          >
            {ICONS.google}
            <span className="ml-3">Sign in with Google</span>
          </a>
          
          <p className="text-xs text-on-muted mt-8">
            You will be redirected to Google to authenticate your account.
          </p>
        </div>
        <p className="text-xs text-on-muted mt-6">&copy; 2024 GMB Assistant. Powered by Gemini.</p>
      </div>
    </div>
  );
};

export default LoginPage;
