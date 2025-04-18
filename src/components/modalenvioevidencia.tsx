import React from "react";
import { Upload } from "lucide-react";

export default function ModalEnvioEvidencia({ isOpen, onClose, onNext }: any) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#F5F5F5] p-6 rounded-lg w-[640px]">
        <h2 className="text-2xl font-bold mb-6">Envio de Evidência</h2>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium">
              Nome<span className="text-red-500">*</span>
            </label>
            <input
              className="p-2 border border-gray-300 rounded"
              placeholder="Placeholder"
            />
          </div>

          <div className="flex flex-col col-span-1">
            <label className="text-sm font-medium">
              CPF<span className="text-red-500">*</span>
            </label>
            <input
              className="p-2 border border-gray-300 rounded"
              placeholder="Placeholder"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium">
              Perito Responsável<span className="text-red-500">*</span>
            </label>
            <input
              className="p-2 border border-gray-300 rounded"
              placeholder="Placeholder"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium">
              Data da perícia<span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              className="p-2 border border-gray-300 rounded"
              placeholder="Placeholder"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium">
              Local da Perícia<span className="text-red-500">*</span>
            </label>
            <input
              className="p-2 border border-gray-300 rounded"
              placeholder="Placeholder"
            />
          </div>

          <div className="col-span-2 flex flex-col">
            <label className="text-sm font-medium">Descrição</label>
            <textarea
              className="p-2 border border-gray-300 rounded h-24 resize-none"
              placeholder="Escreva aqui"
            />
          </div>

          <div className="col-span-2 flex flex-col">
            <label className="text-sm font-medium mb-1">
              Faça o upload de imagens ou exames:
            </label>
            <label className="flex items-center gap-2 border border-gray-300 rounded px-4 py-2 cursor-pointer w-fit bg-[#E4E7EC]">
              <Upload size={18} />
              <span className="text-sm font-medium">Upload</span>
              <input type="file" className="hidden" />
            </label>
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={onClose}
            className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded text-gray-700 bg-white hover:bg-gray-100"
          >
            <span>&larr;</span> Cancelar
          </button>
          <button
            onClick={onNext}
            className="flex items-center gap-2 bg-[#002D62] text-white px-6 py-2 rounded hover:bg-[#001f47]"
          >
            Enviar <span>&rarr;</span>
          </button>
        </div>
      </div>
    </div>
  );
}


