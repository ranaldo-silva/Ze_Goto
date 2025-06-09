import React, { useState, useEffect } from 'react';
import { Alert } from '@/types';
import { XMarkIcon } from '@heroicons/react/24/solid';

interface AlertManagerModalProps {
  alert: Alert;
  onClose: () => void;
}

const AlertManagerModal: React.FC<AlertManagerModalProps> = ({ alert, onClose }) => {
  const [tipoEquipe, setTipoEquipe] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [acaoSelecionada, setAcaoSelecionada] = useState<'chamar' | 'resolvido' | 'escalar'>('chamar');
  const [historico, setHistorico] = useState<string[]>([]);

  useEffect(() => {
    const data = localStorage.getItem(`alerta_historico_${alert.id}`);
    if (data) setHistorico(JSON.parse(data));
  }, [alert.id]);

  const salvarHistorico = (acao: string) => {
    const novaAcao = `${new Date().toLocaleString()} - ${acao}`;
    const novoHistorico = [novaAcao, ...historico];
    setHistorico(novoHistorico);
    localStorage.setItem(`alerta_historico_${alert.id}`, JSON.stringify(novoHistorico));
  };

  const handleChamarEquipe = () => {
    if (!tipoEquipe) return alert('Selecione um tipo de equipe.');
    salvarHistorico(`Equipe de manutenção chamada (${tipoEquipe}). Obs: ${observacoes}`);
    setTipoEquipe(''); 
    setObservacoes('');
  };

  const handleMarcarResolvido = () => salvarHistorico('Alerta marcado como resolvido.');
  const handleEscalarAlerta = () => salvarHistorico('Alerta escalado para nível superior.');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
      <div className="bg-slate-800 text-white w-full max-w-2xl rounded-lg shadow-xl p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
          <XMarkIcon className="h-6 w-6" />
        </button>

        <h2 className="text-xl font-bold mb-2">Gerenciar Alerta #{alert.id}</h2>
        <p className="text-sm text-gray-400 mb-4">Robô: {alert.robot} | Local: {alert.location}</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          <button onClick={() => setAcaoSelecionada('chamar')} className={`py-2 px-4 rounded ${acaoSelecionada === 'chamar' ? 'bg-blue-700' : 'bg-slate-700'} hover:bg-blue-600`}>Chamar Equipe</button>
          <button onClick={() => { setAcaoSelecionada('resolvido'); handleMarcarResolvido(); }} className="py-2 px-4 rounded bg-green-700 hover:bg-green-600">Marcar Resolvido</button>
          <button onClick={() => { setAcaoSelecionada('escalar'); handleEscalarAlerta(); }} className="py-2 px-4 rounded bg-yellow-600 hover:bg-yellow-500">Escalar Alerta</button>
        </div>

        {acaoSelecionada === 'chamar' && (
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Chamar Equipe de Manutenção</h3>
            <select
              value={tipoEquipe}
              onChange={(e) => setTipoEquipe(e.target.value)}
              className="w-full p-2.5 mb-3 bg-slate-700 text-white border border-slate-600 rounded"
            >
              <option value="">Selecione o tipo de equipe</option>
              <option value="elétrica">Equipe Elétrica</option>
              <option value="hidraulica">Equipe Hidraúlica</option>
              <option value="estrutura">Equipe Estrutural</option>
              <option value="emergencia">Emergência</option>
            </select>
            <textarea
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
              className="w-full p-2.5 bg-slate-700 text-white border border-slate-600 rounded"
              placeholder="Adicione informações adicionais para a equipe..."
              rows={3}
            />
            <div className="mt-3 flex gap-3">
              <button onClick={handleChamarEquipe} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded">Chamar Equipe</button>
              <button onClick={onClose} className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded">Cancelar</button>
            </div>
          </div>
        )}

        <div>
          <h3 className="font-semibold mb-2">Histórico de Ações</h3>
          <ul className="text-sm text-gray-300 space-y-1 max-h-40 overflow-y-auto">
            {historico.map((item, idx) => (
              <li key={idx} className="bg-slate-700 p-2 rounded">{item}</li>
            ))}
            {historico.length === 0 && <li className="text-gray-500">Nenhuma ação registrada.</li>}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AlertManagerModal;
