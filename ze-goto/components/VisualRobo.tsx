"use client"

import { useEffect, useState } from 'react';
import ApiJava from '@/service/ApiJava';

interface Robo {
  id_robo?: number;
  nome: string;
  localizacao: string;
  status: string;
  bateria: string;
  sinal: string;
  ultima_atualizacao: string;
  t_ufs_status_dashboard_id_status: number;
}

export default function VisualRobo() {
  const [robos, setRobos] = useState<Robo[]>([]);

  useEffect(() => {
    fetchRobos();
  }, []);

  const fetchRobos = async () => {
    try {
      const response = await ApiJava.get('/robo');
      setRobos(response.data);
    } catch (error) {
      console.error('Erro ao buscar robôs:', error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {robos.map((r) => (
        <div key={r.id_robo} className="bg-neutral-900 text-white p-4 rounded-lg shadow-md border-l-4 border-blue-500">
          <h3 className="text-lg font-bold text-blue-200">🤖 {r.nome}</h3>
          <p className="text-sm">📍 <strong>Localização:</strong> {r.localizacao}</p>
          <p className="text-sm">🔋 <strong>Bateria:</strong> {r.bateria}</p>
          <p className="text-sm">📶 <strong>Sinal:</strong> {r.sinal}</p>
          <p className="text-sm">📊 <strong>Status:</strong> {r.status}</p>
          <p className="text-sm">🕒 <strong>Última atualização:</strong> {r.ultima_atualizacao}</p>
        </div>
      ))}
    </div>
  );
}
