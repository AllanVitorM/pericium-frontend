'use client'
import Sidebar from "@/components/sidebar";
import AdminHeader from "@/components/headeradm";
import TableSection from "@/components/tablesection";
import ProtectedRoute from "@/components/protect_route/protectRoute";
import { ButtonandSearch } from "@/components/button";
import ModalUser from "@/components/modalUser";
import { useState } from "react";

export default function FuncionariosPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <div className="flex h-screen">
        <div className="lg:w-64">
                    <Sidebar />
        </div>
        <main className="flex-1 bg-white p-6 overflow-y-auto">
          <AdminHeader />
          <ButtonandSearch text="Novo Usuário" onClick={openModal}/>
          <TableSection />
        </main>
      </div>

      <ModalUser isOpen={isModalOpen} onClose={closeModal} />
    </ProtectedRoute>
  );
}
