import React, { useState, useEffect } from "react";
import { updateVitima, deleteVitima } from "@/service/vitima";
import TabelaOdontograma from "./tabelaodonto";
import ModalOdontograma from "./modalodontograma";


interface ModalEditarVitimaProps {
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  vitima: {
    _id: string;
    NIC: string;
    nome: string;
    genero: string;
    documento: number;
  } | null;
  onUpdate: (vitimaAtualizada: any) => void; // <- ADICIONADO
}

export default function ModalEditarVitima({
  isOpen,
  onClose,
  vitima,
  onUpdate,
}: ModalEditarVitimaProps) {
  const [formData, setFormData] = useState({
    NIC: "",
    nome: "",
    genero: "",
    documento: "",
  });

  const [modalOdontograma, setModalOdontograma] = useState(false);

  useEffect(() => {
    if (vitima) {
      setFormData({
        NIC: vitima.NIC,
        nome: vitima.nome,
        genero: vitima.genero,
        documento: vitima.documento.toString(),
      });
    }
  }, [vitima]);


  const handleUpdate = async () => {
    try {
      if (!vitima?._id) throw new Error("ID da vítima não encontrado");

      const documentoNumber = Number(formData.documento);
      if (isNaN(documentoNumber)) {
        alert("Documento precisa ser um número válido.");
        return;
      }

      const updated = await updateVitima(vitima._id, {
        ...vitima,
        NIC: formData.NIC,
        nome: formData.nome,
        genero: formData.genero,
        documento: documentoNumber,
      });

      alert("Vítima atualizada com sucesso!");
      onUpdate(updated);
      onClose();
    } catch (error: any) {
      console.error(
        "Erro ao atualizar a vítima:",
        error.response?.data || error.message
      );
      alert(
        "Erro ao atualizar vítima: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  const handleDelete = async () => {
    if (!vitima?._id) return;

    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir esta vítima?"
    );
    if (!confirmDelete) return;

    try {
      await deleteVitima(vitima._id);
      alert("Vítima excluída com sucesso!");
      onClose();
    } catch (error: any) {
      console.error(
        "Erro ao excluir a vítima:",
        error.response?.data || error.message
      );
      alert(
        "Erro ao excluir vítima: " +
          (error.response?.data?.message || error.message)
      );
    }
  };


  if (!isOpen || !vitima) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#F5F5F5] p-6 rounded-lg w-full max-w-2xl relative overflow-y-auto max-h-[90vh]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium">NIC</label>
            <input
              value={formData.NIC}
              className="p-2 border border-gray-300 rounded"
              onChange={(e) =>
                setFormData({ ...formData, NIC: e.target.value })
              }
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium">Nome</label>
            <input
              value={formData.nome}
              className="p-2 border border-gray-300 rounded"
              onChange={(e) =>
                setFormData({ ...formData, nome: e.target.value })
              }
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium">Gênero</label>
            <input
              value={formData.genero}
              className="p-2 border border-gray-300 rounded"
              onChange={(e) =>
                setFormData({ ...formData, genero: e.target.value })
              }
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium">Documento</label>
            <input
              value={formData.documento}
              className="p-2 border border-gray-300 rounded"
              type="number"
              onChange={(e) =>
                setFormData({ ...formData, documento: e.target.value })
              }
            />
          </div>

          <div className="col-span-2 flex flex-col gap-2">
            <div>
              <button
                className="w-auto p-2 mb-2 text-white bg-[#15354B] rounded-md self-end"
                onClick={() => setModalOdontograma(true)}
                type="button"
              >
                Adicionar odontograma
              </button>

              <TabelaOdontograma vitimaId={vitima._id} />
            </div>

            {modalOdontograma && (
              <ModalOdontograma
                isOpen={modalOdontograma}
                onClose={() => setModalOdontograma(false)}
                vitimaId={vitima._id} // se for necessário
              />
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
          <button
            onClick={onClose}
            className="w-full sm:w-auto flex items-center justify-center gap-2 border border-gray-300 px-4 py-2 rounded text-gray-700 bg-white hover:bg-gray-100"
          >
            &larr; Cancelar
          </button>

          <button
            onClick={handleDelete}
            className="w-full sm:w-auto flex items-center justify-center gap-2 border border-red-500 text-red-600 px-4 py-2 rounded hover:bg-red-100"
          >
            Excluir
          </button>

          <button
            onClick={handleUpdate}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#002D62] text-white px-6 py-2 rounded hover:bg-[#001f47]"
          >
            Enviar &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
