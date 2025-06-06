"use client";

import React, { useState } from 'react';
import type { Alert } from '@/types';
import { BellAlertIcon } from '@heroicons/react/24/outline';

interface AlertManualModalProps {
  onClose: () => void;
  onSubmit: (alert: Alert) => void;
}

// Tipos de alerta organizados por categoria
const tiposDeAlerta = {
  "Obstruções": [
    'Obstrução parcial por detritos leves',
    'Obstrução total por acúmulo de lixo',
    'Obstrução por sedimento ou lama',
  ],
  "Estruturais": [
    'Rachadura na parede lateral',
    'Deslocamento de junta',
    'Corrosão de armadura',
  ],
  "Hidráulicos": [
    'Nível de água elevado',
    'Vazamento identificado',
  ],
  "Outros": [
    'Outros',
  ]
}

const AlertManualModal: React.FC<AlertManualModalProps> = ({ onClose, onSubmit }) => {
  const [robot, setRobot] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState(tiposDeAlerta.Obstruções[0]);
  const [severity, setSeverity] = useState<'low' | 'medium' | 'high'>('low');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    if (!robot || !location || !description) {
      alert('Preencha todos os campos obrigatórios.');
      return;
    }
    const newAlert: Alert = { id: Date.now(), robot, location, type, severity, time: new Date().toLocaleTimeString(), description };
    onSubmit(newAlert);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-800 text-white rounded-lg w-full max-w-lg p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-xl hover:text-red-400">×</button>
        <h2 className="text-2xl font-bold mb-5 flex items-center gap-3">
          <BellAlertIcon className="h-7 w-7 text-red-500" />
          Subir Alerta Manual
        </h2>

        <div className="space-y-4">
          <input className="w-full p-2.5 bg-slate-700 border border-slate-600 rounded" placeholder="ID do Robô" value={robot} onChange={(e) => setRobot(e.target.value)} />
          <input className="w-full p-2.5 bg-slate-700 border border-slate-600 rounded" placeholder="Local do Alerta" value={location} onChange={(e) => setLocation(e.target.value)} />
          
          <div>
            <label className="text-sm text-gray-400">Tipo de Alerta</label>
            <select className="w-full p-2.5 bg-slate-700 border border-slate-600 rounded" value={type} onChange={(e) => setType(e.target.value)}>
              {Object.entries(tiposDeAlerta).map(([categoria, listaAlertas]) => (
                <optgroup key={categoria} label={categoria}>
                  {listaAlertas.map((t, idx) => <option key={idx} value={t}>{t}</option>)}
                </optgroup>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-400">Gravidade</label>
            <select className="w-full p-2.5 bg-slate-700 border border-slate-600 rounded" value={severity} onChange={(e) => setSeverity(e.target.value as 'low' | 'medium' | 'high')}>
              <option value="low">Baixa</option>
              <option value="medium">Média</option>
              <option value="high">Alta</option>
            </select>
          </div>

          <textarea className="w-full p-2.5 bg-slate-700 border border-slate-600 rounded" rows={4} placeholder="Descrição detalhada do alerta..." value={description} onChange={(e) => setDescription(e.target.value)}></textarea>

          <div className="flex justify-end gap-3 pt-2">
            <button onClick={onClose} className="px-5 py-2 bg-gray-600 hover:bg-gray-500 rounded font-medium">Cancelar</button>
            <button onClick={handleSubmit} className="px-5 py-2 bg-red-600 hover:bg-red-700 rounded font-medium">Subir Alerta</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertManualModal;