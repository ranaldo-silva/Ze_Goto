'use client';
import Image from 'next/image';
import Link from 'next/link';
import {
  ShieldCheckIcon,
  EyeIcon,
  BellAlertIcon,
  MapPinIcon,
  CpuChipIcon,
  MagnifyingGlassIcon,
  LightBulbIcon
} from '@heroicons/react/24/outline';

const integrantes = [
  {
    nome: 'Ranaldo José da Silva',
    rm: 'RM559210',
    foto: '/Image/IMG-Ronaldo.jpg',
     github: "https://github.com/Ronaldo511722",
    linkedin: "https://www.linkedin.com/in/ranaldo-jos%C3%A9-da-silva-301955163/",
  },
  {
    nome: 'Fabricio José da Silva',
    rm: "RM560694",
    foto: '/Image/IMG-Fabricio.jpg',
     github: "https://github.com/FabricioJ0se",
    linkedin: "https://www.linkedin.com/in/fabricio-jose-da-silva/",
  },
  {
    nome: 'Lucas Barbosa da Ressurreição',
    rm: "RM560179",
    foto: '/Image/IMG-Lucas.jpg',
    github: "https://github.com/LucasRB-Tec",
    linkedin: "https://www.linkedin.com/in/lucas-ressurreicao/",
  },
];

export default function Apresentacao({ onContinue }: { onContinue: () => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white p-8">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Bem-vindo ao Projeto Zé Goto</h1>
        <p className="text-lg text-gray-300 mb-8">
          Sistema de monitoramento inteligente de galerias subterrâneas com robôs autônomos.
        </p>

        {/* Como o Sistema Funciona Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-6">Como o Sistema Funciona</h2>
          <p className="text-xl text-gray-300 mb-8">
            Uma rede inteligente de robôs monitora continuamente as galerias subterrâneas, detectando problemas antes que se tornem críticos.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-slate-800 p-6 rounded-lg shadow-md flex flex-col items-center">
              <ShieldCheckIcon className="h-12 w-12 text-blue-400 mb-3" />
              <h3 className="font-bold text-xl mb-2">Monitoramento</h3>
              <p className="text-sm text-gray-400">Vigilância contínua das galerias subterrâneas de São Paulo</p>
            </div>
            <div className="bg-slate-800 p-6 rounded-lg shadow-md flex flex-col items-center">
              <EyeIcon className="h-12 w-12 text-blue-400 mb-3" />
              <h3 className="font-bold text-xl mb-2">Visão Computacional</h3>
              <p className="text-sm text-gray-400">Detecção automática de obstruções e problemas estruturais</p>
            </div>
            <div className="bg-slate-800 p-6 rounded-lg shadow-md flex flex-col items-center">
              <BellAlertIcon className="h-12 w-12 text-blue-400 mb-3" />
              <h3 className="font-bold text-xl mb-2">Alertas em Tempo Real</h3>
              <p className="text-sm text-gray-400">Notificações instantâneas sobre situações críticas</p>
            </div>
            <div className="bg-slate-800 p-6 rounded-lg shadow-md flex flex-col items-center">
              <MapPinIcon className="h-12 w-12 text-blue-400 mb-3" />
              <h3 className="font-bold text-xl mb-2">Mapeamento Preciso</h3>
              <p className="text-sm text-gray-400">Localização exata dos robôs e pontos de interesse</p>
            </div>
          </div>
        </section>

        {/* Processo de Monitoramento Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-8">Processo de Monitoramento</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-3xl font-bold mb-4">1</div>
              <CpuChipIcon className="h-12 w-12 text-blue-400 mb-3" />
              <h3 className="font-bold text-xl mb-2">Patrulhamento Autônomo</h3>
              <p className="text-sm text-gray-400">Robôs navegam pelas galerias seguindo rotas otimizadas</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-3xl font-bold mb-4">2</div>
              <MagnifyingGlassIcon className="h-12 w-12 text-blue-400 mb-3" />
              <h3 className="font-bold text-xl mb-2">Análise em Tempo Real</h3>
              <p className="text-sm text-gray-400">Câmeras analisam estruturas e detectam anomalias</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-3xl font-bold mb-4">3</div>
              <LightBulbIcon className="h-12 w-12 text-blue-400 mb-3" />
              <h3 className="font-bold text-xl mb-2">Alertas Inteligentes</h3>
              <p className="text-sm text-gray-400">Sistema envia notificações prioritárias para equipes de manutenção</p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-6">Nossa Equipe</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {integrantes.map((int, index) => (
              <div key={index} className="bg-slate-800 p-4 rounded-lg shadow-md text-center">
                <Image
                  src={int.foto}
                  alt={int.nome}
                  width={160} // Increased width for better visibility with non-circular shapes
                  height={160} // Increased height
                  className="rounded-xl mx-auto mb-3 object-cover shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-xl" // Changed to rounded-xl, added shadow and hover effect
                />
                <p className="font-bold text-lg">{int.nome}</p> {/* Slightly larger font for name */}
                <p className="text-sm text-gray-400">{int.rm}</p>
                <div className="flex justify-center gap-3 mt-2">
                  <Link href={int.github} target="_blank" className="text-blue-400 hover:underline">GitHub</Link>
                  <Link href={int.linkedin} target="_blank" className="text-blue-400 hover:underline">LinkedIn</Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action for Dashboard */}
        <section className="mb-8">
          <h2 className="text-3xl font-semibold mb-4">Pronto para Explorar?</h2>
          <p className="text-lg text-gray-300 mb-8">
            Acesse o dashboard completo e monitore em tempo real a rede de robôs guardiões das galerias subterrâneas de São Paulo.
          </p>
          <button
            onClick={onContinue}
            className="mt-4 inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-xl font-semibold rounded-lg shadow-md transition transform hover:scale-105"
          >
            Acessar o Dashboard <span className="ml-2">→</span>
          </button>
        </section>
      </div>
    </div>
  );
}
