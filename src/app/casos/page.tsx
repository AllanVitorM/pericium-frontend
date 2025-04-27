"use client";
import { useState } from "react";
import ModalNovoCaso from "@/components/modalnovocaso";
import ProtectedRoute from "@/components/protect_route/protectRoute";
import Sidebar from "@/components/sidebar";
import AdminHeader from "@/components/headeradm";
import { ButtonandSearch } from "@/components/button";
import TableCases from "@/components/tabelacasos";

export default function CasosPage() {
  const [modalAtual, setModalAtual] = useState<string | null>(null);

  const abrirModal = (nome: string) => setModalAtual(nome);
  const fecharModal = () => setModalAtual(null);

  return (
    <ProtectedRoute allowedRoles={["ADMIN", "PERITO", "ASSISTENTE"]}>
      <div className="flex h-screen">

          <div className="lg:w-64">
            <Sidebar />
          </div>

        <main className="flex-1 bg-white p-6 overflow-y-auto">
              
          <AdminHeader/>
          <ButtonandSearch text="Novo caso" onClick={() => abrirModal("novoCaso")} type="button"/>
            
          <div className="overflow-auto rounded-lg border border-gray-300">
            <TableCases />
          </div>

          <ModalNovoCaso
            isOpen={modalAtual === "novoCaso"}
            onClose={fecharModal}
          />
        </main>
      </div>
    </ProtectedRoute>
  );
}