import React from "react";
import TopNavigation from "./TopNavigation";
import "./Layout.css";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <TopNavigation />
      <main className="content">{children}</main>
    </div>
  );
};

export default Layout;
