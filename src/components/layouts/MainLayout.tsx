import React from 'react';

interface MainLayoutProps {
  leftSidebar: React.ReactNode;
  rightSidebar: React.ReactNode;
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ leftSidebar, rightSidebar, children }) => {
  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Outer grid keeps content centred with max-width */}
      <div className="max-w-[1440px] mx-auto flex gap-6 px-4 lg:px-8 py-6">
        {/* Left Sidebar – sticks to viewport & scrolls independently */}
        <aside className="hidden lg:block w-72 xl:w-80 h-[calc(100vh-96px)] sticky top-24 overflow-y-auto custom-scrollbar">
          {leftSidebar}
        </aside>

        {/* Main Feed column */}
        <main className="flex-1 min-w-0 space-y-6">
          {children}
        </main>

        {/* Right Sidebar */}
        <aside className="hidden xl:block w-72 h-[calc(100vh-96px)] sticky top-24 overflow-y-auto custom-scrollbar">
          {rightSidebar}
        </aside>
      </div>
    </div>
  );
};

export default MainLayout;
