export default function TableSection() {
    return (
        <section>
            {/* Tabela */}
            <div className="overflow-auto rounded-lg border border-gray-300">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-[#B6C0C7] text-left">
                            {[
                                "ID do Funcionário",
                                "Nome",
                                "Cargo",
                                "Casos Atribuídos",
                                "E-mail",
                                "Ação",
                            ].map((col) => (
                                <th key={col} className="px-4 py-2 font-medium">
                                    {col}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {Array.from({ length: 12 }).map((_, i) => (
                            <tr
                                key={i}
                                className={i % 2 === 0 ? "bg-[#E8EBED]" : "bg-[#B6C0C7]"}
                            >
                                {Array(5)
                                    .fill("—")
                                    .map((val, index) => (
                                        <td key={index} className="px-4 py-2">
                                            {val}
                                        </td>
                                    ))}
                                <td className="px-4 py-2 flex gap-1">
                                    <button className="cursor-pointer" title="Editar">✏️</button>
                                    <button className="cursor-pointer" title="Imprimir">🖨️</button>
                                    <button className="cursor-pointer" title="Excluir">🗑️</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
