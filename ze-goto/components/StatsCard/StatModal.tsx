import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface StatModalProps {
  title: string;
  onClose: () => void;
}

const contentByStat: Record<string, string[]> = {
  'Robôs Ativos': ['ZG-001 - Galeria Ibirapuera', 'ZG-003 - Galeria Anhangabaú'],
  'Galerias Monitoradas': ['Anhangabaú', 'Ibirapuera', 'Vila Madalena'],
  'Alertas Ativos': ['3 em análise', '2 críticos', '3 aguardando resposta'],
  'Inspeções Hoje': ['ZG-001 (09h00)', 'ZG-003 (10h30)', 'ZG-007 (13h00)'],
};

const StatModal: React.FC<StatModalProps> = ({ title, onClose }) => {
  const content = contentByStat[title] || ['Sem dados disponíveis'];

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
      <div className="bg-slate-800 text-white w-full max-w-md rounded-xl shadow-2xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        <h2 className="text-xl font-bold mb-4">{title}</h2>

        <ul className="list-disc list-inside text-sm space-y-1">
          {content.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StatModal;
