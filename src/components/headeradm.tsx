interface AdminHeaderProps {
    id: string;
    nome: string;
    cargo: string;
  }
  
  export default function AdminHeader({ id, nome, cargo }: AdminHeaderProps) {
    return (
      <div className="flex justify-between items-center bg-[#B6C0C7] px-6 py-2 rounded-full mb-6 text-sm">
        <span>
          <strong>ID:</strong> {id}
        </span>
        <span>
          <strong>Nome:</strong> {nome}
        </span>
        <span>
          <strong>Cargo:</strong> {cargo}
        </span>
      </div>
    );
  }
  