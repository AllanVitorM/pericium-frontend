"use client";

import { useEffect, useState } from "react";
import { getEvidenciaByCaseId, deleteEvidencia } from "@/service/evidencia";
import { Eye, Trash2, FileText, Search } from "lucide-react";
import { getByPdf } from "@/service/laudo";

interface Evidencia {
  _id: string;
  title: string;
  dateRegister: string;
  local?: string;
  tipo?: string;
  peritoResponsavel?: string;
  descricao?: string;
}

interface visualizarLaudoProps {
  laudoId: string;
}

interface Props {
  caseId: string;
  onNext: (view: string, evidencia?: Evidencia) => void;
}

export default function TabelaEvidencia({ caseId, onNext }: Props) {
  const [evidencias, setEvidencias] = useState<Evidencia[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvidenciaId, setSelectedEvidenciaId] = useState<string | null>(
    null
  );

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


  const visualizarPdf = async (laudoId: string) => {
    try {
      const data = await getByPdf(laudoId);
      const pdfUrl = data.pdfUrl;
      window.open(pdfUrl, "_blank");
    } catch (error) {
      console.error("Erro ao visualizar PDF: ", error);
    }
  };


  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja deletar esta evidência?")) {
      try {
        await deleteEvidencia(id);
        alert("Evidência deletada com sucesso!");
        setEvidencias((prev) => prev.filter((ev) => ev._id !== id));
      } catch (error) {
        console.error("Erro ao deletar evidência:", error);
        alert("Erro ao deletar evidência.");
      }
    }
  };

  return (
    <div className="w-full overflow-x-auto rounded border border-gray-300">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="bg-[#B6C0C7] text-gray-800">
            <th className="text-left px-4 py-3 font-semibold whitespace-nowrap">
              Título
            </th>
            <th className="text-left px-4 py-3 font-semibold whitespace-nowrap">
              Data
            </th>
            <th className="text-left px-4 py-3 font-semibold whitespace-nowrap">
              Ações Evidências
            </th>
            <th>
              Ações Laudos
            </th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={4} className="px-4 py-6 text-center">
                Carregando evidências...
              </td>
            </tr>
          ) : evidencias.length === 0 ? (
            <tr>
              <td colSpan={4} className="px-4 py-6 text-center">
                Nenhuma evidência encontrada
              </td>
            </tr>
          ) : (
            evidencias.map((evidencia, i) => (
              <tr
                key={evidencia._id}
                className={`${
                  i % 2 === 0 ? "bg-[#E8EBED]" : "bg-[#B6C0C7]"
                } hover:bg-gray-200 transition-colors`}
              >
                <td className="px-4 py-3 whitespace-nowrap">
                  {evidencia.title}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {new Date(evidencia.dateRegister).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-4">
                    <Eye
                      onClick={() => onNext("editarEvidencia", evidencia)}
                      className="cursor-pointer text-blue-600 hover:scale-110 transition-transform"
                    />
                    <Trash2
                      onClick={() => handleDelete(evidencia._id)}
                      className="cursor-pointer text-red-500 hover:scale-110 transition-transform"
                    />
                  </div>
                </td>
                <td>
                <div className="flex items-center gap-4 ml-10">
                    <FileText
                      onClick={() => {
                        setSelectedEvidenciaId(evidencia._id);
                        onNext("laudo", evidencia);
                      }}
                    />
                    <Search 
                    onClick={() => visualizarPdf(evidencia._id)}
                    className="cursor-pointer text-green-600 hover:scale-110 transition-transform"
                    />
                    <Trash2
                      onClick={() => handleDelete(evidencia._id)}
                      className="cursor-pointer text-red-500 hover:scale-110 transition-transform"
                    />
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
