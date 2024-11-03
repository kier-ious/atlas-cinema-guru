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
      <body className="antialiased bg-[#00003c] text-white">
        <SessionProvider>
          <div className="layout">
            <header className="header">
              <UserInfo />
            </header>
            <div className="content-wrapper" style={{ display: "flex", flexDirection: "row" }}>
            <Navigation />
            <main className="main-content">
                {children}
              </main>
            </div>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
