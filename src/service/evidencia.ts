import api from "@/service/api"

interface CreateEvidenciaDTO {
    title: string;
    descricao: string;
    tipo: string;
    local: string;
    dateRegister: Date
    imageUrl: string;
    caseId: string;
  }

  export const criarEvidencia = async (dados: CreateEvidenciaDTO) => {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("Token JWT não encontrado.");
      }

    const response = await api.post("/evidencias/createevidence", dados, {
        headers: {
            Authorization: `Bearer ${token}`
        }
        
    })
    return response.data
  }

  export const getEvidencia = async(caseId: string) => {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("Token JWT não encontrado.");
    }

    const response = await api.get("/evidencias/", {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params: caseId ? { caseId } : {},
    })
    return response.data
  }

  export const updateEvidencia = async(caseId: string) => {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("Token JWT não encontrado.");
    }

    const response = await api.put("/evidencias/:id", {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params: caseId ? { caseId } : {},
    })
    return response.data
  }

  export const deleteEvidencia = async(caseId: string) => {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("Token JWT não encontrado.");
    }

    const response = await api.delete("/evidencias/:id", {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params: caseId ? { caseId } : {},
    })
    return response.data
  }