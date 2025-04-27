"use client";
import React, { useState, useEffect } from "react";
import { getIdCaso, updateCaso, deleteCaso } from "@/service/casos";
import { FileText } from "lucide-react";
import TabelaEvidencia from "./tabelaevidencia";

interface ModalCasoProps {
  isOpen: boolean;
  onClose: () => void;
  onNext: (modalName: string, data?: any) => void;
  casoId: string;
}

export default function ModalCaso({
  isOpen,
  onClose,
  onNext,
  casoId,
}: ModalCasoProps) {
  const [casoData, setCasoData] = useState<{
    titulo: string;
    descricao: string;
  }>({
    titulo: "",
    descricao: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    setCasoData({
      titulo: "",
      descricao: "",
    });
    setError("");
    onClose();
  };

  const fetchCaso = async () => {
    if (!casoId || casoId.trim() === "") {
      console.warn("ID do caso inválido. Abortando fetch.");
      return;
    }
    try {
      console.log("Chamando fetchCaso para o caso ID:", casoId);
      const response = await getIdCaso(casoId);
      console.log("Dado do caso:", response);
      setCasoData(response);
    } catch (error) {
      console.error("Erro ao buscar o caso", error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchCaso();
    }
  }, [isOpen, casoId]);

  const handleUpdate = async () => {
    setIsLoading(true);
    try {
      await updateCaso(casoId, casoData); // Corrigido: enviando ID + objeto de dados
      alert("Caso atualizado com sucesso!");
      handleClose();
    } catch (error: any) {
      alert(error.response?.data?.message || "Erro ao atualizar o caso");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Tem certeza que deseja deletar este caso?");
    if (!confirmDelete) return;

    setIsLoading(true);
    try {
      await deleteCaso(casoId); // Corrigido: enviando só o ID
      alert("Caso deletado com sucesso!");
      handleClose();
    } catch (error: any) {
      alert(error.response?.data?.message || "Erro ao deletar o caso");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-[700px] shadow-lg">
        {/* Título e Botão de Relatório */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Editar Caso</h2>
          <button className="flex items-center gap-2 bg-[#002D62] text-white text-sm px-4 py-2 rounded">
            <FileText size={16} />
            Relatório
          </button>
        </div>

        {/* Campo Título */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-1">
            Título <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={casoData.titulo}
            disabled={isLoading}
            onChange={(e) =>
              setCasoData((prev) => ({ ...prev, titulo: e.target.value }))
            }
            placeholder="Título do caso"
            className="w-full border border-gray-400 rounded px-2 py-1"
          />
        </div>

        {/* Campo Descrição */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm mb-1">Descrição</label>
          <textarea
            className="w-full border border-gray-400 rounded px-2 py-1"
            placeholder="Escreva aqui"
            disabled={isLoading}
            value={casoData.descricao}
            onChange={(e) =>
              setCasoData((prev) => ({ ...prev, descricao: e.target.value }))
            }
            rows={3}
          />
        </div>

        {/* Evidências */}
        <h3 className="text-lg font-semibold mb-3">Evidências</h3>

        <div className="flex justify-between items-center mb-3">
          <button
            onClick={() =>
              onNext("envioEvidencia", {
                ...casoData,
                caseId: casoId,
              })
            }
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

        <TabelaEvidencia caseId={casoId} onNext={onNext} />

        {/* Botões de Ações */}
        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={handleDelete}
            disabled={isLoading}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Deletar
          </button>

          <button
            onClick={handleUpdate}
            disabled={isLoading}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Salvar
          </button>

          <button
            onClick={handleClose}
            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
