"use client";
import React from 'react';
import { Alert } from '../../types';
import {
  XMarkIcon,
  ExclamationTriangleIcon,
  MapPinIcon,
  ClockIcon,
  RobotIcon,
} from '@heroicons/react/24/outline';

interface Props {
  alert: Alert;
  onClose: () => void;
}

const AlertDetailsPanel: React.FC<Props> = ({ alert, onClose }) => {
  return (
    <div className="fixed bottom-4 right-4 max-w-md w-full bg-slate-800 text-white border border-slate-700 rounded-lg shadow-2xl p-6 z-50 animate-fade-in">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-bold flex items-center">
          <ExclamationTriangleIcon className="h-6 w-6 text-yellow-400 mr-2" />
          Detalhes do Alerta #{alert.id}
        </h2>
        <button onClick={onClose}>
          <XMarkIcon className="h-5 w-5 text-gray-400 hover:text-white" />
        </button>
      </div>

      <p className="text-xs text-gray-400 flex items-center mb-4">
        <ClockIcon className="h-4 w-4 mr-1" /> Detectado às {alert.time}
      </p>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-slate-700 p-3 rounded">
          <p className="text-xs text-gray-400">Tipo de Alerta</p>
          <p className="text-sm font-medium">{alert.type}</p>
        </div>
        <div className="bg-slate-700 p-3 rounded">
          <p className="text-xs text-gray-400">Robô Responsável</p>
          <p className="text-sm font-medium flex items-center">
            <RobotIcon className="h-4 w-4 mr-1" /> {alert.robot}
          </p>
        </div>
      </div>

      <div className="bg-slate-700 p-3 rounded mb-4">
        <p className="text-xs text-gray-400">Localização</p>
        <p className="text-sm flex items-center">
          <MapPinIcon className="h-4 w-4 mr-1" /> {alert.location}
        </p>
      </div>

      <div className="bg-slate-700 p-3 rounded mb-4">
        <p className="text-xs text-gray-400">Descrição Detalhada</p>
        <p className="text-sm">{alert.description}</p>
      </div>

      <div className="bg-slate-700 p-3 rounded">
        <p className="text-xs text-gray-400 mb-1">Ações Recomendadas</p>
        <ul className="list-disc list-inside text-sm">
          <li>Enviar equipe de manutenção imediatamente</li>
          <li>Bloquear acesso à área se necessário</li>
          <li>Monitorar continuamente</li>
        </ul>
      </div>
    </div>
  );
};

export default AlertDetailsPanel;
