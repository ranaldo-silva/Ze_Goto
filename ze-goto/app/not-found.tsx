// src/app/not-found.tsx
import Link from 'next/link'; // Use Link do Next.js para navegação

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-400 mb-4">Oops! Página não encontrada</p>
        <Link href="/" className="text-blue-400 hover:text-blue-300 underline">
          Voltar para a Página Inicial
        </Link>
      </div>
    </div>
  );
}