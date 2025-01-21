'use client'

import Link from "next/link";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

const Navbar = () => {
  const { data: session, status: sessionStatus } = useSession();

  const handleLogout = () => {
    signOut({ callbackUrl: "http://localhost:3000/" });
    alert("User signed out."); // Substituindo o toast do Chakra UI por um alerta básico
  };

  return (
    <nav className="sticky bg-black max-w-[150px] flex flex-col h-screen p-4">
      <div>
        <ul className="space-y-4">
          <li>
            <Link href="/">
              <strong>Home</strong>
            </Link>
          </li>
          <li>
            <Link href="/dashboard">
              <strong>Dashboard</strong>
            </Link>
          </li>
        </ul>
      </div>

      <div className="mt-auto">
        {sessionStatus === "authenticated" ? (
          <>
            <h5 className="mb-4">{session?.user?.name}</h5>
            <button
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <ul className="space-y-4">
            <li>
              <Link href="/login">
                <strong>Login</strong>
              </Link>
            </li>
            <li>
              <Link href="/register">
                <strong>Register</strong>
              </Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
