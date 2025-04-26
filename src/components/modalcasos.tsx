"use client";
import React, { useState, useEffect } from "react";
import { getIdCaso } from "@/service/casos";
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
  const [error, setError] = useState("")

  const handleClose = () => {
    setCasoData({
      titulo: "",
      descricao: "",
    });
    setError("");
    onClose();
  };
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    const fetchCaso = async () => {
      
      if (!casoId || casoId.trim() === "") {
        console.warn("ID do caso inválido. Abortando fetch.");
        return;
      }
      try {
        console.log("Chamando fetchCaso para o caso ID:", casoId);
        const response = await getIdCaso(casoId);
        console.log("Dado do caso:", response);
        setCasoData(response); // aqui está a correção
        console.log(casoData);
      } catch (error) {
        console.error("Erro ao buscar o caso", error);
      }
    };

    fetchCaso();
  }, [isOpen, casoId]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-[700px] shadow-lg">
        {/* TITULO */}
        <h2 className="text-xl font-semibold mb-4">Caso</h2>
        <div className="mb-4">
          {/* BOTÃO GERAR LAUDO*/}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Editar Caso</h2>
            <button className="flex items-center gap-2 bg-[#002D62] text-white text-sm px-4 py-2 rounded">
              <FileText size={16} />
              Relatório
            </button>
          </div>
          {/* BOTÃO GERAR LAUDO*/}
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
            placeholder="Placeholder"
            className="w-full border border-gray-400 rounded px-2 py-1"
          />
        </div>
        {/* TITULO */}
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

        <div className="flex justify-end mt-4">
          <button
            onClick={handleClose}
            className="bg-[#A4AFC1] text-white px-4 py-2 rounded"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}