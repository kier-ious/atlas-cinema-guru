// app/components/Layout.tsx
import { useSession, signOut } from "next-auth/react";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode; // Specify the type for children
}

const Layout = ({ children }: LayoutProps) => {
  const { data: session, status } = useSession();

  if (status === "loading") return <div>Loading...</div>; 

  return (
    <div className="layout">
      <header className="header">
        <img src="/logo.png" alt="App Logo" className="logo" />
        {session ? (
          <div className="user-info">
            <span>{session.user.email}</span>
            <button onClick={() => signOut()}>Log Out</button>
          </div>
        ) : (
          <div>
            <span>Please log in</span>
          </div>
        )}
      </header>
      <aside className="sidebar">
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/favorites">Favorites</a></li>
            <li><a href="/watch-later">Watch Later</a></li>
            <li><a href="/activity">Activity Feed</a></li>
          </ul>
        </nav>
      </aside>
      <main className="main-content">{children}</main>
    </div>
  );
};

export default Layout;
