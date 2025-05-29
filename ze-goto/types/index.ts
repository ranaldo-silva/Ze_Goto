// src/types/index.ts

export interface Alert {
  id: number;
  type: string;
  severity: 'high' | 'medium' | 'low';
  location: string;
  time: string;
  robot: string;
  description: string;
}

export interface Robot {
  id: string;
  name: string;
  location: string;
  status: 'active' | 'inspection' | 'maintenance' | 'alert';
  battery: number;
  signal: number;
  lastUpdate: string;
}

export interface Stat {
  title: string;
  value: string;
  change: string;
  icon: 'activeRobots' | 'monitoredGalleries' | 'activeAlerts' | 'inspectionsToday' | null;
  color: string;
}
