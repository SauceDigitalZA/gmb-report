
import React, { useState, useMemo, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Posts from './pages/Posts';
import Reviews from './pages/Reviews';
import LoginPage from './pages/LoginPage';
import { useBusinessData } from './hooks/useBusinessData';
import type { View, User } from './types';
import Header from './components/Header';
import Spinner from './components/Spinner';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const { businessData, loading: dataLoading, error: dataError } = useBusinessData(isAuthenticated);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch('/api/auth/status', {
          credentials: 'include',
        });
        if (response.ok) {
          const data = await response.json();
          if (data.isAuthenticated) {
            setIsAuthenticated(true);
            setUser(data.user);
          } else {
            setIsAuthenticated(false);
            setUser(null);
          }
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (error) {
        console.error('Failed to fetch auth status:', error);
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkAuthStatus();
  }, []);

  const renderView = () => {
    const props = { businessData };
    switch (activeView) {
      case 'dashboard':
        return <Dashboard {...props} />;
      case 'profile':
        return <Profile {...props} />;
      case 'posts':
        return <Posts {...props} />;
      case 'reviews':
        return <Reviews {...props} />;
      default:
        return <Dashboard {...props} />;
    }
  };
  
  const pageTitle = useMemo(() => {
    return activeView.charAt(0).toUpperCase() + activeView.slice(1);
  }, [activeView]);

  if (isCheckingAuth || (isAuthenticated && dataLoading)) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginPage />;
  }
  
  if (dataError || !businessData.profile) {
      return (
        <div className="flex items-center justify-center h-screen bg-background">
            <div className="text-center p-4 bg-surface rounded-lg shadow-lg">
                <h2 className="text-xl font-bold text-red-400">Failed to Load Business Data</h2>
                <p className="text-on-muted mt-2">{dataError || 'Could not retrieve profile information from the server.'}</p>
                <p className="mt-4 text-sm">Please try refreshing the page or check if the backend server is running correctly.</p>
            </div>
        </div>
      )
  }

  return (
    <div className="flex h-screen bg-background font-sans">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <main className="flex-1 flex flex-col overflow-hidden">
        <Header title={pageTitle} profileName={businessData.profile?.name || ''} user={user} />
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {renderView()}
        </div>
      </main>
    </div>
  );
};

export default App;
