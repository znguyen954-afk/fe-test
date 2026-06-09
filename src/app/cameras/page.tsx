"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import CameraCard from "@/components/features/cameras/CameraCard";
import CameraModal from "@/components/features/cameras/CameraModal";
import CameraFormModal from "@/components/features/cameras/CameraFormModal";

// Mock data cho danh sách camera ban đầu
const initialCameras = [
  { id: "CAM-01", room: "Phòng 301 - Tòa A", status: "online" },
  { id: "CAM-02", room: "Phòng 302 - Tòa A", status: "online" },
  { id: "CAM-03", room: "Phòng 303 - Tòa A", status: "offline" },
  { id: "CAM-04", room: "Phòng 401 - Tòa B", status: "online" },
  { id: "CAM-05", room: "Phòng 402 - Tòa B", status: "online" },
  { id: "CAM-06", room: "Phòng 403 - Tòa B", status: "warning" },
  { id: "CAM-07", room: "Phòng 501 - Tòa C", status: "online" },
  { id: "CAM-08", room: "Phòng 502 - Tòa C", status: "online" },
  { id: "CAM-09", room: "Hội trường lớn", status: "online" },
  { id: "CAM-10", room: "Thư viện", status: "online" },
  { id: "CAM-11", room: "Căn tin", status: "online" },
  { id: "CAM-12", room: "Khu vực sân chơi", status: "offline" },
];

export default function CamerasPage() {
  const [camerasList, setCamerasList] = useState(initialCameras);
  const [selectedCamera, setSelectedCamera] = useState<typeof initialCameras[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("Tất cả trạng thái");

  // Form Modal state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCamera, setEditingCamera] = useState<typeof initialCameras[0] | null>(null);

  // Delete Confirm Modal state
  const [cameraToDelete, setCameraToDelete] = useState<typeof initialCameras[0] | null>(null);

  const filteredCameras = camerasList.filter((camera) => {
    const matchesSearch = 
      camera.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      camera.room.toLowerCase().includes(searchQuery.toLowerCase());
      
    let matchesStatus = true;
    if (statusFilter === "Trực tuyến") matchesStatus = camera.status === "online";
    else if (statusFilter === "Ngoại tuyến") matchesStatus = camera.status === "offline";
    else if (statusFilter === "Cảnh báo") matchesStatus = camera.status === "warning";
    
    return matchesSearch && matchesStatus;
  });

  const handleSaveCamera = (cameraData: typeof initialCameras[0]) => {
    if (editingCamera) {
      // Edit mode
      setCamerasList(prev => prev.map(c => c.id === cameraData.id ? cameraData : c));
    } else {
      // Add mode
      setCamerasList(prev => [...prev, cameraData]);
    }
    setIsFormOpen(false);
    setEditingCamera(null);
  };

  const handleEditCamera = (camera: typeof initialCameras[0]) => {
    setEditingCamera(camera);
    setIsFormOpen(true);
  };

  const handleInitiateDelete = (camera: typeof initialCameras[0]) => {
    setCameraToDelete(camera);
  };

  const handleConfirmDelete = () => {
    if (cameraToDelete) {
      setCamerasList(prev => prev.filter(c => c.id !== cameraToDelete.id));
      setCameraToDelete(null);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex-1 p-margin-mobile md:p-margin-desktop mx-auto w-full flex flex-col gap-section relative">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-md">
          <div>
            <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-text-primary">
              Quản lý Camera
            </h1>
            <p className="font-body-std text-body-std text-on-surface-variant mt-1">
              Giám sát hệ thống camera các phòng học theo thời gian thực.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-md w-full sm:w-auto">
            {/* Add Camera Button */}
            <button
              onClick={() => {
                setEditingCamera(null);
                setIsFormOpen(true);
              }}
              className="flex items-center justify-center gap-2 bg-primary hover:bg-blue-700 text-white rounded-2xl px-4 py-2 shadow-sm font-semibold text-sm cursor-pointer transition-all active:scale-95 shrink-0"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              Thêm Camera
            </button>

            {/* Search */}
            <div className="flex items-center bg-surface-white rounded-2xl border border-border-light px-4 py-2 shadow-sm w-full sm:w-auto">
              <span className="material-symbols-outlined text-outline mr-2 text-[20px]">
                search
              </span>
              <input
                type="text"
                placeholder="Tìm camera, phòng học..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none focus:ring-0 font-body-std text-body-std text-text-primary outline-none flex-1 w-full"
              />
            </div>

            {/* Filter */}
            <div className="flex items-center bg-surface-white rounded-2xl border border-border-light px-4 py-2 shadow-sm w-full sm:w-auto justify-between">
              <div className="flex items-center flex-1">
                <span className="material-symbols-outlined text-outline mr-2 text-[20px]">
                  filter_list
                </span>
                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-transparent border-none focus:ring-0 font-body-std text-body-std text-text-primary pr-6 appearance-none cursor-pointer outline-none flex-1 w-full"
                >
                  <option value="Tất cả trạng thái">Tất cả trạng thái</option>
                  <option value="Trực tuyến">Trực tuyến</option>
                  <option value="Ngoại tuyến">Ngoại tuyến</option>
                  <option value="Cảnh báo">Cảnh báo</option>
                </select>
              </div>
              <span className="material-symbols-outlined text-outline ml-2 text-[20px] pointer-events-none">
                expand_more
              </span>
            </div>
          </div>
        </div>

        {/* Cameras Grid */}
        {filteredCameras.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-gutter">
            {filteredCameras.map((camera) => (
              <CameraCard 
                key={camera.id}
                camera={camera}
                onSelect={(cam) => setSelectedCamera(cam)}
                onEdit={handleEditCamera}
                onDelete={handleInitiateDelete}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-outline gap-3 bg-surface-white rounded-3xl border border-border-light shadow-sm">
            <span className="material-symbols-outlined text-[48px] text-outline/50">videocam_off</span>
            <p className="font-semibold text-sm">Không tìm thấy camera nào khớp với bộ lọc</p>
          </div>
        )}
        <div className="h-12"></div>
      </div>

      {/* Details View Popup / Modal */}
      <CameraModal 
        camera={selectedCamera ? (camerasList.find(c => c.id === selectedCamera.id) || selectedCamera) : null}
        onClose={() => setSelectedCamera(null)}
      />

      {/* Create / Edit Form Modal */}
      <CameraFormModal
        key={isFormOpen ? (editingCamera?.id || "new-camera") : "closed"}
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingCamera(null);
        }}
        onSave={handleSaveCamera}
        initialCamera={editingCamera}
        existingIds={camerasList.map(c => c.id)}
      />

      {/* Delete Confirmation Modal */}
      {cameraToDelete && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center">
          <div 
            role="button"
            tabIndex={0}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setCameraToDelete(null)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setCameraToDelete(null);
            }}
            aria-label="Đóng hộp thoại xác nhận"
          />
          <div 
            className="relative bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col p-6 max-h-[90vh] mx-4 animate-in fade-in zoom-in-95 duration-200 z-10 text-left"
            style={{ width: "400px", maxWidth: "calc(100vw - 32px)" }}
          >
            <div className="flex items-center gap-3.5 mb-4">
              <div className="w-10 h-10 rounded-full bg-error-red/10 text-error-red flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[22px]">delete_forever</span>
              </div>
              <div>
                <h3 className="font-headline-sm text-headline-sm font-bold text-text-primary">Xóa Thiết Bị Camera</h3>
                <p className="text-xs text-outline mt-0.5">{cameraToDelete.id}</p>
              </div>
            </div>

            <p className="text-xs text-on-surface-variant leading-relaxed">
              Bạn có chắc chắn muốn xóa camera giám sát tại <strong className="text-text-primary">{cameraToDelete.room}</strong> không? Hành động này sẽ loại bỏ thiết bị khỏi hệ thống giám sát và không thể hoàn tác.
            </p>

            <div className="mt-6 flex justify-end gap-2 border-t border-border-light pt-4">
              <button
                type="button"
                onClick={() => setCameraToDelete(null)}
                className="px-4 py-2 border border-border-light rounded-xl text-xs font-semibold hover:bg-surface-container transition-colors text-outline cursor-pointer"
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-error-red hover:bg-red-700 text-white text-xs font-semibold rounded-xl shadow-sm transition-colors cursor-pointer"
              >
                Xóa thiết bị
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

