"use client";

import React from 'react';
import type { Alert, User } from '@/types';
import { EyeIcon, CheckCircleIcon, TrashIcon, UserGroupIcon } from '@heroicons/react/24/outline';

interface AlertsPanelProps {
  alerts: Alert[];
  onDetailClick: (alert: Alert) => void;
  currentUser?: User | null;
  onDelete?: (id: number) => void;
  onDispatchTeam?: (alert: Alert) => void;
  onResolve?: (id: number) => void;
}

const AlertsPanel: React.FC<AlertsPanelProps> = ({
  alerts,
  onDetailClick,
  currentUser,
  onDelete,
  onDispatchTeam,
  onResolve
}) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-white">Alertas Recentes</h2>
      <ul className="space-y-3">
        {alerts.map((alert) => (
          <li
            key={alert.id}
            className={`p-4 rounded-lg bg-slate-800 border-l-4 transition-opacity duration-300 ${
              alert.resolved
                ? 'border-green-600 opacity-50 hover:opacity-100'
                : alert.severity === 'high'
                ? 'border-red-500'
                : alert.severity === 'medium'
                ? 'border-yellow-500'
                : 'border-blue-500'
            }`}
          >
            {alert.resolved && (
              <span className="absolute top-2 right-3 text-green-400 text-xs font-bold uppercase tracking-wider">Resolvido</span>
            )}
            <div className="flex justify-between items-start">
              <div>
                <p className="font-bold text-white text-base">{alert.type}</p>
                <p className="text-gray-400 text-sm">{alert.location}</p>
                <p className="text-xs text-gray-500 mt-1">{alert.time} - Robô: {alert.robot}</p>
              </div>

              {/* Ações disponíveis para qualquer usuário logado */}
              {currentUser && (
                <div className="flex items-center gap-2">
                  <button onClick={() => onDetailClick(alert)} title="Ver Detalhes" className="text-gray-400 hover:text-blue-400">
                    <EyeIcon className="h-5 w-5" />
                  </button>

                  {!alert.resolved && (
                    <>
                      {/* O BOTÃO "ENVIAR EQUIPE" AGORA ABRE O MODAL DE GERENCIAMENTO */}
                      <button onClick={() => onDispatchTeam?.(alert)} title="Gerenciar/Enviar Equipe" className="text-gray-400 hover:text-green-400">
                        <UserGroupIcon className="h-5 w-5" />
                      </button>
                      <button onClick={() => onResolve?.(alert.id)} title="Marcar como Resolvido" className="text-gray-400 hover:text-yellow-400">
                        <CheckCircleIcon className="h-5 w-5" />
                      </button>
                    </>
                  )}
                  
                  {/* Ação de excluir continua restrita ao supervisor para segurança */}
                  {currentUser.role === 'supervisor' && onDelete && (
                    <button onClick={() => onDelete(alert.id)} title="Excluir Alerta" className="text-gray-400 hover:text-red-500">
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  )}
                </div>
              )}
            </div>
          </li>
        ))}
        {alerts.length === 0 && (
            <p className="text-center text-gray-500 py-8">Nenhum alerta recente.</p>
        )}
      </ul>
    </div>
  );
};

export default AlertsPanel;