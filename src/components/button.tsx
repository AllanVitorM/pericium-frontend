interface buttonProps {
    text: string;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
  }
  
  export const ButtonLogin = ({ text, onClick, type }: buttonProps) => {
    return (
      <div className="flex justify-center items-center w-full py-4">
        <button
          type={type}
          onClick={onClick}
          className="w-full max-w-xs py-2 px-4 bg-[#15354B] text-white font-semibold rounded-md hover:bg-blue-800 transition duration-300 flex justify-center items-center"
        >
          {text}
        </button>
      </div>
    );
  };
  
  export const ButtonandSearch = ({ text, onClick, type }: buttonProps) => {
    return (
      <div className="w-full py-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          {/* Botão */}
          <div className="w-full sm:w-auto">
            <button
              type={type}
              onClick={onClick}
              className="flex items-center gap-2 bg-[#002C49] text-white px-4 py-2 rounded-full hover:bg-blue-800 transition duration-300 w-full sm:w-auto justify-center"
            >
              <span className="text-lg font-bold">+</span> {text}
            </button>
          </div>
  
          {/* Campo de pesquisa */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="Pesquisar"
              className="border border-gray-400 px-4 py-2 rounded-full w-full text-sm"
            />
          </div>
        </div>
      </div>
    );
  };
  