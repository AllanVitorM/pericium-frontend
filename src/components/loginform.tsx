"use client";
import { useState } from "react";

import { useAuth } from "@/context/AuthContext";

import { ButtonLogin } from "./button";

export default function LoginForm() {
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handlesubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await login( cpf, password );
      console.log("✅ Login com sucesso");
    } catch (error) {
      console.error("❌ Erro no login:", error);
      setError(error?.message || "Erro ao fazer login");
    }
  };

  return (
    <div className="w-full h-flex bg white flex flex-col justify-center items-center">
      <div className="text-center">
        <h1 className=" text-5xl font-bold text-gray-800 mb-2">Login</h1>
        <p className=" text-sm text-gray-500 font-normal mb-6">
          Faça login para acessar o sistema
        </p>
      </div>
      <div className="shadow-xl bg-white p-10 rounded-2xl w-xl h-auto">
        <form
          className="flex flex-col justify-between h-full"
          onSubmit={handlesubmit}
        >
          <div className="space-y-7 flex flex-col justify-center items-center">
            <div>
              <label
                htmlFor="CPF"
                className="block w-md text-sm front-medium text-gray-700"
              >
                CPF
              </label>
              <input
                type="text"
                id="cpf"
                className="mt-1 w-full px-4 py-2 border border-black rounded-md text-black placeholder-gray-600  focus:outline-none focus: ring-2 focus: ring-black"
                onChange={(e) => setCpf(e.target.value)}
                placeholder="Digite seu CPF"
                required
              />
            </div>
            <div>
              <label
                htmlFor="senha"
                className="block w-md text-sm font-medium text-gray-700"
              >
                Senha
              </label>
              <input
                type="password"
                id="senha"
                className="mt-1 w-full px-4 py-2 border border-black rounded-lg text-black placeholder-gray-600  bg-white focus:outline-none focus: ring-2 focus: ring-black"
                onChange={(e) => setPassword(e.target.value)}
                placeholder=" Digite sua senha"
                required
              />
            </div>
          </div>
          <div className="space-y-4 mt-4">
            <div className="space-y-3 flex flex-col items-center">
              <ButtonLogin text="Entrar" type="submit" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
