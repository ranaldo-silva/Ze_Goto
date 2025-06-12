import Link from 'next/link';
import Status from '@/components/Status';
import VisualAlertas from '@/components/VisualAlerta';
import VisualRobo from '@/components/VisualRobo';
import VisualInspecoes from '@/components/VisualIspecoes';

export default function TelaTeste() {
  return (
    <main className="bg-black min-h-screen text-white font-sans p-4">
      {/* Header */}
      <header className="flex justify-between items-center mb-4 p-4 bg-neutral-900 rounded-lg shadow-md">
        <Link href="/">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Voltar
          </button>
        </Link>
        <Status />
        <Link href="/Manutencao">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Manutenção
        </button>
        </Link>
      </header>

      {/* Corpo Principal */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Imagem principal */}
        <div className="md:w-3/4 w-full bg-neutral-900 rounded-lg p-2 shadow-md">
          <img
            src="/Image/zegoto1.png"
            alt="Visão do robô"
            className="w-full h-[600px] object-cover rounded-lg"
          />
        </div>

        {/* Alertas */}
        <div className="md:w-1/4 w-full bg-neutral-900 rounded-lg p-4 shadow-md">
          <h2 className="text-lg font-semibold mb-2">Alertas</h2>
          <div className="space-y-2 max-h-[500px] overflow-y-auto">
            <VisualAlertas />
          </div>
        </div>
      </div>

      {/* Rodapé com informações adicionais */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Info Robo */}
        <div className="bg-neutral-900 rounded-lg p-4 shadow-md">
          <h2 className="text-lg font-semibold mb-2">Status do Robô</h2>
          <VisualRobo />
        </div>

        {/* Info Inspecoes */}
        <div className="bg-neutral-900 rounded-lg p-4 shadow-md">
          <h2 className="text-lg font-semibold mb-2">Inspeções</h2>
          <VisualInspecoes />
        </div>
      </div>
    </main>
  );
}
