"use client";

import { useSession } from "next-auth/react";
import { ReactNode, useState } from "react";
import UserInfo from "./UserInfo";
import Navigation from "./Navigation";
import ActivityFeed from "./ActivityFeed";
import useNavigation from "../hooks/useNavigation";
import HomePage from "./HomePage";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { status } = useSession();
  const { navigateTo, currentPath } = useNavigation();
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  if (status === "loading") return <div>Loading...</div>;

  return (
    <div className="layout">
      {/* UserInfo/Headeri */}
      <header className="header">
        <UserInfo />
      </header>

      <div className="content-wrapper" style={{ display: "flex", flexDirection: "row" }}>
        {/* Sidebar NAV */}
        <aside
          className={`sidebar ${isSidebarExpanded ? "expanded" : "collapsed"}`}
          onMouseEnter={() => setIsSidebarExpanded(true)}
          onMouseLeave={() => setIsSidebarExpanded(false)}
        >
          <Navigation navigateTo={navigateTo} currentPath={currentPath} isExpanded={isSidebarExpanded} />
          {isSidebarExpanded && <ActivityFeed />}
        </aside>

        {/* HomePage/Main Content */}
        <main className="main-content">
          {status === "authenticated" ? <HomePage /> : children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
