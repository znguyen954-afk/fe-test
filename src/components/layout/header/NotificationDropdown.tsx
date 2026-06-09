"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";

export default function NotificationDropdown() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const loadNotifications = () => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("system_notifications");
      if (saved) {
        try {
          setNotifications(JSON.parse(saved));
        } catch (e) {
          console.error(e);
        }
      } else {
        const defaultNots = [
          {
            id: 1,
            title: "Phát hiện sử dụng điện thoại",
            desc: "Lớp Học máy nâng cao tại Phòng 302 ghi nhận học sinh ở bàn 3 có hành vi sử dụng điện thoại di động trong giờ học liên tục hơn 2 phút.",
            time: "2 phút trước",
            type: "warning",
            unread: true
          },
          {
            id: 2,
            title: "Camera số 3 mất kết nối",
            desc: "Hệ thống phát hiện Camera số 3 tại Phòng 405 tạm thời mất kết nối và không truyền tải được tín hiệu ghi hình về máy chủ chính.",
            time: "15 phút trước",
            type: "error",
            unread: true
          },
          {
            id: 3,
            title: "Lớp học bắt đầu thành công",
            desc: "Buổi học AI 101 của giảng viên TS. Sarah Jenkins tại Phòng 204 đã bắt đầu. Hệ thống AI Camera giám sát đã được kích hoạt thành công.",
            time: "45 phút trước",
            type: "info",
            unread: false
          }
        ];
        setNotifications(defaultNots);
        localStorage.setItem("system_notifications", JSON.stringify(defaultNots));
      }
    }
  };

  useEffect(() => {
    loadNotifications();

    if (typeof window !== "undefined") {
      window.addEventListener("notifications_updated", loadNotifications);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("notifications_updated", loadNotifications);
      }
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <div className="relative flex items-center" ref={dropdownRef}>
      {/* Notifications button */}
      <button
        type="button"
        onClick={() => setShowNotifications(!showNotifications)}
        className="relative w-9 h-9 flex items-center justify-center hover:bg-surface-container rounded-full text-on-surface-variant hover:text-primary transition-all cursor-pointer group"
      >
        <span className="material-symbols-outlined text-[20px] transition-transform duration-300 group-hover:rotate-12">
          notifications
        </span>
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-error-red text-[8px] font-bold text-white border-2 border-white shadow-sm ring-1 ring-error-red/20">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Premium Notification Dropdown */}
      {showNotifications && (
        <div className="absolute right-0 top-11 w-80 md:w-96 bg-white border border-border-light/80 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] z-50 overflow-hidden animate-in fade-in slide-in-from-top-3 duration-200">
          <div className="px-4 py-3 bg-surface-bright border-b border-border-light/60 flex items-center justify-between">
            <span className="text-sm font-bold text-text-primary">Thông báo nhanh</span>
            {unreadCount > 0 && (
              <span className="bg-primary/10 text-primary text-[10px] px-2 py-0.5 rounded-full font-bold">{unreadCount} mới</span>
            )}
          </div>
          <div className="max-h-[320px] overflow-y-auto divide-y divide-border-light/50">
            {notifications.map((item) => (
              <div
                key={item.id}
                className={`p-4 flex gap-3 hover:bg-surface-bright/50 transition-colors text-left ${item.unread ? "bg-surface-container-low/20" : ""}`}
              >
                <div className="mt-0.5 shrink-0">
                  {item.type === "warning" && (
                    <span className="material-symbols-outlined text-[#D4A325] text-[20px]">warning</span>
                  )}
                  {item.type === "error" && (
                    <span className="material-symbols-outlined text-error-red text-[20px]">error</span>
                  )}
                  {item.type === "info" && (
                    <span className="material-symbols-outlined text-primary text-[20px]">info</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-2">
                    <p className={`text-xs ${item.unread ? "font-bold text-text-primary" : "font-semibold text-text-primary"} truncate`}>
                      {item.title}
                    </p>
                    {item.unread && (
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0"></span>
                    )}
                  </div>
                  <p className="text-[11px] text-on-surface-variant leading-snug mt-0.5 line-clamp-2">
                    {item.desc}
                  </p>
                  <span className="text-[10px] text-outline mt-1 block font-medium">{item.time}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="p-2 border-t border-border-light/60 bg-surface-bright text-center">
            <Link
              href="/notifications"
              onClick={() => setShowNotifications(false)}
              className="block w-full py-1.5 text-xs font-bold text-primary hover:text-blue-700 hover:bg-surface-container rounded-lg transition-colors cursor-pointer"
            >
              Xem tất cả thông báo
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
