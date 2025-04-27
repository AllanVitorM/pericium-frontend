import ContainerImage from "@/components/containerimage";
import LoginForm from "@/components/loginform";

export default function LoginPage() {
  return (
    <div className="flex flex-col md:flex-row h-screen w-screen">
      
      {/* Lado esquerdo - Imagem (só aparece em telas médias ou maiores) */}
      <div className="hidden md:flex w-1/2 h-full">
        <ContainerImage />
      </div>

      {/* Lado direito - Formulário */}
      <div className="w-full md:w-1/2 bg-white h-full flex items-center justify-center">
        <LoginForm />
      </div>

    </div>
  );
}
