"use client";

import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement, // 👈 Necessário para gráficos de linha
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

import {
  Pie as PieChart,
  Bar as BarChart,
  Line as LineChart,
} from "react-chartjs-2";

import "chartjs-chart-box-and-violin-plot"; // para boxplot (futuro uso)

import api from "@/service/api";
import AdminHeader from "@/components/headeradm";
import Sidebar from "@/components/sidebar";

// Registrando todos os elementos necessários
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement, // 👈 aqui
  ArcElement,
  Tooltip,
  Legend,
  Title
);

interface DashboardData {
  tipos: Record<string, number>;
  locais: Record<string, number>;
  idades: number[];
  datas: string[];
  generos: [string, number][];
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get("/api/dados-graficos");
        setData(res.data);
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Carregando dados do dashboard...</div>;
  }

  if (!data) {
    return <div className="p-8 text-center text-red-500">Erro ao carregar os dados.</div>;
  }

  // Preparar dados para os gráficos
  const tiposData = {
    labels: Object.keys(data.tipos),
    datasets: [
      {
        label: "Tipos de Casos",
        data: Object.values(data.tipos),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#8bc34a", "#9c27b0"],
      },
    ],
  };

  const idadesData = {
    labels: data.idades.map((_, idx) => `Pessoa ${idx + 1}`),
    datasets: [
      {
        label: "Idades",
        data: data.idades,
        backgroundColor: "#36A2EB",
      },
    ],
  };

  const datasMap = data.datas.reduce((acc: Record<string, number>, mes) => {
    acc[mes] = (acc[mes] || 0) + 1;
    return acc;
  }, {});

  const datasData = {
    labels: Object.keys(datasMap),
    datasets: [
      {
        label: "Casos por mês",
        data: Object.values(datasMap),
        borderColor: "#FF6384",
        backgroundColor: "#FF6384",
        fill: false,
        tension: 0.3,
      },
    ],
  };

  const locaisData = {
    labels: Object.keys(data.locais),
    datasets: [
      {
        label: "Casos por Local",
        data: Object.values(data.locais),
        backgroundColor: "#FFCE56",
      },
    ],
  };

  const generosAgrupados: Record<string, number[]> = {};
  data.generos.forEach(([genero, idade]) => {
    if (!generosAgrupados[genero]) generosAgrupados[genero] = [];
    generosAgrupados[genero].push(idade);
  });

  const boxplotData = {
    labels: Object.keys(generosAgrupados),
    datasets: Object.entries(generosAgrupados).map(([genero, idades]) => ({
      label: genero,
      data: idades,
      backgroundColor: genero === "Masculino" ? "#36A2EB" : "#FF6384",
    })),
  };

  return (
    <div className="flex h-screen">
      <div className="lg:w-64">
        <Sidebar />
      </div>

      <main className="flex-1 bg-white p-6 overflow-y-auto">
        <AdminHeader />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-white p-4 shadow rounded border">
            <h2 className="text-lg font-bold mb-2">Distribuição de Tipos de Casos</h2>
            <PieChart data={tiposData} />
          </div>

          <div className="bg-white p-4 shadow rounded border">
            <h2 className="text-lg font-bold mb-2">Distribuição de Idades</h2>
            <BarChart data={idadesData} />
          </div>

          <div className="bg-white p-4 shadow rounded border">
            <h2 className="text-lg font-bold mb-2">Distribuição Temporal (por Mês)</h2>
            <LineChart data={datasData} />
          </div>

          <div className="bg-white p-4 shadow rounded border">
            <h2 className="text-lg font-bold mb-2">Casos por Localização</h2>
            <BarChart data={locaisData} />
          </div>

          <div className="bg-white p-4 shadow rounded border col-span-2">
            <h2 className="text-lg font-bold mb-2">Boxplot por Gênero (Idade das Vítimas)</h2>
            <BarChart data={boxplotData} />
          </div>
        </div>
      </main>
    </div>
  );
}
