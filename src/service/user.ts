import api from "@/service/api"

interface CreateUserDTO {
    name: string;
    email: string;
    cpf: string;
    role: "ADMIN" | "PERITO" | "ASSISTENTE";
  }

  export const criarUsuario = async (dados: CreateUserDTO) => {
    const response = await api.post("/users/createuser", dados)
    return response.data
  }

  export const getUsers = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Token JWT não encontrado.");
    }

    const response = await api.get("/users/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };

  export const getUser = async (cpf:string) => {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Token JWT não encontrado.");
    }

    const response = await api.get(`/users/${cpf}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };

export const getProfile = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Token JWT não encontrado.");
  }

  const response = await api.get("/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

