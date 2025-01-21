'use client'

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { Session } from "next-auth";

interface AuthProviderProps {
  children: ReactNode;
  session?: Session | null;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children, session }) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default AuthProvider;
