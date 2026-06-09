"use client";

import React from "react";
import Link from "next/link";
import CompletedClassModalBody from "./CompletedClassModalBody";
import LiveClassModalBody from "./LiveClassModalBody";

interface ClassSession {
  id: string;
  subject: string;
  subText: string;
  time: string;
  period: string;
  status: string;
  room: string;
  teacher: string;
  color: "orange" | "yellow" | "darkBlue" | "blue";
  day: number;
  gridRowStart?: number;
  gridRowSpan?: number;
  mode?: "Trực tiếp" | "Trực tuyến";
}

interface ScheduleClassModalProps {
  isOpen: boolean;
  selectedClass: ClassSession | null;
  selectedClassStatus: "live" | "done" | "upcoming";
  onClose: () => void;
  isScanning: boolean;
  handleAIScan: () => void;
  onEdit?: (cls: any) => void;
  onDelete?: (classId: string) => void;
}

export default function ScheduleClassModal({
  isOpen,
  selectedClass,
  selectedClassStatus,
  onClose,
  isScanning,
  handleAIScan,
  onEdit,
  onDelete,
}: ScheduleClassModalProps) {
  if (!isOpen || !selectedClass) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Overlay background */}
      <div
        role="button"
        tabIndex={0}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClose();
          }
        }}
        aria-label="Close modal background"
      />

      <div className="relative bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] mx-4 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-border-light flex justify-between items-center bg-surface-bright text-left">
          <div className="flex flex-col sm:flex-row sm:items-center items-start gap-2 sm:gap-4">
            <div>
              <h3 className="font-headline-md text-headline-md font-bold text-text-primary">
                {selectedClassStatus === "done" ? "Báo cáo Tổng kết Lớp" : "Giám sát Lớp học"}: {selectedClass.subject} ({selectedClass.room})
              </h3>
              <p className="font-caption text-caption text-outline mt-0.5">
                Giảng viên: {selectedClass.teacher || "N/A"} | Thời gian: {selectedClass.time}
              </p>
            </div>
            {selectedClassStatus === "live" && (
              <span className="bg-error-red text-white font-body-sm text-[11px] px-2.5 py-1 rounded-full flex items-center gap-1.5 animate-pulse font-semibold whitespace-nowrap">
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping"></span> LIVE
              </span>
            )}
            {selectedClassStatus === "done" && (
              <span className="bg-outline/10 text-outline text-[11px] px-2.5 py-1 rounded-full font-bold border border-outline/25 whitespace-nowrap">
                ĐÃ KẾT THÚC
              </span>
            )}
            {selectedClassStatus === "upcoming" && (
              <span className="bg-primary/10 text-primary text-[11px] px-2.5 py-1 rounded-full font-bold border border-primary/20 whitespace-nowrap">
                SẮP DIỄN RA
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full hover:bg-surface-container flex items-center justify-center text-outline hover:text-text-primary transition-colors cursor-pointer shrink-0"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Modal Body */}
        {selectedClassStatus === "done" ? (
          <CompletedClassModalBody selectedClass={selectedClass} />
        ) : (
          <LiveClassModalBody selectedClass={selectedClass} selectedClassStatus={selectedClassStatus} />
        )}

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-surface-bright border-t border-border-light flex justify-between items-center gap-2 flex-wrap">
          {/* Left: CRUD actions */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                onClose();
                onEdit?.(selectedClass);
              }}
              className="px-4 py-2 border border-border-light rounded-xl font-button-std text-xs bg-white text-primary hover:bg-primary/5 transition-colors flex items-center gap-1.5 cursor-pointer active:scale-95 font-semibold"
            >
              <span className="material-symbols-outlined text-[16px]">edit</span>
              Sửa lịch học
            </button>
            <button
              type="button"
              onClick={() => {
                if (confirm(`Bạn có chắc chắn muốn xóa lịch học môn "${selectedClass.subject}"?`)) {
                  onClose();
                  onDelete?.(selectedClass.id);
                }
              }}
              className="px-4 py-2 border border-error-red/20 rounded-xl font-button-std text-xs bg-error-red/5 hover:bg-error-red/10 text-error-red transition-colors flex items-center gap-1.5 cursor-pointer active:scale-95 font-semibold"
            >
              <span className="material-symbols-outlined text-[16px]">delete</span>
              Xóa
            </button>
          </div>

          {/* Right: standard links/actions */}
          <div className="flex gap-2 ml-auto">
            {selectedClassStatus === "live" && (
              <button 
                type="button"
                onClick={handleAIScan}
                disabled={isScanning}
                className="px-5 py-2 bg-success-green hover:bg-green-700 disabled:opacity-60 text-white font-button-std text-xs rounded-xl shadow-sm transition-colors flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <span className="material-symbols-outlined text-[16px]">smart_toy</span>
                {isScanning ? "Đang quét điểm danh..." : "Điểm danh AI"}
              </button>
            )}
            {selectedClassStatus === "done" ? (
              <Link 
                href={`/schedule/report/${selectedClass.id}`}
                onClick={onClose}
                className="px-5 py-2 bg-success-green hover:bg-green-700 text-white font-button-std text-xs rounded-xl shadow-sm transition-colors flex items-center gap-2 cursor-pointer active:scale-95 text-center font-semibold"
              >
                <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                Mở báo cáo đầy đủ
              </Link>
            ) : (
              <button 
                type="button"
                onClick={() => {
                  onClose();
                  if (selectedClassStatus === "live") {
                    alert("Tính năng mở rộng cho lớp học trực tiếp đang phát triển!");
                  } else {
                    alert("Tiết học chưa bắt đầu, phân tích chi tiết chưa khả dụng!");
                  }
                }}
                className="px-5 py-2 bg-primary hover:bg-blue-700 text-white font-button-std text-xs rounded-xl shadow-sm transition-colors flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                Mở trang phân tích chi tiết
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
