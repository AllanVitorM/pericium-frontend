"use client";

import { useEffect, useState } from "react";
import { getByVitima } from "@/service/odontograma";

import { Eye, Trash2 } from "lucide-react";

interface Odontograma {
  _id: string;
  dentes: string;
  tipodente: string;
  observacoes: string;
  vitimaId: string;
}

interface Props {
  vitimaId: string;
  // onNext: (view: string, odontograma?: Odontograma) => void;
}

export default function TabelaOdontograma({ vitimaId, onNext }: Props) {
  const [odontogramas, setOdontogramas] = useState<Odontograma[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOdontograma, setSelectedOdontograma] =
    useState<Odontograma | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchOdontogramas = async () => {
    try {
      const data = await getByVitima(vitimaId);
      console.log("odontograma",data)
      setOdontogramas(data);
    } catch (error) {
      console.error("Erro ao buscar vítimas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (vitimaId) {
      fetchOdontogramas();
    }
  }, [vitimaId]);

  return (
    <>
      <div className="w-full overflow-x-auto rounded border border-gray-300">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-[#B6C0C7] text-gray-800">
              <th className="text-left px-4 py-3 font-semibold">DENTE</th>
              <th className="text-left px-4 py-3 font-semibold">TIPO</th>
              <th className="text-left px-4 py-3 font-semibold">OBSERVAÇÃO</th>
              <th className="text-left px-4 py-3 font-semibold">Ações</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center">
                  Carregando odontogramas...
                </td>
              </tr>
            ) : odontogramas.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center">
                  Nenhum odontograma encontrado
                </td>
              </tr>
            ) : (
              odontogramas.map((odonto, i) => (
                <tr
                  key={odonto._id}
                  className={`${
                    i % 2 === 0 ? "bg-[#E8EBED]" : "bg-white"
                  } hover:bg-gray-200 transition-colors`}
                >
                  <td className="px-4 py-3">{odonto.dentes}</td>
                  <td className="px-4 py-3">{odonto.tipodente}</td>
                  <td className="px-4 py-3">{odonto.observacoes}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-4 items-center">
                      <Eye
                        onClick={() => {
                          setSelectedOdontograma(odonto);
                          setIsModalOpen(true);
                        }}
                        className="cursor-pointer text-blue-600 hover:scale-110 transition-transform"
                      />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
