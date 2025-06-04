"use client";

import { useEffect, useState } from "react";
import { criarUsuario, deleteUser } from "@/service/user";

interface ModalUserProps {
  isOpen: boolean;
  onClose: () => void;
  usuario?: {
    id: string;
    name: string;
    email: string;
    cpf: string;
    role: "ADMIN" | "PERITO" | "ASSISTENTE";
  } | null;
  onRefresh: () => void;
}

export default function ModalUser({ isOpen, onClose, usuario, onRefresh }: ModalUserProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cpf: "",
    role: "ASSISTENTE" as "ADMIN" | "PERITO" | "ASSISTENTE",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [temporaryPassword, setTemporaryPassword] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (usuario) {
      setFormData({
        name: usuario.name,
        email: usuario.email,
        cpf: usuario.cpf,
        role: usuario.role,
      });
    } else {
      setFormData({
        name: "",
        email: "",
        cpf: "",
        role: "ASSISTENTE",
      });
    }
    setIsEditing(false);
    setTemporaryPassword("");
    setError("");
  }, [usuario]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!formData.name || !formData.email || !formData.cpf) {
      setError("Todos os campos são obrigatórios.");
      setLoading(false);
      return;
    }

    try {
      await criarUsuario(formData);
      setTemporaryPassword("Usuário salvo com sucesso.");
      onRefresh();
      onClose();
    } catch (err: any) {
      setError(err?.response?.data?.message || err.message || "Erro ao salvar usuário");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!usuario) return;
    const confirmed = confirm("Tem certeza que deseja excluir este usuário?");
    if (!confirmed) return;

    try {
      await deleteUser(usuario.cpf);
      onRefresh();
      onClose();
    } catch (err: any) {
      setError(err?.response?.data?.message || err.message || "Erro ao excluir usuário");
    }
  };

  const handleClose = () => {
    onClose();
    setTemporaryPassword("");
    setError("");
    setIsEditing(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#F5F5F4] p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-center">
          {usuario
            ? isEditing
              ? `Editar ${usuario.name}`
              : `Visualizar ${usuario.name}`
            : "Criar Novo Usuário"}
        </h2>

        <form onSubmit={handleSubmit}>
          <label className="font-bold text-base block mb-2">
            Nome Completo
            <input
              type="text"
              name="name"
              className="w-full mt-1 mb-3 p-2 border rounded"
              value={formData.name}
              onChange={handleChange}
              readOnly={!isEditing && !!usuario}
            />
          </label>

          <label className="font-bold text-base block mb-2">
            E-mail
            <input
              type="email"
              name="email"
              className="w-full mt-1 mb-3 p-2 border rounded"
              value={formData.email}
              onChange={handleChange}
              readOnly={!isEditing && !!usuario}
            />
          </label>

          <div className="flex flex-col sm:flex-row sm:gap-4">
            <label className="font-bold text-base flex-1 mb-3">
              Cargo
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border rounded"
                disabled={!isEditing && !!usuario}
              >
                <option value="ADMIN">Administrador</option>
                <option value="PERITO">Perito</option>
                <option value="ASSISTENTE">Assistente</option>
              </select>
            </label>

            <label className="font-bold text-base flex-1 mb-3">
              CPF
              <input
                type="text"
                name="cpf"
                className="w-full mt-1 p-2 border rounded"
                value={formData.cpf}
                onChange={handleChange}
                readOnly={!!usuario || !isEditing}
              />
            </label>
          </div>

          <div className="flex justify-between gap-4 mt-6">
            <button type="button" onClick={handleClose} className="text-gray-600 hover:underline">
              Fechar
            </button>

            {usuario ? (
              isEditing ? (
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  {loading ? "Salvando..." : "Salvar"}
                </button>
              ) : (
                <div className="flex gap-2">
                  <button type="button" onClick={() => setIsEditing(true)} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
                    Editar
                  </button>
                  <button type="button" onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                    Excluir
                  </button>
                </div>
              )
            ) : (
              <button type="submit" className="bg-[#002C49] text-white px-4 py-2 rounded hover:bg-[#00416D]">
                {loading ? "Cadastrando..." : "Cadastrar"}
              </button>
            )}
          </div>

          {temporaryPassword && (
            <div className="mt-4 bg-green-100 text-green-800 p-3 rounded">
              <strong>{temporaryPassword}</strong>
            </div>
          )}

          {error && (
            <div className="mt-4 bg-red-100 text-red-800 p-3 rounded">
              <strong>Erro:</strong> {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
