"use client";
import { useState } from "react";
import { criarCaso } from "@/service/casos";

function parseJwt(token: string): any {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    console.error("Erro ao decodificar token jwt", e)
    return null;
  }
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalNovoCaso({ isOpen, onClose }: Props) {
  const [formData, setFormData] = useState<{
    titulo: string;
    descricao: string;
    status: "PENDENTE" | "EM ANDAMENTO" | "CONCLUIDO";
    dataAbertura: string;
    userId: string
  }>({
    titulo: "",
    descricao: "",
    status: "PENDENTE",
    dataAbertura: "",
    userId: ""
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
    setError("")
    const token = localStorage.getItem('token');
    if (!token) {
      setError("Token não encontrado");
      setLoading(false)
      return;
    }

    const decoded = parseJwt(token);
    const userId = decoded?.sub;

    try {
      await criarCaso({
        ...formData,
        dataAbertura: new Date(formData.dataAbertura).toISOString(),
        userId: userId,
      })
      onClose();
    } catch (error) {
      console.log("Erro ao criar caso", error);
    } finally {
      setLoading(false);
    }
  };


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl h-auto p-6 w-lg ">
        <div className="flex justify-center">
          <h2 className="text-3xl font-bold mb-4">Registrar Caso</h2>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div>
            <label className="text-lg font-semibold">Título*</label>
            <input
              type="text"
              placeholder="Titulo"
              className="w-full border rounded px-3 py-1 mt-1"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="text-lg font-semibold">Status*</label>
            <select
              className="w-full border rounded px-3 py-1 mt-1"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="PENDENTE" disabled>PENDENTE</option>
            </select>
          </div>

          <div>
            <label className="text-lg font-semibold">Data de abertura*</label>
            <input
              type="date"
              className="w-full border rounded px-3 py-1 mt-1"
              name="dataAbertura"
              value={formData.dataAbertura}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="text-lg font-semibold">Descrição*</label>
            <textarea
              placeholder="Escreva aqui"
              className="w-full border h-52 rounded px-3 py-3 mt-1"
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1 border rounded bg-gray-100 hover:bg-gray-200"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-1 bg-blue-900 text-white rounded hover:bg-blue-800"
            >
              {loading ? "Cadastrando..." : "Cadastrar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
