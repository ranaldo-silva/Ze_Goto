// components/LoginModal/LoginModal.tsx
"use client";

import { useState } from 'react';
import { User } from '@/types';

interface LoginModalProps {
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem('users') || '[]') as User[];
    const matched = users.find(
      (u) => u.email === email.trim() && u.password === password.trim()
    );

    if (matched) {
      localStorage.setItem('loggedUser', JSON.stringify(matched));
      onLoginSuccess(matched);
      onClose();
    } else {
      setError('Credenciais inválidas.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-slate-900 rounded-lg p-6 w-full max-w-md shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white text-xl hover:text-red-400"
        >
          ×
        </button>

        <h2 className="text-2xl font-bold text-white mb-4">Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 p-2 bg-slate-800 text-white border border-slate-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 bg-slate-800 text-white border border-slate-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <button
          onClick={handleLogin}
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold"
        >
          Entrar
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
