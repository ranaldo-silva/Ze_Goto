"use client";

import React from 'react';
import {
  ShieldCheckIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  PlusCircleIcon,
  // O ícone UsersIcon não é mais necessário
  // UsersIcon, 
  Cog6ToothIcon
} from '@heroicons/react/24/outline';
import type { User } from '@/types';

interface DashboardHeaderProps {
  currentUser: User | null;
  onLogout: () => void;
  onOpenLoginModal: () => void;
  onOpenInspecaoModal: () => void;
  // A prop onAbrirUserManagementModal foi removida
  onOpenAdminPanel: () => void; // A prop para abrir o painel admin agora é principal
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  currentUser,
  onLogout,
  onOpenLoginModal,
  onOpenInspecaoModal,
  onOpenAdminPanel // Usando a prop do AdminPanel
}) => {
  return (
    <header className="bg-slate-800/70 backdrop-blur-lg border-b border-slate-700/50 py-4 px-6 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center space-x-3">
        <ShieldCheckIcon className="h-8 w-8 text-blue-400" />
        <h1 className="text-2xl font-bold text-white">Zé Goto</h1>
        <p className="text-sm text-gray-400 hidden md:block">Guardião Subterrâneo de São Paulo</p>
      </div>

      <div className="flex items-center space-x-4 md:space-x-5">
        <div className="flex items-center text-green-400">
          <span className="h-2.5 w-2.5 rounded-full bg-green-400 mr-2 animate-pulse"></span>
          <span className="text-sm">Sistema Online</span>
        </div>

        {currentUser ? (
          <>
            {/* O BOTÃO "USUÁRIOS" QUE ESTAVA AQUI FOI REMOVIDO. */}

            {currentUser.role === 'operador' && (
              <button
                onClick={onOpenInspecaoModal}
                className="flex items-center text-gray-300 hover:text-white transition-colors p-1.5 rounded-md hover:bg-slate-700"
                title="Inspecionar"
              >
                <PlusCircleIcon className="h-6 w-6" />
                <span className="ml-1 hidden lg:inline text-sm">Inspecionar</span>
              </button>
            )}
            
            {/* O BOTÃO "ADMIN" FOI MANTIDO AQUI. */}
            {(currentUser.role === 'supervisor' || currentUser.role === 'admin') && (
              <button
                onClick={onOpenAdminPanel}
                className="flex items-center text-gray-300 hover:text-white transition-colors p-1.5 rounded-md hover:bg-slate-700"
                title="Painel Admin"
              >
                <Cog6ToothIcon className="h-6 w-6" />
                <span className="ml-1 hidden lg:inline text-sm">Admin</span>
              </button>
            )}

            <div className="relative group">
              <UserCircleIcon className="h-8 w-8 text-gray-300 cursor-pointer hover:text-white transition-colors" />
              <div className="absolute right-0 mt-2 w-56 bg-slate-700 rounded-md shadow-xl py-2 z-20 hidden group-hover:block ring-1 ring-slate-600">
                <div className="px-4 py-2 border-b border-slate-600">
                  <p className="text-sm font-semibold text-white truncate">{currentUser.name}</p>
                  <p className="text-xs text-gray-400">{currentUser.email}</p>
                  <p className="text-xs text-blue-400 capitalize mt-1">{currentUser.role}</p>
                </div>
                <button
                  onClick={onLogout}
                  className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-slate-600 hover:text-red-400 transition-colors"
                >
                  <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2" />
                  Logout
                </button>
              </div>
            </div>
          </>
        ) : (
          <button
            onClick={onOpenLoginModal}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-semibold transition-colors"
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
};

export default DashboardHeader;