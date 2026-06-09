"use client";

import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";

interface NotificationItem {
  id: number;
  title: string;
  desc: string;
  time: string;
  type: "warning" | "error" | "info" | "success";
  unread: boolean;
  category: string;
}

const initialNotifications: NotificationItem[] = [
  {
    id: 1,
    title: "Phát hiện sử dụng điện thoại",
    desc: "Lớp Học máy nâng cao tại Phòng 302 ghi nhận học sinh ở bàn 3 có hành vi sử dụng điện thoại di động trong giờ học liên tục hơn 2 phút.",
    time: "2 phút trước",
    type: "warning",
    unread: true,
    category: "Lớp học"
  },
  {
    id: 2,
    title: "Camera số 3 mất kết nối",
    desc: "Hệ thống phát hiện Camera số 3 tại Phòng 405 tạm thời mất kết nối và không truyền tải được tín hiệu ghi hình về máy chủ chính.",
    time: "15 phút trước",
    type: "error",
    unread: true,
    category: "Thiết bị"
  },
  {
    id: 3,
    title: "Lớp học bắt đầu thành công",
    desc: "Buổi học AI 101 của giảng viên TS. Sarah Jenkins tại Phòng 204 đã bắt đầu. Hệ thống AI Camera giám sát đã được kích hoạt thành công.",
    time: "45 phút trước",
    type: "info",
    unread: false,
    category: "Lớp học"
  },
  {
    id: 4,
    title: "Hệ thống sao lưu hoàn tất",
    desc: "Dữ liệu phân tích cảm xúc và chuyên cần của ngày 02/06/2026 đã được tự động sao lưu an toàn lên hệ thống lưu trữ đám mây Cloud Storage.",
    time: "1 ngày trước",
    type: "success",
    unread: false,
    category: "Hệ thống"
  },
  {
    id: 5,
    title: "Cảnh báo xao nhãng diện rộng",
    desc: "Lớp học Lập trình game tại Phòng 602 ghi nhận mức độ tương tác trung bình của lớp học giảm xuống dưới 65% trong hơn 10 phút.",
    time: "1 ngày trước",
    type: "warning",
    unread: false,
    category: "Lớp học"
  }
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [filter, setFilter] = useState<"all" | "unread" | "warning" | "error">("all");

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("system_notifications");
      if (saved) {
        try {
          setNotifications(JSON.parse(saved));
        } catch (e) {
          console.error("Failed to load notifications", e);
        }
      } else {
        localStorage.setItem("system_notifications", JSON.stringify(initialNotifications));
      }
    }
  }, []);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const saveNotifications = (updated: NotificationItem[]) => {
    setNotifications(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("system_notifications", JSON.stringify(updated));
      window.dispatchEvent(new Event("notifications_updated"));
    }
  };

  const handleMarkAllRead = () => {
    saveNotifications(notifications.map((n) => ({ ...n, unread: false })));
  };

  const handleMarkAsRead = (id: number) => {
    saveNotifications(
      notifications.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
  };

  const handleDelete = (id: number) => {
    saveNotifications(notifications.filter((n) => n.id !== id));
  };

  const filteredNotifications = notifications.filter((n) => {
    if (filter === "unread") return n.unread;
    if (filter === "warning") return n.type === "warning";
    if (filter === "error") return n.type === "error";
    return true;
  });

  const getIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <span className="material-symbols-outlined text-[#D4A325] text-[24px]">warning</span>;
      case "error":
        return <span className="material-symbols-outlined text-error-red text-[24px]">error</span>;
      case "success":
        return <span className="material-symbols-outlined text-success-green text-[24px]">check_circle</span>;
      default:
        return <span className="material-symbols-outlined text-primary text-[24px]">info</span>;
    }
  };

  return (
    <DashboardLayout>
      <div className="flex-1 p-margin-mobile md:p-margin-desktop mx-auto w-full flex flex-col gap-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-text-primary">
              Trung tâm thông báo
            </h1>
            <p className="font-body-std text-body-std text-on-surface-variant mt-1">
              Xem và quản lý tất cả cảnh báo, thông báo từ hệ thống giám sát AI.
            </p>
          </div>
          {unreadCount > 0 && (
            <button
              type="button"
              onClick={handleMarkAllRead}
              className="bg-primary/10 text-primary border border-primary/20 hover:bg-primary/15 px-4 py-2 rounded-xl font-button-std text-xs flex items-center gap-2 cursor-pointer transition-colors active:scale-95"
            >
              <span className="material-symbols-outlined text-[16px]">done_all</span>
              Đánh dấu tất cả đã đọc
            </button>
          )}
        </div>

        {/* Notification Main UI */}
        <div className="bg-white rounded-3xl border border-border-light/80 shadow-[0px_4px_25px_rgba(0,0,0,0.03)] overflow-hidden flex flex-col min-h-[500px]">
          {/* Filters Bar */}
          <div className="px-6 py-4 border-b border-border-light/60 flex flex-wrap gap-2 items-center bg-surface-bright">
            <button
              type="button"
              onClick={() => setFilter("all")}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${filter === "all" ? "bg-primary text-white shadow-sm" : "text-outline hover:bg-surface-container"}`}
            >
              Tất cả ({notifications.length})
            </button>
            <button
              type="button"
              onClick={() => setFilter("unread")}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${filter === "unread" ? "bg-primary text-white shadow-sm" : "text-outline hover:bg-surface-container"}`}
            >
              Chưa đọc ({unreadCount})
            </button>
            <button
              type="button"
              onClick={() => setFilter("warning")}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${filter === "warning" ? "bg-primary text-white shadow-sm" : "text-outline hover:bg-surface-container"}`}
            >
              Chú ý
            </button>
            <button
              type="button"
              onClick={() => setFilter("error")}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${filter === "error" ? "bg-primary text-white shadow-sm" : "text-outline hover:bg-surface-container"}`}
            >
              Khẩn cấp
            </button>
          </div>

          {/* List content */}
          {filteredNotifications.length > 0 ? (
            <div className="divide-y divide-border-light/50 flex-1">
              {filteredNotifications.map((item) => (
                <div
                  key={item.id}
                  className={`p-6 flex flex-col sm:flex-row gap-4 items-start transition-all hover:bg-surface-bright/40 ${item.unread ? "bg-surface-container-low/10" : ""}`}
                >
                  <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center shrink-0 border border-border-light/40">
                    {getIcon(item.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className={`text-sm ${item.unread ? "font-bold text-text-primary" : "font-semibold text-text-primary"}`}>
                        {item.title}
                      </h3>
                      <span className="text-[10px] bg-surface-container text-outline px-2 py-0.5 rounded font-bold border border-border-light/30">
                        {item.category}
                      </span>
                      {item.unread && (
                        <span className="bg-primary text-white text-[9px] font-bold px-1.5 py-0.5 rounded uppercase">Mới</span>
                      )}
                    </div>
                    <p className="text-xs text-on-surface-variant leading-relaxed mt-1.5">
                      {item.desc}
                    </p>
                    <span className="text-[11px] text-outline mt-2 block font-medium">{item.time}</span>
                  </div>
                  <div className="flex gap-2 self-end sm:self-start shrink-0">
                    {item.unread && (
                      <button
                        type="button"
                        onClick={() => handleMarkAsRead(item.id)}
                        className="p-1.5 text-outline hover:text-success-green hover:bg-success-green/10 rounded-lg transition-colors cursor-pointer"
                        title="Đánh dấu đã đọc"
                      >
                        <span className="material-symbols-outlined text-[18px]">done</span>
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => handleDelete(item.id)}
                      className="p-1.5 text-outline hover:text-error-red hover:bg-error-red/10 rounded-lg transition-colors cursor-pointer"
                      title="Xóa thông báo"
                    >
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center py-20 text-outline gap-3">
              <span className="material-symbols-outlined text-[48px] text-outline/55">notifications_off</span>
              <p className="font-semibold text-sm">Không tìm thấy thông báo nào</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
