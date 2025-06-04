"use client";

import { useEffect, useState } from "react";
import { getUsers } from "@/service/user";
import { Eye } from "lucide-react";

interface User {
  _id: string;
  name: string;
  email: string;
  cpf: string;
  role: "ADMIN" | "PERITO" | "ASSISTENTE";
}

interface TableSectionProps {
  onVisualizar: (user: User) => void;
  refreshTrigger: boolean;
}

export default function TableSection({ onVisualizar, refreshTrigger }: TableSectionProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [refreshTrigger]);

  return (
    <section className="w-full">
      <div className="w-full overflow-x-auto rounded-lg border border-gray-300">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-[#B6C0C7] text-left text-gray-800">
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Nome</th>
              <th className="px-4 py-3">Cargo</th>
              <th className="px-4 py-3">E-mail</th>
              <th className="px-4 py-3">Ação</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center animate-pulse">
                  Carregando usuários...
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center">
                  Nenhum usuário encontrado.
                </td>
              </tr>
            ) : (
              users.map((user, i) => (
                <tr key={user._id} className={i % 2 === 0 ? "bg-[#E8EBED]" : "bg-[#B6C0C7]"}>
                  <td className="px-4 py-3">{user._id}</td>
                  <td className="px-4 py-3">{user.name}</td>
                  <td className="px-4 py-3">{user.role}</td>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3">
                    <Eye
                      className="cursor-pointer text-blue-600 hover:scale-110 transition-transform"
                      onClick={() => onVisualizar(user)}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
