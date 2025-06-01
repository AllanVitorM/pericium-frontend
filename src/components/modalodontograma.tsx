import React, { useState } from "react";
import { criarOdontograma } from "@/service/odontograma";

interface ModalVitimaProps {
  isOpen: boolean;
  onClose: () => void; 
  vitimaId: string;
}

export function parseJwt(token: string): any {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    console.error("Erro ao decodificar token JWT", e);
    return null;
  }
}

export default function ModalOdontograma({ isOpen, onClose, vitimaId}: ModalVitimaProps) {
  const [dentes, setDentes] = useState("");
  const [observacao, setObservacao] = useState("")

  const handleCreateOdontograma = async () => {
    
    if (!dentes || !observacao) {
      alert("PREENCHA TODOS OS CAMPOS!");
      return;
    }
    console.log("Enviando para criarLaudo:", {
      dentes,
      observacao,
      vitimaId,
    });
    const token = localStorage.getItem("token");
    const usuario = token ? parseJwt(token) : null;

    if (!usuario) {
      alert("Usuário não autenticado!");
      return;
    }
  
    try {
      await criarOdontograma({
        dentes,
        observacao,
        vitimaId: vitimaId,
      });
      alert("Odontograma criado com sucesso!");
      onClose();
    } catch (error: any) {
      console.error("Erro ao criar odontograma", error);
      if (error.response) {
        console.error("Resposta do servidor:", error.response.data);
        alert("Erro do servidor: " + JSON.stringify(error.response.data));
      } else {
        alert("Erro desconhecido");
      }
    }
  }
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-[500px] shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Gerar Laudo</h2>

        <div className="flex flex-col gap-4">
          {/* Dente */}
          <div className="flex flex-col">
            <label className="text-sm font-medium">
              Título<span className="text-red-500">*</span>
            </label>
            <input
              className="p-2 border border-gray-300 rounded"
              value={dentes}
              onChange={(e) => setDentes(e.target.value)}
              placeholder="Ex: Dente 34"
            />
          </div>

          {/* Observação */}
          <div className="flex flex-col">
            <label className="text-sm font-medium">Descrição</label>
            <textarea
              className="p-2 border border-gray-300 rounded h-28 resize-none"
              placeholder="Descreva a observação ao dente"
              value={observacao}
              onChange={(e) => setObservacao(e.target.value)}
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
            onClick={handleCreateOdontograma}
          >
            Adicionar &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}