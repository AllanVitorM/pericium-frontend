"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { ButtonLogin } from "./button";

export default function LoginForm() {
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [, setError] = useState("");
  const { login } = useAuth();

  const handlesubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await login(cpf, password);
      console.log("✅ Login com sucesso");
    } catch (error) {
      console.error("❌ Erro no login:", error);
      setError(error?.message || "Erro ao fazer login");
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center bg-white px-4">
      <div className="w-full max-w-md bg-white shadow-xl p-8 rounded-2xl">
        <form className="flex flex-col space-y-6" onSubmit={handlesubmit}>
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
              Login
            </h1>
            <p className="text-sm text-gray-500 font-normal mb-6">
              Faça login para acessar o sistema
            </p>
          </div>

          <div className="flex flex-col space-y-4">
            <div>
              <label htmlFor="cpf" className="block text-sm font-medium text-gray-700 mb-1">
                CPF
              </label>
              <input
                type="text"
                id="cpf"
                className="w-full px-4 py-2 border border-gray-400 rounded-md text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-black"
                onChange={(e) => setCpf(e.target.value)}
                placeholder="Digite seu CPF"
                required
              />
            </div>

            <div>
              <label htmlFor="senha" className="block text-sm font-medium text-gray-700 mb-1">
                Senha
              </label>
              <input
                type="password"
                id="senha"
                className="w-full px-4 py-2 border border-gray-400 rounded-md text-black placeholder-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-black"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha"
                required
              />
            </div>
          </div>

          <div className="flex flex-col items-center space-y-3 mt-4">
            <ButtonLogin text="Entrar" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
}
