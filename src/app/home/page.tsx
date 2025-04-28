"use client";

import { useEffect, useState } from "react";
import ChartClient from "@/components/ChartClient";
import api from "@/service/api";
import Sidebar from "@/components/sidebar";
import AdminHeader from "@/components/headeradm";

interface DashboardData {
  totalCasos: number;
  totalEvidencias: number;
  totalLaudos: number;
  casosPendentes: number;
  casosConcluidos: number;
  evidenciasSemLaudo: number;
  percentualEvidenciasComcaLaudo: number;
  ultimoCasoCriado: string | null;
}

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const response = await api.get("/api/dashboard/resumo");
        setDashboardData(response.data?.data);
      } catch (error) {
        console.error("Erro ao buscar dados do dashboard:", error);
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

  if (!dashboardData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Erro ao carregar dados do dashboard.</p>
      </div>
    );
  }

  // Atualizando para a estrutura correta, com "pendentes" e "concluidos"
  const barData = [
    {
      name: "Total de Evidências",

      concluidos: dashboardData.totalEvidencias, // ou outro valor, se necessário
    },
    {
      name: "Total de Laudos",
      concluidos: dashboardData.totalLaudos,
    },
    {
      name: "Casos Pendentes",
      pendentes: dashboardData.casosPendentes,
    },
  ];

  const pieData = [
    { name: "Casos", value: dashboardData.totalCasos },
    { name: "Evidências", value: dashboardData.totalEvidencias },
  ];

  return (
    <div className="flex h-screen">
      <div className="lg:w-64">
        <Sidebar />
      </div>

      <main className="flex-1 bg-white p-6 overflow-y-auto">
        <AdminHeader />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="bg-white p-4 rounded-lg shadow border">
            <p className="text-gray-500">Casos Pendentes</p>
            <p className="text-2xl font-bold">{dashboardData.totalCasos}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border">
            <p className="text-gray-500">Total de Evidências</p>
            <p className="text-2xl font-bold">
              {dashboardData.totalEvidencias}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border">
            <p className="text-gray-500">Total de Evidências</p>
            <p className="text-2xl font-bold">{dashboardData.totalLaudos}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-8 mt-12">
          <div className="w-full flex flex-col md:w-full">
    
            {/* Aumentando a largura do gráfico */}
            <ChartClient
              barData={barData}
              pieData={pieData}
              barDataKeyPendentes="pendentes" // Nome da chave real
              barDataKeyConcluidos="concluidos" // Nome da chave real
              pendentesLabel="Casos Pendentes" // Nome personalizado para pendentes
              concluidosLabel="Total Casos e Evidências" // Nome personalizado para concluidos
            />
          </div>
        </div>

        {dashboardData.ultimoCasoCriado && (
          <div className="mt-8 text-center text-gray-600">
            Último caso criado:{" "}
            {new Date(dashboardData.ultimoCasoCriado).toLocaleString("pt-BR")}
          </div>
        )}
      </main>
    </div>
  );
}
