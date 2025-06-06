"use client";

import { useState, useEffect } from 'react';

// Imports dos Componentes
import DashboardHeader from '@/components/DashboardHeader/DashboardHeader';
import StatsCard from '@/components/StatsCard/StatsCard';
import RobotMap from '@/components/RobotMap/RobotMap';
import AlertsPanel from '@/components/AlertsPanel/AlertsPanel';
import AlertModal from '@/components/AlertsPanel/AlertModal';
import StatModal from '@/components/StatsCard/StatModal';
import LoginModal from '@/components/LoginModal/LoginModal';
import AlertManualModal from '@/components/AlertManualModal/AlertManualModal';
import AdminPanel from '@/components/AdminPanel/AdminPanel'; 
import RobotStatus from '@/components/RobotStatus/RobotStatus'; 
import RobotCameraView from '@/components/RobotCameraView/RobotCameraView';

// Imports dos Tipos
import { Alert, Robot, Stat, User } from '@/types';

export default function Dashboard() {
  const [selectedRobot, setSelectedRobot] = useState('ZG-001');
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [selectedStat, setSelectedStat] = useState<string | null>(null);
  const [mapView, setMapView] = useState<'general' | 'detailed'>('general');
  const [mostrarAdminPanel, setMostrarAdminPanel] = useState(false);
  const [mostrarLogin, setMostrarLogin] = useState(false);
  const [mostrarAlertaManual, setMostrarAlertaManual] = useState(false);
  
 // O estado inicial é sempre 'null' no servidor e no cliente.
const [currentUser, setCurrentUser] = useState<User | null>(null);

// Usamos o useEffect para carregar os dados do localStorage apenas no lado do cliente.
useEffect(() => {
  const stored = localStorage.getItem('loggedUser');
  if (stored) {
    setCurrentUser(JSON.parse(stored));
  }
}, []); // O array vazio [] garante que isso rode apenas uma vez, após a montagem inicial.

  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [activeRobots, setActiveRobots] = useState<Robot[]>([]);

  const refreshDataFromStorage = () => {
    setAlerts(JSON.parse(localStorage.getItem('alerts') || '[]'));
    setActiveRobots(JSON.parse(localStorage.getItem('activeRobots') || '[]'));
  };

  useEffect(() => {
    refreshDataFromStorage();
  }, []);

  const handleDeleteAlert = (id: number) => {
    if (confirm('Deseja realmente excluir este alerta?')) {
        const updatedAlerts = alerts.filter((alert) => alert.id !== id);
        localStorage.setItem('alerts', JSON.stringify(updatedAlerts));
        setAlerts(updatedAlerts);
    }
  };

  const handleResolveAlert = (id: number) => {
    const updatedAlerts = alerts.map((alert) =>
        alert.id === id ? { ...alert, resolved: true } : alert
    );
    localStorage.setItem('alerts', JSON.stringify(updatedAlerts));
    setAlerts(updatedAlerts);
  };
  
  const handleDispatchTeam = (selectedAlert: Alert) => {
  alert(`Equipe enviada para ${selectedAlert.location} referente ao alerta "${selectedAlert.type}".`);
};


  const stats: Stat[] = [
    { title: 'Robôs Ativos', value: activeRobots.length.toString(), change: '+2', icon: 'activeRobots', color: 'text-green-500' },
    { title: 'Galerias Monitoradas', value: '245', change: '+15', icon: 'monitoredGalleries', color: 'text-blue-500' },
    { title: 'Alertas Ativos', value: alerts.filter((a) => !a.resolved).length.toString(), change: '+1', icon: 'activeAlerts', color: 'text-yellow-500' },
    { title: 'Inspeções Hoje', value: '34', change: '+12', icon: 'inspectionsToday', color: 'text-purple-500' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      <DashboardHeader
        currentUser={currentUser}
        onLogout={() => {
          localStorage.removeItem('loggedUser');
          setCurrentUser(null);
        }}
        onOpenLoginModal={() => setMostrarLogin(true)}
        onOpenInspecaoModal={() => setMostrarAlertaManual(true)}
        onAbrirUserManagementModal={() => setMostrarAdminPanel(true)} 
        onOpenAdminPanel={() => setMostrarAdminPanel(true)}
      />

      {mostrarAdminPanel && currentUser?.role === 'supervisor' && (
        <AdminPanel onClose={() => {
          setMostrarAdminPanel(false);
          refreshDataFromStorage();
        }} />
      )}

      {mostrarLogin && (
        <LoginModal
          onClose={() => setMostrarLogin(false)}
          onLoginSuccess={(user) => setCurrentUser(user)}
        />
      )}

      {mostrarAlertaManual && (
        <AlertManualModal
          onClose={() => setMostrarAlertaManual(false)}
          onSubmit={(alert) => {
            const newAlerts = [alert, ...alerts];
            localStorage.setItem('alerts', JSON.stringify(newAlerts));
            setAlerts(newAlerts);
          }}
        />
      )}

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div onClick={() => setSelectedStat(stat.title)} key={index} className="cursor-pointer">
              <StatsCard {...stat} />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-slate-800/50 backdrop-blur-lg border-slate-700/50 p-6 rounded-lg text-white h-[600px]">
             <RobotMap
              robots={activeRobots}
              onRobotSelect={setSelectedRobot}
              selectedRobot={selectedRobot}
              viewMode={mapView}
            />
          </div>

          <div className="bg-slate-800/50 backdrop-blur-lg border-slate-700/50 p-6 rounded-lg text-white h-[600px] overflow-y-auto">
            <AlertsPanel
              alerts={alerts}
              onDetailClick={setSelectedAlert}
              currentUser={currentUser}
              onDelete={handleDeleteAlert}
              onDispatchTeam={handleDispatchTeam}
              onResolve={handleResolveAlert}
            />
          </div>
        </div>

        {/* ÁREA ATUALIZADA COM O NOVO COMPONENTE */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <div>
            {/* O novo componente da câmera está sendo usado aqui */}
            <RobotCameraView robotId={selectedRobot} />
          </div>
          <div>
            <RobotStatus robots={activeRobots} />
          </div>
        </div>

        {selectedAlert && (
          <AlertModal alert={selectedAlert} onClose={() => setSelectedAlert(null)} />
        )}

        {selectedStat && (
          <StatModal title={selectedStat} onClose={() => setSelectedStat(null)} />
        )}
      </div>
    </div>
  );
}