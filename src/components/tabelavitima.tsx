"use client";

import { useEffect, useState } from "react";
import { getVitimaByCaseId } from "@/service/vitima";
import { Eye } from "lucide-react";


interface Vitima {
  nome: string;
  genero: string;
  documento: number;
  etnia: "BRANCO" | "PRETO" | "AMARELO" | "INDIGENA";
}

// interface visualizarLaudoProps {
//   laudoId: string;
// }

interface Props {
  caseId: string;
  onNext: (view: string, vitima?: Vitima) => void;
}

export default function TabelaVitima({ caseId, onNext }: Props) {
  const [vitimas, setVitimas] = useState<Vitima[]>([]);
  const [loading, setLoading] = useState(true);
//   const [selectedVitimaId, setSelectedVitimaId] = useState<string | null>(
//     null
//   );

  useEffect(() => {
    if (!caseId)  {
      return ;
    }
    const fetchVitimas = async () => {
      try {
        const data = await getVitimaByCaseId(caseId);
        setVitimas(data);
        console.log(data)
      } catch (error) {
        console.error("Erro na busca de Vitimas.", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVitimas();
  }, [caseId]);


//   const handleDelete = async (id: string) => {
//     if (confirm("Tem certeza que deseja deletar esta evidência?")) {
//       try {
//         await deleteEvidencia(id);
//         alert("Evidência deletada com sucesso!");
//         setEvidencias((prev) => prev.filter((ev) => ev._id !== id));
//       } catch (error) {
//         console.error("Erro ao deletar evidência:", error);
//         alert("Erro ao deletar evidência.");
//       }
//     }
//   };

  return (
    <div className="w-full overflow-x-auto rounded border border-gray-300">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="bg-[#B6C0C7] text-gray-800">
            <th className="text-left px-4 py-3 font-semibold whitespace-nowrap">
              CPF
            </th>
            <th className="text-left px-4 py-3 font-semibold whitespace-nowrap">
              NOME
            </th>
            <th className="text-left px-4 py-3 font-semibold whitespace-nowrap">
              ETNIA
            </th>
            <th className="text-left px-4 py-3 font-semibold whitespace-nowrap">
              Ações Vitimas
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
          ) : vitimas.length === 0 ? (
            <tr>
              <td colSpan={4} className="px-4 py-6 text-center">
                Nenhuma vitima encontrada
              </td>
            </tr>
          ) : (
            vitimas.map((vitima, i) => (
              <tr
                key={vitima._id}
                className={`${
                  i % 2 === 0 ? "bg-[#E8EBED]" : "bg-[#B6C0C7]"
                } hover:bg-gray-200 transition-colors`}
              >
                <td className="px-4 py-3 whitespace-nowrap">
                  {vitima.documento}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {vitima.nome}
                </td>
                 <td className="px-4 py-3 whitespace-nowrap">
                  {vitima.etnia}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-4">
                    <Eye
                      onClick={() => onNext("editarVitima", vitima)}
                      className="cursor-pointer text-blue-600 hover:scale-110 transition-transform"
                    />
                    {/* <Trash2
                      onClick={() => handleDelete(vitima._id)}
                      className="cursor-pointer text-red-500 hover:scale-110 transition-transform"
                    /> */}
                  </div>
                </td>
                {/* <td>
                  <div className="flex items-center gap-4 ml-10">
                    <FileText
                      onClick={() => {
                        setSelectedEvidenciaId(evidencia._id);
                        onNext("laudo", evidencia);
                      }}
                    />
                    <Trash2
                      onClick={() => handleDelete(evidencia._id)}
                      className="cursor-pointer text-red-500 hover:scale-110 transition-transform"
                    />
                  </div>
                </td> */}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
