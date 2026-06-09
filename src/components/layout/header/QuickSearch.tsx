"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";

export default function QuickSearch() {
  const [quickSearchQuery, setQuickSearchQuery] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setQuickSearchQuery("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const quickSearchItems = [
    { title: "TS. Sarah Jenkins", subtitle: "Giảng viên - CNTT", link: "/teachers", keywords: "sarah jenkins giang vien cntt" },
    { title: "PGS.TS. Nguyễn Văn An", subtitle: "Giảng viên - Kỹ thuật phần mềm", link: "/teachers", keywords: "an nguyen van giang vien cntt" },
    { title: "ThS. Trần Thị Mai", subtitle: "Giảng viên - Hệ thống thông tin", link: "/teachers", keywords: "mai tran thi giang vien cntt" },
    { title: "TS. Lê Hoàng Nam", subtitle: "Giảng viên - An toàn thông tin", link: "/teachers", keywords: "nam le hoang giang vien cntt" },
    { title: "Phòng 301 - Tòa A (CAM-01)", subtitle: "Camera trực tuyến", link: "/cameras", keywords: "cam-01 phong 301 toa a online" },
    { title: "Phòng 302 - Tòa A (CAM-02)", subtitle: "Camera trực tuyến", link: "/cameras", keywords: "cam-02 phong 302 toa a online" },
    { title: "Phòng 303 - Tòa A (CAM-03)", subtitle: "Camera ngoại tuyến", link: "/cameras", keywords: "cam-03 phong 303 toa a offline" },
    { title: "Thời khóa biểu & Lịch học", subtitle: "Trang hệ thống", link: "/schedule", keywords: "tkb thoi khoa bieu lich hoc giam sat" },
    { title: "Lịch giảng dạy giảng viên", subtitle: "Trang hệ thống", link: "/teachers/schedule", keywords: "lich giang day giang vien tkb lich day" },
    { title: "Quản lý Camera", subtitle: "Trang hệ thống", link: "/cameras", keywords: "camera quan ly camera live feed" },
    { title: "Danh sách Giảng viên", subtitle: "Trang hệ thống", link: "/teachers", keywords: "giang vien danh sach gv" },
    { title: "Hồ sơ cá nhân", subtitle: "Trang hệ thống", link: "/profile", keywords: "ho so ca nhan profile" },
  ];

  const filteredQuickSearch = quickSearchQuery.trim() === "" ? [] : quickSearchItems.filter(item => 
    item.title.toLowerCase().includes(quickSearchQuery.toLowerCase()) ||
    item.keywords.toLowerCase().includes(quickSearchQuery.toLowerCase())
  ).slice(0, 5);

  return (
    <div className="relative w-48 lg:w-64 hidden sm:block" ref={searchRef}>
      <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-[18px] pointer-events-none">
        search
      </span>
      <input
        className="w-full pl-10 pr-12 py-1.5 bg-surface-bright border border-border-light/80 rounded-full font-body-std text-[13px] text-text-primary placeholder:text-outline/70 focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/10 focus:bg-surface-white shadow-inner transition-all"
        placeholder="Tìm kiếm nhanh..."
        type="text"
        value={quickSearchQuery}
        onChange={(e) => setQuickSearchQuery(e.target.value)}
      />
      <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[9px] font-medium text-outline bg-surface-container border border-border-light rounded pointer-events-none select-none">
        <span>⌘</span>K
      </kbd>

      {quickSearchQuery.trim() !== "" && (
        <div className="absolute top-11 left-0 w-80 bg-white border border-border-light/80 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] z-50 overflow-hidden animate-in fade-in slide-in-from-top-3 duration-200">
          <div className="px-4 py-2.5 bg-surface-bright border-b border-border-light/60 flex items-center justify-between">
            <span className="text-[11px] font-bold text-outline uppercase tracking-wider font-sans">Kết quả ({filteredQuickSearch.length})</span>
            <button 
              type="button"
              onClick={() => setQuickSearchQuery("")}
              className="text-xs text-primary font-bold hover:underline cursor-pointer"
            >
              Đóng
            </button>
          </div>
          <div className="max-h-[250px] overflow-y-auto divide-y divide-border-light/50">
            {filteredQuickSearch.length > 0 ? (
              filteredQuickSearch.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.link}
                  onClick={() => setQuickSearchQuery("")}
                  className="p-3 flex flex-col hover:bg-surface-bright/50 transition-colors text-left"
                >
                  <span className="text-xs font-semibold text-text-primary">{item.title}</span>
                  <span className="text-[10px] text-outline mt-0.5">{item.subtitle}</span>
                </Link>
              ))
            ) : (
              <div className="p-4 text-center text-xs text-outline italic">Không tìm thấy kết quả</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
