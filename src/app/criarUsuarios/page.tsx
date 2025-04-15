import Sidebar from "@/components/sidebar";
import AdminHeader from "@/components/headeradm";
import FuncionariosSection from "@/components/fucionariosection";

export default function FuncionariosPage() {
  return (
    <div className="flex h-screen">
      {/* Sidebar fixa na lateral, sem sobrepor o conteúdo */}
      <div className="w-64">
        <Sidebar />
      </div>
      {/* Conteúdo principal ocupa o restante da tela */}
      <main className="flex-1 bg-white p-6 overflow-y-auto">
        {/* Topo com ID, nome e cargo */}
        <AdminHeader id="242424" nome="Matheus Ramos" cargo="Administrador"/>
        <FuncionariosSection/>
      </main>
    </div>
  );
}
