import { getServerSession } from "next-auth";
import Navbar from "@/components/Navbar";
import SessionProvider from "@/providers/sessionProvider";

import './globals.css';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body className="bg-black text-white min-h-screen">
        <SessionProvider session={session}>
          <div className="grid grid-cols-12 gap-6">
            <aside className="col-span-2">
              <Navbar />
            </aside>
            <main className="col-span-10">{children}</main>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
