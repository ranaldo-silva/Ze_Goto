"use client"

import { useEffect, useState } from 'react';
import ApiJava from '@/services/ApiJava';

interface StatusDashboard {
  robos_ativos: number;
  galerias_monitoradas: number;
  alertas_ativos: number;
  inspecoes_hoje: number;
  ultima_atualizacao: string;
}

export default function Status() {
  const [status, setStatus] = useState<StatusDashboard | null>(null);

  useEffect(() => {
    ApiJava.get('/status/1')
      .then((res) => setStatus(res.data))
      .catch((err) => console.error('Erro ao carregar status:', err));
  }, []);

  if (!status) {
    return <p className="text-sm italic text-gray-400">Carregando status...</p>;
  }

  return (
    <div className="flex gap-2 text-sm text-blue-200 items-center">
      <p><span className="text-pink-400">🤖</span> Robôs ativos: {status.robos_ativos}</p>
      <p><span className="text-sky-400">🌐</span> Galerias monitoradas: {status.galerias_monitoradas}</p>
      <p><span className="text-red-400">🚨</span> Alertas ativos: {status.alertas_ativos}</p>
      <p><span className="text-yellow-400">🧪</span> Inspeções hoje: {status.inspecoes_hoje}</p>
      <p className="italic text-xs">Última atualização: {status.ultima_atualizacao}</p>
    </div>
  );
}
