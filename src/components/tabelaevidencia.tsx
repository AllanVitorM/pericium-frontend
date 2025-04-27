"use client";

import { useEffect, useState } from "react";
import { getEvidenciaByCaseId } from "@/service/evidencia";
import { Eye, Pencil, CircleX } from "lucide-react";

interface Evidencia {
  _id: string;
  title: string;
  dateRegister: string;
}

interface Props {
  caseId: string;
  onNext: (view: string, evidencia?: Evidencia) => void;
}

export default function TabelaEvidencia({ caseId, onNext }: Props) {
  const [evidencias, setEvidencias] = useState<Evidencia[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!caseId) return;

    const fetchEvidencias = async () => {
      try {
        const data = await getEvidenciaByCaseId(caseId);
        setEvidencias(data);
      } catch (error) {
        console.error("Erro na busca de evidências.", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvidencias();
  }, [caseId]);

  return (
    <div className="overflow-hidden rounded border border-gray-300">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#B6C0C7] text-gray-800">
              <th className="text-left px-3 py-2 font-semibold">Título</th>
              <th className="text-left px-3 py-2 font-semibold">Data</th>
              <th className="text-left px-3 py-2 font-semibold">Ação</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={3} className="px-3 py-4 text-center">
                  Carregando evidências
                </td>
              </tr>
            ) : evidencias.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-3 py-4 text-center">
                  Nenhuma evidência encontrada
                </td>
              </tr>
            ) : (
              evidencias.map((evidencia) => (
                <tr key={evidencia._id} className="bg-[#E8EBED]">
                  <td className="px-3 py-2">{evidencia.title}</td>
                  <td className="px-3 py-2">
                    {new Date(evidencia.dateRegister).toLocaleDateString()}
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex items-center justify-start gap-3">
                      <Eye
                        onClick={() => {
                          onNext("editarEvidencia", evidencia);
                        }}
                        className="cursor-pointer text-blue-600 hover:text-blue-800"
                      />
                      <CircleX className="cursor-pointer text-red-500 hover:text-red-800" />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
