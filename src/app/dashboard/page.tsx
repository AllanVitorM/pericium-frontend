'use client';


import Image from "next/image";
import logo from "@/assets/Pericium_azul.png";
import { useEffect, useState } from "react";
import ChartClient from '@/components/ChartClient';
import api from "@/service/api";
import Sidebar from "@/components/sidebar";
import AdminHeader from "@/components/headeradm";
        
interface DashboardData {
  casosHoje: number;
  emAnalise: number;
  concluidos: number;
  casosPorMes: { mes: string; pendentes: number; concluidos: number }[];
  casosPorTipo: { tipo: string; quantidade: number }[];
}


export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    casosHoje: 0,
    emAnalise: 0,
    concluidos: 0,
    casosPorMes: [],
    casosPorTipo: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const response = await api.get('/api/dashboard/resumo');
        const { porStatus = [], porTipo = [] } = response.data?.data || {};

        const emAndamento = porStatus.find((s: any) => s.status?.toLowerCase().includes('andamento'))?.total || 0;
        const finalizados = porStatus.find((s: any) => s.status?.toLowerCase().includes('finalizado'))?.total || 0;
        const pendentes = porStatus.find((s: any) => s.status?.toLowerCase().includes('pendente'))?.total || 0;

        const tiposFormatados = porTipo.map((item: any) => ({
          tipo: item.tipo ?? 'Sem Tipo',
          quantidade: item.total,
        }));

        setDashboardData({
          casosHoje: pendentes,
          emAnalise: emAndamento,
          concluidos: finalizados,
          casosPorMes: [
            { mes: 'Janeiro', pendentes: 10, concluidos: 5 },
            { mes: 'Fevereiro', pendentes: 7, concluidos: 3 },
            { mes: 'Março', pendentes: 8, concluidos: 6 },
          ], // Mock correto
          casosPorTipo: tiposFormatados,
        });

      } catch (error) {
        console.error('Erro ao buscar dados do dashboard:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Carregando dashboard...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      {/* Aside */}
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

      {/* Main Content */}
      <main className="flex-1 bg-white p-6 overflow-y-auto">
        <div className="flex justify-between items-center bg-[#B6C0C7] px-6 py-2 rounded-full mb-6 text-sm">
          <span><strong>ID:</strong> 1056782</span>
          <span><strong>Nome:</strong> João da Silva Santos</span>
          <span><strong>Cargo:</strong> Administrador</span>
        </div>


      <div className="lg:w-64">
                  <Sidebar />
      </div>


        {dashboardData.casosPorTipo.length > 0 || dashboardData.casosPorMes.length > 0 ? (
          <ChartClient
            barData={dashboardData.casosPorMes.map((item) => ({
              name: item.mes,
              pendentes: item.pendentes,
              concluidos: item.concluidos,
            }))}
            pieData={dashboardData.casosPorTipo.map((tipo) => ({
              name: tipo.tipo,
              value: tipo.quantidade,
            }))}
          />
        ) : (
          <div className="text-center text-gray-500">
            Nenhum dado disponível para exibir os gráficos.
          </div>
        )}

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="bg-white p-4 rounded-lg shadow border">
            <p className="text-gray-500">Casos Pendentes</p>
            <p className="text-2xl font-bold">{dashboardData.casosHoje}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border">
            <p className="text-gray-500">Em Análise</p>
            <p className="text-2xl font-bold">{dashboardData.emAnalise}</p>


          </div>
          {/* Gráfico principal */}
          <ChartClient barData={dashboardData.casosPorMes} pieData={[
            { name: 'Finalizados', value: dashboardData.concluidos },
            { name: 'Em andamento', value: dashboardData.emAnalise },
            { name: 'Pendentes', value: dashboardData.casosHoje },
          ]} />
          {/* Cards de status */}
          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="bg-white p-4 rounded-lg shadow border">
              <p className="text-gray-500">Casos Hoje</p>
              <p className="text-2xl font-bold">{dashboardData.casosHoje}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow border">
              <p className="text-gray-500">Em Análise</p>
              <p className="text-2xl font-bold">{dashboardData.emAnalise}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow border">
              <p className="text-gray-500">Concluídos</p>
              <p className="text-2xl font-bold">{dashboardData.concluidos}</p>
            </div>
          </div>
      </main>
    </div>
  );
}
