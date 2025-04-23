"use client";

import { useEffect, useState } from "react";
import { criarUsuario } from "@/service/user";
interface modalNovoUsuarioProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalUser({ isOpen, onClose }: modalNovoUsuarioProps) {
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    cpf: string;
    role: "ADMIN" | "PERITO" | "ASSISTENTE";
  }>({
    name: "",
    email: "",
    cpf: "",
    role: "ASSISTENTE",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [temporaryPassword, setTemporaryPassword] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setTemporaryPassword("");

    try {
      const response = await criarUsuario(formData);
      setTemporaryPassword(response.temporaryPassword);
      
    } catch (err) {
      setError(err.response?.data?.message || "Erro ao criar usuário");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (temporaryPassword) {
      const timer = setTimeout(() => {
        handleClose();
      }, 5000);
      return () => clearTimeout(timer)
    }
  }, [temporaryPassword])

  const handleClose = () =>{
    onClose();
    setFormData({
      name: "",
      email: "",
      cpf: "",
      role: "ASSISTENTE",
    });
    setTemporaryPassword("");
    setError("");
  }
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#F5F5F4] p-6 rounded-lg shadow-lg w-md">
        <h2 className="text-xl font-bold mb-4">Criar Novo Usuário</h2>

        <form onSubmit={handleSubmit}>
          <label htmlFor="nome" className="font-bold text-base">
            Nome Completo
            <input
              type="text"
              placeholder="Nome"
              name="name"
              className="w-full mb-3 p-2 border rounded"
              value={formData.name}
              onChange={handleChange}
            />
          </label>

          <label htmlFor="email" className="font-bold text-base">
            E-mail
            <input
              type="email"
              placeholder="E-mail"
              name="email"
              className="w-full mb-3 p-2 border rounded"
              value={formData.email}
              onChange={handleChange}
            />
          </label>

          <div className="flex justify-between gap-2">
            <label htmlFor="role" className="font-bold text-base">
              Cargo
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full mb-3 px-3 py-2 border rounded"
              >
                <option value="ADMIN">Administrador</option>
                <option value="PERITO">Perito</option>
                <option value="ASSISTENTE">Assistente</option>
              </select>
            </label>
            <label htmlFor="cpf" className="font-bold text-base">
              {" "}
              CPF
              <input
                type="text"
                placeholder="CPF"
                name="cpf"
                className="w-full mb-3 p-2 border rounded"
                value={formData.cpf}
                onChange={handleChange}
              />
            </label>
          </div>

          <div className="flex justify-between gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="text-gray-600 hover:underline"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-[#002C49] text-white px-4 py-2 rounded hover:bg-[#00416D]"
            >
              {loading ? "Cadastrando..." : "Cadastrar"}
            </button>
          </div>
          {temporaryPassword && (
            <div className="mt-4 bg-green-100 text-green-800 p-3 rounded">
              <p>
                <strong>Senha temporária gerada:</strong> {temporaryPassword}
              </p>
            </div>
          )}

          {error && (
            <div className="mt-4 bg-red-100 text-red-800 p-3 rounded">
              <p>
                <strong>Erro:</strong> {error}
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
