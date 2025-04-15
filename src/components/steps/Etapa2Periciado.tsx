export default function Etapa2Periciado({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
    return (
      <div>
        <h2 className="text-lg font-bold mb-4">Dados do Periciado</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <input placeholder="Nome completo*" className="border rounded p-2 col-span-2" />
          <input placeholder="Documento de Identificação*" className="border rounded p-2" />
          <input placeholder="Data de nascimento*" className="border rounded p-2" />
          <input placeholder="Sexo*" className="border rounded p-2" />
          <textarea placeholder="Informações do corpo ou periciado*" className="border rounded p-2 col-span-2 h-24" />
        </div>
        <div className="mt-4 flex justify-between">
          <button onClick={onBack} className="px-4 py-2 rounded-full border">← Voltar</button>
          <button onClick={onNext} className="bg-[#002C49] text-white px-4 py-2 rounded-full hover:bg-blue-800">Seguir →</button>
        </div>
      </div>
    );
  }
  