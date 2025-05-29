// components/AlertsPanel/AlertsPanel.tsx
import React from 'react';
import {
  ClockIcon,
  MapPinIcon,
  ArrowRightIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { Alert } from '../../types';

interface AlertsPanelProps {
  alerts: Alert[];
  onDetailClick: (alert: Alert) => void;
}


const severityColors: Record<Alert['severity'], string> = {
  high: 'bg-red-600',
  medium: 'bg-yellow-500',
  low: 'bg-blue-500',
};

const AlertsPanel: React.FC<AlertsPanelProps> = ({ alerts }) => {
  return (
    <div className="p-6 h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <ExclamationTriangleIcon className="h-6 w-6 text-yellow-400 mr-2" />
          Alertas Recentes
        </h2>
        <button className="text-sm text-gray-400 hover:text-white transition-colors">
          <span className="font-semibold">{alerts.length}</span> ativos
        </button>
      </div>

      <div className="space-y-4 overflow-y-auto custom-scrollbar flex-grow">
        {alerts.map((alert) => (
          <div key={alert.id} className="bg-slate-700/50 p-4 rounded-lg flex flex-col shadow-md">
            <div className="flex justify-between items-start mb-2">
              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${severityColors[alert.severity]} text-white`}>
                {alert.severity.toUpperCase()}
              </span>
              <div className="flex items-center text-gray-400 text-sm">
                <ClockIcon className="h-4 w-4 mr-1" /> {alert.time}
              </div>
            </div>
            <p className="text-white font-medium mb-1">{alert.description}</p>
            <div className="flex items-center text-gray-400 text-sm mb-1">
              <MapPinIcon className="h-4 w-4 mr-1" /> {alert.location}
            </div>
            <div className="flex items-center text-gray-400 text-sm">
              <span className="mr-1">Robô:</span> {alert.robot}
              <button className="ml-auto text-blue-400 hover:text-blue-300 flex items-center text-sm">
                Ver Detalhes <ArrowRightIcon className="h-4 w-4 ml-1" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertsPanel;
