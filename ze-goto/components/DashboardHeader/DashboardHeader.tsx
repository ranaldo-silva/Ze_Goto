// components/DashboardHeader/DashboardHeader.tsx

import React from 'react';
import {
  ShieldCheckIcon,
  BellIcon,
  Cog6ToothIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline';

const DashboardHeader: React.FC = () => {
  return (
    <header className="bg-slate-800/50 backdrop-blur-lg border-b border-slate-700/50 py-4 px-6 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <ShieldCheckIcon className="h-8 w-8 text-blue-400" />
        <h1 className="text-2xl font-bold text-white">Zé Goto</h1>
        <p className="text-sm text-gray-400 hidden md:block">Guardião Subterrâneo de São Paulo</p>
      </div>
      <div className="flex items-center space-x-6">
        <div className="flex items-center text-green-500">
          <span className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></span>
          <span className="text-sm">Sistema Online</span>
        </div>
        <BellIcon className="h-6 w-6 text-gray-400 cursor-pointer hover:text-white transition-colors" />
        <Cog6ToothIcon className="h-6 w-6 text-gray-400 cursor-pointer hover:text-white transition-colors" />
        <UserCircleIcon className="h-6 w-6 text-gray-400 cursor-pointer hover:text-white transition-colors" />
      </div>
    </header>
  );
};

export default DashboardHeader;
