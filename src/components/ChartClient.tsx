'use client';
import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, CartesianGrid, Legend } from 'recharts';

// Tipos para as props
interface ChartClientProps {
  barData: {
    name: string;
    pendentes: number;
    concluidos: number;
  }[];
  pieData: { name: string; value: number }[];
}

const COLORS = ['#22c55e', '#3b82f6', '#f59e0b'];

const ChartClient: React.FC<ChartClientProps> = ({ barData, pieData }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-4 rounded-2xl shadow-md">
        <h3 className="text-lg font-semibold mb-4">Casos por mês</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="pendentes" stroke="#8884d8" />
            <Line type="monotone" dataKey="concluidos" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-white p-4 rounded-2xl shadow-md">
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
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ChartClient;
