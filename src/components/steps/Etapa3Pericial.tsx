export default function Etapa3Pericial({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
    return (
      <div>
        <h2 className="text-lg font-bold mb-4">Informações Periciais Iniciais</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <input placeholder="Perito Responsável*" className="border rounded p-2" />
          <input placeholder="CRM/CRO*" className="border rounded p-2" />
          <input placeholder="Local da Perícia*" className="border rounded p-2" />
          <input placeholder="Data do exame*" className="border rounded p-2" />
          <div className="col-span-2 flex gap-4">
            <button className="border px-4 py-2 rounded w-full">📷 Imagem</button>
            <button className="border px-4 py-2 rounded w-full">📄 Texto</button>
          </div>
        </div>
        <div className="mt-4 flex justify-between">
          <button onClick={onBack} className="px-4 py-2 rounded-full border">← Voltar</button>
          <button onClick={onNext} className="bg-[#002C49] text-white px-4 py-2 rounded-full hover:bg-blue-800">Concluir</button>
        </div>
      </div>
    );
  }
  