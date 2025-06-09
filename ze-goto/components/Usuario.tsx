"use client"

import { useEffect, useState } from 'react';
import ApiPython from '@/service/ApiPython';
import ModalGenerico from '@/components/ModalGenerico';

interface Usuario {
  id_usuario?: number;
  nome: string;
  senha: string;
  ultimo_login: string;
  cargo: string;
}

export default function Usuario() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [registroSelecionado, setRegistroSelecionado] = useState<Usuario | null>(null);

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const response = await ApiPython.get('/usuario');
      setUsuarios(response.data);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  };

  const criarUsuario = async (novo: Usuario) => {
    try {
      await ApiPython.post('/usuario', novo);
      fetchUsuarios();
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
    }
  };

  const editarUsuario = async (id: number, atualizado: Usuario) => {
    try {
      await ApiPython.put(`/usuario/${id}`, atualizado);
      fetchUsuarios();
    } catch (error) {
      console.error('Erro ao editar usuário:', error);
    }
  };

  const deletarUsuario = async (id: number) => {
    try {
      await ApiPython.delete(`/usuario/${id}`);
      fetchUsuarios();
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
    }
  };

  return (
    <div className="space-y-4">
      <button
        onClick={() => {
          setModoEdicao(false);
          setRegistroSelecionado(null);
          setModalAberto(true);
        }}
        className="bg-blue-700 text-white px-4 py-2 rounded shadow hover:bg-blue-600 mb-2"
      >
        Adicionar Usuário
      </button>

      {usuarios.map((u) => (
        <div key={u.id_usuario} className="bg-neutral-900 p-4 rounded-lg shadow-md text-white">
          <h3 className="font-bold text-blue-200">{u.nome}</h3>
          <p className="text-sm">🔐 Senha: {'•'.repeat(u.senha.length)}</p>
          <p className="text-sm">🛡️ Cargo: {u.cargo}</p>
          <p className="text-sm">🕒 Último login: {u.ultimo_login}</p>
          <div className="flex gap-3 mt-2">
            <button
              onClick={() => {
                setModoEdicao(true);
                setRegistroSelecionado(u);
                setModalAberto(true);
              }}
              className="text-blue-400 underline text-sm"
            >
              Editar
            </button>
            <button
              onClick={() => deletarUsuario(u.id_usuario!)}
              className="text-red-400 underline text-sm"
            >
              Excluir
            </button>
          </div>
        </div>
      ))}

      <ModalGenerico
        isOpen={modalAberto}
        onClose={() => setModalAberto(false)}
        onSave={(data: Usuario) => {
          modoEdicao && registroSelecionado?.id_usuario
            ? editarUsuario(registroSelecionado.id_usuario, data)
            : criarUsuario(data);
          setModalAberto(false);
        }}
        dadosIniciais={registroSelecionado || undefined}
        titulo={modoEdicao ? "Editar Usuário" : "Novo Usuário"}
        campos={['nome', 'senha', 'ultimo_login', 'cargo']}
      />
    </div>
  );
}