"use client";

import React from "react";

interface Camera {
  id: string;
  room: string;
  status: string;
}

interface CameraModalProps {
  camera: Camera | null;
  onClose: () => void;
}

function getCameraStats(camera: Camera) {
  if (camera.status === "offline") {
    return {
      modelName: "YOLOv8-Classroom",
      fps: "0",
      resolution: "N/A",
      latency: "N/A",
      confidence: "N/A",
      detectedStudents: 0,
      detectedTeachers: 0,
      systemStatus: "Ngoại tuyến",
      alerts: ["Mất kết nối với camera giám sát phòng học."],
    };
  }

  // Define preset details based on camera ID
  let detectedStudents = 24;
  let detectedTeachers = 1;
  let systemStatus = "Tối ưu";
  let alerts: string[] = [];
  let latency = "42ms";
  let fps = "30.0";
  let confidence = "89%";

  if (camera.id === "CAM-01") {
    detectedStudents = 24;
    detectedTeachers = 1;
  } else if (camera.id === "CAM-02") {
    detectedStudents = 18;
    detectedTeachers = 1;
  } else if (camera.id === "CAM-04") {
    detectedStudents = 32;
    detectedTeachers = 1;
  } else if (camera.id === "CAM-05") {
    detectedStudents = 28;
    detectedTeachers = 1;
  } else if (camera.id === "CAM-06") {
    // Warning status camera
    detectedStudents = 15;
    detectedTeachers = 0;
    systemStatus = "Cảnh báo";
    alerts = ["Không phát hiện giảng viên trong lớp học."];
  } else if (camera.id === "CAM-07") {
    detectedStudents = 20;
    detectedTeachers = 1;
  } else if (camera.id === "CAM-08") {
    detectedStudents = 22;
    detectedTeachers = 1;
  } else if (camera.id === "CAM-09") {
    // Large Hall
    detectedStudents = 78;
    detectedTeachers = 2;
    latency = "48ms";
    fps = "28.5";
    confidence = "86%";
  } else if (camera.id === "CAM-10") {
    // Library
    detectedStudents = 35;
    detectedTeachers = 2;
  } else if (camera.id === "CAM-11") {
    // Canteen
    detectedStudents = 54;
    detectedTeachers = 0;
  } else {
    // Default fallback
    detectedStudents = 20;
    detectedTeachers = 1;
  }

  return {
    modelName: "YOLOv8-Classroom",
    fps,
    resolution: "1920x1080",
    latency,
    confidence,
    detectedStudents,
    detectedTeachers,
    systemStatus,
    alerts,
  };
}

export default function CameraModal({ camera, onClose }: CameraModalProps) {
  if (!camera) return null;

  const stats = getCameraStats(camera);
  const totalPeople = stats.detectedStudents + stats.detectedTeachers;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-surface-white rounded-3xl overflow-hidden shadow-2xl w-full max-w-5xl animate-in zoom-in-95 duration-200 border border-border-light flex flex-col md:flex-row relative max-h-[90vh] md:h-[600px] overflow-y-auto md:overflow-hidden">
        
        {/* Close Button - Top Right (Visible on Mobile overlay or Desktop side-by-side depending on layout) */}
        <button 
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/75 transition-colors text-white cursor-pointer shadow-md backdrop-blur-md md:hidden"
          title="Đóng"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        {/* Camera Feed Section (Left) */}
        <div className="flex-[2] bg-surface-dim relative flex flex-col aspect-video md:aspect-auto md:h-full border-r border-border-light min-h-[300px]">
          {/* Header inside video */}
          <div className="absolute top-4 left-4 z-10 flex items-center gap-3">
            <div className="bg-black/55 backdrop-blur-md px-3.5 py-2 rounded-2xl text-white font-medium flex items-center gap-2 shadow-lg text-sm">
              <div className={`w-2.5 h-2.5 rounded-full ${
                camera.status === 'online' 
                  ? 'bg-success-green animate-pulse' 
                  : camera.status === 'offline' 
                  ? 'bg-error-red' 
                  : 'bg-orange-500 animate-pulse'
              }`}></div>
              {camera.room} ({camera.id})
            </div>
          </div>

          {/* Video Feed Placeholder or Simulator */}
          {camera.status === "offline" ? (
            <div className="flex-1 flex flex-col items-center justify-center bg-gray-950 text-gray-500 h-full">
              <span className="material-symbols-outlined text-6xl mb-4 text-gray-600">videocam_off</span>
              <span className="text-xl font-medium text-gray-400">Mất kết nối tín hiệu</span>
              <span className="text-sm text-gray-600 mt-1">Vui lòng kiểm tra lại thiết bị hoặc nguồn điện</span>
            </div>
          ) : (
            <div className="flex-1 relative bg-gray-950 h-full w-full overflow-hidden flex items-center justify-center">
              {/* Simulated camera grid pattern */}
              <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:16px_16px]"></div>
              
              {/* Camera icon in center to represent video */}
              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-10">
                <span className="material-symbols-outlined text-[120px] text-white">videocam</span>
                <span className="text-white text-lg font-mono tracking-widest mt-2">LIVE STREAMING</span>
              </div>

              {/* Timestamp Overlay */}
              <div className="absolute bottom-4 left-4 text-white text-xs font-mono bg-black/55 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-md flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                <span>{new Date().toISOString().split('T')[0]}</span>
                <span>{new Date().toLocaleTimeString('vi-VN')}</span>
              </div>

              {/* AI Bounding Boxes Simulation */}
              {camera.status !== "offline" && (
                <div className="absolute inset-0 pointer-events-none select-none">
                  {/* Bounding box for Teacher */}
                  {stats.detectedTeachers > 0 && (
                    <div 
                      className="absolute border-2 border-primary bg-primary/5 rounded-xl transition-all duration-500 flex flex-col justify-start" 
                      style={{ top: '22%', left: '22%', width: '16%', height: '38%' }}
                    >
                      <span className="absolute -top-6 left-0 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 shadow-md">
                        <span className="material-symbols-outlined text-[12px] font-bold">school</span>
                        Giảng viên (94%)
                      </span>
                    </div>
                  )}

                  {/* Bounding box for Students */}
                  {stats.detectedStudents > 0 && (
                    <>
                      <div 
                        className="absolute border-2 border-success-green bg-success-green/5 rounded-xl transition-all duration-500" 
                        style={{ top: '42%', left: '46%', width: '13%', height: '32%' }}
                      >
                        <span className="absolute -top-6 left-0 bg-success-green text-white text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 shadow-md">
                          <span className="material-symbols-outlined text-[12px] font-bold">person</span>
                          Sinh viên (89%)
                        </span>
                      </div>
                      <div 
                        className="absolute border-2 border-success-green bg-success-green/5 rounded-xl transition-all duration-500" 
                        style={{ top: '34%', left: '68%', width: '15%', height: '35%' }}
                      >
                        <span className="absolute -top-6 left-0 bg-success-green text-white text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 shadow-md">
                          <span className="material-symbols-outlined text-[12px] font-bold">person</span>
                          Sinh viên (87%)
                        </span>
                      </div>
                      <div 
                        className="absolute border-2 border-success-green bg-success-green/5 rounded-xl transition-all duration-500" 
                        style={{ top: '48%', left: '10%', width: '11%', height: '28%' }}
                      >
                        <span className="absolute -top-6 left-0 bg-success-green text-white text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 shadow-md">
                          <span className="material-symbols-outlined text-[12px] font-bold">person</span>
                          Sinh viên (91%)
                        </span>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Classroom Analytics Sidebar (Right) */}
        <div className="flex-[1] flex flex-col bg-surface-white p-6 overflow-y-auto h-auto md:h-full border-t md:border-t-0 border-border-light relative">
          
          {/* Header with Close Button for Desktop */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-headline-md text-headline-md text-text-primary flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[24px]">analytics</span>
              Phân tích phòng học
            </h2>
            <button 
              type="button"
              onClick={onClose}
              className="hidden md:flex w-8 h-8 items-center justify-center rounded-full bg-surface-dim hover:bg-border-light transition-colors text-on-surface-variant cursor-pointer"
              title="Đóng"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          <div className="flex flex-col gap-6 flex-1">
            
            {/* Occupancy Card */}
            <div>
              <h3 className="font-body-sm text-body-sm text-on-surface-variant uppercase tracking-wider mb-2.5">
                Nhân sự hiện diện
              </h3>
              
              {/* Total Card */}
              <div className="bg-primary/5 border border-primary-container/10 rounded-2xl p-4 flex items-center justify-between mb-3 shadow-[0_4px_12px_rgba(56,88,233,0.04)]">
                <div>
                  <p className="text-body-std text-on-surface-variant">Tổng số người</p>
                  <p className="text-xs text-outline mt-0.5">Thời gian thực bằng AI</p>
                </div>
                <div className="flex items-baseline gap-1 bg-primary text-white font-bold text-2xl px-4 py-2 rounded-xl shadow-md shadow-primary-container/20">
                  {totalPeople}
                  <span className="text-xs font-normal opacity-90">người</span>
                </div>
              </div>

              {/* Split Cards */}
              <div className="grid grid-cols-2 gap-3">
                {/* Teachers Card */}
                <div className="bg-surface-dim/40 border border-border-light rounded-2xl p-3.5 flex flex-col gap-1 hover:border-primary/20 hover:bg-primary/5 transition-all duration-300">
                  <div className="flex justify-between items-center text-primary mb-1">
                    <span className="material-symbols-outlined text-[20px] bg-primary/10 p-1.5 rounded-lg">co_present</span>
                    <span className="text-[10px] font-bold text-primary/70 uppercase">Giáo viên</span>
                  </div>
                  <span className="text-2xl font-bold text-text-primary font-mono">{stats.detectedTeachers}</span>
                  <span className="text-[11px] text-on-surface-variant">Giảng viên</span>
                </div>

                {/* Students Card */}
                <div className="bg-surface-dim/40 border border-border-light rounded-2xl p-3.5 flex flex-col gap-1 hover:border-success-green/20 hover:bg-success-green/5 transition-all duration-300">
                  <div className="flex justify-between items-center text-success-green mb-1">
                    <span className="material-symbols-outlined text-[20px] bg-success-green/10 p-1.5 rounded-lg">group</span>
                    <span className="text-[10px] font-bold text-success-green/70 uppercase">Sinh viên</span>
                  </div>
                  <span className="text-2xl font-bold text-text-primary font-mono">{stats.detectedStudents}</span>
                  <span className="text-[11px] text-on-surface-variant">Học sinh / SV</span>
                </div>
              </div>
            </div>

            {/* Alert Banner if any */}
            {stats.alerts.length > 0 && (
              <div className="bg-error-container/60 border border-error/15 rounded-2xl p-4 flex gap-3 text-on-error-container">
                <span className="material-symbols-outlined text-error text-[22px] shrink-0">warning</span>
                <div className="flex flex-col gap-0.5">
                  <span className="text-body-std font-bold text-error">Cảnh báo bất thường</span>
                  {stats.alerts.map((alert, idx) => (
                    <span key={idx} className="text-xs text-on-surface-variant">{alert}</span>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}

