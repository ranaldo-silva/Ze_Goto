"use client";

import { useState } from "react";

interface ModalLoginProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (nome: string, senha: string) => void;
}

export default function ModalLogin({ isOpen, onClose, onLogin }: ModalLoginProps) {
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-neutral-900 text-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>

        <div className="mb-4">
          <label className="block text-sm mb-1">Nome de usuário</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full p-2 rounded bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1">Senha</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full p-2 rounded bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-between">
          <button
            onClick={() => onLogin(nome, senha)}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded font-semibold"
          >
            Entrar
          </button>

          <button
            onClick={onClose}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded font-semibold"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
