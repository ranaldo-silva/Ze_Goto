// components/InspecaoModal.tsx
"use client";

import React, { useState } from 'react';
import type { User, InspecaoData } from '@/types'; // Ajuste o path

interface InspecaoModalProps {
  currentUser: User; // Agora é obrigatório, pois o modal só abre para usuários logados
  onClose: () => void;
  onSubmit: (data: InspecaoData) => void;
}

const problemasComuns = [ // Renomeado para clareza
  'Obstrução grande detectada - possível acúmulo de detritos',
  'Alerta falso',
  'Nível de água ligeiramente elevado',
  'Rachadura na parede lateral identificada',
  'Problema de comunicação com o robô de inspeção',
  'Vazamento pequeno na junta de dilatação',
  'Lixo acumulado na grade de entrada',
  'Outro (especificar nos detalhes se necessário)'
];

const InspecaoModal: React.FC<InspecaoModalProps> = ({ currentUser, onClose, onSubmit }) => {
  const [robo, setRobo] = useState('');
  const [local, setLocal] = useState('');
  const [problema, setProblema] = useState(problemasComuns[0]);
  const [acionarEquipe, setAcionarEquipe] = useState(false);
  const [observacoes, setObservacoes] = useState(''); // Campo adicional para detalhes

  const handleSubmit = () => {
    if (!robo || !local) {
      alert('Os campos "Nome do Robô" e "Local da Inspeção" são obrigatórios.');
      return;
    }

    const inspecaoData: InspecaoData = {
      robo,
      local,
      problema: problema === 'Outro (especificar nos detalhes se necessário)' && observacoes ? `${problema}: ${observacoes}` : problema,
      acionarEquipe,
      registradoPor: currentUser.name, // Ou currentUser.email
      dataHora: new Date().toISOString(),
    };
    onSubmit(inspecaoData);
    // Limpar campos após o envio bem-sucedido
    setRobo('');
    setLocal('');
    setProblema(problemasComuns[0]);
    setAcionarEquipe(false);
    setObservacoes('');
    // onClose(); // O componente pai decide se fecha o modal
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
      <div className="bg-slate-800 text-white rounded-lg shadow-xl w-full max-w-lg p-6">
        <div className="flex justify-between items-center mb-5">
            <h2 className="text-2xl font-semibold">Registrar Nova Inspeção</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-red-400 text-2xl leading-none">×</button>
        </div>
        <p className="text-sm text-gray-400 mb-4">Registrando como: <span className="font-semibold text-blue-400">{currentUser.name} ({currentUser.role})</span></p>

        <input
          className="w-full p-2.5 mb-3 bg-slate-700 text-white border border-slate-600 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Nome/ID do Robô (ex: R2D2-SetorA)"
          value={robo}
          onChange={(e) => setRobo(e.target.value)}
        />

        <input
          className="w-full p-2.5 mb-3 bg-slate-700 text-white border border-slate-600 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Local da Inspeção (ex: Túnel XYZ, Seção 3B)"
          value={local}
          onChange={(e) => setLocal(e.target.value)}
        />

        <select
          className="w-full p-2.5 mb-3 bg-slate-700 text-white border border-slate-600 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          value={problema}
          onChange={(e) => setProblema(e.target.value)}
        >
          {problemasComuns.map((p, idx) => (
            <option key={idx} value={p}>{p}</option>
          ))}
        </select>
        
        {problema === 'Outro (especificar nos detalhes se necessário)' && (
            <textarea
                className="w-full p-2.5 mb-3 bg-slate-700 text-white border border-slate-600 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Detalhes do problema..."
                value={observacoes}
                onChange={(e) => setObservacoes(e.target.value)}
                rows={3}
            />
        )}


        <label className="flex items-center mb-6 text-gray-300">
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-blue-500 bg-slate-700 border-slate-600 rounded mr-2 focus:ring-offset-slate-800 focus:ring-blue-500"
            checked={acionarEquipe}
            onChange={(e) => setAcionarEquipe(e.target.checked)}
          />
          Acionar equipe de resolução {currentUser.role === 'supervisor' && <span className="ml-1 text-xs text-green-400">(Ação Direta de Supervisor)</span>}
        </label>

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-5 py-2 bg-gray-600 hover:bg-gray-500 rounded font-medium transition-colors">Cancelar</button>
          <button onClick={handleSubmit} className="px-5 py-2 bg-blue-600 hover:bg-blue-700 rounded font-medium transition-colors">Salvar Inspeção</button>
        </div>
      </div>
    </div>
  );
};

export default InspecaoModal;