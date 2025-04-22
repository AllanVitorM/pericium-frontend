'use client'
import Image from "next/image";
import logoAzul from "@/assets/Pericium_azul.png";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const pages = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Casos", path: "/casos" },
    { name: "Funcionários", path: "/criarUsuarios" },
    { name: "Perfil", path: "/perfil" },
  ];

  return (
    <aside className="fixed top-0 left-0 h-screen w-58 bg-[#B6C0C7] flex flex-col items-center py-10 shadow-lg z-10">
      <Image src={logoAzul} alt="logo" className="mb-8 w-40 h-60" />
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
  );
}
