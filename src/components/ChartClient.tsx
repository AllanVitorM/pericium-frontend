"use client";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  Legend,
} from "recharts";

// Tipos para as props
interface ChartClientProps {
  barData: {
    name: string;
    pendentes?: number; // Tornando pendentes opcional
    concluidos?: number; // Tornando concluidos opcional
  }[];
  pieData: { name: string; value: number }[];
  barDataKeyPendentes: string;
  barDataKeyConcluidos: string;
  pendentesLabel: string;
  concluidosLabel: string;
}

const COLORS = ["#22c55e", "#3b82f6", "#f59e0b"];

const ChartClient: React.FC<ChartClientProps> = ({
  barData,
  pieData,
  barDataKeyPendentes,
  barDataKeyConcluidos,
  pendentesLabel,
  concluidosLabel,
}) => {
  return (
    <div className="grid grid-cols-6 md:grid-cols-12  gap-6 mt-12">
      {" "}
      {/* Grid de 12 colunas */}
      <div className="col-span-6 bg-white p-4 rounded-2xl shadow-md">
        {" "}
        {/* O gráfico de barra ocupa 6 colunas */}
        <h3 className="text-lg font-semibold mb-4">Casos por mês</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey={barDataKeyPendentes}
              fill="#8884d8"
              name={pendentesLabel} // Exibe o nome personalizado para "pendentes"
            />
            <Bar
              dataKey={barDataKeyConcluidos}
              fill="#82ca9d"
              name={concluidosLabel} // Exibe o nome personalizado para "concluidos"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="col-span-6 bg-white p-4 rounded-2xl shadow-md">
        {" "}
        {/* O gráfico de pizza ocupa 6 colunas */}
        <h3 className="text-lg font-semibold mb-4">Distribuição de casos</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              dataKey="value"
              label
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend
              verticalAlign="top" // Coloca a legenda no topo
              align="center" // Centraliza a legenda
              payload={pieData.map((entry, index) => ({
                value: entry.name, // Nome do item (ex: Casos, Evidências)
                type: "square", // Forma do ícone na legenda
                color: COLORS[index % COLORS.length], // Cor correspondente ao gráfico
              }))}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartClient;
