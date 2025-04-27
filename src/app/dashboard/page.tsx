'use client';
import Image from "next/image";
import logo from "@/assets/logo.png";
import { useEffect, useState } from "react";
import ChartClient from '@/components/ChartClient';

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

      <main className="flex-1 bg-white p-6">
        <div className="flex justify-between items-center bg-[#B6C0C7] px-6 py-2 rounded-full mb-6 text-sm">
          <span><strong>ID:</strong> 1056782</span>
          <span><strong>Nome:</strong> João da Silva Santos</span>
          <span><strong>Cargo:</strong> Administrador</span>
        </div>

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