// components/RobotMap/RobotMap.tsx

import React from 'react';
import { Robot } from '../../types';

interface RobotMapProps {
  robots: Robot[];
  onRobotSelect: (robotId: string) => void;
  selectedRobot: string;
  viewMode: 'general' | 'detailed';
}

const statusColors: Record<Robot['status'], string> = {
  active: 'bg-green-500',
  inspection: 'bg-blue-500',
  maintenance: 'bg-yellow-500',
  alert: 'bg-red-500',
};

const RobotMap: React.FC<RobotMapProps> = ({ robots, onRobotSelect, selectedRobot, viewMode }) => {
  return (
    <div className="relative w-full h-full p-4">
      {viewMode === 'detailed' && (
        <p className="absolute top-2 left-2 text-sm text-white z-10">Modo Detalhado Ativo</p>
      )}

      <div className="relative w-full h-full bg-slate-900 rounded-lg flex items-center justify-center overflow-hidden">
        <div className="absolute w-[90%] h-full">
          <svg className="w-full h-full" viewBox="0 0 1000 600" preserveAspectRatio="none">
            <path d="M 50 150 C 200 100, 800 200, 950 150" fill="none" stroke="#4F46E5" strokeWidth="3" />
            <path d="M 50 300 C 200 250, 800 350, 950 300" fill="none" stroke="#4F46E5" strokeWidth="3" />
            <path d="M 50 450 C 200 400, 800 500, 950 450" fill="none" stroke="#4F46E5" strokeWidth="3" />
          </svg>
        </div>

        {robots.map((robot) => {
          let top = 'auto';
          let left = 'auto';

          switch (robot.id) {
            case 'ZG-001':
              top = '40%';
              left = '20%';
              break;
            case 'ZG-003':
              top = '60%';
              left = '45%';
              break;
            case 'ZG-007':
              top = '25%';
              left = '65%';
              break;
          }
// components/CameraFeed/CameraFeed.tsx

// ... outros imports

const cameraData: Record<string, any> = {
  'ZG-001': {
    gps: '-23.5505° -46.6333°',
    prof: '2.3m',
    temp: '18°C',
    recStatus: 'REC',
    resolution: '4K 60FPS',
    alert: 'OBSTRUÇÃO DETECTADA',
    distance: '15m',
    quality: '4K Ultra HD',
    fps: 60,
    latency: '42ms',
    bitrate: '12.5 Mbps',
    imageUrl: '/galeria-subterranea.jpg', // <-- ADICIONE ESTA LINHA
  },
  // Você pode adicionar outros robôs com outras imagens aqui
};

// ... resto do componente
          return (
            <div
              key={robot.id}
              className={`absolute flex flex-col items-center cursor-pointer ${
                selectedRobot === robot.id ? 'z-20' : ''
              }`}
              style={{ top, left }}
              onClick={() => onRobotSelect(robot.id)}
            >
              <div
                className={`w-4 h-4 rounded-full ${statusColors[robot.status]} border-2 ${
                  selectedRobot === robot.id ? 'border-white ring-2 ring-blue-400' : 'border-slate-600'
                }`}
              ></div>
              <span
                className={`mt-1 text-xs font-semibold ${selectedRobot === robot.id ? 'text-white' : 'text-gray-400'}`}
              >
                {robot.name}
              </span>
              {viewMode === 'detailed' && (
                <span className="text-[10px] text-gray-400">{robot.location}</span>
              )}
            </div>
          );
        })}
      </div>

      <div className="absolute bottom-4 left-4 flex space-x-4 text-sm z-10">
        <div className="flex items-center">
          <span className="h-3 w-3 rounded-full bg-green-500 mr-2"></span> Ativo
        </div>
        <div className="flex items-center">
          <span className="h-3 w-3 rounded-full bg-blue-500 mr-2"></span> Inspeção
        </div>
        <div className="flex items-center">
          <span className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></span> Manutenção
        </div>
        <div className="flex items-center">
          <span className="h-3 w-3 rounded-full bg-red-500 mr-2"></span> Alerta
        </div>
      </div>
    </div>
  );
};

export default RobotMap;
