"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/sidebar";
import { getProfile, updatePassword } from "@/service/user";
import ModalSenha from "@/components/modalsenha";

export default function PerfilPage() {
  const [form, setForm] = useState({
    nome: "",
    cargo: "",
    cpf: "",
    id: "",
    email: "",
    senha: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const profile = await getProfile();
        setForm({
          nome: profile.name || "",
          cargo: profile.role || "",
          cpf: profile.cpf || "",
          id: profile.id ? String(profile.id) : "",
          email: profile.email || "",
          senha: "", 
        });
      } catch (error) {
        console.error("Erro ao buscar perfil:", error);
      }
    }

    fetchProfile();
  }, []);

  async function handleSavePassword(oldPassword: string, newPassword: string) {
    try {
      await updatePassword(oldPassword, newPassword);
      alert("Senha atualizada com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar a senha:", error);
      alert("Erro ao atualizar a senha. Verifique se a senha atual está correta.");
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleLogout() {
    console.log("Encerrar sessão clicado!");
    // Aqui você pode limpar tokens, redirecionar, etc.
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row font-sans">
      <div className="lg:w-64">
        <Sidebar />
      </div>

      <main className="flex-1 bg-white p-4 sm:p-6">
        <div className="w-full max-w-md mx-auto mt-6 bg-[#B6C0C7] rounded-md p-5 shadow-md text-sm">
          <h2 className="text-2xl font-bold mb-6 text-center text-black">Perfil</h2>

          <form className="space-y-4">
            {[
              { label: "Nome Completo", name: "nome" },
              { label: "Cargo", name: "cargo" },
              { label: "CPF", name: "cpf" },
              { label: "ID", name: "id" },
              { label: "E-mail", name: "email" },
            ].map(({ label, name }) => (
              <div key={name}>
                <label htmlFor={name} className="block text-sm font-medium text-black mb-1">
                  {label}
                </label>
                <input
                  type="text"
                  name={name}
                  id={name}
                  value={form[name as keyof typeof form]}
                  onChange={handleChange}
                  disabled
                  className="block w-full px-4 py-2 border border-gray-400 rounded-md bg-gray-200 text-black text-base cursor-not-allowed"
                />
              </div>
            ))}
          </form>

          <p className="text-xs text-center mt-4 text-black">
            Esqueceu-se da senha? Solicite uma recuperação da senha por e-mail.
          </p>

          <div className="flex flex-col gap-2 mt-6">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#0B2D3E] text-white py-2 rounded hover:bg-[#09202D] transition-colors"
            >
              Alterar senha
            </button>
            <button
              onClick={handleLogout}
              className="bg-[#B6C0C8] py-2 rounded text-black hover:bg-[#9da7af] transition-colors"
            >
              Encerrar sessão
            </button>
          </div>
        </div>
      </main>

      {/* Modal para alterar senha */}
      <ModalSenha
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSavePassword}
      />
    </div>
  );
}
