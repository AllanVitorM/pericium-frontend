"use client";

import { useEffect, useState } from "react";
import { getUsers } from "@/service/user"; // Ajuste o caminho se necessário
import { Eye, Pencil, CircleX } from "lucide-react"; // Importando os ícones corretos

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

    <section className="w-full">
      <div className="w-full overflow-x-auto rounded-lg border border-gray-300">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-[#B6C0C7] text-left text-gray-800">
              {["ID do Funcionário", "Nome", "Cargo", "E-mail", "Ação"].map((col) => (
                <th key={col} className="px-2 sm:px-4 py-3 font-semibold whitespace-nowrap">
                  {col}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center">

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
                <tr
                  key={user._id}
                  className={i % 2 === 0 ? "bg-[#E8EBED]" : "bg-[#B6C0C7]"}
                >

                  <td className="px-2 sm:px-4 py-3 whitespace-nowrap">{user._id}</td>
                  <td className="px-2 sm:px-4 py-3 whitespace-nowrap">{user.name}</td>
                  <td className="px-2 sm:px-4 py-3 whitespace-nowrap">{user.role}</td>
                  <td className="px-2 sm:px-4 py-3 whitespace-nowrap">{user.email}</td>
                  <td className="px-2 sm:px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                    <Eye
                        onClick={() => {
                        }}
                        className="cursor-pointer text-blue-600 hover:scale-110 transition-transform"
                      />
                      <CircleX className="cursor-pointer text-red-500 hover:scale-110 transition-transform" />
                    </div>
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
