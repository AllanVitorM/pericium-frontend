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

          console.log("Enviando dados para criação de laudo:", dados);
          
          const response = await api.post("/laudos/createreport", dados, {
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

export const getByPdf = async (laudoId: string) => {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("Token não encontrado.");
    }

    const response = await api.get(`/laudos/pdf/${laudoId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data
}