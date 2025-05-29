// components/CameraFeed/CameraFeed.tsx

import React from 'react';
import {
  CameraIcon,
  WifiIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  ComputerDesktopIcon,
  AdjustmentsHorizontalIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

interface CameraFeedProps {
  robotId: string;
}

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
  },
};

const CameraFeed: React.FC<CameraFeedProps> = ({ robotId }) => {
  const currentRobotData = cameraData[robotId] || null;

  if (!currentRobotData) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        Nenhum feed de câmera disponível para {robotId}.
      </div>
    );
  }

  return (
    <div className="p-6 h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <CameraIcon className="h-6 w-6 text-purple-400 mr-2" />
          Feed da Câmera - {robotId}
        </h2>
        <div className="flex items-center text-sm text-gray-400">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500 mr-1 animate-pulse"></span>
          AO VIVO
        </div>
      </div>

      <div className="relative bg-black h-[300px] rounded-lg mb-4 flex items-center justify-center overflow-hidden">
        <p className="text-gray-500 text-lg">Vídeo do Robô {robotId} (Ao Vivo)</p>
        <div className="absolute top-2 right-2 flex items-center space-x-2">
          <span className="text-green-400 text-xs font-semibold">{currentRobotData.recStatus}</span>
          <span className="text-white text-xs">{currentRobotData.resolution}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-sm text-gray-300 mb-4">
        <div>
          <p><span className="text-blue-400 font-semibold">GPS:</span> {currentRobotData.gps}</p>
          <p><span className="text-blue-400 font-semibold">PROF:</span> {currentRobotData.prof}</p>
          <p><span className="text-blue-400 font-semibold">TEMP:</span> {currentRobotData.temp}</p>
        </div>
      </div>

      {currentRobotData.alert && (
        <div className="bg-yellow-700/30 border border-yellow-600/50 text-yellow-300 p-3 rounded-lg mb-4 flex items-center justify-between">
          <div className="flex items-center">
            <ExclamationTriangleIcon className="h-5 w-5 mr-2" />
            <span className="font-semibold">{currentRobotData.alert}</span>
          </div>
          <div className="flex items-center space-x-4">
            <button><SpeakerWaveIcon className="h-5 w-5 text-gray-300 hover:text-white" /></button>
            <button><SpeakerXMarkIcon className="h-5 w-5 text-gray-300 hover:text-white" /></button>
            <button><ComputerDesktopIcon className="h-5 w-5 text-gray-300 hover:text-white" /></button>
            <button><AdjustmentsHorizontalIcon className="h-5 w-5 text-gray-300 hover:text-white" /></button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-2 text-sm text-gray-300">
        <p><span className="text-blue-400 font-semibold">Distância:</span> {currentRobotData.distance}</p>
        <p><span className="text-blue-400 font-semibold">Qualidade:</span> {currentRobotData.quality}</p>
        <p><span className="text-blue-400 font-semibold">Latência:</span> {currentRobotData.latency}</p>
        <p><span className="text-blue-400 font-semibold">FPS:</span> {currentRobotData.fps}</p>
        <p><span className="text-blue-400 font-semibold">Bitrate:</span> {currentRobotData.bitrate}</p>
      </div>
    </div>
  );
};

export default CameraFeed;
