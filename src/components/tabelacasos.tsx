import ModalCaso from "@/components/modalcasos";
import ModalEnvioEvidencia from "@/components/modalenvioevidencia";
import ModalEditarEvidencia from "@/components/modaleditarevidencia";
import ModalLaudo from "@/components/modallaudo";
import { useState, useEffect } from "react";
import { getCaso } from "@/service/casos";
import { Eye, View } from "lucide-react";

import { CircleX } from "lucide-react";

function parseJwt(token: string): any {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    console.error("Erro ao decodificar token jwt", e);
    return null;
  }
}

export default function TableCases() {
  const [modalAtual, setModalAtual] = useState<string | null>(null);
  const [casos, setCasos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [casoSelecionado, setCasoSelecionado] = useState<any | null>(null);
  const [modalAberto, setModalAberto] = useState<
    "caso" | "envioEvidencia" | null
  >(null);
  const [evidenciaSelecionada, setEvidenciaSelecionada] = useState(null);

  const abrirModal = (nome: string) => setModalAtual(nome);
  const fecharModal = () => setModalAtual(null);

  const handleNext = (
    modalName: "envioEvidencia" | "caso" | "editarEvidencia" | "laudo",
    data?: any
  ) => {
    if (modalName === "editarEvidencia" && data) {
      setEvidenciaSelecionada(data);
    } else if (data) {
      setCasoSelecionado(data);
    }
    setModalAtual(modalName);
  };


  const abrirEditarEvidencia = (casos: string) => {
    setModalAtual("editarEvidencia");
  };

  useEffect(() => {
    const carregarCasos = async () => {
      try {
        const token = localStorage.getItem("token");
        const usuario = token ? parseJwt(token) : null;

        const todoscasos = await getCaso();
        setCasos(todoscasos);

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
    carregarCasos();
  }, []);

  return (
    <>
      <table className="w-full text-sm ">
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
              <th key={col} className="px-4 py-2 font-medium">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={8} className="text-center py-4">
                {" "}
                Carregando Caso...
              </td>
            </tr>
          ) : casos.length === 0 ? (
            <tr>
              <td colSpan={8} className="text-center py-4">
                Nenhum caso encontrado.
              </td>
            </tr>
          ) : (
            casos.map((casos, i) => (
              <tr
                key={casos._id || i}
                className={i % 2 == 0 ? "bg-[#E8EBED]" : "bg-[#B6C0C7]"}
              >
                <td>{casos._id}</td>
                <td>{casos.titulo}</td>
                <td>{new Date(casos.dataAbertura).toLocaleDateString()}</td>
                <td>{casos.status}</td>
                <td>{casos.userId?.name || "-"}</td>
                <td>
                  <div className="flex gap-3">
                    <Eye
                      onClick={() => {
                        setCasoSelecionado(casos);
                        abrirModal("caso");
                      }}
                      className="cursor-pointer"
                    />
                    <CircleX />
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <ModalCaso
        isOpen={modalAtual === "caso"}
        onClose={fecharModal}
        onNext={handleNext}
        casoId={casoSelecionado?._id}
      />
      {modalAtual === "envioEvidencia" && casoSelecionado && (
        <ModalEnvioEvidencia
          isOpen={modalAtual === "envioEvidencia"}
          onClose={() => setModalAtual(null)}
          casoSelecionado={casoSelecionado}
        />
      )}
      {modalAtual === "editarEvidencia" && evidenciaSelecionada && (
        <ModalEditarEvidencia
          isOpen
          onClose={fecharModal}
          onNext={() => abrirModal("laudo")}
          evidencia={evidenciaSelecionada}
        />
      )}
      <ModalLaudo isOpen={modalAtual === "laudo"} onClose={fecharModal} />
    </>
  );
}
