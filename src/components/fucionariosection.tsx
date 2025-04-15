export default function FuncionariosSection() {
    return (
        <section>
            <div className="w-full">
                {/* Título e botão */}
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-xl font-bold">Funcionários</h1>
                </div>
                <div className="flex">
                    <div className="w-1/4 mb-4">
                        <button className="flex items-center gap-2 bg-[#002C49] text-white px-4 py-2 rounded-full hover:bg-blue-800">
                            <span className="text-lg font-bold">+</span> Cadastrar funcionário
                        </button>
                    </div>
                    {/* Campo de pesquisa */}
                    <div className="flex justify-end mb-4 w-3/4">
                        <input
                            type="text"
                            placeholder="Pesquisar"
                            className="border border-gray-400 px-4 py-1 rounded-full w-72 text-sm"
                        />
                    </div>
                </div>
            </div>
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
