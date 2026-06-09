"use client";
  
import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

let globalIsSidebarOpen = false;
let globalIsInitialized = false;

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(globalIsSidebarOpen);

  useEffect(() => {
    if (typeof window !== "undefined" && !globalIsInitialized) {
      const isDesktop = window.innerWidth >= 1024;
      setIsSidebarOpen(isDesktop);
      globalIsSidebarOpen = isDesktop;
      globalIsInitialized = true;
    }
  }, []);

  const setSidebarOpen = (open: boolean) => {
    setIsSidebarOpen(open);
    globalIsSidebarOpen = open;
  };


  return (
    <div className="relative min-h-screen bg-background w-full flex-1">
      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div 
          role="button"
          tabIndex={0}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setSidebarOpen(false);
            }
          }}
        />
      )}
      
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setSidebarOpen} />
      <Header toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} isSidebarOpen={isSidebarOpen} />
      
      <main className={`${isSidebarOpen ? "lg:ml-[260px]" : "lg:ml-0"} mt-16 flex-1 flex h-[calc(100vh-64px)] overflow-x-hidden overflow-y-auto transition-all duration-300`}>
        <div className="max-w-[1440px] mx-auto w-full flex-1 flex flex-col">
          {children}
        </div>
      </main>
    </div>
  );
}
