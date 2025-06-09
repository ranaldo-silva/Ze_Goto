"use client"

import { useEffect, useState } from 'react';
import ApiJava from '@/service/ApiJava';
import ModalGenerico from '@/components/ModalGenerico';

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

export default function Inspecoes() {
  const [inspecoes, setInspecoes] = useState<Inspecao[]>([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [selecionado, setSelecionado] = useState<Inspecao | null>(null);

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

  const criarInspecao = async (nova: Inspecao) => {
    try {
      await ApiJava.post('/inspecao', nova);
      fetchInspecoes();
    } catch (error) {
      console.error('Erro ao criar inspeção:', error);
    }
  };

  const editarInspecao = async (id: number, atualizada: Inspecao) => {
    try {
      await ApiJava.put(`/inspecao/${id}`, atualizada);
      fetchInspecoes();
    } catch (error) {
      console.error('Erro ao editar inspeção:', error);
    }
  };

  const deletarInspecao = async (id: number) => {
    try {
      await ApiJava.delete(`/inspecao/${id}`);
      fetchInspecoes();
    } catch (error) {
      console.error('Erro ao deletar inspeção:', error);
    }
  };

  return (
    <div className="space-y-4">
      <button
        onClick={() => {
          setModoEdicao(false);
          setSelecionado(null);
          setModalAberto(true);
        }}
        className="bg-blue-700 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
      >
        Adicionar Nova Inspeção
      </button>

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
          <div className="flex gap-3 mt-2">
            <button
              onClick={() => {
                setModoEdicao(true);
                setSelecionado(item);
                setModalAberto(true);
              }}
              className="text-blue-300 underline text-sm"
            >
              Editar
            </button>
            <button
              onClick={() => deletarInspecao(item.id_inspecao!)}
              className="text-red-300 underline text-sm"
            >
              Excluir
            </button>
          </div>
        </div>
      ))}
      <ModalGenerico
        isOpen={modalAberto}
        onClose={() => setModalAberto(false)}
        onSave={(data: Inspecao) => {
          modoEdicao && selecionado?.id_inspecao
          ? editarInspecao(selecionado.id_inspecao, data)
          : criarInspecao(data);
          setModalAberto(false);
        }}
        dadosIniciais={selecionado || undefined}
        titulo={modoEdicao ? "Editar Inspeção" : "Nova Inspeção"}
        campos={[
        'data_hora',
        'longitude',
        'latitude',
        'nivel_entulho',
        'alerta_gerado',
        't_ufs_robos_id_robo',
        't_ufs_usuario_id_usuario',
        ]}
      />
    </div>
  );
}
