interface buttonProps {
    text: string;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
}


export const ButtonLogin = ({text, onClick, type}: buttonProps) =>{
    return (
        <div className="flex justify-center items-center rounded-full">
        <button
            type={type}
            onClick={onClick}
            className="w-2xs py-2 px-4 bg-[#15354B] text-white  font-semibold rounded-md hover:bg-blue-800 transition duration-300 flex justify-center items-center"
            >
            {text}
            </button>
    </div>
    )
}

export const ButtonandSearch = ({text, onClick, type}: buttonProps) => {
    return(
        <div className="w-full">
        <div className="flex">
            <div className="w-1/4 mb-4">
                <button 
                type={type}
                onClick={onClick}
                className="flex items-center gap-2 bg-[#002C49] text-white px-4 py-2 rounded-full hover:bg-blue-800">
                    <span className="text-lg font-bold">+</span> {text}
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
    )
}