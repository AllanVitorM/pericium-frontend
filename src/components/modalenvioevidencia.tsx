import React, { useEffect, useState } from "react";
import { Upload } from "lucide-react";
import { criarEvidencia } from "@/service/evidencia";

export default function ModalEnvioEvidencia({
  isOpen,
  onClose,
  casoSelecionado,
}: {
  isOpen: boolean;
  onClose: () => void;
  casoSelecionado: {
    title: string;
    descricao: string;
    tipo: string;
    local: string;
    dateRegister: string;
    caseId: string;
  };
}) {
  const [formData, setFormData] = useState({
    title: "",
    descricao: "",
    tipo: "",
    local: "",
    dateRegister: "",
    imageUrl: "",
    imageFile: null as File | null,
    caseId: "",
  });

  const [loading, setLoading] = useState(false);
  const [, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        imageUrl: file.name,
        imageFile: file,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.title ||
      !formData.descricao ||
      !formData.tipo ||
      !formData.dateRegister
    ) {
      setLoading(true);
      setError("");
    }
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Token não encontrado");
      setLoading(false);
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("descricao", formData.descricao);
    formDataToSend.append("tipo", formData.tipo);
    formDataToSend.append("local", formData.local);
    formDataToSend.append(
      "dateRegister",
      new Date(formData.dateRegister).toISOString()
    );
    formDataToSend.append("caseId", formData.caseId);

    if (formData.imageFile) {
      formDataToSend.append("file", formData.imageFile);
    }

    try {
      await criarEvidencia(formDataToSend);
      onClose();
    } catch (error) {
      console.log("Erro ao criar evidência", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      title: "",
      descricao: "",
      tipo: "",
      local: "",
      dateRegister: "",
      imageUrl: "",
      imageFile: null,
      caseId: "",
    });
    setError("");
    onClose();
  };

  useEffect(() => {
    if (casoSelecionado?.caseId) {
      setFormData((prev) => ({
        ...prev,
        caseId: casoSelecionado.caseId,
        imageUrl: "",
        imageFile: null,
      }));
    }
  }, [casoSelecionado]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#F5F5F5] p-6 rounded-lg w-full max-w-[640px]">
        <h2 className="text-2xl font-bold mb-6">Envio de Evidência</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Título */}
          <div className="flex flex-col">
            <label className="text-sm font-medium">
              Título<span className="text-red-500">*</span>
            </label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded"
              placeholder="Título do Caso"
            />
          </div>

          {/* Data de Registro */}
          <div className="flex flex-col">
            <label className="text-sm font-medium">
              Data de Registro<span className="text-red-500">*</span>
            </label>
            <input
              name="dateRegister"
              type="date"
              value={formData.dateRegister || ""}
              onChange={(e) =>
                setFormData({ ...formData, dateRegister: e.target.value })
              }
              className="p-2 border border-gray-300 rounded"
            />
          </div>

          {/* Tipo */}
          <div className="flex flex-col">
            <label className="text-sm font-medium">
              Tipo<span className="text-red-500">*</span>
            </label>
            <input
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded"
              placeholder="Tipo"
            />
          </div>

          {/* Local */}
          <div className="flex flex-col">
            <label className="text-sm font-medium">
              Local<span className="text-red-500">*</span>
            </label>
            <input
              name="local"
              value={formData.local}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded"
              placeholder="Local"
            />
          </div>

          {/* Descrição */}
          <div className="flex flex-col md:col-span-2">
            <label className="text-sm font-medium">
              Descrição<span className="text-red-500">*</span>
            </label>
            <textarea
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded resize-none"
              placeholder="Descreva o Caso"
            />
          </div>

          {/* Upload */}
          <div className="flex flex-col md:col-span-2">
            <label className="text-sm font-medium mb-1">
              Faça o upload de imagens ou exames:
            </label>
            <label className="flex items-center gap-2 border border-gray-300 rounded px-4 py-2 cursor-pointer w-fit bg-[#E4E7EC]">
              <Upload size={18} />
              <span className="text-sm font-medium">
                {formData.imageUrl || "Selecionar Arquivo"}
              </span>
              <input
                name="imageUrl"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>

          {/* Caso Selecionado */}
          <div className="flex flex-col md:col-span-2">
            <label className="text-sm font-medium">Caso Selecionado</label>
            <input
              type="text"
              value={casoSelecionado?.title}
              disabled
              className="p-2 border border-gray-300 rounded bg-gray-100 text-gray-500"
            />
          </div>

          {/* Botões */}
          <div className="flex justify-between mt-6 md:col-span-2">
            <button
              onClick={handleClose}
              type="button"
              className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded text-gray-700 bg-white hover:bg-gray-100"
            >
              &larr; Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-900 text-white rounded hover:bg-blue-800"
            >
              {loading ? "Enviando..." : "Enviar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
