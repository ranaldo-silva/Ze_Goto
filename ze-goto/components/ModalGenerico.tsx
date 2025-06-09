"use client";

import { useState, useEffect } from "react";

interface ModalGenericoProps {
  isOpen: boolean;
  titulo: string;
  campos: string[];
  dadosIniciais: any;
  onSave: (dados: any) => void;
  onClose: () => void;
}

export default function ModalGenerico({ isOpen, titulo, campos, dadosIniciais, onSave, onClose }: ModalGenericoProps) {
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    setFormData(dadosIniciais || {});
  }, [dadosIniciais]);

  const handleChange = (campo: string, valor: string) => {
    setFormData((prev: any) => ({ ...prev, [campo]: valor }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative text-black">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-red-600 text-xl font-bold"
        >
          x
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center text-blue-800">{titulo}</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {campos.map((campo) => (
            <div key={campo}>
              <label className="block text-sm font-medium mb-1 capitalize">{campo}</label>
              <input
                type="text"
                value={formData[campo] || ""}
                onChange={(e) => handleChange(campo, e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
          >
            Salvar
          </button>
        </form>
      </div>
    </div>
  );
}
