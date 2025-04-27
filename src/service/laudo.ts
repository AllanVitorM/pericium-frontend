import api from "@/service/api";

export interface CreateLaudoDTO {
    title: string;
    descricao: string;
    evidenciaId: string;
    userId: string
}

export const criarLaudo =  async (dados: CreateLaudoDTO) => {
    const token = localStorage.getItem("token");

        if (!token) {
            throw new Error("Token JWT não encontrado.");
          }

          const { pdfUrl, ...SemPdf } = dados
          console.log("Requisição Axios POST para /laudos/createreport", dados);

          const response = await api.post("/laudos/createreport", SemPdf, {
            headers: {
                Authorization: `Bearer ${token}`
            }
          })
          return response.data;
    
}

export const assinarLaudo = async (laudoId: string, peritoId: string) => {

    return api.patch(`/laudos/sign/${laudoId}`,
        { peritoId }
    )
}

export const buscarLaudo = async (evidenciaId: string) => {
    const response = await api.get(`/laudos/evidence/${evidenciaId}`);
    return response.data;
}