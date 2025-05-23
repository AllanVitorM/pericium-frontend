"use client";

import { useEffect, useState } from "react";
import { getProfile } from "@/service/user";

export default function AdminHeader() {
  const [user, setUser] = useState<{
    id: string;
    nome: string;
    cargo: string;
  } | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getProfile();

        setUser({
          id: userData.id,
          nome: userData.name,
          cargo: userData.role,
        });
      } catch (error) {
        console.error("Erro ao buscar perfil do usuário:", error);
      }
    };

    fetchUser();
  }, []);

  if (!user) {
    return (
      <div className="flex justify-center items-center bg-[#B6C0C7] px-6 py-2 rounded-full mb-6 text-sm">
        Carregando informações do usuário...
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-between items-center bg-[#B6C0C7] px-6 py-2 rounded-full mb-6 text-sm space-y-2 sm:space-y-0 sm:space-x-4 sm:flex-row">
      <span className="flex-1 min-w-[180px] sm:min-w-[220px] lg:min-w-[150px] text-center sm:text-left">
        <strong>ID:</strong> {user.id}
      </span>
      <span className="flex-1 min-w-[180px] sm:min-w-[220px] lg:min-w-[150px] text-center sm:text-left">
        <strong>Nome:</strong> {user.nome}
      </span>
      <span className="flex-1 min-w-[180px] sm:min-w-[220px] lg:min-w-[150px] text-center sm:text-left">
        <strong>Cargo:</strong> {user.cargo}
      </span>
    </div>
  );
}
