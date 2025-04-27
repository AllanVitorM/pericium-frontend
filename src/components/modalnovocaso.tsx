"use client";

import { useState } from "react";
import { criarCaso } from "@/service/casos";

function parseJwt(token: string): any {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    console.error("Erro ao decodificar token jwt", e);
    return null;
  }
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalNovoCaso({ isOpen, onClose }: Props) {
  const [formData, setFormData] = useState({
    titulo: "",
    descricao: "",
    status: "PENDENTE" as "PENDENTE" | "EM ANDAMENTO" | "CONCLUIDO",
    dataAbertura: "",
    userId: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const token = localStorage.getItem('token');
    if (!token) {
      setError("Token não encontrado");
      setLoading(false);
      return;
    }

    const decoded = parseJwt(token);
    const userId = decoded?.sub;

    try {
      await criarCaso({
        ...formData,
        dataAbertura: new Date(formData.dataAbertura).toISOString(),
        userId: userId,
      });
      onClose();
    } catch (error) {
      console.log("Erro ao criar caso", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-lg">
        <div className="flex justify-center">
          <h2 className="text-3xl font-bold mb-6 text-center">Registrar Caso</h2>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Título */}
          <div>
            <label className="text-base font-semibold">Título*</label>
            <input
              type="text"
              placeholder="Título"
              className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              required
            />
          </div>

          {/* Status */}
          <div>
            <label className="text-base font-semibold">Status*</label>
            <select
              className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="PENDENTE" disabled>PENDENTE</option>
            </select>
          </div>

          {/* Data de abertura */}
          <div>
            <label className="text-base font-semibold">Data de Abertura*</label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="dataAbertura"
              value={formData.dataAbertura}
              onChange={handleChange}
              required
            />
          </div>

          {/* Descrição */}
          <div>
            <label className="text-base font-semibold">Descrição*</label>
            <textarea
              placeholder="Escreva aqui"
              className="w-full border border-gray-300 rounded-md px-4 py-3 mt-1 h-40 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
              required
            />
          </div>

          {/* Botões */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="w-full md:w-auto px-6 py-2 border border-gray-300 rounded-md bg-gray-100 hover:bg-gray-200 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="w-full md:w-auto px-6 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition"
            >
              {loading ? "Cadastrando..." : "Cadastrar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
