"use client";

import { useEffect, useState } from "react";
import { getVitimaByCaseId, deleteVitima } from "@/service/vitima";
import ModalEditarVitima from "./modaleditarvitima";
import { Eye, Trash2 } from "lucide-react";

interface Vitima {
  _id: string;
  NIC: string;
  nome: string;
  genero: string;
  documento: number;
  endereco: string;
  etnia: "BRANCO" | "PRETO" | "AMARELO" | "INDIGENA";
  caseId: string;
}

interface Props {
  caseId: string;
  onNext: (view: string, vitima?: Vitima) => void;
}

export default function TabelaVitima({ caseId }: Props) {
  const [vitimas, setVitimas] = useState<Vitima[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVitima, setSelectedVitima] = useState<Vitima | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchVitimas = async () => {
    try {
      const data = await getVitimaByCaseId(caseId);
      setVitimas(data);
    } catch (error) {
      console.error("Erro ao buscar vítimas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (caseId) {
      fetchVitimas();
    }
  }, [caseId]);

  const atualizarVitimaNaTabela = (vitimaAtualizada: Vitima) => {
    setVitimas((prevVitimas) =>
      prevVitimas.map((v) =>
        v._id === vitimaAtualizada._id ? vitimaAtualizada : v
      )
    );
  };

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja deletar esta vítima?")) {
      try {
        await deleteVitima(id);
        alert("Vítima deletada com sucesso!");
        fetchVitimas();
      } catch (error) {
        console.error("Erro ao deletar vítima:", error);
        alert("Erro ao deletar vítima.");
      }
    }
  };

  return (
    <>
      <div className="w-full overflow-x-auto rounded border border-gray-300">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-[#B6C0C7] text-gray-800">
              <th className="text-left px-4 py-3 font-semibold">CPF</th>
              <th className="text-left px-4 py-3 font-semibold">NOME</th>
              <th className="text-left px-4 py-3 font-semibold">ETNIA</th>
              <th className="text-left px-4 py-3 font-semibold">Ações</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center">
                  Carregando vítimas...
                </td>
              </tr>
            ) : vitimas.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center">
                  Nenhuma vítima encontrada
                </td>
              </tr>
            ) : (
              vitimas.map((vitima, i) => (
                <tr
                  key={vitima._id}
                  className={`${
                    i % 2 === 0 ? "bg-[#E8EBED]" : "bg-white"
                  } hover:bg-gray-200 transition-colors`}
                >
                  <td className="px-4 py-3">{vitima.documento}</td>
                  <td className="px-4 py-3">{vitima.nome}</td>
                  <td className="px-4 py-3">{vitima.etnia}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-4 items-center">
                      <Eye
                        onClick={() => {
                          setSelectedVitima(vitima);
                          setIsModalOpen(true);
                        }}
                        className="cursor-pointer text-blue-600 hover:scale-110 transition-transform"
                      />
                      <Trash2
                        onClick={() => handleDelete(vitima._id)}
                        className="cursor-pointer text-red-600 hover:scale-110 transition-transform"
                      />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <ModalEditarVitima
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedVitima(null);
        }}
        onNext={() => {}}
        vitima={selectedVitima}
        onUpdate={atualizarVitimaNaTabela} // <- IMPORTANTE
      />
    </>
  );
}
