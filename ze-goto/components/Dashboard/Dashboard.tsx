"use client";

import { useState } from 'react';
import DashboardHeader from '@/components/DashboardHeader/DashboardHeader';
import StatsCard from '@/components/StatsCard/StatsCard';
import RobotMap from '@/components/RobotMap/RobotMap';
import AlertsPanel from '@/components/AlertsPanel/AlertsPanel';
import CameraFeed from '@/components/CameraFeed/CameraFeed';
import RobotStatus from '@/components/RobotStatus/RobotStatus';
import AlertModal from '@/components/AlertsPanel/AlertModal';
import StatModal from '@/components/StatsCard/StatModal';

import { Alert, Robot, Stat } from '@/types';

export default function Dashboard() {
  const [selectedRobot, setSelectedRobot] = useState('ZG-001');
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [selectedStat, setSelectedStat] = useState<string | null>(null);
  const [mapView, setMapView] = useState<'general' | 'detailed'>('general');

  const stats: Stat[] = [
    { title: 'Robôs Ativos', value: '12', change: '+2', icon: 'activeRobots', color: 'text-green-500' },
    { title: 'Galerias Monitoradas', value: '245', change: '+15', icon: 'monitoredGalleries', color: 'text-blue-500' },
    { title: 'Alertas Ativos', value: '8', change: '-3', icon: 'activeAlerts', color: 'text-yellow-500' },
    { title: 'Inspeções Hoje', value: '34', change: '+12', icon: 'inspectionsToday', color: 'text-purple-500' }
  ];

  const recentAlerts: Alert[] = [
    { id: 1, type: 'Obstrução', severity: 'high', location: 'Galeria Anhangabaú - Setor 7', time: '10:23', robot: 'ZG-003', description: 'Obstrução grande detectada - possível acúmulo de detritos' },
    { id: 2, type: 'Estrutural', severity: 'medium', location: 'Galeria Vila Madalena - Setor 12', time: '09:45', robot: 'ZG-007', description: 'Rachadura na parede lateral identificada' },
    { id: 3, type: 'Nível de Água', severity: 'low', location: 'Galeria Ibirapuera - Setor 3', time: '08:15', robot: 'ZG-001', description: 'Nível de água ligeiramente elevado' }
  ];

  const activeRobots: Robot[] = [
    { id: 'ZG-001', name: 'Zé Goto 001', location: 'Galeria Ibirapuera', status: 'active', battery: 78, signal: 85, lastUpdate: '2 min ago' },
    { id: 'ZG-003', name: 'Zé Goto 003', location: 'Galeria Anhangabaú', status: 'inspection', battery: 92, signal: 72, lastUpdate: '1 min ago' },
    { id: 'ZG-007', name: 'Zé Goto 007', location: 'Galeria Vila Madalena', status: 'maintenance', battery: 45, signal: 0, lastUpdate: '15 min ago' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      <DashboardHeader />

      <div className="container mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div onClick={() => setSelectedStat(stat.title)} key={index} className="cursor-pointer">
              <StatsCard {...stat} />
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-slate-800/50 backdrop-blur-lg border-slate-700/50 p-6 rounded-lg text-white h-[600px]">
            <div className="flex justify-end mb-4 space-x-2">
              <button
                className={`px-4 py-2 rounded-md text-sm ${mapView === 'general' ? 'bg-blue-600' : 'bg-gray-700'} hover:opacity-90`}
                onClick={() => setMapView('general')}
              >
                Visão Geral
              </button>
              <button
                className={`px-4 py-2 rounded-md text-sm ${mapView === 'detailed' ? 'bg-blue-600' : 'bg-gray-700'} hover:opacity-90`}
                onClick={() => setMapView('detailed')}
              >
                Detalhado
              </button>
            </div>
            <RobotMap
              robots={activeRobots}
              onRobotSelect={setSelectedRobot}
              selectedRobot={selectedRobot}
              viewMode={mapView}
            />
          </div>

          <div className="bg-slate-800/50 backdrop-blur-lg border-slate-700/50 p-6 rounded-lg text-white h-[600px]">
            <AlertsPanel alerts={recentAlerts} onDetailClick={setSelectedAlert} />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <div className="bg-slate-800/50 backdrop-blur-lg border-slate-700/50 p-6 rounded-lg text-white">
            <CameraFeed robotId={selectedRobot} />
          </div>

          <div className="bg-slate-800/50 backdrop-blur-lg border-slate-700/50 p-6 rounded-lg text-white">
            <RobotStatus robots={activeRobots} />
          </div>
        </div>

        {/* Modal centralizado com detalhes do alerta */}
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
