// components/RobotStatus/RobotStatus.tsx

import React from 'react';
import {
  Battery50Icon,
  WifiIcon,
  ClockIcon,
  ChartBarSquareIcon
} from '@heroicons/react/24/outline';
import { Robot } from '../../types';

interface RobotStatusProps {
  robots: Robot[];
}

const statusClasses: Record<Robot['status'], string> = {
  active: 'text-green-500',
  inspection: 'text-blue-500',
  maintenance: 'text-yellow-500',
  alert: 'text-red-500',
};

const RobotStatus: React.FC<RobotStatusProps> = ({ robots }) => {
  return (
    <div className="p-6 h-full flex flex-col">
      <h2 className="text-xl font-semibold text-white flex items-center mb-4">
        <ChartBarSquareIcon className="h-6 w-6 text-blue-400 mr-2" />
        Status dos Robôs
      </h2>

      <div className="space-y-6 overflow-y-auto custom-scrollbar flex-grow">
        {robots.map((robot) => (
          <div key={robot.id} className="bg-slate-700/50 p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="text-lg font-semibold text-white">{robot.name}</p>
                <p className="text-sm text-gray-400">{robot.location}</p>
              </div>
              <div className="flex flex-col items-end">
                <span className={`text-sm font-semibold ${statusClasses[robot.status]}`}>
                  {robot.status === 'active' ? 'Ativo' : robot.status === 'inspection' ? 'Inspecionando' : robot.status === 'maintenance' ? 'Manutenção' : 'Alerta'}
                </span>
                <div className="flex items-center text-xs text-gray-400 mt-1">
                  <ClockIcon className="h-3 w-3 mr-1" /> {robot.lastUpdate}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4 mt-3">
              <div className="flex items-center flex-grow">
                <Battery50Icon className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-sm text-gray-300 mr-2">Bateria:</span>
                <div className="w-full bg-gray-600 rounded-full h-2.5">
                  <div
                    className="bg-green-500 h-2.5 rounded-full"
                    style={{ width: `${robot.battery}%` }}
                  ></div>
                </div>
                <span className="ml-2 text-sm text-white">{robot.battery}%</span>
              </div>

              <div className="flex items-center flex-grow">
                <WifiIcon className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-sm text-gray-300 mr-2">Sinal:</span>
                <div className="w-full bg-gray-600 rounded-full h-2.5">
                  <div
                    className={`${robot.signal > 20 ? 'bg-green-500' : 'bg-red-500'} h-2.5 rounded-full`}
                    style={{ width: `${robot.signal}%` }}
                  ></div>
                </div>
                <span className="ml-2 text-sm text-white">{robot.signal}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RobotStatus;
