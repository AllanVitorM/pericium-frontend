"use client";

import { useState } from "react";
import Sidebar from "@/components/sidebar";
import AdminHeader from "@/components/headeradm"; // ajuste o path conforme a localização real do componente

export default function PerfilPage() {
  const [form, setForm] = useState({
    nome: "",
    cargo: "",
    cpf: "",
    id: "",
    email: "",
    senha: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSave() {
    console.log("Dados salvos:", form);
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row font-sans">
      <div className="lg:w-64">
        <Sidebar />
      </div>

      {/* Main Content */}
      <main className="flex-1 bg-white p-4 sm:p-6">

        {/* Formulário */}
        <div className="w-full max-w-md mx-auto mt-6 bg-[#B6C0C7] rounded-md p-5 shadow-md text-sm">
          <h2 className="text-2xl font-bold mb-6 text-center text-black">
            Perfil
          </h2>

          <form className="space-y-4">
            {[
              { label: "Nome Completo", name: "nome" },
              { label: "Cargo", name: "cargo" },
              { label: "CPF", name: "cpf" },
              { label: "ID", name: "id" },
              { label: "E-mail", name: "email" },
              { label: "Senha", name: "senha", type: "password" },
            ].map(({ label, name, type = "text" }) => (
              <div key={name}>
                <label
                  htmlFor={name}
                  className="block text-sm font-medium text-black mb-1"
                >
                  {label}
                </label>
                <input
                  type={type}
                  name={name}
                  id={name}
                  value={form[name as keyof typeof form]}
                  onChange={handleChange}
                  className="block w-full px-4 py-2 border border-gray-400 rounded-md bg-white text-black text-base focus:outline-none focus:ring-2 focus:ring-[#0B2D3E]"
                />
              </div>
            ))}
          </form>

          <p className="text-xs text-center mt-4 text-black">
            Esqueceu-se da senha? Solicite uma recuperação da senha por e-mail.
          </p>

          <div className="flex flex-col gap-2 mt-6">
            <button
              onClick={handleSave}
              className="bg-[#0B2D3E] text-white py-2 rounded hover:bg-[#09202D] transition-colors"
            >
              Guardar
            </button>
            <button className="bg-[#B6C0C8] py-2 rounded text-black hover:bg-[#9da7af] transition-colors">
              Encerrar sessão
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
