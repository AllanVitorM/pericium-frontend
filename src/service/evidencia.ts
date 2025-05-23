import api from "@/service/api"

interface CreateEvidenciaDTO {
    title: string;
    descricao: string;
    tipo: string;
    local: string;
    dateRegister: string
    imageUrl: string;
    caseId: string;
  }
  interface Evidencia {
    _id: string;
    title: string;
    dateRegister: string;
    local?: string;
    tipo?: string;
    peritoResponsavel?: string;
    descricao?: string;
  }

  export const criarEvidencia = async (dados: FormData) => {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("Token JWT não encontrado.");
      }

      try {
        const response = await api.post("/evidencias/createevidence", dados, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
    
        return response.data;
      } catch (error: any) {
        console.error("Erro no Axios:", error.response?.data || error.message || error);
        throw error;
      }
    };

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

  export const getEvidenciaByCaseId = async(caseId: string) => {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("Token JWT não encontrado.");
    }

    const response = await api.get(`/evidencias/bycase/${caseId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    })
    return response.data
  }

 
// Atualizar Evidência
export const updateEvidencia = async (id: string, data: Partial<Evidencia>) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Token JWT não encontrado.");
  }

  const response = await api.patch(`/evidencias/update/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// Deletar Evidência
export const deleteEvidencia = async (id: string) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Token JWT não encontrado.");
  }

  const response = await api.delete(`/evidencias/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
