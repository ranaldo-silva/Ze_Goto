// components/UserManagementModal/UserManagementModal.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { UserPlusIcon, TrashIcon, PencilSquareIcon } from '@heroicons/react/24/solid'; // Adicionamos PencilSquareIcon para o futuro
import type { User } from '@/types';

interface UserManagementModalProps {
  onClose: () => void;
  onAddNewUser: () => void; // Função para chamar a abertura do modal de cadastro
  // Vamos adicionar uma prop para o usuário logado, para evitar que ele se autoexclua ou ao último supervisor
  loggedInUser: User | null;
}

const UserManagementModal: React.FC<UserManagementModalProps> = ({ onClose, onAddNewUser, loggedInUser }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string>('');

  const loadUsersFromStorage = (): User[] => {
    if (typeof window !== 'undefined') {
      const usersJson = localStorage.getItem("users");
      return usersJson ? JSON.parse(usersJson) : [];
    }
    return [];
  };

  useEffect(() => {
    setUsers(loadUsersFromStorage());
  }, []);

  const handleDeleteUser = (emailToDelete: string) => {
    if (!loggedInUser) {
      setError("Erro: Usuário logado não identificado.");
      return;
    }

    if (loggedInUser.email === emailToDelete) {
      alert("Você não pode excluir sua própria conta.");
      return;
    }

    const usersFromStorage = loadUsersFromStorage();
    const userToDelete = usersFromStorage.find(user => user.email === emailToDelete);

    if (!userToDelete) {
      alert("Usuário não encontrado para exclusão.");
      return;
    }
    
    // Lógica para impedir exclusão do último supervisor
    const supervisors = usersFromStorage.filter(user => user.role === 'supervisor');
    if (userToDelete.role === 'supervisor' && supervisors.length <= 1) {
      alert("Não é possível excluir o único supervisor do sistema.");
      return;
    }

    if (window.confirm(`Tem certeza que deseja excluir o usuário ${userToDelete.name} (${userToDelete.email})? Esta ação não pode ser desfeita.`)) {
      const updatedUsers = usersFromStorage.filter(user => user.email !== emailToDelete);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      setUsers(updatedUsers); // Atualiza a lista na tela
      alert("Usuário excluído com sucesso!");
    }
  };

  // Placeholder para a função de edição que implementaremos depois
  const handleEditUser = (userToEdit: User) => {
    alert(`Funcionalidade de editar usuário ${userToEdit.name} ainda não implementada.`);
    // Aqui chamaremos um modal de edição
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-slate-800 text-white w-full max-w-3xl rounded-xl shadow-2xl flex flex-col" style={{maxHeight: '90vh'}}>
        <div className="flex justify-between items-center p-6 border-b border-slate-700 sticky top-0 bg-slate-800 rounded-t-xl">
          <h2 className="text-2xl font-semibold text-white">Gerenciar Usuários</h2>
          <button 
            onClick={onClose} 
            className="text-slate-400 hover:text-red-500 transition-colors text-2xl leading-none"
            aria-label="Fechar modal"
          >
            ×
          </button>
        </div>

        <div className="p-6 flex-grow overflow-y-auto">
          {error && <p className="text-red-500 bg-red-900/30 p-3 rounded-md mb-4 text-sm">{error}</p>}
          
          <div className="mb-6 flex justify-end">
            <button
              onClick={onAddNewUser}
              className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg flex items-center transition-colors shadow-md hover:shadow-lg"
            >
              <UserPlusIcon className="h-5 w-5 mr-2" />
              Novo Usuário
            </button>
          </div>

          {users.length === 0 ? (
            <p className="text-slate-400 text-center py-8">Nenhum usuário cadastrado.</p>
          ) : (
            <div className="space-y-3">
              {users.map((user) => (
                <div key={user.email} className="bg-slate-700/50 p-4 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div>
                    <p className="text-lg font-semibold text-white">{user.name}</p>
                    <p className="text-sm text-slate-300">{user.email}</p>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full mt-1 inline-block ${
                      user.role === 'supervisor' ? 'bg-green-600 text-green-100' : 'bg-sky-600 text-sky-100'
                    }`}>
                      {user.role === 'supervisor' ? 'Supervisor' : 'Operador'}
                    </span>
                  </div>
                  <div className="flex gap-2 mt-2 sm:mt-0 flex-shrink-0">
                    <button 
                      onClick={() => handleEditUser(user)}
                      className="p-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md text-xs font-medium flex items-center"
                      title="Editar Usuário"
                    >
                      <PencilSquareIcon className="h-4 w-4 sm:mr-1" /> <span className="hidden sm:inline">Editar</span>
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.email)}
                      className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-xs font-medium flex items-center"
                      title="Excluir Usuário"
                    >
                      <TrashIcon className="h-4 w-4 sm:mr-1" /> <span className="hidden sm:inline">Excluir</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
         
        <div className="p-6 border-t border-slate-700 sticky bottom-0 bg-slate-800 rounded-b-xl flex justify-end">
          <button 
            onClick={onClose} 
            className="px-6 py-2.5 bg-slate-600 hover:bg-slate-500 text-white rounded-lg font-medium transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserManagementModal;