'use client'

import { useEffect, useState } from "react"
import { getEvidenciaByCaseId } from "@/service/evidencia"
import { Eye, Pencil, CircleX } from "lucide-react";
import { deleteEvidencia } from "@/service/evidencia";

import { useEffect, useState } from "react";
import { getEvidenciaByCaseId } from "@/service/evidencia";
import { Eye, FileText, CircleX } from "lucide-react";
import ModalLaudo from "./modallaudo";

interface Evidencia {
    _id: string;
    title: string;
    dateRegister: string;
    local?: string;
    tipo?: string;
    peritoResponsavel?: string;
    descricao?: string;
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
    const handleDelete = async (id: string) => {
        if (confirm("Tem certeza que deseja deletar esta evidência?")) {
            try {
                await deleteEvidencia(id);
                alert("Evidência deletada com sucesso!");
                // Aqui você pode atualizar a lista para remover a evidência da tela
            } catch (error) {
                console.error("Erro ao deletar evidência:", error);
                alert("Erro ao deletar evidência.");
            }
        }
    };

    fetchEvidencias();
  }, [caseId]);


  return (
    <div className="overflow-hidden rounded border border-gray-300">
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
            evidencias.map((evidencias) => (
              <tr key={evidencias._id} className="bg-[#E8EBED]">
                <td className="px-3 py-2">{evidencias.title}</td>
                <td>
                  {new Date(evidencias.dateRegister).toLocaleDateString()}
                </td>
                <td className="flex flex-row items-center mt-1 gap-3">
                  <Eye
                    onClick={() => {
                      onNext("editarEvidencia", evidencias);
                    }}
                  />
                  <FileText
                    onClick={() => {
                      setSelectedEvidenciaId(evidencias._id);
                      onNext("laudo", evidencias);
                    }}
                  />
                  <CircleX
                    className="text-red-500 hover:text-red-800 cursor-pointer"
                    onClick={() => handleDelete(evidencias._id)}
                     />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

    </div>
  );
}
