"use client";

import { useAuth } from "@/context/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import type { Role } from "@/context/AuthContext";

export default function ProtectedRoute({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles?: Role[];
}) {
  const { isAuthenticated, user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();


  useEffect(() => {
    if (loading) {
      return;
    }

    console.log("isAuthenticated", isAuthenticated);
    console.log("user role", user?.role);

    if (!isAuthenticated) {
      localStorage.removeItem("token");
      router.replace(`/login?redirect=${pathname}`);
      return;
    } 
    else if (allowedRoles && (!user?.role || !allowedRoles.includes(user.role))) {
      localStorage.removeItem("token");
      console.log(
        "Acesso negado, usuário não tem permissão para acessar essa página"
      );
      router.replace("/unauthorized");
    }
  }, [isAuthenticated, pathname, router, user, allowedRoles, loading]);

  if (loading) {
    return <div>Carregando...</div>; // Ou um spinner bonito
  }

  if (isAuthenticated && (!allowedRoles || allowedRoles.includes(user!.role))) {
    return <>{children}</>
  }
  return null;

}
