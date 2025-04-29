import ModalCaso from "@/components/modalcasos";
import ModalEnvioEvidencia from "@/components/modalenvioevidencia";
import ModalEditarEvidencia from "@/components/modaleditarevidencia";
import ModalLaudo from "@/components/modallaudo";
import { useState, useEffect } from "react";
import { getCaso } from "@/service/casos";
import { Eye, Trash2 } from "lucide-react";
import ModalRelatorio from "@/components/modalrelatorio";

function parseJwt(token: string): any {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    console.error("Erro ao decodificar token jwt", e);
    return null;
  }
}

export default function TableCases({ reloadKey }: { reloadKey: number }) {
  const [modalAtual, setModalAtual] = useState<string | null>(null);
  const [casos, setCasos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [casoSelecionado, setCasoSelecionado] = useState<any | null>(null);
  const [evidenciaSelecionada, setEvidenciaSelecionada] = useState<any | null>(
    null
  );

  const abrirModal = (nome: string) => setModalAtual(nome);
  const fecharModal = () => setModalAtual(null);

  const handleNext = (
    modalName:
      | "envioEvidencia"
      | "caso"
      | "editarEvidencia"
      | "laudo"
      | "relatorio",
    data?: any
  ) => {
    if ((modalName === "editarEvidencia" || modalName === "laudo") && data) {
      setEvidenciaSelecionada(data);
    } else if (data) {
      setCasoSelecionado(data);
    }
    setModalAtual(modalName);
  };
  const carregarCasos = async () => {
    try {
      const token = localStorage.getItem("token");
      const usuario = token ? parseJwt(token) : null;

      const todoscasos = await getCaso();
      if (!usuario) {
        setCasos([]);
        return;
      }

      const casosFiltrados =
        usuario.role === "ADMIN"
          ? todoscasos
          : todoscasos.filter(
              (caso: any) => caso.userId?._id === usuario.sub
            );

      setCasos(casosFiltrados);
    } catch (error) {
      console.error("Caso não encontrado.", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    carregarCasos();
  }, [reloadKey]);

  return (
    <>
      <div className="w-full overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-[#B6C0C7] text-left">
              {[
                "ID do Caso",
                "Titulo",
                "Data",
                "Status",
                "Responsáveis",
                "Ações",
              ].map((col) => (
                <th
                  key={col}
                  className="px-4 py-3 font-semibold whitespace-nowrap"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="text-center py-6">
                  Carregando Caso...
                </td>
              </tr>
            ) : casos.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-6">
                  Nenhum caso encontrado.
                </td>
              </tr>
            ) : (
              casos.map((caso, i) => (
                <tr
                  key={caso._id || i}
                  className={`${
                    i % 2 === 0 ? "bg-[#E8EBED]" : "bg-[#B6C0C7]"
                  } hover:bg-gray-200 transition-colors`}
                >
                  <td className="px-4 py-2 whitespace-nowrap">{caso._id}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{caso.titulo}</td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {new Date(caso.dataAbertura).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">{caso.status}</td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {caso.userId?.name || "-"}
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex items-center gap-3">
                      <Eye
                        onClick={() => {
                          if (caso.status !== "Concluído") {
                            setCasoSelecionado(caso);
                            abrirModal("caso");
                          }
                        }}
                        className={`transition-transform ${
                          caso.status === "Concluído"
                            ? "text-gray-400 cursor-not-allowed"
                            : "cursor-pointer text-blue-600 hover:scale-110"
                        }`}
                      />
                      <Trash2
                        onClick={() => {
                          if (caso.status !== "Concluído") {
                            // aqui você colocaria a lógica de deletar
                          }
                        }}
                        className={`transition-transform ${
                          caso.status === "Concluído"
                            ? "text-gray-400 cursor-not-allowed"
                            : "cursor-pointer text-red-500 hover:scale-110"
                        }`}
                      />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <ModalCaso
        isOpen={modalAtual === "caso"}
        onClose={() => {
          fecharModal();
          carregarCasos();
        }}
        onNext={handleNext}
        casoId={casoSelecionado?._id}
      />
      {modalAtual === "envioEvidencia" && casoSelecionado && (
        <ModalEnvioEvidencia
          isOpen={modalAtual === "envioEvidencia"}
          onClose={() => {
            fecharModal();
            fetchEvidencias();
          }}
          casoSelecionado={casoSelecionado}
        />
      )}
      {modalAtual === "editarEvidencia" && evidenciaSelecionada && (
        <ModalEditarEvidencia
          isOpen
          onClose={() => {
            fecharModal();
            fetchEvidencias();
          }}
          onNext={() => handleNext("laudo", evidenciaSelecionada)}
          evidencia={evidenciaSelecionada}
        />
      )}
      {evidenciaSelecionada && (
        <ModalLaudo
          isOpen={modalAtual === "laudo"}
          evidenciaId={evidenciaSelecionada._id}
          onClose={fecharModal}
        />
      )}
      {modalAtual === "relatorio" && casoSelecionado && (
        <ModalRelatorio
          isOpen={true}
          onClose={fecharModal}
          caseId={casoSelecionado._id}
        />
      )}
    </>
  );
}
