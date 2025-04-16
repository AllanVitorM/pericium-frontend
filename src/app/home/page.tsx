"use client";

import Image from "next/image";
import logo from "@/assets/logo.png";
import { useState } from "react";
import ModalNovoCaso from "@/components/modalnovocaso";
import ModalCaso from "@/components/modalcaso";
import ModalEnvioEvidencia from "@/components/modalenvioevidencia";
import ModalEditarEvidencia from "@/components/modaleditarevidencia";
import ModalLaudo from "@/components/modallaudo";

export default function CasosPage() {
  const [modalAtual, setModalAtual] = useState<string | null>(null);

  const abrirModal = (nome: string) => setModalAtual(nome);
  const fecharModal = () => setModalAtual(null);

  const handleNext = (proximoModal: string) => {
    setModalAtual(proximoModal);
  };

  const abrirEditarEvidencia = (idCaso: string) => {
    // Aqui você pode usar o id do caso para identificar qual evidência editar, se necessário.
    setModalAtual("editarEvidencia");
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-1/6 bg-[#B6C0C7] flex flex-col items-center py-8">
        <Image src={logo} alt="logo" className="mb-6 w-12 h-12" />
        {["Dashboard", "Casos", "Funcionários", "Perfil"].map((item) => (
          <button
            key={item}
            className="my-2 w-4/5 bg-[#002C49] text-white py-3 rounded-full hover:bg-blue-800 text-sm"
          >
            {item}
          </button>
        ))}
      </aside>

      {/* Conteúdo principal */}
      <main className="flex-1 bg-white p-6">
        {/* Topo */}
        <div className="flex justify-between items-center bg-[#B6C0C7] px-6 py-2 rounded-full mb-6 text-sm">
          <span><strong>ID:</strong> 1056782</span>
          <span><strong>Nome:</strong> João da Silva Santos</span>
          <span><strong>Cargo:</strong> Administrador</span>
        </div>

        {/* Título e botão */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Casos Periciais</h1>
          <button 
            onClick={() => abrirModal("novoCaso")}
            className="flex items-center gap-2 bg-[#002C49] text-white px-4 py-2 rounded-full hover:bg-blue-800"
          >
            <span className="text-lg font-bold">+</span> Novo caso
          </button>
        </div>

        {/* Campo de pesquisa */}
        <div className="flex justify-end mb-4">
          <input
            type="text"
            placeholder="Pesquisar"
            className="border border-gray-400 px-4 py-1 rounded-full w-72 text-sm"
          />
        </div>

        {/* Tabela */}
        <div className="overflow-auto rounded-lg border border-gray-300">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#B6C0C7] text-left">
                {["ID do Caso", "Laudo", "Relatório", "Data", "Status", "Responsáveis", "Ação"].map((col) => (
                  <th key={col} className="px-4 py-2 font-medium">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 12 }).map((_, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-[#E8EBED]" : "bg-[#B6C0C7]"}>
                  {Array(6).fill("—").map((val, index) => (
                    <td key={index} className="px-4 py-2">{val}</td>
                  ))}
                  <td className="px-4 py-2 flex gap-2">
                    <button title="Visualizar" onClick={() => abrirModal("caso")}>👁️</button>
                    <button title="Editar" onClick={() => abrirEditarEvidencia("idCaso")}>✏️</button>
                    <button title="Excluir">🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modais */}
        <ModalNovoCaso
          isOpen={modalAtual === "novoCaso"}
          onClose={fecharModal}
          onNext={() => abrirModal("caso")}
        />
        <ModalCaso
          isOpen={modalAtual === "caso"}
          onClose={fecharModal}
          onNext={() => abrirModal("envioEvidencia")}
        />
        <ModalEnvioEvidencia
          isOpen={modalAtual === "envioEvidencia"}
          onClose={fecharModal}
          onNext={() => abrirModal("editarEvidencia")}
        />
        <ModalEditarEvidencia
          isOpen={modalAtual === "editarEvidencia"}
          onClose={fecharModal}
          onNext={() => abrirModal("laudo")}
        />
        <ModalLaudo
          isOpen={modalAtual === "laudo"}
          onClose={fecharModal}
        />
      </main>
    </div>
  );
}
