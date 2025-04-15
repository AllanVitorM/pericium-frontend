export default function Etapa1Registro({ onNext }: { onNext: () => void }) {
    return (
      <div>
        <h2 className="text-lg font-bold mb-4">Dados do Registro</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <input placeholder="Órgão solicitante*" className="border rounded p-2" />
          <input placeholder="Tipo de perícia*" className="border rounded p-2" />
          <input placeholder="Registro de caso no órgão*" className="border rounded p-2" />
          <input placeholder="Local do fato*" className="border rounded p-2" />
          <input placeholder="Data do caso*" className="border rounded p-2" />
          <input placeholder="Hora do caso*" className="border rounded p-2" />
        </div>
        <div className="mt-4 flex justify-end">
          <button onClick={onNext} className="bg-[#002C49] text-white px-4 py-2 rounded-full hover:bg-blue-800">Seguir →</button>
        </div>
      </div>
    );
  }
  