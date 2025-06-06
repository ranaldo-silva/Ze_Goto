// components/RobotCameraView/RobotCameraView.tsx
"use client";

import React from 'react';
import {
  VideoCameraIcon, // Ícone mais apropriado para a view da câmera
  MapPinIcon,
  FireIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

// Tipagem para os dados de cada robô
interface RobotViewData {
  gps: string;
  profundidade: string;
  temperatura: string;
  statusGravacao: string;
  resolucao: string;
  alerta?: string; // Alerta é opcional
  imageUrl: string;
}

// Dados fictícios para os robôs
const cameraData: Record<string, RobotViewData> = {
  'ZG-001': {
    gps: '-23.5505° S, 46.6333° W',
    profundidade: '2.3m',
    temperatura: '18°C',
    statusGravacao: 'GRAVANDO',
    resolucao: '4K 60FPS',
    alerta: 'OBSTRUÇÃO DETECTADA',
    imageUrl: '/Image/Zegoto1.png', // Lembre-se de ter essa imagem na pasta /public
  },
  'ZG-003': {
    gps: '-23.5614° S, 46.6565° W',
    profundidade: '5.1m',
    temperatura: '16°C',
    statusGravacao: 'GRAVANDO',
    resolucao: '1080p 60FPS',
    imageUrl: '/Image/Zegoto1.png', // Exemplo de imagem gerada
  },
    'ZG-007': {
    gps: '-23.5475° S, 46.6361° W',
    profundidade: '3.8m',
    temperatura: '17°C',
    statusGravacao: 'STANDBY',
    resolucao: '1080p 30FPS',
    alerta: 'SINAL BAIXO',
    imageUrl: '/Image/Zegoto1.png', // Exemplo com outra imagem
  },
};

// Props que o componente receberá
interface RobotCameraViewProps {
  robotId: string;
}

const RobotCameraView: React.FC<RobotCameraViewProps> = ({ robotId }) => {
  const data = cameraData[robotId];

  // Se não houver dados para o robô selecionado
  if (!data) {
    return (
      <div className="p-6 h-full flex flex-col items-center justify-center bg-slate-800/50 rounded-lg">
        <ExclamationTriangleIcon className="h-12 w-12 text-yellow-500 mb-4" />
        <h3 className="text-lg font-semibold">Câmera Indisponível</h3>
        <p className="text-gray-400">Não há dados de vídeo para o robô {robotId}.</p>
      </div>
    );
  }

  // Renderização principal do componente
  return (
    <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 p-6 rounded-lg text-white h-full flex flex-col">
      {/* Cabeçalho */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <VideoCameraIcon className="h-6 w-6 text-purple-400 mr-2" />
          Câmera Ao Vivo - {robotId}
        </h2>
        <div className={`flex items-center text-sm font-semibold ${data.statusGravacao === 'GRAVANDO' ? 'text-red-500' : 'text-gray-400'}`}>
          <span className={`h-2.5 w-2.5 rounded-full mr-2 ${data.statusGravacao === 'GRAVANDO' ? 'bg-red-500 animate-pulse' : 'bg-gray-400'}`}></span>
          {data.statusGravacao}
        </div>
      </div>

      {/* View da Câmera com a Imagem */}
      <div className="relative w-full h-[300px] bg-black rounded-lg overflow-hidden mb-4">
        <img
          src={data.imageUrl}
          alt={`Visão da câmera do robô ${robotId}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-2 left-2 bg-black/50 px-2 py-1 rounded text-xs">
          {data.resolucao}
        </div>
      </div>

      {/* Alerta (se existir) */}
      {data.alerta && (
        <div className="bg-red-900/50 border border-red-700 text-red-300 p-3 rounded-lg mb-4 flex items-center">
          <ExclamationTriangleIcon className="h-5 w-5 mr-2 flex-shrink-0" />
          <span className="font-semibold">{data.alerta}</span>
        </div>
      )}

      {/* Informações Adicionais */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
        <div className="flex items-center">
          <MapPinIcon className="h-5 w-5 text-blue-400 mr-2"/>
          <div>
            <p className="font-bold">GPS</p>
            <p className="text-gray-300">{data.gps}</p>
          </div>
        </div>
        <div className="flex items-center">
          <svg className="h-5 w-5 text-blue-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/></svg>
          <div>
            <p className="font-bold">Profundidade</p>
            <p className="text-gray-300">{data.profundidade}</p>
          </div>
        </div>
        <div className="flex items-center">
          <FireIcon className="h-5 w-5 text-blue-400 mr-2"/>
          <div>
            <p className="font-bold">Temperatura</p>
            <p className="text-gray-300">{data.temperatura}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RobotCameraView;