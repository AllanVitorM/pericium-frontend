  import api from "@/service/api";

  interface CreateCaseDTO {
    titulo: string;
    descricao: string;
    status: "PENDENTE" | "EM ANDAMENTO" | "CONCLUIDO";
    dataAbertura: string;
    userId: string;
  }

  export const criarCaso = async (dados: CreateCaseDTO) => {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Token JWT não encontrado.");
    }
    
    const payload = {
      ...dados,
      dataAbertura: new Date (dados.dataAbertura).toISOString(), // <-- conversão aqui
    };
    
    console.log("Dados enviados ao backend:", payload);
    console.log("Dados enviados ao backend:", dados); // 

    const response = await api.post("/cases/createcase", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };

  export const getCaso = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Token JWT não encontrado.");
    }

    const response = await api.get("/cases/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };


  export const updateCaso = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Token JWT não encontrado.");
    }

    const response = await api.put("/cases/:id", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };


  export const deleteCaso = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Token JWT não encontrado.");
    }

    const response = await api.get("/cases/:id", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };

