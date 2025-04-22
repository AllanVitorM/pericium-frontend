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