"use client";

import React from "react";

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
}

interface LiveClassModalBodyProps {
  selectedClass: ClassSession;
  selectedClassStatus: "live" | "done" | "upcoming";
}

export default function LiveClassModalBody({ selectedClass, selectedClassStatus }: LiveClassModalBodyProps) {
  return (
    <div className="flex-1 overflow-y-auto flex flex-col md:flex-row min-h-0 text-left">
      {/* Left Column: Live Stream */}
      <div className="w-full md:w-3/5 p-6 border-b md:border-r md:border-b-0 border-border-light/60">
        <div className="bg-inverse-surface rounded-2xl overflow-hidden relative shadow-md aspect-video flex items-center justify-center group cursor-pointer border border-border-light">
          {selectedClassStatus === "live" ? (
            <>
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-70 mix-blend-luminosity hover:mix-blend-normal transition-all" 
                style={{ 
                  backgroundImage: "url('https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80')" 
                }}
              />
              {/* AI bounding boxes */}
              <div className="absolute top-[25%] left-[25%] w-[60px] h-[60px] border-2 border-success-green bg-success-green/10 flex flex-col justify-end rounded shadow-md">
                <div className="bg-success-green text-white text-[9px] font-bold px-1 py-0.5 w-full text-center">Tham gia</div>
              </div>
              <div className="absolute top-[45%] left-[55%] w-[55px] h-[55px] border-2 border-error-red bg-error-red/10 flex flex-col justify-end rounded shadow-md">
                <div className="bg-error-red text-white text-[9px] font-bold px-1 py-0.5 w-full text-center">Xao nhãng</div>
              </div>
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full text-white font-caption text-[11px] flex items-center gap-2">
                <span className="material-symbols-outlined text-[15px]">videocam</span> CAMERA-{selectedClass.room}
              </div>
              <div className="absolute bottom-4 right-4 bg-error-red/80 backdrop-blur-md px-3 py-1.5 rounded-full text-white font-caption text-[11px] flex items-center gap-2 font-semibold">
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping"></span> ĐANG GHI HÌNH
              </div>
            </>
          ) : (
            // Upcoming state
            <div className="flex flex-col items-center text-outline gap-3">
              <span className="material-symbols-outlined text-[48px]">videocam_off</span>
              <p className="font-semibold text-sm text-center px-4">Tiết học chưa bắt đầu. Camera sẽ kích hoạt khi đến giờ học.</p>
            </div>
          )}
        </div>
      </div>

      {/* Right Column: AI Analytics Summary */}
      <div className="w-full md:w-2/5 p-6 flex flex-col gap-6 bg-surface-bright/50">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl p-4 border border-border-light/70 shadow-sm flex flex-col justify-center">
            <div className="flex items-center gap-2 text-outline mb-1.5">
              <span className="material-symbols-outlined text-[18px]">speed</span>
              <span className="font-caption text-xs font-semibold">Tốc độ ghi</span>
            </div>
            <span className="font-display-hero text-headline-lg font-bold text-text-primary">
              {selectedClassStatus === "live" ? "15" : "0"} <span className="text-xs text-outline font-normal">FPS</span>
            </span>
          </div>
          <div className="bg-white rounded-2xl p-4 border border-border-light/70 shadow-sm flex flex-col justify-center">
            <div className="flex items-center gap-2 text-outline mb-1.5">
              <span className="material-symbols-outlined text-[18px]">group</span>
              <span className="font-caption text-xs font-semibold">Sĩ số có mặt</span>
            </div>
            <span className="font-display-hero text-headline-lg font-bold text-success-green">
              {selectedClassStatus === "live" ? "42" : "0"}<span className="text-[13px] text-outline font-normal ml-1">/ 45 HS</span>
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-border-light/70 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2 text-text-primary">
              <span className="material-symbols-outlined text-[20px] text-primary">monitoring</span>
              <span className="font-body-sm font-bold text-xs">Mức độ tương tác lớp</span>
            </div>
            <span className="font-body-std font-bold text-primary text-sm">
              {selectedClassStatus === "live" ? "85%" : "0%"}
            </span>
          </div>
          <div className="w-full h-2.5 bg-surface-variant rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-primary-container to-primary transition-all duration-500" style={{ width: selectedClassStatus === "live" ? "85%" : "0%" }}></div>
          </div>
        </div>

        <div className="flex-1 flex flex-col min-h-0">
          <h4 className="font-body-sm font-bold text-xs text-text-primary mb-3 flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-error-red">notifications_active</span> Cảnh báo lớp học
          </h4>
          <div className="flex flex-col gap-2 overflow-y-auto max-h-[160px] pr-1">
            {selectedClassStatus === "live" ? (
              <>
                <div className="bg-white border border-border-light/70 rounded-xl p-3 shadow-sm flex gap-3">
                  <div className="w-[3px] bg-[#D4A325] rounded-full self-stretch shrink-0"></div>
                  <div className="flex-1">
                    <p className="font-body-sm text-[12px] text-text-primary font-semibold">Phát hiện sử dụng điện thoại (Bàn 3)</p>
                    <p className="font-caption text-[10px] text-outline mt-1">2 phút trước</p>
                  </div>
                </div>
                <div className="bg-white border border-border-light/70 rounded-xl p-3 shadow-sm flex gap-3">
                  <div className="w-[3px] bg-error-red rounded-full self-stretch shrink-0"></div>
                  <div className="flex-1">
                    <p className="font-body-sm text-[12px] text-text-primary font-semibold">Mức độ tương tác trung bình giảm xuống dưới 75%</p>
                    <p className="font-caption text-[10px] text-outline mt-1">8 phút trước</p>
                  </div>
                </div>
              </>
            ) : (
              <p className="text-xs text-outline italic">Chưa có cảnh báo nào phát sinh cho tiết học này.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
