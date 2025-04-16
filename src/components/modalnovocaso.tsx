import React from "react";

export default function ModalNovoCaso({ isOpen, onClose, onNext }: any) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-96 shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Registrar Caso</h2>

        <div className="flex flex-col gap-4">
          {/* Título */}
          <div className="flex flex-col">
            <label className="text-sm font-medium">
              Título<span className="text-red-500">*</span>
            </label>
            <input
              className="p-2 border border-gray-300 rounded"
              placeholder="Placeholder"
            />
          </div>

          {/* Status */}
          <div className="flex flex-col">
            <label className="text-sm font-medium">
              Status<span className="text-red-500">*</span>
            </label>
            <select
              className="p-2 border border-gray-300 rounded text-gray-500"
              defaultValue=""
            >
              <option value="" disabled>
                Placeholder
              </option>
              <option value="aberto">Aberto</option>
              <option value="em-andamento">Em andamento</option>
              <option value="finalizado">Finalizado</option>
            </select>
          </div>

          {/* Data de abertura */}
          <div className="flex flex-col">
            <label className="text-sm font-medium">
              Data de abertura<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="dd/mm/aaaa"
              className="p-2 border border-gray-300 rounded"
            />
          </div>

          {/* Descrição */}
          <div className="flex flex-col">
            <label className="text-sm font-medium">
              Descrição<span className="text-red-500">*</span>
            </label>
            <textarea
              className="p-2 border border-gray-300 rounded h-24 resize-none"
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
            onClick={onNext}
            className="flex items-center gap-2 bg-[#002D62] text-white px-6 py-2 rounded hover:bg-[#001f47]"
          >
            Cadastrar &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
