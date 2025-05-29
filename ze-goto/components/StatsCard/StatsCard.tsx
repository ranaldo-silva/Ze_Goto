// components/StatsCard/StatsCard.tsx

import React from 'react';
import {
  ChartBarSquareIcon,
  MapIcon,
  ExclamationTriangleIcon,
  CameraIcon
} from '@heroicons/react/24/outline';
import { Stat } from '../../types';

const getIconComponent = (iconType: Stat['icon']) => {
  switch (iconType) {
    case 'activeRobots':
      return <ChartBarSquareIcon className="h-8 w-8 text-blue-400" />;
    case 'monitoredGalleries':
      return <MapIcon className="h-8 w-8 text-blue-400" />;
    case 'activeAlerts':
      return <ExclamationTriangleIcon className="h-8 w-8 text-blue-400" />;
    case 'inspectionsToday':
      return <CameraIcon className="h-8 w-8 text-blue-400" />;
    default:
      return null;
  }
};

const StatsCard: React.FC<Stat> = ({ title, value, change, color, icon }) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 p-6 rounded-lg shadow-lg flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-400 mb-1">{title}</p>
        <p className="text-3xl font-bold text-white">{value}</p>
        <p className={`text-sm ${color}`}>{change} desde ontem</p>
      </div>
      {getIconComponent(icon)}
    </div>
  );
};

export default StatsCard;
