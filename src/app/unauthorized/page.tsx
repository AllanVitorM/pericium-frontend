'use client'

import { ButtonLogin } from "@/components/button";
import { useRouter } from "next/navigation";

export default function Unauthorized() {
    const router = useRouter();

    return (
        <div className="h-screen flex flex-col justify-center items-center bg-gray-100 text-center p-4">
            <h1 className="text-4xl font-bold text-red-600 mb-4">
                Acesso Negado!
            </h1>
            <p className="text-gray-700 mb-6">
                Você não tem permissão para acessar esta página.
            </p>
            <ButtonLogin text="Voltar para o início" type="button" onClick={() => router.push("/")}/>
        </div>
    )
}