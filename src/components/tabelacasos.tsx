import ModalCaso from "@/components/modalcasos";
import ModalEnvioEvidencia from "@/components/modalenvioevidencia";
import ModalEditarEvidencia from "@/components/modaleditarevidencia";
import ModalLaudo from "@/components/modallaudo";
import { useState, useEffect } from "react";
import { getCaso } from "@/service/casos";
import { Eye, CircleX } from "lucide-react";

// Tipagem dos dados de um Caso
type Caso = {
  _id: string;
  titulo: string;
  dataAbertura: string;
  status: string;
  userId?: {
    _id: string;
    name: string;
  };
  [key: string]: unknown;
};

// Tipagem dos dados de uma Evidência (simples por enquanto)
type Evidencia = {
  _id: string;
  title: string;            // Adicionando
  dateRegister: string;     // Adicionando
  [key: string]: unknown;
};

// Tipagem do payload do JWT
type UsuarioJWT = {
  sub: string;
  role: "ADMIN" | "PERITO" | "ASSISTENTE" | string;
};

function parseJwt(token: string): UsuarioJWT | null {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    console.error("Erro ao decodificar token jwt", e);
    return null;
  }
}


export default function TableCases() {
  const [modalAtual, setModalAtual] = useState<string | null>(null);
  const [casos, setCasos] = useState<Caso[]>([]);
  const [loading, setLoading] = useState(true);
  const [casoSelecionado, setCasoSelecionado] = useState<Caso | null>(null);
  const [evidenciaSelecionada, setEvidenciaSelecionada] =
    useState<Evidencia | null>(null);

  const abrirModal = (nome: string) => setModalAtual(nome);
  const fecharModal = () => setModalAtual(null);

  const handleNext = (
    modalName: "envioEvidencia" | "caso" | "editarEvidencia" | "laudo",
    data?: unknown
  ) =>{
    if ((modalName === "editarEvidencia" || modalName === "laudo") && data) {
      setEvidenciaSelecionada(data as Evidencia);
    } else if (data) {
      setCasoSelecionado(data as Caso);
    }
    setModalAtual(modalName);
  };

  useEffect(() => {
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
                (caso: Caso) => caso.userId?._id === usuario.sub
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
                          setCasoSelecionado(caso);
                          abrirModal("caso");
                        }}
                        className="cursor-pointer text-blue-600 hover:scale-110 transition-transform"
                      />
                      <CircleX className="cursor-pointer text-red-500 hover:scale-110 transition-transform" />
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
        onClose={fecharModal}
        onNext={handleNext}
        casoId={casoSelecionado?._id ?? ""}
      />
      {modalAtual === "envioEvidencia" && casoSelecionado && (
        <ModalEnvioEvidencia
          isOpen
          onClose={fecharModal}
          casoSelecionado={{
            title: casoSelecionado.titulo,
            descricao: casoSelecionado.status,
            tipo: "Tipo Exemplo",
            local: "Local Exemplo",
            dateRegister: casoSelecionado.dataAbertura,
            caseId: casoSelecionado._id,
          }}
        />
      )}

      {modalAtual === "editarEvidencia" && evidenciaSelecionada && (
        <ModalEditarEvidencia
          isOpen
          onClose={fecharModal}
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
    </>
  );
}
