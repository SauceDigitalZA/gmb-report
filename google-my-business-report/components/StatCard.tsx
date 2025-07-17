
import React from 'react';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  change?: string;
  changeType?: 'increase' | 'decrease';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, change, changeType }) => {
  const changeColor = changeType === 'increase' ? 'text-green-400' : 'text-red-400';
  const changeIcon = changeType === 'increase' ? '↑' : '↓';

  return (
    <div className="bg-surface p-6 rounded-lg shadow-lg hover:shadow-primary-700/20 transition-shadow duration-300">
      <div className="flex items-start justify-between">
        <div className="flex flex-col">
          <p className="text-sm font-medium text-on-muted">{title}</p>
          <p className="text-3xl font-bold text-on-surface mt-1">{value}</p>
        </div>
        <div className="p-3 bg-muted rounded-full">
            {icon}
        </div>
      </div>
      {change && (
        <div className="flex items-center text-sm mt-4">
          <span className={`font-semibold ${changeColor}`}>
            {changeIcon} {change}
          </span>
          <span className="text-on-muted ml-2">vs last month</span>
        </div>
      )}
    </div>
  );
};

export default StatCard;
