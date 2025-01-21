"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Dashboard = () => {
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Redireciona para /login se o usuário não estiver autenticado
    if (sessionStatus === "unauthenticated") {
      router.push("/login");
    }
  }, [sessionStatus, router]); // O efeito será executado sempre que sessionStatus mudar

  // Enquanto estiver carregando, exibe um loading ou nada
  if (sessionStatus === "loading") {
    return <p>Loading...</p>;
  }

  // Se o usuário estiver autenticado, renderiza o conteúdo
  return (
    sessionStatus === "authenticated" && (
      <div>Usuário Logado: {session.user?.name}</div>
    )
  );
};

export default Dashboard;
