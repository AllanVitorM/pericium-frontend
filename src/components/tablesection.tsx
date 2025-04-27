"use client";

import { useEffect, useState } from "react";
import { getUsers } from "@/service/user"; // Ajuste o caminho se necessário

interface User {
  id: string;
  name: string;
  email: string;
  cpf: string;
  role: "ADMIN" | "PERITO" | "ASSISTENTE";
}

export default function TableSection() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    fetchUsers();
  }, []);

  return (
    <section>
      {/* Tabela */}
      <div className="overflow-auto rounded-lg border border-gray-300">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#B6C0C7] text-left">
              {[
                "ID do Funcionário",
                "Nome",
                "Cargo",
                "E-mail",
                "Ação",
              ].map((col) => (
                <th key={col} className="px-4 py-2 font-medium">
                  {col}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="text-center py-6">
                  Carregando usuários...
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-6">
                  Nenhum usuário encontrado.
                </td>
              </tr>
            ) : (
              users.map((user, i) => (
                <tr
                  key={user._id}
                  className={i % 2 === 0 ? "bg-[#E8EBED]" : "bg-[#B6C0C7]"}
                >
                  <td className="px-4 py-2">{user._id}</td>
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.role}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2 flex gap-1">
                    <button className="cursor-pointer" title="Editar">✏️</button>
                    <button className="cursor-pointer" title="Imprimir">🖨️</button>
                    <button className="cursor-pointer" title="Excluir">🗑️</button>
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