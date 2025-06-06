"use client";

import React, { useState, useEffect } from 'react';
import type { User, Alert, Robot } from '@/types';
import { UserIcon, ExclamationTriangleIcon, CpuChipIcon, MapPinIcon, XMarkIcon, ArrowDownOnSquareIcon } from '@heroicons/react/24/solid';

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
  const [robotForm, setRobotForm] = useState<Omit<Robot, 'lastUpdate' | 'top' | 'left'>>({ id: '', name: '', location: '', status: 'active', battery: 100, signal: 100 });
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
    if (window.confirm("Tem certeza que deseja excluir este usuário?")) {
        const newUsers = users.filter(u => u.id !== id);
        saveData('users', newUsers);
        setUsers(newUsers);
    }
  };
   const handleUserEdit = (user: User) => {
    const { id, ...formData } = user;
    setEditingId(id);
    setUserForm(formData);
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
     if (window.confirm("Tem certeza que deseja excluir este alerta?")) {
        const newAlerts = alerts.filter(a => a.id !== id);
        saveData('alerts', newAlerts);
        setAlerts(newAlerts);
    }
  };
  const handleAlertEdit = (alert: Alert) => {
    const { id, time, ...formData } = alert;
    setEditingId(id);
    setAlertForm(formData);
    setActiveTab('alerts');
  };

   // --- CRUD de Robôs ---
  const handleRobotSubmit = () => {
    const newRobots = [...robots];
    if (editingId) {
      const index = newRobots.findIndex(r => r.id === editingId);
      if (index > -1) newRobots[index] = { ...newRobots[index], ...robotForm };
    } else {
      newRobots.push({ ...robotForm, lastUpdate: 'agora', top: `${Math.floor(Math.random() * 80) + 10}%`, left: `${Math.floor(Math.random() * 80) + 10}%` });
    }
    saveData('activeRobots', newRobots);
    setRobots(newRobots);
    setRobotForm({ id: '', name: '', location: '', status: 'active', battery: 100, signal: 100 });
    setEditingId(null);
  };
  const handleRobotDelete = (id: string) => {
     if (window.confirm("Tem certeza que deseja excluir este robô?")) {
        const newRobots = robots.filter(r => r.id !== id);
        saveData('activeRobots', newRobots);
        setRobots(newRobots);
    }
  };
  const handleRobotEdit = (robot: Robot) => {
    const { lastUpdate, top, left, ...formData } = robot;
    setEditingId(robot.id);
    setRobotForm(formData);
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
    if (window.confirm("Tem certeza que deseja excluir esta galeria?")) {
        const newGalleries = galleries.filter(g => g.id !== id);
        saveData('galleries', newGalleries);
        setGalleries(newGalleries);
    }
  };

  // Função que renderiza o conteúdo de cada aba
  const renderContent = () => {
    switch (activeTab) {
      case 'users':
        return (
            <div>
                <div className="bg-slate-800 rounded-lg p-6 mb-6">
                    <h3 className="text-lg font-semibold mb-4">{editingId ? 'Editar Usuário' : 'Adicionar Novo Usuário'}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input value={userForm.name} onChange={(e) => setUserForm({...userForm, name: e.target.value})} placeholder="Nome Completo" className="w-full p-2 bg-slate-700 rounded border border-slate-600" />
                        <input type="email" value={userForm.email} onChange={(e) => setUserForm({...userForm, email: e.target.value})} placeholder="Email" className="w-full p-2 bg-slate-700 rounded border border-slate-600" />
                        <input type="password" value={userForm.password} onChange={(e) => setUserForm({...userForm, password: e.target.value})} placeholder={editingId ? "Nova Senha (opcional)" : "Senha"} className="w-full p-2 bg-slate-700 rounded border border-slate-600" />
                        <select value={userForm.role} onChange={(e) => setUserForm({...userForm, role: e.target.value as User['role']})} className="w-full p-2 bg-slate-700 rounded border border-slate-600">
                            <option value="operador">Operador</option>
                            <option value="supervisor">Supervisor</option>
                            <option value="admin">Admin</option>
                        </select>
                        <button onClick={handleUserSubmit} className="md:col-span-2 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 p-2 rounded text-white font-semibold">
                           <ArrowDownOnSquareIcon className="h-5 w-5" />
                           {editingId ? 'Atualizar Usuário' : 'Salvar Usuário'}
                        </button>
                    </div>
                </div>
                <ul className="space-y-2">{users.map(user => <li key={user.id} className="bg-slate-800 p-3 rounded flex justify-between items-center"><div><p className="font-bold">{user.name}</p><p className="text-sm text-gray-400">{user.email} - {user.role}</p></div><div><button onClick={() => handleUserEdit(user)} className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded text-sm mr-2">Editar</button><button onClick={() => handleUserDelete(user.id)} className="bg-red-600 hover:bg-red-700 text-white p-2 rounded text-sm">Excluir</button></div></li>)}</ul>
            </div>
        );
      case 'alerts':
        return (
            <div>
                 <div className="bg-slate-800 rounded-lg p-6 mb-6">
                    <h3 className="text-lg font-semibold mb-4">{editingId ? 'Editar Alerta' : 'Adicionar Novo Alerta'}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input value={alertForm.location} onChange={(e) => setAlertForm({...alertForm, location: e.target.value})} placeholder="Localização" className="w-full p-2 bg-slate-700 rounded border border-slate-600" />
                        <input value={alertForm.robot} onChange={(e) => setAlertForm({...alertForm, robot: e.target.value})} placeholder="ID do Robô" className="w-full p-2 bg-slate-700 rounded border border-slate-600" />
                        <select value={alertForm.type} onChange={(e) => setAlertForm({...alertForm, type: e.target.value})} className="w-full p-2 bg-slate-700 rounded border border-slate-600">
                            <option>Obstrução</option><option>Estrutural</option><option>Nível de Água</option><option>Outros</option>
                        </select>
                        <select value={alertForm.severity} onChange={(e) => setAlertForm({...alertForm, severity: e.target.value as Alert['severity']})} className="w-full p-2 bg-slate-700 rounded border border-slate-600">
                            <option value="low">Baixa</option><option value="medium">Média</option><option value="high">Alta</option>
                        </select>
                        <textarea value={alertForm.description} onChange={(e) => setAlertForm({...alertForm, description: e.target.value})} placeholder="Descrição do Alerta" rows={3} className="md:col-span-2 w-full p-2 bg-slate-700 rounded border border-slate-600" />
                        <button onClick={handleAlertSubmit} className="md:col-span-2 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 p-2 rounded text-white font-semibold">
                            <ArrowDownOnSquareIcon className="h-5 w-5" />
                            {editingId ? 'Atualizar Alerta' : 'Salvar Alerta'}
                        </button>
                    </div>
                </div>
                <ul className="space-y-2">{alerts.map(alert => <li key={alert.id} className="bg-slate-800 p-3 rounded"><div><p className="font-bold">{alert.type} <span className="text-gray-400 font-normal">- {alert.location}</span></p><p className="text-sm text-gray-300">{alert.description}</p></div><div className="flex justify-end mt-2"><button onClick={() => handleAlertEdit(alert)} className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded text-sm mr-2">Editar</button><button onClick={() => handleAlertDelete(alert.id)} className="bg-red-600 hover:bg-red-700 text-white p-2 rounded text-sm">Excluir</button></div></li>)}</ul>
            </div>
        );
      case 'robots':
       return (
            <div>
              <div className="bg-slate-800 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">{editingId ? 'Editar Robô' : 'Adicionar Novo Robô'}</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label htmlFor="robot-id" className="block text-sm font-medium text-gray-300 mb-1">ID do Robô (ex: ZG-00X)</label>
                    <input id="robot-id" value={robotForm.id} onChange={(e) => setRobotForm({...robotForm, id: e.target.value})} placeholder="ID do Robô" className="w-full p-2 bg-slate-700 rounded border border-slate-600" disabled={!!editingId} />
                  </div>
                  <div>
                    <label htmlFor="robot-name" className="block text-sm font-medium text-gray-300 mb-1">Nome do Robô</label>
                    <input id="robot-name" value={robotForm.name} onChange={(e) => setRobotForm({...robotForm, name: e.target.value})} placeholder="Nome do Robô" className="w-full p-2 bg-slate-700 rounded border border-slate-600" />
                  </div>
                  <div>
                    <label htmlFor="robot-location" className="block text-sm font-medium text-gray-300 mb-1">Localização Atual</label>
                    <input id="robot-location" value={robotForm.location} onChange={(e) => setRobotForm({...robotForm, location: e.target.value})} placeholder="Localização do Robô" className="w-full p-2 bg-slate-700 rounded border border-slate-600" />
                  </div>
                  <div>
                    <label htmlFor="robot-status" className="block text-sm font-medium text-gray-300 mb-1">Status</label>
                    <select id="robot-status" value={robotForm.status} onChange={(e) => setRobotForm({...robotForm, status: e.target.value as Robot['status']})} className="w-full p-2 bg-slate-700 rounded border border-slate-600">
                        <option value="active">Ativo</option>
                        <option value="inspection">Inspecionando</option>
                        <option value="maintenance">Manutenção</option>
                        <option value="alert">Alerta</option>
                    </select>
                  </div>
                  <div className="md:col-span-4 mt-2">
                    <button onClick={handleRobotSubmit} className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 p-2 rounded text-white font-semibold">
                      <ArrowDownOnSquareIcon className="h-5 w-5" />
                      {editingId ? 'Atualizar Robô' : 'Salvar Robô'}
                    </button>
                  </div>
                </div>
              </div>
              <ul className="space-y-2">
                {robots.map(robot => (
                  <li key={robot.id} className="bg-slate-800 p-3 rounded flex justify-between items-center">
                    <div>
                      <p className="font-bold">{robot.name} <span className="text-gray-400 font-normal">({robot.id})</span></p>
                      <p className="text-sm text-gray-400">{robot.location}</p>
                    </div>
                    <div>
                      <button onClick={() => handleRobotEdit(robot)} className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded text-sm mr-2">Editar</button>
                      <button onClick={() => handleRobotDelete(robot.id)} className="bg-red-600 hover:bg-red-700 text-white p-2 rounded text-sm">Excluir</button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
        );
      case 'galleries':
        return (
            <div>
                 <div className="bg-slate-800 rounded-lg p-6 mb-6">
                    <h3 className="text-lg font-semibold mb-4">Adicionar Nova Galeria</h3>
                    <div className="flex gap-4">
                        <input value={galleryForm.name} onChange={(e) => setGalleryForm({name: e.target.value})} placeholder="Nome da Nova Galeria" className="flex-grow p-2 bg-slate-700 rounded border border-slate-600" />
                        <button onClick={handleGallerySubmit} className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 rounded text-white font-semibold">
                            <ArrowDownOnSquareIcon className="h-5 w-5" />
                            Salvar
                        </button>
                    </div>
                </div>
                <ul className="space-y-2">{galleries.map(gallery => <li key={gallery.id} className="bg-slate-800 p-3 rounded flex justify-between items-center"><span>{gallery.name}</span><button onClick={() => handleGalleryDelete(gallery.id)} className="bg-red-600 hover:bg-red-700 text-white p-2 rounded text-sm">Excluir</button></li>)}</ul>
            </div>
        );
      default:
        return null;
    }
  };

  const TabButton = ({ tabName, label, icon }: { tabName: 'users' | 'alerts' | 'robots' | 'galleries', label: string, icon: React.ReactNode }) => (
    <button
      onClick={() => { setEditingId(null); setActiveTab(tabName); }}
      className={`flex-1 flex items-center justify-center p-4 text-sm font-semibold border-b-4 transition-colors ${ activeTab === tabName ? 'border-blue-500 text-white' : 'border-transparent text-gray-400 hover:text-white' }`}
    >
      {icon}
      <span className="ml-2">{label}</span>
    </button>
  );

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 rounded-lg shadow-xl w-full max-w-5xl h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b border-slate-700">
            <h2 className="text-2xl font-bold text-white">Painel de Administração</h2>
            <button onClick={onClose} className="text-xl hover:text-red-500"><XMarkIcon className="h-7 w-7" /></button>
        </div>
        <div className="flex border-b border-slate-700">
            <TabButton tabName="users" label="Usuários" icon={<UserIcon className="h-5 w-5"/>} />
            <TabButton tabName="alerts" label="Alertas" icon={<ExclamationTriangleIcon className="h-5 w-5"/>} />
            <TabButton tabName="robots" label="Robôs" icon={<CpuChipIcon className="h-5 w-5"/>} />
            <TabButton tabName="galleries" label="Galerias" icon={<MapPinIcon className="h-5 w-5"/>} />
        </div>
        <div className="p-6 overflow-y-auto flex-grow">
            {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;