interface buttonProps {
    text: string;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
}


export default function ButtonLogin({text, onClick, type}: buttonProps){
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