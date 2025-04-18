'use client';
import { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
}

export default function ModalNovoCaso({ isOpen, onClose, onNext }: Props) {
  const [titulo, setTitulo] = useState('');
  const [status, setStatus] = useState('');
  const [dataAbertura, setDataAbertura] = useState('');
  const [descricao, setDescricao] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ titulo, status, dataAbertura, descricao });
    onNext();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-96">
        <h2 className="text-xl font-bold mb-4">Registrar Caso</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div>
            <label className="text-sm font-semibold">Título*</label>
            <input 
              type="text" 
              placeholder="Placeholder" 
              className="w-full border rounded px-3 py-1 mt-1"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-sm font-semibold">Status*</label>
            <select 
              className="w-full border rounded px-3 py-1 mt-1"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="">Placeholder</option>
              <option value="aberto">Aberto</option>
              <option value="fechado">Fechado</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-semibold">Data de abertura*</label>
            <input 
              type="date" 
              className="w-full border rounded px-3 py-1 mt-1"
              value={dataAbertura}
              onChange={(e) => setDataAbertura(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-sm font-semibold">Descrição*</label>
            <textarea 
              placeholder="Escreva aqui" 
              className="w-full border rounded px-3 py-1 mt-1"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-between mt-4">
            <button 
              type="button" 
              onClick={onClose} 
              className="px-4 py-1 border rounded bg-gray-100 hover:bg-gray-200"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="px-4 py-1 bg-blue-900 text-white rounded hover:bg-blue-800"
            >
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}