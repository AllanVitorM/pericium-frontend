"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Etapa1Registro from "./steps/Etapa1Registro";
import Etapa2Periciado from "./steps/Etapa2Periciado";
import Etapa3Pericial from "./steps/Etapa3Pericial";

export default function ModalNovoCaso({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [step, setStep] = useState(1);
  const router = useRouter();

  const handleCancel = () => {
    onClose(); // fecha o modal
    router.push("/home"); // redireciona para a página home
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Etapa1Registro onNext={() => setStep(2)} />;
      case 2:
        return (
          <Etapa2Periciado
            onNext={() => setStep(3)}
            onBack={() => setStep(1)}
          />
        );
      case 3:
        return (
          <Etapa3Pericial
            onBack={() => setStep(2)}
            onNext={() => onClose()}
          />
        );
      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50  flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-[600px] max-h-[90vh] overflow-auto shadow-lg relative">
        {renderStep()}

        {/* Botão Cancelar */}
        <button
          onClick={handleCancel}
          className="absolute top-4 right-4 text-red-500 hover:text-red-700 font-semibold"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
