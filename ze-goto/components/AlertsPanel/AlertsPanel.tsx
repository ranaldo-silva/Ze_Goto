// components/AlertsPanel/AlertsPanel.tsx
"use client";

import React from 'react';
import type { Alert, User } from '@/types';

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
      <h2 className="text-xl font-semibold mb-4">Alertas Recentes</h2>
      <ul className="space-y-3">
        {alerts.map((alert) => (
          <li
            key={alert.id}
            className={`p-4 rounded-md bg-slate-800 border-l-4 relative ${
              alert.resolved
                ? 'border-green-600 opacity-60'
                : alert.severity === 'high'
                ? 'border-red-500'
                : alert.severity === 'medium'
                ? 'border-yellow-500'
                : 'border-blue-500'
            }`}
          >
            {alert.resolved && (
              <span className="absolute top-2 right-3 text-green-400 text-xs font-semibold">Resolvido</span>
            )}
            <div className="flex justify-between items-center">
              <div>
                <p className="font-bold text-white text-sm">{alert.type}</p>
                <p className="text-gray-400 text-xs">{alert.location}</p>
                <p className="text-xs text-gray-500 mt-1">{alert.time} - Robô: {alert.robot}</p>
              </div>
              <div className="flex flex-col gap-1 items-end text-right">
                <button
                  onClick={() => onDetailClick(alert)}
                  className="text-blue-400 hover:text-white text-sm underline"
                >
                  Detalhes
                </button>
                {currentUser?.role === 'supervisor' && !alert.resolved && (
                  <>
                    <button
                      onClick={() => onDispatchTeam?.(alert)}
                      className="text-green-400 hover:text-green-600 text-xs"
                    >
                      Enviar Equipe
                    </button>
                    <button
                      onClick={() => onResolve?.(alert.id)}
                      className="text-yellow-400 hover:text-yellow-500 text-xs"
                    >
                      Marcar como Resolvido
                    </button>
                  </>
                )}
                {currentUser?.role === 'supervisor' && onDelete && (
                  <button
                    onClick={() => onDelete(alert.id)}
                    className="text-red-400 hover:text-red-600 text-xs"
                  >
                    Excluir
                  </button>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlertsPanel;
