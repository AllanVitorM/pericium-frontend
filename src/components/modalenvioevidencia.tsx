import React, { useState } from "react";
import { Upload } from "lucide-react";
import { criarEvidencia } from "@/service/evidencia";

function parseJwt(token: string): any {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    console.error("Erro ao decodificar token jwt", e);
    return null;
  }
}

export default function ModalEnvioEvidencia({ isOpen, onClose, onNext }: any) {
  const [formData, setFormData] = useState<{
    title: string;
    descricao: string;
    tipo: string;
    local: string;
    dateRegister: string;
    imageUrl:  string;
    caseId: string;
  }>({
    title: "",
    descricao: "",
    tipo: "",
    local: "",
    dateRegister: "",
    imageUrl: "",
    caseId: "",
  });

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setFormData((prev) => ({
        ...prev,
        imageUrl: selectedFile.name, // apenas exibe o nome do arquivo
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Token não encontrado");
      setLoading(false);
      return;
    }

    const decoded = parseJwt(token);
    const caseId = decoded?.sub;

    try {
      const form = new FormData();
      form.append("title", formData.title);
      form.append("descricao", formData.descricao);
      form.append("tipo", formData.tipo);
      form.append("local", formData.local);
      form.append("dateRegister", formData.dateRegister);
      form.append("caseId", caseId);
      if (file) form.append("file", file); // envia o arquivo como 'file'

      await (formData);
      onClose();
    } catch (error) {
      console.log("Erro ao criar Evidência", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#F5F5F5] p-6 rounded-lg w-[640px]">
        <h2 className="text-2xl font-bold mb-6">Envio de Evidência</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium">Título<span className="text-red-500">*</span></label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded"
              placeholder="Título do Caso"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium">Descrição<span className="text-red-500">*</span></label>
            <input
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded"
              placeholder="Descreva o Caso"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium">Tipo<span className="text-red-500">*</span></label>
            <input
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded"
              placeholder="Tipo"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium">Local<span className="text-red-500">*</span></label>
            <input
              name="local"
              value={formData.local}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded"
              placeholder="Local"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium">Data de Registro<span className="text-red-500">*</span></label>
            <input
              name="dateRegister"
              type="date"
              value={formData.dateRegister}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="col-span-2 flex flex-col">
            <label className="text-sm font-medium mb-1">Faça o upload de imagens ou exames:</label>
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

          <div className="col-span-2 flex flex-col">
            <label className="text-sm font-medium">Nome do Caso<span className="text-red-500">*</span></label>
            <input
              name="caseId"
              value={formData.caseId}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded"
              placeholder="ID ou Nome do Caso"
            />
          </div>

          <div className="col-span-2 flex justify-between mt-6">
            <button
              onClick={onClose}
              type="button"
              className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded text-gray-700 bg-white hover:bg-gray-100"
            >
              <span>&larr;</span> Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-1 bg-blue-900 text-white rounded hover:bg-blue-800"
            >
              {loading ? "Enviando..." : "Enviar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
