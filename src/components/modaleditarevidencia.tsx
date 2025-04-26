import React, { useState, useEffect } from "react";
import { FileText, Upload } from "lucide-react";
import { title } from "process";

interface Evidencia {
  _id: string;
  title: string;
  dateRegister: string;
  local?: string;
  tipo?: string;
  peritoResponsavel?: string;
  descricao?: string;
}

interface ModalEditarEvidenciaProps {
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  evidencia: Evidencia | null;
}

export default function ModalEditarEvidencia({
  isOpen,
  onClose,
  onNext,
  evidencia,
}: ModalEditarEvidenciaProps) {
  const [formData, setFormData] = useState<Evidencia>({
    _id: "",
    title: "",
    dateRegister: "",
    local: "",
    tipo: "",
    peritoResponsavel: "",
    descricao: "",
  });

  useEffect(() => {
    if (evidencia) {
      setFormData(evidencia);
    }
  }, [evidencia]);

  if (!isOpen || !evidencia) return null;

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#F5F5F5] p-6 rounded-lg w-[640px] relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Editar Evidência</h2>
          <button className="flex items-center gap-2 bg-[#002D62] text-white text-sm px-4 py-2 rounded">
            <FileText size={16} />
            Laudo
          </button>
        </div>

        {/* Form */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium">
              Titulo<span className="text-red-500">*</span>
            </label>
            <input
              value={formData.title}
              className="p-2 border border-gray-300 rounded"
              placeholder="Placeholder"
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium">
              Data da perícia<span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={formData.dateRegister?.slice(0, 10)}
              className="p-2 border border-gray-300 rounded"
              placeholder="Placeholder"
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, dateRegister: e.target.value }))
              }
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium">
              Tipo<span className="text-red-500">*</span>
            </label>
            <input
              className="p-2 border border-gray-300 rounded"
              value={formData.tipo || ""}
              placeholder="Placeholder"
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, tipo: e.target.value }))
              }
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium">
              Local<span className="text-red-500">*</span>
            </label>
            <input
              className="p-2 border border-gray-300 rounded"
              value={formData.local || ""}
              placeholder="Placeholder"
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, local: e.target.value }))
              }
            />
          </div>

          <div className="flex flex-col col-span-2 sm:col-span-1">
            <label className="text-sm font-medium">
              Perito Responsável<span className="text-red-500">*</span>
            </label>
            <input
              className="p-2 border border-gray-300 rounded"
              value={formData.peritoResponsavel || ""}
              placeholder="Placeholder"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  peritoResponsavel: e.target.value,
                }))
              }
            />
          </div>

          <div className="col-span-2 flex flex-col">
            <label className="text-sm font-medium">Descrição</label>
            <textarea
              className="p-2 border border-gray-300 rounded h-24 resize-none"
              placeholder="Escreva aqui"
              value={formData.descricao || ""}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, descricao: e.target.value }))
              }
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

        {/* Footer */}
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
            Enviar &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
