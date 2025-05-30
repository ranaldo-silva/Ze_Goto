// app/page.tsx
'use client';

import { useState } from 'react';
import Apresentacao from '@/components/Apresentacao/Apresentacao';
import Dashboard from '@/components/Dashboard/Dashboard';

export default function Home() {
  const [mostrarIntro, setMostrarIntro] = useState(true);

  return mostrarIntro ? (
    <Apresentacao onContinue={() => setMostrarIntro(false)} />
  ) : (
    <Dashboard />
  );
}
