"use client";

import Alertas from '@/components/Alertas';
import Inspecoes from '@/components/Inspecoes';
import Robo from '@/components/Robo';
import Usuario from '@/components/Usuario';

export default function Manutencao() {
  return (
    <main className="bg-black min-h-screen text-white font-sans p-4 space-y-10">
      <section className="bg-neutral-900 p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Usuários</h2>
        <Usuario />
      </section>

      <section className="bg-neutral-900 p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Robôs</h2>
        <Robo />
      </section>

      <section className="bg-neutral-900 p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Alertas</h2>
        <Alertas />
      </section>

      <section className="bg-neutral-900 p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Inspeções</h2>
        <Inspecoes />
      </section>
    </main>
  );
}
