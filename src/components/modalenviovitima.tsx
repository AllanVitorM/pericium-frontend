import React, { useEffect, useState } from "react";
import { criarVitima } from "@/service/vitima";

export default function ModalEnvioVitima({
  isOpen,
  onClose,
  casoSelecionado,
}: {
  isOpen: boolean;
  onClose: () => void;
  casoSelecionado: {
    NIC: string;
    nome: string;
    genero: string;
    documento: number;
    endereco: string;
    etnia: "BRANCO" | "PRETO" | "AMARELO" | "INDIGENA";
    caseId: string;
  };
}) {
  const [formData, setFormData] = useState({
    NIC: "",
    nome: "",
    genero: "",
    documento: "",
    endereco: "",
    etnia: "PRETO",
    caseId: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.NIC ||
      !formData.nome ||
      !formData.genero ||
      !formData.documento ||
      !formData.endereco ||
      !formData.etnia
    ) {
      setLoading(true);
      setError("");
    }
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Token não encontrado");
      setLoading(false);
      return;
    }

    const payload = {
      NIC: formData.NIC,
      nome: formData.nome,
      genero: formData.genero as "MASCULINO" | "FEMININO",
      documento: Number(formData.documento),
      endereco: formData.endereco,
      etnia: formData.etnia as "BRANCO" | "PRETO" | "AMARELO" | "INDIGENA",
      caseId: formData.caseId,
    };

    try {
      await criarVitima(payload);
      onClose();
    } catch (error) {
      console.log("Erro ao criar evidência", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      NIC: "",
      nome: "",
      genero: "",
      documento: "",
      endereco: "",
      etnia: "Selecione",
      caseId: "",
    });
    setError("");
    onClose();
  };

  useEffect(() => {
    if (casoSelecionado?.caseId) {
      setFormData((prev) => ({
        ...prev,
        caseId: casoSelecionado.caseId,
      }));
    }
  }, [casoSelecionado]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#F5F5F4] p-6 rounded-lg w-full max-w-[640px]">
        <h2 className="text-2xl font-bold mb-6">Cadastrando Vitima</h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Título */}
          <div className="flex flex-col">
            <label className="text-sm font-medium">
              NIC<span className="text-red-500">*</span>
            </label>
            <input
              name="NIC"
              value={formData.NIC}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded"
              placeholder="Numero identificador de corpo"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium">
              Nome<span className="text-red-500">*</span>
            </label>
            <input
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded"
              placeholder="Nome da vítima"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium">
              Genero<span className="text-red-500">*</span>
            </label>
            <select
              name="genero"
              value={formData.genero}
              onChange={handleChange}
              id="genero"
              className="p-3 border-b-1 outline-0"
            >
              <option value="">Selecione</option>
              <option value="MASCULINO">Masculino</option>
              <option value="FEMININO">Feminino</option>
            </select>
          </div>

          {/* Tipo */}
          <div className="flex flex-col">
            <label className="text-sm font-medium">
              Documento<span className="text-red-500">*</span>
            </label>
            <input
              name="documento"
              type="number"
              value={formData.documento}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded"
              placeholder="Documento"
            />
          </div>

          {/* Local */}
          <div className="flex flex-col">
            <label className="text-sm font-medium">
              Endereço<span className="text-red-500">*</span>
            </label>
            <input
              name="endereco"
              value={formData.endereco}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded"
              placeholder="Endereço"
            />
          </div>

          {/* Descrição */}
          <div className="flex flex-col md:col-span-2">
            <label className="text-sm font-medium">
              Etnia<span className="text-red-500">*</span>
            </label>
            <select name="etnia" value={formData.etnia} onChange={handleChange} className="w-2xs p-2 border-b-1 outline-0">
              <option value="">Selecione</option>
              <option value="BRANCO">BRANCO</option>
              <option value="PRETO">PRETO</option>
              <option value="AMARELO">AMARELO</option>
              <option value="INDIGENA">INDIGENA</option>
            </select>
          </div>

          {/* Caso Selecionado */}
          <div className="flex flex-col md:col-span-2">
            <label className="text-sm font-medium disabled">
              Caso Selecionado
            </label>
            <input
              type="text"
              value={casoSelecionado?.caseId}
              disabled
              className="p-2 border border-gray-300 rounded bg-gray-100 text-gray-500"
            />
          </div>

          {/* Botões */}
          <div className="flex justify-between mt-6 md:col-span-2">
            <button
              onClick={handleClose}
              type="button"
              className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded text-gray-700 bg-white hover:bg-gray-100"
            >
              &larr; Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-900 text-white rounded hover:bg-blue-800"
            >
              {loading ? "Enviando..." : "Enviar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
