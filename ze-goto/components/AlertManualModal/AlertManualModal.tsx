// components/AlertManualModal/AlertManualModal.tsx
"use client";

import React, { useState } from 'react';
import type { Alert } from '@/types';

interface AlertManualModalProps {
  onClose: () => void;
  onSubmit: (alert: Alert) => void;
}

const AlertManualModal: React.FC<AlertManualModalProps> = ({ onClose, onSubmit }) => {
  const [robot, setRobot] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState('Obstrução');
  const [severity, setSeverity] = useState<'low' | 'medium' | 'high'>('low');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    if (!robot || !location || !description) {
      alert('Preencha todos os campos obrigatórios.');
      return;
    }

    const newAlert: Alert = {
      id: Date.now(),
      robot,
      location,
      type,
      severity,
      time: new Date().toLocaleTimeString(),
      description
    };

    onSubmit(newAlert);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 text-white rounded-lg w-full max-w-lg p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-xl hover:text-red-400">×</button>

        <h2 className="text-2xl font-bold mb-4">Subir Alerta Manual</h2>

        <input
          className="w-full p-2 mb-3 bg-slate-800 border border-slate-600 rounded"
          placeholder="ID do Robô"
          value={robot}
          onChange={(e) => setRobot(e.target.value)}
        />

        <input
          className="w-full p-2 mb-3 bg-slate-800 border border-slate-600 rounded"
          placeholder="Local do Alerta"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <select
          className="w-full p-2 mb-3 bg-slate-800 border border-slate-600 rounded"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option>Obstrução</option>
          <option>Estrutural</option>
          <option>Nível de Água</option>
          <option>Outros</option>
        </select>

        <select
          className="w-full p-2 mb-3 bg-slate-800 border border-slate-600 rounded"
          value={severity}
          onChange={(e) => setSeverity(e.target.value as 'low' | 'medium' | 'high')}
        >
          <option value="low">Baixa</option>
          <option value="medium">Média</option>
          <option value="high">Alta</option>
        </select>

        <textarea
          className="w-full p-2 mb-4 bg-slate-800 border border-slate-600 rounded"
          rows={3}
          placeholder="Descrição do alerta"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded"
          >Cancelar</button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
          >Subir Alerta</button>
        </div>
      </div>
    </div>
  );
};

export default AlertManualModal;
