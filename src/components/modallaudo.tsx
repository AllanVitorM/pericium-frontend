import React from "react";

interface ModalLaudoProps {
  isOpen: boolean;
  onClose: () => void; 
}

export default function ModalLaudo({ isOpen, onClose }: ModalLaudoProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-2xl w-full max-w-[500px] shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Gerar Laudo</h2>

        <div className="flex flex-col gap-4">
          {/* Título */}
          <div className="flex flex-col">
            <label className="text-sm font-medium">
              Título<span className="text-red-500">*</span>
            </label>
            <input
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Título"
            />
          </div>

          {/* Descrição */}
          <div className="flex flex-col">
            <label className="text-sm font-medium">Descrição</label>
            <textarea
              className="p-3 border border-gray-300 rounded-md h-28 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Escreva aqui"
            />
          </div>
        </div>

        {/* Botões */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-8">
          <button
            onClick={onClose}
            className="w-full md:w-auto flex items-center justify-center gap-2 border border-gray-300 px-6 py-2 rounded-md text-gray-700 bg-white hover:bg-gray-100 transition"
          >
            &larr; Cancelar
          </button>
          <button
            className="w-full md:w-auto flex items-center justify-center gap-2 bg-[#002D62] text-white px-6 py-2 rounded-md hover:bg-[#001f47] transition"
          >
            Gerar &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
