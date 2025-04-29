import api from "./api";

export interface CreateRelatorioDTO {
    title: string;
    descricao: string;
    caseId: string;
    userId: string
}

export const criarRelatorio =  async (dados: CreateRelatorioDTO) => {
    const token = localStorage.getItem("token");

        if (!token) {
            throw new Error("Token JWT não encontrado.");
          }

          console.log("Enviando dados para criação de laudo:", dados);
          
          const response = await api.post("/relatorios/createreport", dados, {
            headers: {
                Authorization: `Bearer ${token}`
            }
          })
          return response.data;
    
}