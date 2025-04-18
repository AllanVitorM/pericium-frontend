import React from "react";

interface ModalLaudoProps {
  isOpen: boolean;
  onClose: () => void; 
}

export default function ModalLaudo({ isOpen, onClose, }: ModalLaudoProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-[500px] shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Gerar Laudo</h2>

        <div className="flex flex-col gap-4">
          {/* Título */}
          <div className="flex flex-col">
            <label className="text-sm font-medium">
              Título<span className="text-red-500">*</span>
            </label>
            <input
              className="p-2 border border-gray-300 rounded"
              placeholder="Título"
            />
          </div>

          {/* Descrição */}
          <div className="flex flex-col">
            <label className="text-sm font-medium">Descrição</label>
            <textarea
              className="p-2 border border-gray-300 rounded h-28 resize-none"
              placeholder="Escreva aqui"
            />
          </div>
        </div>

        {/* Botões */}
        <div className="flex justify-between mt-6">
          <button
            onClick={onClose}
            className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded text-gray-700 bg-white hover:bg-gray-100"
          >
            &larr; Cancelar
          </button>
          <button
            className="flex items-center gap-2 bg-[#002D62] text-white px-6 py-2 rounded hover:bg-[#001f47]"
          >
            Gerar &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
