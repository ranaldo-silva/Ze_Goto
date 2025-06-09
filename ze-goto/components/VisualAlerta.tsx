"use client"

import { useEffect, useState } from 'react';
import ApiJava from '@/services/ApiJava';

interface Alerta {
  id_alerta?: number;
  tipo_alerta: string;
  gravidade_alerta: string;
  localizacao: string;
  horario: string;
  descricao: string;
  t_ufs_robos_id_robo: number;
  t_ufs_usuario_id_usuario: number;
}

export default function VisualAlertas() {
  const [alertas, setAlertas] = useState<Alerta[]>([]);

  useEffect(() => {
    fetchAlertas();
  }, []);

  const fetchAlertas = async () => {
    try {
      const response = await ApiJava.get('/alertas');
      setAlertas(response.data);
    } catch (error) {
      console.error('Erro ao buscar alertas:', error);
    }
  };

  const getBordaPorGravidade = (gravidade: string) => {
    switch (gravidade.toLowerCase()) {
      case 'baixa':
        return 'border-l-4 border-green-500';
      case 'media':
        return 'border-l-4 border-yellow-400';
      case 'alta':
        return 'border-l-4 border-red-600';
      default:
        return 'border-l-4 border-orange-400';
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {alertas.map((alerta) => (
        <div
          key={alerta.id_alerta}
          className={`p-2 rounded text-sm bg-neutral-900 text-white shadow-md ${getBordaPorGravidade(alerta.gravidade_alerta)}`}
        >
          <strong>{alerta.tipo_alerta}</strong>
          <p className="text-xs">{alerta.localizacao} - {alerta.horario}</p>
          <p className="text-xs italic text-gray-300">{alerta.descricao}</p>
        </div>
      ))}
    </div>
  );
}
