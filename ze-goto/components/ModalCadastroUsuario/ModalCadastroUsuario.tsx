// components/ModalCadastroUsuario/ModalCadastroUsuario.tsx
"use client";

import { useState } from "react";
import type { User } from '@/types';

interface ModalCadastroUsuarioProps {
  onClose: () => void;
  onFormSubmitSuccess: (user: User) => void;
  editingUser?: User | null;
}

const ModalCadastroUsuario: React.FC<ModalCadastroUsuarioProps> = ({ onClose, onFormSubmitSuccess, editingUser }) => {
  const [name, setName] = useState(editingUser?.name || "");
  const [email, setEmail] = useState(editingUser?.email || "");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<User["role"]>(editingUser?.role || "operador");
  const [error, setError] = useState("");

  const isEditando = Boolean(editingUser);

  const loadUsers = (): User[] => {
    if (typeof window !== 'undefined') {
        const usersJson = localStorage.getItem("users");
        return usersJson ? JSON.parse(usersJson) : [];
    }
    return [];
  };

  const saveUsers = (users: User[]) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem("users", JSON.stringify(users));
    }
  };

  const handleSubmit = () => {
    if (!name || !email || (!isEditando && !password)) {
      setError("Preencha todos os campos obrigatórios.");
      return;
    }

    const users = loadUsers();
    const emailAlreadyUsed = users.find(u => u.email === email && (!isEditando || u.email !== editingUser?.email));
    if (emailAlreadyUsed) {
      setError("Este email já está em uso.");
      return;
    }

    let updatedUsers;
    let finalUser: User = {
      name, email, password: password || editingUser?.password || '', role,
      id: 0
    };

    if (isEditando) {
      updatedUsers = users.map(u => u.email === editingUser?.email ? finalUser : u);
    } else {
      updatedUsers = [...users, finalUser];
    }

    saveUsers(updatedUsers);
    onFormSubmitSuccess(finalUser);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
      <div className="bg-slate-800 text-white w-full max-w-md rounded-lg shadow-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">{isEditando ? 'Editar Usuário' : 'Cadastrar Novo Usuário'}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-red-400 text-2xl leading-none">×</button>
        </div>

        <input
          className="w-full mb-3 p-2.5 bg-slate-700 text-white border border-slate-600 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Nome Completo"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          className="w-full mb-3 p-2.5 bg-slate-700 text-white border border-slate-600 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          disabled={isEditando}
        />
        <input
          className="w-full mb-3 p-2.5 bg-slate-700 text-white border border-slate-600 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Senha"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <select
          className="w-full mb-4 p-2.5 bg-slate-700 text-white border border-slate-600 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          value={role}
          onChange={e => setRole(e.target.value as User["role"])}
        >
          <option value="operador">Operador</option>
          <option value="supervisor">Supervisor</option>
        </select>

        {error && <p className="text-red-400 text-sm mb-4 text-center">{error}</p>}

        <div className="flex justify-end gap-3">
            <button 
                onClick={onClose} 
                className="px-5 py-2 bg-gray-600 hover:bg-gray-500 rounded font-medium transition-colors"
            >
                Cancelar
            </button>
            <button
                onClick={handleSubmit}
                className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded font-medium transition-colors"
            >
                {isEditando ? 'Atualizar' : 'Cadastrar Usuário'}
            </button>
        </div>
      </div>
    </div>
  );
};

export default ModalCadastroUsuario;
