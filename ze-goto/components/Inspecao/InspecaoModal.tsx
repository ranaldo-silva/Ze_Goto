"use client";

import React, { useState } from 'react';
import type { User, InspecaoData } from '@/types';
import { ClipboardDocumentListIcon, ChevronDownIcon, BellAlertIcon } from '@heroicons/react/24/outline';

interface InspecaoModalProps {
  currentUser: User;
  onClose: () => void;
  onSubmit: (data: InspecaoData) => void;
}

// Lista de problemas mais detalhada, especialmente para obstruções
const problemasComuns = {
  "Obstruções": [
    'Obstrução parcial por detritos leves',
    'Obstrução total por acúmulo de lixo',
    'Obstrução por sedimento ou lama',
    'Raízes de árvores invadindo a galeria',
  ],
  "Estruturais": [
    'Rachadura na parede lateral',
    'Deslocamento de junta',
    'Corrosão de armadura',
    'Infiltração visível',
  ],
  "Operacionais": [
    'Nível de água acima do normal',
    'Falha de comunicação com o robô',
    'Alerta falso (sem anomalias)',
  ],
  "Outros": [
    'Outro (especificar nos detalhes)',
  ]
};

const InspecaoModal: React.FC<InspecaoModalProps> = ({ currentUser, onClose, onSubmit }) => {
  const [robo, setRobo] = useState('');
  const [local, setLocal] = useState('');
  const [problema, setProblema] = useState(problemasComuns.Obstruções[0]);
  const [acionarEquipe, setAcionarEquipe] = useState(false);
  const [tipoEquipe, setTipoEquipe] = useState('Nenhuma');
  const [observacoes, setObservacoes] = useState('');

  const handleSubmit = () => {
    if (!robo || !local) {
      alert('Os campos "ID do Robô" e "Local da Inspeção" são obrigatórios.');
      return;
    }

    const inspecaoData: InspecaoData = {
      robo,
      local,
      problema: problema === 'Outro (especificar nos detalhes)' && observacoes ? `${problema}: ${observacoes}` : problema,
      acionarEquipe,
      tipoEquipe: acionarEquipe ? tipoEquipe : 'Nenhuma', // Salva o tipo de equipe se a opção for marcada
      registradoPor: currentUser.name,
      dataHora: new Date().toISOString(),
    };
    onSubmit(inspecaoData);

    // Limpar campos
    setRobo('');
    setLocal('');
    setProblema(problemasComuns.Obstruções[0]);
    setAcionarEquipe(false);
    setTipoEquipe('Nenhuma');
    setObservacoes('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
      <div className="bg-slate-800 text-white rounded-lg shadow-xl w-full max-w-lg p-6">
        <div className="flex justify-between items-center mb-5">
            <h2 className="text-2xl font-semibold flex items-center gap-3">
              <ClipboardDocumentListIcon className="h-7 w-7 text-blue-400"/>
              Registrar Nova Inspeção
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-red-400 text-2xl leading-none">×</button>
        </div>
        <p className="text-sm text-gray-400 mb-4">Registrando como: <span className="font-semibold text-blue-400">{currentUser.name} ({currentUser.role})</span></p>

        <input className="w-full p-2.5 mb-3 bg-slate-700 text-white border border-slate-600 rounded" placeholder="ID do Robô (ex: ZG-007)" value={robo} onChange={(e) => setRobo(e.target.value)} />
        <input className="w-full p-2.5 mb-3 bg-slate-700 text-white border border-slate-600 rounded" placeholder="Local da Inspeção (ex: Galeria Anhangabaú, Setor 7)" value={local} onChange={(e) => setLocal(e.target.value)} />

        <select className="w-full p-2.5 mb-3 bg-slate-700 text-white border border-slate-600 rounded" value={problema} onChange={(e) => setProblema(e.target.value)}>
          {Object.entries(problemasComuns).map(([categoria, listaProblemas]) => (
            <optgroup key={categoria} label={categoria}>
              {listaProblemas.map((p, idx) => <option key={idx} value={p}>{p}</option>)}
            </optgroup>
          ))}
        </select>
        
        {problema.includes('Outro') && (
            <textarea className="w-full p-2.5 mb-3 bg-slate-700 text-white border border-slate-600 rounded" placeholder="Detalhes do problema..." value={observacoes} onChange={(e) => setObservacoes(e.target.value)} rows={3} />
        )}

        <label className="flex items-center mb-3 text-gray-300 cursor-pointer">
          <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-500 bg-slate-700 border-slate-600 rounded mr-2" checked={acionarEquipe} onChange={(e) => setAcionarEquipe(e.target.checked)} />
          Acionar equipe de manutenção
        </label>

        {acionarEquipe && (
            <div className='mb-6'>
                <label className='block text-sm font-medium text-gray-300 mb-1'>Selecione o tipo de equipe</label>
                <select className="w-full p-2.5 bg-slate-700 text-white border border-slate-600 rounded" value={tipoEquipe} onChange={(e) => setTipoEquipe(e.target.value)}>
                    <option>Hidráulica (Vazamentos, Nível)</option>
                    <option>Estrutural (Rachaduras, Deslocamentos)</option>
                    <option>Limpeza (Obstruções, Detritos)</option>
                    <option>Elétrica/Comunicação (Falha de Robô)</option>
                    <option>Emergência (Risco Iminente)</option>
                </select>
            </div>
        )}

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-5 py-2 bg-gray-600 hover:bg-gray-500 rounded font-medium transition-colors">Cancelar</button>
          <button onClick={handleSubmit} className="px-5 py-2 bg-blue-600 hover:bg-blue-700 rounded font-medium transition-colors">Salvar Inspeção</button>
        </div>
      </div>
    </div>
  );
};

export default InspecaoModal;