import api from "./api";

export interface odontogramaDTO {
  dentes: string;
  observacao: string;
  vitimaId: string;
}

export const criarOdontograma = async (dados: odontogramaDTO) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Token JWT não encontrado.");
  }

  const response = await api.post("/odontograma/createodontograma", dados, {
    headers: {
        Authorization: `Bearer ${token}`
    }
  })
  console.log(response.data)
  return response.data
};


