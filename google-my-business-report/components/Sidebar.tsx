
import React from 'react';
import type { View } from '../types';
import { ICONS } from '../constants';

interface SidebarProps {
  activeView: View;
  setActiveView: (view: View) => void;
}

const NavItem: React.FC<{
  view: View;
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}> = ({ view, label, icon, isActive, onClick }) => {
  return (
    <li>
      <button
        onClick={onClick}
        className={`flex items-center w-full p-3 my-1 rounded-lg transition-colors duration-200 ${
          isActive
            ? 'bg-primary-600 text-white shadow-md'
            : 'text-on-muted hover:bg-muted hover:text-on-surface'
        }`}
      >
        {icon}
        <span className="ml-4 font-medium">{label}</span>
      </button>
    </li>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView }) => {
  const navItems: { view: View; label: string; icon: React.ReactNode }[] = [
    { view: 'dashboard', label: 'Dashboard', icon: ICONS.dashboard },
    { view: 'profile', label: 'Profile', icon: ICONS.profile },
    { view: 'posts', label: 'Posts', icon: ICONS.posts },
    { view: 'reviews', label: 'Reviews', icon: ICONS.reviews },
  ];

  return (
    <aside className="w-64 bg-surface flex-shrink-0 p-4 flex flex-col shadow-lg">
      <div className="flex items-center mb-8 px-2">
        {ICONS.logo}
        <h1 className="text-xl font-bold ml-3 text-on-surface">GMB Assistant</h1>
      </div>
      <nav className="flex-grow">
        <ul>
          {navItems.map(item => (
            <NavItem
              key={item.view}
              view={item.view}
              label={item.label}
              icon={item.icon}
              isActive={activeView === item.view}
              onClick={() => setActiveView(item.view)}
            />
          ))}
        </ul>
      </nav>
      <div className="mt-auto">
         <a
            href="/api/auth/logout"
            className="flex items-center w-full p-3 my-1 rounded-lg transition-colors duration-200 text-on-muted hover:bg-muted hover:text-on-surface"
          >
            {ICONS.logout}
            <span className="ml-4 font-medium">Logout</span>
          </a>
          <div className="p-2 text-center text-on-muted text-xs">
              <p>Powered by Gemini</p>
              <p>&copy; 2024</p>
          </div>
      </div>
    </aside>
  );
};

export default Sidebar;
