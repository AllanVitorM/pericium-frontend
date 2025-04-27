import React, { useState, useEffect } from "react";
import { FileText, Upload } from "lucide-react";
import { updateEvidencia, deleteEvidencia } from "@/service/evidencia";

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

  const handleUpdate = async () => {
    try {
      await updateEvidencia(formData._id, formData);
      alert("Evidência atualizada com sucesso!");
      onClose();
    } catch (error: any) {
      console.error("Erro ao atualizar a evidência:", error.response?.data || error.message || error);
      alert("Erro ao atualizar evidência: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#F5F5F5] p-6 rounded-lg w-full max-w-2xl relative overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <h2 className="text-2xl font-bold">Editar Evidência</h2>
          <button className="flex items-center gap-2 bg-[#002D62] text-white text-sm px-4 py-2 rounded hover:bg-[#001f47]">
            <FileText size={16} />
            Laudo
          </button>
        </div>

        {/* Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium">
              Título <span className="text-red-500">*</span>
            </label>
            <input
              value={formData.title}
              className="p-2 border border-gray-300 rounded"
              placeholder="Título da evidência"
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium">
              Data da perícia <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={formData.dateRegister?.slice(0, 10)}
              className="p-2 border border-gray-300 rounded"
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, dateRegister: e.target.value }))
              }
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium">
              Tipo <span className="text-red-500">*</span>
            </label>
            <input
              className="p-2 border border-gray-300 rounded"
              value={formData.tipo || ""}
              placeholder="Tipo da evidência"
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, tipo: e.target.value }))
              }
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium">
              Local <span className="text-red-500">*</span>
            </label>
            <input
              className="p-2 border border-gray-300 rounded"
              value={formData.local || ""}
              placeholder="Local da evidência"
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, local: e.target.value }))
              }
            />
          </div>

          <div className="flex flex-col md:col-span-2">
            <label className="text-sm font-medium">
              Perito Responsável <span className="text-red-500">*</span>
            </label>
            <input
              className="p-2 border border-gray-300 rounded"
              value={formData.peritoResponsavel || ""}
              placeholder="Nome do perito"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  peritoResponsavel: e.target.value,
                }))
              }
            />
          </div>

          <div className="flex flex-col md:col-span-2">
            <label className="text-sm font-medium">Descrição</label>
            <textarea
              className="p-2 border border-gray-300 rounded h-24 resize-none"
              placeholder="Descrição da evidência"
              value={formData.descricao || ""}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, descricao: e.target.value }))
              }
            />
          </div>

          <div className="flex flex-col md:col-span-2">
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
        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
          <button
            onClick={onClose}
            className="w-full sm:w-auto flex items-center justify-center gap-2 border border-gray-300 px-4 py-2 rounded text-gray-700 bg-white hover:bg-gray-100"
          >
            &larr; Cancelar
          </button>
          <button
            onClick={handleUpdate}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#002D62] text-white px-6 py-2 rounded hover:bg-[#001f47]"
          >
            Enviar &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
