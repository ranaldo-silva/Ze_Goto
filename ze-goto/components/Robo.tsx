"use client"

import { useEffect, useState } from 'react';
import ApiJava from '@/services/ApiJava';
import ModalGenerico from '@/components/ModalGenerico';

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

export default function Robo() {
  const [robos, setRobos] = useState<Robo[]>([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [registroSelecionado, setRegistroSelecionado] = useState<Robo | null>(null);

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

  const criarRobo = async (novo: Robo) => {
    try {
      await ApiJava.post('/robo', novo);
      fetchRobos();
    } catch (error) {
      console.error('Erro ao criar robô:', error);
    }
  };

  const editarRobo = async (id: number, atualizado: Robo) => {
    try {
      await ApiJava.put(`/robo/${id}`, atualizado);
      fetchRobos();
    } catch (error) {
      console.error('Erro ao editar robô:', error);
    }
  };

  const deletarRobo = async (id: number) => {
    try {
      await ApiJava.delete(`/robo/${id}`);
      fetchRobos();
    } catch (error) {
      console.error('Erro ao deletar robô:', error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <button
        onClick={() => {
          setModoEdicao(false);
          setRegistroSelecionado(null);
          setModalAberto(true);
        }}
        className="bg-blue-700 text-white px-4 py-2 rounded shadow hover:bg-blue-600 col-span-full mb-2"
      >
        Adicionar Robô
      </button>

      {robos.map((r) => (
        <div key={r.id_robo} className="bg-neutral-900 text-white p-4 rounded-lg shadow-md border-l-4 border-blue-500">
          <h3 className="text-lg font-bold text-blue-200">🤖 {r.nome}</h3>
          <p className="text-sm">📍 <strong>Localização:</strong> {r.localizacao}</p>
          <p className="text-sm">🔋 <strong>Bateria:</strong> {r.bateria}</p>
          <p className="text-sm">📶 <strong>Sinal:</strong> {r.sinal}</p>
          <p className="text-sm">📊 <strong>Status:</strong> {r.status}</p>
          <p className="text-sm">🕒 <strong>Última atualização:</strong> {r.ultima_atualizacao}</p>
          <div className="flex gap-3 mt-2">
            <button
              onClick={() => {
                setModoEdicao(true);
                setRegistroSelecionado(r);
                setModalAberto(true);
              }}
              className="text-blue-300 underline text-sm"
            >
              Editar
            </button>
            <button
              onClick={() => deletarRobo(r.id_robo!)}
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
        onSave={(data: Robo) => {
          modoEdicao && registroSelecionado?.id_robo
            ? editarRobo(registroSelecionado.id_robo, data)
            : criarRobo(data);
          setModalAberto(false);
        }}
        dadosIniciais={registroSelecionado || undefined}
        titulo={modoEdicao ? "Editar Robô" : "Novo Robô"}
        campos={[
          'nome',
          'localizacao',
          'status',
          'bateria',
          'sinal',
          'ultima_atualizacao',
          't_ufs_status_dashboard_id_status'
        ]}
      />
    </div>
  );
}