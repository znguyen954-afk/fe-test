"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Breadcrumbs from "./header/Breadcrumbs";
import QuickSearch from "./header/QuickSearch";
import NotificationDropdown from "./header/NotificationDropdown";
import UserProfile from "./header/UserProfile";

interface HeaderProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

export default function Header({ toggleSidebar, isSidebarOpen }: HeaderProps) {
  const pathname = usePathname();

  // Helper to map pathname to breadcrumb label
  const getPageTitle = (path: string) => {
    switch (path) {
      case "/dashboard":
        return "Bảng điều khiển";
      case "/teachers":
        return "Giảng viên";
      case "/teachers/schedule":
        return "Lịch giảng dạy";
      case "/schedule":
        return "Lịch học";
      case "/cameras":
        return "Camera";
      default:
        return "Tổng quan";
    }
  };

  const pageTitle = getPageTitle(pathname);

  return (
    <header className={`bg-white text-text-primary dark:text-primary-fixed border-b border-border-light/65 fixed top-0 right-0 w-full ${isSidebarOpen ? "lg:w-[calc(100%-260px)]" : "lg:w-full"} h-16 flex justify-between items-center px-6 lg:px-9 z-30 transition-all duration-300`}>
      {/* Left side: Navigation / Breadcrumbs */}
      <div className="flex items-center gap-4">
        {!isSidebarOpen && (
          <button
            type="button"
            className="p-2 -ml-2 text-on-surface-variant hover:bg-surface-container rounded-full flex items-center justify-center transition-colors cursor-pointer animate-in fade-in duration-200"
            onClick={toggleSidebar}
            aria-label="Open Sidebar"
          >
            <span className="material-symbols-outlined text-[22px]">menu</span>
          </button>
        )}

        <Breadcrumbs pageTitle={pageTitle} />
      </div>

      {/* Right side: Search, Actions, Profile */}
      <div className="flex items-center gap-4 lg:gap-6">
        <QuickSearch />

        {/* Action Icon Group */}
        <div className="flex items-center gap-1 text-on-surface-variant relative">
          {/* Mobile search toggle */}
          <button type="button" className="sm:hidden w-9 h-9 flex items-center justify-center hover:bg-surface-container rounded-full text-on-surface-variant hover:text-primary transition-all cursor-pointer">
            <span className="material-symbols-outlined text-[20px]">search</span>
          </button>

          <NotificationDropdown />

          {/* Settings button */}
          <button type="button" className="w-9 h-9 flex items-center justify-center hover:bg-surface-container rounded-full text-on-surface-variant hover:text-primary transition-all cursor-pointer">
            <span className="material-symbols-outlined text-[20px]">settings</span>
          </button>
        </div>

        {/* User Profile */}
        <div className="h-6 w-px bg-border-light"></div>
        <UserProfile />
      </div>
    </header>
  );
}
