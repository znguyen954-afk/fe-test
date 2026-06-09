"use client";

import React, { useState } from "react";

interface Camera {
  id: string;
  room: string;
  status: string;
}

interface CameraFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (camera: Camera) => void;
  initialCamera?: Camera | null;
  existingIds: string[];
}

export default function CameraFormModal({
  isOpen,
  onClose,
  onSave,
  initialCamera = null,
  existingIds,
}: CameraFormModalProps) {
  // Find next default ID
  const getNextId = () => {
    const nextNum = existingIds
      .map(currId => {
        const matches = currId.match(/CAM-(\d+)/);
        return matches ? parseInt(matches[1], 10) : 0;
      })
      .reduce((max, val) => Math.max(max, val), 0) + 1;
    
    const paddedNum = String(nextNum).padStart(2, "0");
    return `CAM-${paddedNum}`;
  };

  const [id, setId] = useState(() => initialCamera ? initialCamera.id : getNextId());
  const [room, setRoom] = useState(initialCamera ? initialCamera.room : "");
  const [status, setStatus] = useState(initialCamera ? initialCamera.status : "online");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const cleanId = id.trim();
    const cleanRoom = room.trim();

    if (!cleanId) {
      setError("Vui lòng nhập mã Camera");
      return;
    }

    if (!/^CAM-\d+$/.test(cleanId)) {
      setError("Mã Camera phải có định dạng CAM-XX (Ví dụ: CAM-01, CAM-12)");
      return;
    }

    if (!cleanRoom) {
      setError("Vui lòng nhập tên phòng / vị trí");
      return;
    }

    // Only check duplicate ID if adding a new camera
    if (!initialCamera && existingIds.includes(cleanId)) {
      setError(`Mã Camera ${cleanId} đã tồn tại trong hệ thống`);
      return;
    }

    onSave({
      id: cleanId,
      room: cleanRoom,
      status,
    });
  };

  const statusOptions = [
    { value: "online", name: "Trực tuyến", icon: "fiber_manual_record", colorClass: "text-success-green", bgClass: "bg-success-green/10" },
    { value: "offline", name: "Ngoại tuyến", icon: "fiber_manual_record", colorClass: "text-error-red", bgClass: "bg-error-red/10" },
    { value: "warning", name: "Cảnh báo", icon: "warning", colorClass: "text-orange-500", bgClass: "bg-orange-500/10" },
  ];

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center">
      {/* Backdrop */}
      <div
        role="button"
        tabIndex={0}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") onClose();
        }}
        aria-label="Đóng form backdrop"
      />

      <div
        className="relative bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] mx-4 animate-in fade-in zoom-in-95 duration-200 z-10"
        style={{ width: "450px", maxWidth: "calc(100vw - 32px)" }}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-border-light flex justify-between items-center bg-surface-bright text-left">
          <div>
            <h3 className="font-headline-md text-headline-md font-bold text-text-primary">
              {initialCamera ? "Cập nhật Camera" : "Thêm Camera Mới"}
            </h3>
            <p className="font-caption text-caption text-outline mt-0.5">
              {initialCamera ? "Chỉnh sửa thông tin chi tiết camera" : "Nhập thông tin thiết bị camera giám sát mới"}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full hover:bg-surface-container flex items-center justify-center text-outline hover:text-text-primary transition-colors cursor-pointer shrink-0"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4 text-left">
          {error && (
            <div className="p-3 bg-error-red/10 border border-error-red/20 rounded-xl text-error-red text-xs font-semibold flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px]">error</span>
              {error}
            </div>
          )}

          {/* Camera ID */}
          <div>
            <label htmlFor="cameraId" className="block text-xs font-bold text-outline mb-1 uppercase tracking-wider">
              Mã Camera <span className="text-error-red">*</span>
            </label>
            <input
              id="cameraId"
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="Ví dụ: CAM-13"
              disabled={!!initialCamera}
              className={`w-full px-4 py-2.5 rounded-xl border border-border-light focus:border-primary/50 focus:ring-0 outline-none text-xs font-medium bg-surface-bright transition-colors ${
                initialCamera ? "opacity-60 cursor-not-allowed bg-gray-50" : ""
              }`}
              required
            />
            {!initialCamera && (
              <p className="text-[10px] text-outline mt-1 font-mono">Định dạng khuyên dùng: CAM-XX (Tự động tạo dựa trên số lớn nhất)</p>
            )}
          </div>

          {/* Room / Location */}
          <div>
            <label htmlFor="room" className="block text-xs font-bold text-outline mb-1 uppercase tracking-wider">
              Phòng học / Vị trí <span className="text-error-red">*</span>
            </label>
            <input
              id="room"
              type="text"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              placeholder="Ví dụ: Phòng 304 - Tòa A"
              className="w-full px-4 py-2.5 rounded-xl border border-border-light focus:border-primary/50 focus:ring-0 outline-none text-xs font-medium bg-surface-bright transition-colors"
              required
            />
          </div>

          {/* Status Selection */}
          <div>
            <span className="block text-xs font-bold text-outline mb-2 uppercase tracking-wider">
              Trạng thái camera
            </span>
            <div className="grid grid-cols-3 gap-2">
              {statusOptions.map((opt) => {
                const isSelected = status === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setStatus(opt.value)}
                    className={`flex flex-col items-center justify-center py-3 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? `border-primary ${opt.bgClass} shadow-sm font-bold text-primary`
                        : "border-border-light hover:bg-surface-dim text-on-surface-variant font-medium"
                    }`}
                  >
                    <span className={`material-symbols-outlined text-[18px] mb-1 ${
                      isSelected ? opt.colorClass : "text-outline"
                    }`}>
                      {opt.icon}
                    </span>
                    <span className="text-[11px]">{opt.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Footer actions */}
          <div className="pt-4 border-t border-border-light flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 border border-border-light rounded-xl font-button-std text-xs bg-white hover:bg-surface-container transition-colors text-outline cursor-pointer active:scale-95"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-primary hover:bg-blue-700 text-white font-button-std text-xs rounded-xl shadow-sm transition-colors flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <span className="material-symbols-outlined text-[16px]">save</span>
              Lưu thay đổi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
