
import React from 'react';
import type { User } from '../types';

interface HeaderProps {
  title: string;
  profileName: string;
  user: User | null;
}

const Header: React.FC<HeaderProps> = ({ title, profileName, user }) => {
  const displayName = user ? user.name : profileName;
  const displayImage = user ? user.photo : "https://i.pravatar.cc/150?u=admin";

  return (
    <header className="flex-shrink-0 bg-surface shadow-md z-10">
      <div className="flex items-center justify-between p-4">
        <h2 className="text-2xl font-bold text-on-surface">{title}</h2>
        <div className="flex items-center">
            <span className="text-on-muted mr-4 hidden sm:block">{displayName}</span>
            <img className="h-10 w-10 rounded-full object-cover" src={displayImage} alt="User"/>
        </div>
      </div>
    </header>
  );
};

export default Header;
