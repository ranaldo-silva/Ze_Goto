"use client"

import { useEffect, useState } from 'react';
import ApiJava from '@/services/ApiJava';

interface Inspecao {
  id_inspecao?: number;
  data_hora: string;
  longitude: string;
  latitude: string;
  nivel_entulho: string;
  alerta_gerado: string;
  foto_url: string;
  t_ufs_robos_id_robo: number;
  t_ufs_usuario_id_usuario: number;
}

export default function VisualInspecoes() {
  const [inspecoes, setInspecoes] = useState<Inspecao[]>([]);

  useEffect(() => {
    fetchInspecoes();
  }, []);

  const fetchInspecoes = async () => {
    try {
      const response = await ApiJava.get('/inspecao');
      setInspecoes(response.data);
    } catch (error) {
      console.error('Erro ao buscar inspeções:', error);
    }
  };

  return (
    <div className="space-y-4">
      {inspecoes.map((item) => (
        <div key={item.id_inspecao} className="bg-neutral-900 text-white p-4 rounded-lg shadow-md border-l-4 border-blue-500">
          <div className="text-sm mb-1">
            📍 <strong>Coordenadas:</strong> {item.latitude}, {item.longitude}
          </div>
          <div className="text-sm">
            🕒 <strong>Data/Hora:</strong> {item.data_hora}
          </div>
          <div className="text-sm">
            🧱 <strong>Nível de Entulho:</strong> {item.nivel_entulho}
          </div>
          <div className="text-sm">
            🚨 <strong>Alerta Gerado:</strong> {item.alerta_gerado}
          </div>
        </div>
      ))}
    </div>
  );
}
