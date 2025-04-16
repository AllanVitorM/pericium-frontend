import React from "react";

interface ModalCasoProps {
  isOpen: boolean;
  onClose: () => void;
  onNext: (modalName: string) => void;
}

export default function ModalCaso({ isOpen, onClose, onNext }: ModalCasoProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-[700px] shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Caso</h2>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-1">
            Título <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Placeholder"
            className="w-full border border-gray-400 rounded px-2 py-1"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm mb-1">Descrição</label>
          <textarea
            className="w-full border border-gray-400 rounded px-2 py-1"
            placeholder="Escreva aqui"
            rows={3}
          />
        </div>

        {/* Subtítulo */}
        <h3 className="text-lg font-semibold mb-3">Evidências</h3>

        <div className="flex justify-between items-center mb-3">
          <button
            onClick={() => onNext("envioEvidencia")}
            className="bg-[#002C49] text-white px-4 py-2 rounded-full font-medium"
          >
            + Nova Evidência
          </button>

          <input
            type="text"
            placeholder="Pesquisar"
            className="border border-gray-500 rounded px-3 py-2 placeholder-gray-500"
          />
        </div>

        <div className="overflow-hidden rounded border border-gray-300">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#B6C0C7] text-gray-800">
                <th className="text-left px-3 py-2 font-semibold">Título</th>
                <th className="text-left px-3 py-2 font-semibold">Data</th>
                <th className="text-left px-3 py-2 font-semibold">Ação</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-[#E8EBED]">
                <td className="px-3 py-2">Evidência 1</td>
                <td className="px-3 py-2">01/01/2025</td>
                <td className="px-3 py-2 flex gap-2">
                  <button title="Visualizar">👁️</button>
                  <button title="Editar" onClick={() => onNext("editarEvidencia")}>✏️</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="bg-[#A4AFC1] text-white px-4 py-2 rounded"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
