"use client";

interface ModalUsuarioProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalUsuario({ isOpen, onClose }: ModalUsuarioProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50  flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h1 className="text-xl font-bold mb-4">Cadastro de funcionário</h1>
        
        <form>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nome Completo*</label>
              <input
                type="text"
                placeholder="Digite o nome completo"
                className="w-full border border-gray-300 px-3 py-2 rounded"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">E-mail*</label>
              <input
                type="email"
                placeholder="Digite o e-mail"
                className="w-full border border-gray-300 px-3 py-2 rounded"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Confirmar E-mail*</label>
              <input
                type="email"
                placeholder="Confirme o e-mail"
                className="w-full border border-gray-300 px-3 py-2 rounded"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Cargo*</label>
              <select
                className="w-full border border-gray-300 px-3 py-2 rounded"
                required
              >
                <option value="">Selecione um cargo</option>
                <option value="Administrador">Administrador</option>
                <option value="Gerente">Gerente</option>
                <option value="Funcionário">Funcionário</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">CPF*</label>
              <input
                type="text"
                placeholder="Digite o CPF"
                className="w-full border border-gray-300 px-3 py-2 rounded"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Senha*</label>
              <input
                type="password"
                placeholder="Digite a senha"
                className="w-full border border-gray-300 px-3 py-2 rounded"
                required
              />
            </div>
          </div>
          
          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
            >
              Cancelar
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-[#002C49] text-white rounded hover:bg-blue-800"
            >
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}