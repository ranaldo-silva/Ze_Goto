// src/types/index.ts

// --- Tipos para Usuários ---
export interface User {
  id: number;
  name: string;
  email: string;
  password?: string;
  role: "operador" | "supervisor" | "admin";
}

// --- Tipos para Alertas e Ações ---
export interface AlertAction {
  type: 'chamar' | 'resolver' | 'escalar';
  timestamp: string;
  notes?: string;
  teamType?: string;
}

export interface Alert {
  id: number;
  type: string;
  severity: 'high' | 'medium' | 'low';
  location: string;
  time: string;
  robot: string;
  description: string;
  resolved?: boolean;
  status?: 'novo' | 'em andamento' | 'resolvido' | 'ignorado';
  observacoes?: string[];
  actions?: AlertAction[];
}

// --- Tipos para Robôs e Estatísticas ---
export interface Robot {
  id: string;
  name: string;
  location: string;
  status: 'active' | 'inspection' | 'maintenance' | 'alert';
  battery: number;
  signal: number;
  lastUpdate: string;
  // ADICIONADO: Propriedades para a posição no mapa
  top?: string;
  left?: string;
}

export interface Stat {
  title: string;
  value: string;
  change: string;
  icon: 'activeRobots' | 'monitoredGalleries' | 'activeAlerts' | 'inspectionsToday';
  color: string;
}

// --- Tipos para Inspeções ---
export interface InspecaoData {
  robo: string;
  local: string;
  problema: string;
  acionarEquipe: boolean;
  registradoPor: string;
  dataHora: string;
}