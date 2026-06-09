"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import cmcLogo from "@/assets/CMClogo.webp";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname();

  const handleLinkClick = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setIsOpen(false);
    }
  };

  const getLinkClass = (path: string) => {
    const isActive = pathname === path;
    if (isActive) {
      return "flex items-center gap-4 py-3 pl-6 pr-4 border-l-4 border-primary bg-[#f0f4ff] text-primary transition-colors font-medium text-sm mr-4 rounded-r-3xl";
    }
    return "flex items-center gap-4 py-3 pl-6 pr-4 border-l-4 border-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors font-medium text-sm mr-4 rounded-r-3xl";
  };

  return (
    <aside className={`bg-white text-primary dark:text-primary-fixed font-body-std text-body-std fixed left-0 top-0 h-screen w-[260px] shadow-[1px_0px_0px_0px_rgba(0,0,0,0.05)] shadow-sm flex flex-col py-md z-50 transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
      <div className="px-6 mb-6 flex items-center justify-center relative border-b border-gray-100 pb-2">
        <div className="flex items-center justify-center py-2 pr-6">
          <Image src={cmcLogo} alt="CMC Logo" width={140} height={45} className="object-contain h-12 w-auto" />
        </div>
        <button 
          type="button"
          className="p-1.5 text-outline hover:text-primary hover:bg-gray-100 rounded-lg flex items-center justify-center absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer transition-colors"
          onClick={() => setIsOpen(false)}
          aria-label="Collapse Sidebar"
        >
          <span className="material-symbols-outlined text-[20px]">menu_open</span>
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto flex flex-col gap-2">
        <div className="px-7 mb-1 mt-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Chi tiết học thuật
        </div>
        
        <Link href="/dashboard" className={getLinkClass("/dashboard")} onClick={handleLinkClick}>
          <span className="material-symbols-outlined">grid_view</span>
          <span>Bảng điều khiển</span>
        </Link>
        <Link href="/teachers" className={getLinkClass("/teachers")} onClick={handleLinkClick}>
          <span className="material-symbols-outlined">person</span>
          <span>Giảng viên</span>
        </Link>
        <Link href="/teachers/schedule" className={getLinkClass("/teachers/schedule")} onClick={handleLinkClick}>
          <span className="material-symbols-outlined">calendar_month</span>
          <span>Lịch giảng dạy</span>
        </Link>
        <Link href="/schedule" className={getLinkClass("/schedule")} onClick={handleLinkClick}>
          <span className="material-symbols-outlined">calendar_today</span>
          <span>Lịch học</span>
        </Link>
        <Link href="/cameras" className={getLinkClass("/cameras")} onClick={handleLinkClick}>
          <span className="material-symbols-outlined">videocam</span>
          <span>Camera</span>
        </Link>
      </div>

      <div className="px-6 mt-auto border-t border-gray-100 pt-4 flex flex-col gap-1 pb-4 lg:pb-0">
        <Link href="/login" className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-500 hover:bg-red-50 transition-colors font-medium text-sm" onClick={handleLinkClick}>
          <span className="material-symbols-outlined">logout</span>
          <span>Đăng xuất</span>
        </Link>
      </div>
    </aside>
  );
}

