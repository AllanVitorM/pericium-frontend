'use client';
import Image from "next/image";
import logoAzul from "@/assets/Pericium_azul.png";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { Menu } from "lucide-react"; // ícone de menu

export default function Sidebar() {
  const router = useRouter();
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigation = (path: string) => {
    if (path === "/login") {
      logout();
    }
    router.push(path);
    setIsOpen(false); // fecha o menu depois de navegar
  };

  const pages = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Casos", path: "/casos" },
    { name: "Funcionários", path: "/criarUsuarios" },
    { name: "Perfil", path: "/perfil" },
    { name: "Sair", path: "/login" },
  ];

  return (
    <>
      {/* Botão hamburguer */}
      <button
        className="lg:hidden fixed top-4 left-4 z-20 bg-[#002C49] p-2 rounded-full text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu size={24} />
      </button>

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full bg-[#B6C0C7] flex flex-col items-center py-10 shadow-lg z-10 transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        w-3/4 sm:w-2/5 md:w-58
        lg:translate-x-0
      `}>

        
       <a href="/home"> <Image src={logoAzul} alt="logo" className="mb-8 w-44 h-44 object-contain mx-auto" /> </a> 
        
        <nav className="flex flex-col gap-4 w-full px-6">
          {pages.map((item) => (
            <button
              key={item.name}
              onClick={() => handleNavigation(item.path)}
              className="bg-[#002C49] text-white py-3 rounded-full hover:bg-[#00416D] transition-colors duration-200 text-sm font-medium"
            >
              {item.name}
            </button>
          ))}
        </nav>
      </aside>
    </>
  );
}
