// components/AdminPanel/AdminPanel.tsx
"use client";

import React, { useState, useEffect } from 'react';
import type { User, Alert, Robot } from '@/types';
import { UserIcon, ExclamationTriangleIcon, CpuChipIcon, MapPinIcon, XMarkIcon } from '@heroicons/react/24/solid';

// Definindo um tipo simples para Galerias
interface Gallery {
  id: number;
  name: string;
}

const AdminPanel: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'users' | 'alerts' | 'robots' | 'galleries'>('users');

  // Estados para cada CRUD
  const [users, setUsers] = useState<User[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [robots, setRobots] = useState<Robot[]>([]);
  const [galleries, setGalleries] = useState<Gallery[]>([]);

  // Estados dos formulários
  const [userForm, setUserForm] = useState<Omit<User, 'id'>>({ name: '', email: '', password: '', role: 'operador' });
  const [alertForm, setAlertForm] = useState<Omit<Alert, 'id' | 'time'>>({ type: 'Outros', location: '', robot: '', severity: 'low', description: '' });
  const [robotForm, setRobotForm] = useState<Omit<Robot, 'lastUpdate'>>({ id: '', name: '', location: '', status: 'active', battery: 100, signal: 100 });
  const [galleryForm, setGalleryForm] = useState({ name: '' });

  // Estados para edição
  const [editingId, setEditingId] = useState<number | string | null>(null);

  // Carregar dados do LocalStorage na montagem
  useEffect(() => {
    const loadData = () => {
      setUsers(JSON.parse(localStorage.getItem('users') || '[]'));
      setAlerts(JSON.parse(localStorage.getItem('alerts') || '[]'));
      setRobots(JSON.parse(localStorage.getItem('activeRobots') || '[]'));
      setGalleries(JSON.parse(localStorage.getItem('galleries') || '[]'));
    };
    loadData();
  }, []);

  // --- Funções CRUD Genéricas ---
  const saveData = <T,>(key: string, data: T[]) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  // --- CRUD de Usuários ---
  const handleUserSubmit = () => {
    if (!userForm.name || !userForm.email || (!editingId && !userForm.password)) {
      alert("Preencha todos os campos de usuário.");
      return;
    }
    const newUsers = [...users];
    if (editingId) {
      const index = newUsers.findIndex(u => u.id === editingId);
      newUsers[index] = { ...newUsers[index], ...userForm };
    } else {
      newUsers.push({ id: Date.now(), ...userForm });
    }
    saveData('users', newUsers);
    setUsers(newUsers);
    setUserForm({ name: '', email: '', password: '', role: 'operador' });
    setEditingId(null);
  };
  const handleUserDelete = (id: number) => {
    const newUsers = users.filter(u => u.id !== id);
    saveData('users', newUsers);
    setUsers(newUsers);
  };
  const handleUserEdit = (user: User) => {
    setEditingId(user.id);
    setUserForm(user);
    setActiveTab('users');
  };

  // --- CRUD de Alertas ---
  const handleAlertSubmit = () => {
    const newAlerts = [...alerts];
    if (editingId) {
        const index = newAlerts.findIndex(a => a.id === editingId);
        newAlerts[index] = { ...newAlerts[index], ...alertForm };
    } else {
        newAlerts.push({ id: Date.now(), time: new Date().toLocaleTimeString(), ...alertForm });
    }
    saveData('alerts', newAlerts);
    setAlerts(newAlerts);
    setAlertForm({ type: 'Outros', location: '', robot: '', severity: 'low', description: '' });
    setEditingId(null);
  };
   const handleAlertDelete = (id: number) => {
    const newAlerts = alerts.filter(a => a.id !== id);
    saveData('alerts', newAlerts);
    setAlerts(newAlerts);
  };
  const handleAlertEdit = (alert: Alert) => {
    setEditingId(alert.id);
    setAlertForm(alert);
    setActiveTab('alerts');
  };

   // --- CRUD de Robôs ---
    const handleRobotSubmit = () => {
        const newRobots = [...robots];
        if (editingId) {
            const index = newRobots.findIndex(r => r.id === editingId);
            newRobots[index] = { ...newRobots[index], ...robotForm };
        } else {
            newRobots.push({ lastUpdate: 'agora', ...robotForm });
        }
        saveData('activeRobots', newRobots);
        setRobots(newRobots);
        setRobotForm({ id: '', name: '', location: '', status: 'active', battery: 100, signal: 100 });
        setEditingId(null);
    };
    const handleRobotDelete = (id: string) => {
        const newRobots = robots.filter(r => r.id !== id);
        saveData('activeRobots', newRobots);
        setRobots(newRobots);
    };
    const handleRobotEdit = (robot: Robot) => {
        setEditingId(robot.id);
        setRobotForm(robot);
        setActiveTab('robots');
    };

    // --- CRUD de Galerias ---
    const handleGallerySubmit = () => {
        if (!galleryForm.name) return;
        const newGalleries = [...galleries, { id: Date.now(), name: galleryForm.name }];
        saveData('galleries', newGalleries);
        setGalleries(newGalleries);
        setGalleryForm({ name: '' });
    };
    const handleGalleryDelete = (id: number) => {
        const newGalleries = galleries.filter(g => g.id !== id);
        saveData('galleries', newGalleries);
        setGalleries(newGalleries);
    };


  const renderContent = () => {
    switch (activeTab) {
      case 'users':
        return (
            <div>
                {/* Formulário de Usuário */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 bg-slate-800 rounded-lg">
                    <input value={userForm.name} onChange={(e) => setUserForm({...userForm, name: e.target.value})} placeholder="Nome" className="p-2 bg-slate-700 rounded" />
                    <input type="email" value={userForm.email} onChange={(e) => setUserForm({...userForm, email: e.target.value})} placeholder="Email" className="p-2 bg-slate-700 rounded" />
                    <input type="password" value={userForm.password} onChange={(e) => setUserForm({...userForm, password: e.target.value})} placeholder="Senha" className="p-2 bg-slate-700 rounded" />
                    <select value={userForm.role} onChange={(e) => setUserForm({...userForm, role: e.target.value as User['role']})} className="p-2 bg-slate-700 rounded">
                        <option value="operador">Operador</option>
                        <option value="supervisor">Supervisor</option>
                    </select>
                    <button onClick={handleUserSubmit} className="md:col-span-2 bg-blue-600 hover:bg-blue-700 p-2 rounded">{editingId ? 'Atualizar' : 'Adicionar'} Usuário</button>
                </div>
                {/* Lista de Usuários */}
                <ul className="space-y-2">{users.map(user => <li key={user.id} className="bg-slate-800 p-3 rounded flex justify-between items-center"><div><p>{user.name}</p><p className="text-sm text-gray-400">{user.email} - {user.role}</p></div><div><button onClick={() => handleUserEdit(user)} className="bg-yellow-500 p-1 px-2 rounded text-sm mr-2">Editar</button><button onClick={() => handleUserDelete(user.id)} className="bg-red-600 p-1 px-2 rounded text-sm">Excluir</button></div></li>)}</ul>
            </div>
        );
      case 'alerts':
        return (
            <div>
                {/* Formulário de Alerta */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 bg-slate-800 rounded-lg">
                    <input value={alertForm.location} onChange={(e) => setAlertForm({...alertForm, location: e.target.value})} placeholder="Localização" className="p-2 bg-slate-700 rounded" />
                    <input value={alertForm.robot} onChange={(e) => setAlertForm({...alertForm, robot: e.target.value})} placeholder="ID do Robô" className="p-2 bg-slate-700 rounded" />
                    <select value={alertForm.type} onChange={(e) => setAlertForm({...alertForm, type: e.target.value})} className="p-2 bg-slate-700 rounded">
                        <option>Obstrução</option><option>Estrutural</option><option>Nível de Água</option><option>Outros</option>
                    </select>
                    <select value={alertForm.severity} onChange={(e) => setAlertForm({...alertForm, severity: e.target.value as Alert['severity']})} className="p-2 bg-slate-700 rounded">
                        <option value="low">Baixa</option><option value="medium">Média</option><option value="high">Alta</option>
                    </select>
                    <textarea value={alertForm.description} onChange={(e) => setAlertForm({...alertForm, description: e.target.value})} placeholder="Descrição" className="md:col-span-2 p-2 bg-slate-700 rounded" />
                    <button onClick={handleAlertSubmit} className="md:col-span-2 bg-blue-600 hover:bg-blue-700 p-2 rounded">{editingId ? 'Atualizar' : 'Adicionar'} Alerta</button>
                </div>
                {/* Lista de Alertas */}
                <ul className="space-y-2">{alerts.map(alert => <li key={alert.id} className="bg-slate-800 p-3 rounded"><div><p>{alert.type} - <span className="text-gray-400">{alert.location}</span></p></div><div className="flex justify-end"><button onClick={() => handleAlertEdit(alert)} className="bg-yellow-500 p-1 px-2 rounded text-sm mr-2">Editar</button><button onClick={() => handleAlertDelete(alert.id)} className="bg-red-600 p-1 px-2 rounded text-sm">Excluir</button></div></li>)}</ul>
            </div>
        );
      case 'robots':
         return (
            <div>
                 {/* Formulário de Robô */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 bg-slate-800 rounded-lg">
                    <input value={robotForm.id} onChange={(e) => setRobotForm({...robotForm, id: e.target.value})} placeholder="ID do Robô (ex: ZG-00X)" className="p-2 bg-slate-700 rounded" disabled={!!editingId} />
                    <input value={robotForm.name} onChange={(e) => setRobotForm({...robotForm, name: e.target.value})} placeholder="Nome do Robô" className="p-2 bg-slate-700 rounded" />
                    <input value={robotForm.location} onChange={(e) => setRobotForm({...robotForm, location: e.target.value})} placeholder="Localização Atual" className="p-2 bg-slate-700 rounded" />
                    <select value={robotForm.status} onChange={(e) => setRobotForm({...robotForm, status: e.target.value as Robot['status']})} className="p-2 bg-slate-700 rounded">
                        <option value="active">Ativo</option><option value="inspection">Inspecionando</option><option value="maintenance">Manutenção</option><option value="alert">Alerta</option>
                    </select>
                    <button onClick={handleRobotSubmit} className="md:col-span-2 bg-blue-600 hover:bg-blue-700 p-2 rounded">{editingId ? 'Atualizar' : 'Adicionar'} Robô</button>
                </div>
                {/* Lista de Robôs */}
                <ul className="space-y-2">{robots.map(robot => <li key={robot.id} className="bg-slate-800 p-3 rounded flex justify-between items-center"><div><p>{robot.name} ({robot.id})</p><p className="text-sm text-gray-400">{robot.location}</p></div><div><button onClick={() => handleRobotEdit(robot)} className="bg-yellow-500 p-1 px-2 rounded text-sm mr-2">Editar</button><button onClick={() => handleRobotDelete(robot.id)} className="bg-red-600 p-1 px-2 rounded text-sm">Excluir</button></div></li>)}</ul>
            </div>
        );
      case 'galleries':
        return (
            <div>
                 {/* Formulário de Galeria */}
                <div className="grid grid-cols-1 gap-4 mb-4 p-4 bg-slate-800 rounded-lg">
                    <input value={galleryForm.name} onChange={(e) => setGalleryForm({name: e.target.value})} placeholder="Nome da Nova Galeria" className="p-2 bg-slate-700 rounded" />
                    <button onClick={handleGallerySubmit} className="bg-blue-600 hover:bg-blue-700 p-2 rounded">Adicionar Galeria</button>
                </div>
                {/* Lista de Galerias */}
                <ul className="space-y-2">{galleries.map(gallery => <li key={gallery.id} className="bg-slate-800 p-3 rounded flex justify-between items-center"><span>{gallery.name}</span><button onClick={() => handleGalleryDelete(gallery.id)} className="bg-red-600 p-1 px-2 rounded text-sm">Excluir</button></li>)}</ul>
            </div>
        );
      default:
        return null;
    }
  };

  const TabButton: React.FC<{ tabName: typeof activeTab; label: string; icon: React.ReactNode }> = ({ tabName, label, icon }) => (
    <button
      onClick={() => { setEditingId(null); setActiveTab(tabName); }}
      className={`flex-1 flex items-center justify-center p-4 text-sm font-semibold border-b-4 transition-colors ${
        activeTab === tabName ? 'border-blue-500 text-white' : 'border-transparent text-gray-400 hover:text-white'
      }`}
    >
      {icon}
      <span className="ml-2">{label}</span>
    </button>
  );

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 rounded-lg shadow-xl w-full max-w-5xl h-[90vh] flex flex-col">
        {/* Cabeçalho do Modal */}
        <div className="flex justify-between items-center p-4 border-b border-slate-700">
            <h2 className="text-2xl font-bold text-white">Painel de Administração</h2>
            <button onClick={onClose} className="text-xl hover:text-red-500"><XMarkIcon className="h-7 w-7" /></button>
        </div>

        {/* Abas de Navegação */}
        <div className="flex border-b border-slate-700">
            <TabButton tabName="users" label="Usuários" icon={<UserIcon className="h-5 w-5"/>} />
            <TabButton tabName="alerts" label="Alertas" icon={<ExclamationTriangleIcon className="h-5 w-5"/>} />
            <TabButton tabName="robots" label="Robôs" icon={<CpuChipIcon className="h-5 w-5"/>} />
            <TabButton tabName="galleries" label="Galerias" icon={<MapPinIcon className="h-5 w-5"/>} />
        </div>

        {/* Conteúdo da Aba */}
        <div className="p-6 overflow-y-auto flex-grow">
            {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;