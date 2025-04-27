'use client';

import { useEffect, useState } from "react";
import ChartClient from '@/components/ChartClient';
import Sidebar from "@/components/sidebar";
import AdminHeader from "@/components/headeradm";

export default function DashboardPage() {
  // Dados mockados para os cards
  const [dashboardData, setDashboardData] = useState({
    casosHoje: 15,
    emAnalise: 23,
    concluidos: 42,
    casosPorMes: [
      { name: 'Jan', casos: 10 },
      { name: 'Fev', casos: 20 },
      { name: 'Mar', casos: 15 },
    ],
  });

  // Caso queira adicionar algum tipo de carregamento ou delay, pode usar o useEffect para simular isso
  useEffect(() => {
    // Aqui você pode simular a busca de dados ou fazer alguma lógica de atualização
    setTimeout(() => {
      setDashboardData({
        casosHoje: 20,
        emAnalise: 30,
        concluidos: 50,
        casosPorMes: [
          { name: 'Jan', casos: 12 },
          { name: 'Fev', casos: 18 },
          { name: 'Mar', casos: 25 },
        ],
      });
    }, 2000);  // Simula a demora no carregamento dos dados
  }, []);

  return (
    <div className="flex h-screen">

      <div className="lg:w-64">
                  <Sidebar />
      </div>

      <main className="flex-1 bg-white p-6 overflow-y-auto">
        <AdminHeader/>
          <div className="mb-8">
            <h1 className="text-2xl font-bold">Dashboard</h1>
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
