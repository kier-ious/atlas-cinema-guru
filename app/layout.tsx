import "@/app/global.css";
import { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import UserInfo from "@/components/UserInfo";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
  title: "Cinema Guru | Atlas School",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {

  return (
    <html lang="en">
      <body className="antialiased bg-[#00003c] text-white overflow-x-hidden">
        <SessionProvider>
          <div className="layout min-h-screen">
            <header className="header">
              <UserInfo />
            </header>
            <div className="flex">
              <div className="flex-grow-y">
              <Navigation />
              </div>
            <main className="main-content p-4">
                <div className="container">{children}</div>
              </main>
            </div>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
