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
    senha: ""
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSave() {
    console.log("Dados salvos:", form);
  }

  return (
    <div className="min-h-screen flex font-sans">
      <div className="w-64">
        <Sidebar />
      </div>

      {/* Main Content */}
      <main className="flex-1 bg-white p-6">
        {/* Header */}
        <AdminHeader id={form.id} nome={form.nome} cargo={form.cargo} />

        {/* Formulário */}
        <div className="max-w-md mx-auto bg-[#B6C0C7] rounded-md p-5 shadow text-sm">
          <h2 className="text-xl font-bold mb-4 text-center">Perfil</h2>

          {[
            { label: "Nome Completo", name: "nome" },
            { label: "Cargo", name: "cargo" },
            { label: "CPF", name: "cpf" },
            { label: "ID", name: "id" },
            { label: "E-mail", name: "email" },
            { label: "Senha", name: "senha", type: "password" }
          ].map(({ label, name, type = "text" }) => (
            <div className="w-full mb-1" key={name}>
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

          <p className="text-xs text-center mb-4 text-black">
            Esqueceu-se da senha? Solicite uma recuperação da senha por email.
          </p>

          <div className="flex flex-col gap-2">
            <button
              onClick={handleSave}
              className="bg-[#0B2D3E] text-white py-2 rounded hover:bg-[#09202D]"
            >
              Guardar
            </button>
            <button className="bg-[#B6C0C8] py-2 rounded text-black hover:bg-[#9da7af]">
              Encerrar sessão
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
