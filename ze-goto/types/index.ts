// src/types/index.ts

// --- Tipos para Usuários ---
export interface User {
  id: number; // Adicionado para consistência no AdminPanel
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
  resolved?: boolean; // Adicionado para consistência
  status?: 'novo' | 'em andamento' | 'resolvido' | 'ignorado';
  observacoes?: string[];
  actions?: AlertAction[];
}

// --- Tipos para Robôs e Estatísticas ---
export interface Robot {
  id: string;
  name: string;
  location: string;
  status: 'active' | 'inspection' | 'maintenance' | 'alert'; // Unificado com todas as opções
  battery: number;
  signal: number;
  lastUpdate: string;
}

export interface Stat {
  title: string;
  value: string;
  change: string;
  // A versão mais específica é melhor que apenas 'string'
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