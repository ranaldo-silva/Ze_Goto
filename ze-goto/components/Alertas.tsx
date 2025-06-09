"use client"

import { useEffect, useState } from 'react';
import ApiJava from '@/service/ApiJava';
import ModalGenerico from '@/components/ModalGenerico';

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

export default function Alertas() {
  const [alertas, setAlertas] = useState<Alerta[]>([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [registroEditando, setRegistroEditando] = useState<Alerta | null>(null);

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

  const criarAlerta = async (novoAlerta: Alerta) => {
    try {
      await ApiJava.post('/alertas', novoAlerta);
      fetchAlertas();
    } catch (error) {
      console.error('Erro ao criar alerta:', error);
    }
  };

  const editarAlerta = async (id: number, alertaAtualizado: Alerta) => {
    try {
      await ApiJava.put(`/alertas/${id}`, alertaAtualizado);
      fetchAlertas();
    } catch (error) {
      console.error('Erro ao editar alerta:', error);
    }
  };

  const deletarAlerta = async (id: number) => {
    try {
      await ApiJava.delete(`/alertas/${id}`);
      fetchAlertas();
    } catch (error) {
      console.error('Erro ao deletar alerta:', error);
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
      <button
        onClick={() => setModalAberto(true)}
        className="bg-blue-700 text-white px-4 py-2 rounded mb-2 self-start"
      >
        Adicionar Novo
      </button>

      {alertas.map((alerta) => (
        <div
          key={alerta.id_alerta}
          className={`p-2 rounded text-sm bg-neutral-900 text-white shadow-md ${getBordaPorGravidade(alerta.gravidade_alerta)}`}
        >
          <strong>{alerta.tipo_alerta}</strong>
          <p className="text-xs">{alerta.localizacao} - {alerta.horario}</p>
          <p className="text-xs italic text-gray-300">{alerta.descricao}</p>
          <div className="flex gap-2 mt-1">
            <button
              onClick={() => {
                setRegistroEditando(alerta);
                setModalAberto(true);
              }}
              className="text-sm text-white underline"
            >
              Editar
            </button>
            <button
              onClick={() => deletarAlerta(alerta.id_alerta!)}
              className="text-sm text-red-200 underline"
            >
              Excluir
            </button>
          </div>
        </div>
      ))}

      <ModalGenerico
        isOpen={modalAberto}
        onClose={() => {
          setModalAberto(false);
          setRegistroEditando(null);
        }}
        onSave={(dados) => {
          registroEditando
            ? editarAlerta(registroEditando.id_alerta!, dados)
            : criarAlerta(dados);
        }}
        dadosIniciais={registroEditando || undefined}
        titulo={registroEditando ? 'Editar Alerta' : 'Novo Alerta'}
        campos={['tipo_alerta', 'gravidade_alerta', 'localizacao', 'horario', 'descricao', 't_ufs_robos_id_robo', 't_ufs_usuario_id_usuario']}
      />
    </div>
  );
}
