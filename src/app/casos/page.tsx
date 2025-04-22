"use client";
import { useState } from "react";
import ModalNovoCaso from "@/components/modalnovocaso";
import ModalCaso from "@/components/modalcasos";
import ModalEnvioEvidencia from "@/components/modalenvioevidencia";
import ModalEditarEvidencia from "@/components/modaleditarevidencia";
import ModalLaudo from "@/components/modallaudo";
import ProtectedRoute from "@/components/protect_route/protectRoute";
import Sidebar from "@/components/sidebar";
import AdminHeader from "@/components/headeradm";
import { ButtonandSearch } from "@/components/button";

export default function CasosPage() {
  const [modalAtual, setModalAtual] = useState<string | null>(null);

  const abrirModal = (nome: string) => setModalAtual(nome);
  const fecharModal = () => setModalAtual(null);

  const handleNext = (proximoModal: string) => {
    setModalAtual(proximoModal);
  };

  const abrirEditarEvidencia = (idCaso: string) => {
    setModalAtual("editarEvidencia");
  };

  return (
    <ProtectedRoute allowedRoles={["ADMIN", "PERITO", "ASSISTENTE"]}>
      <div className="flex h-screen">

        <div className="w-64">
          <Sidebar />
        </div>

        <main className="flex-1 bg-white p-6 overflow-y-auto">
              
          <AdminHeader id="242424" nome="Matheus Ramos" cargo="Administrador"/>
          <ButtonandSearch text="Novo caso" onClick={() => abrirModal("novoCaso")} type="button"/>
            
          <div className="overflow-auto rounded-lg border border-gray-300">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#B6C0C7] text-left">
                  {[
                    "ID do Caso",
                    "Laudo",
                    "Relatório",
                    "Data",
                    "Status",
                    "Responsáveis",
                    "Ação",
                  ].map((col) => (
                    <th key={col} className="px-4 py-2 font-medium">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 12 }).map((_, i) => (
                  <tr
                    key={i}
                    className={i % 2 === 0 ? "bg-[#E8EBED]" : "bg-[#B6C0C7]"}
                  >
                    {Array(6)
                      .fill("—")
                      .map((val, index) => (
                        <td key={index} className="px-4 py-2">
                          {val}
                        </td>
                      ))}
                    <td className="px-4 py-2 flex gap-2">
                      <button
                        title="Visualizar"
                        onClick={() => abrirModal("caso")}
                      >
                        👁️
                      </button>
                      <button
                        title="Editar"
                        onClick={() => abrirEditarEvidencia("idCaso")}
                      >
                        ✏️
                      </button>
                      <button title="Excluir">🗑️</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ModalNovoCaso
            isOpen={modalAtual === "novoCaso"}
            onClose={fecharModal}
            onNext={() => abrirModal("caso")}
          />
          <ModalCaso
            isOpen={modalAtual === "caso"}
            onClose={fecharModal}
            onNext={handleNext}
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
          <ModalLaudo isOpen={modalAtual === "laudo"} onClose={fecharModal} />
        </main>
      </div>
    </ProtectedRoute>
  );
}
