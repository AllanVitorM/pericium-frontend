import Image from "next/image";
import logo from "@/assets/logo.png";

export default function Sidebar() {
    return (
        <aside className="fixed top-0 left-0 h-screen w-58 bg-[#B6C0C7] flex flex-col items-center py-10 shadow-lg z-10">
            <Image src={logo} alt="logo" className="mb-8 w-14 h-14" />
            <nav className="flex flex-col gap-4 w-full px-6">
                {["Dashboard", "Casos", "Funcionários", "Perfil"].map((item) => (
                    <button
                        key={item}
                        className="bg-[#002C49] text-white py-3 rounded-full hover:bg-[#00416D] transition-colors duration-200 text-sm font-medium"
                    >
                        {item}
                    </button>
                ))}
            </nav>
        </aside>
    );
}