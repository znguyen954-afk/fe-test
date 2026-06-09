"use client";

import React, { useState, useRef, useEffect } from "react";

interface Camera {
  id: string;
  room: string;
  status: string;
}

interface CameraCardProps {
  camera: Camera;
  onSelect: (camera: Camera) => void;
  onEdit: (camera: Camera) => void;
  onDelete: (camera: Camera) => void;
}

export default function CameraCard({ camera, onSelect, onEdit, onDelete }: CameraCardProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <div
      onClick={() => onSelect(camera)}
      className="bg-surface-white rounded-3xl shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] hover:shadow-[0px_5px_30px_0px_rgba(0,0,0,0.15)] transition-all duration-300 flex flex-col group cursor-pointer border border-border-light animate-in fade-in duration-200 relative"
    >
      {/* Camera Video Feed Placeholder */}
      <div className="relative w-full aspect-video bg-surface-dim overflow-hidden rounded-t-[23px] group-hover:opacity-90 transition-opacity">
        {/* Fake feed background */}
        {camera.status === "offline" ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 text-gray-500">
            <span className="material-symbols-outlined text-4xl mb-2">videocam_off</span>
            <span className="text-sm font-medium">Mất kết nối</span>
          </div>
        ) : (
          <div className="absolute inset-0 bg-gray-800">
            {/* Simulated camera grid pattern */}
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
            {/* Camera icon in center to represent video */}
            <div className="absolute inset-0 flex items-center justify-center opacity-30">
              <span className="material-symbols-outlined text-6xl text-white">videocam</span>
            </div>
          </div>
        )}
        
        {/* Overlays */}
        <div className="absolute top-3 right-3 flex items-center gap-2">
          {camera.status === "online" && (
            <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-md text-white text-[10px] font-bold tracking-wider">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
              REC
            </div>
          )}
          <div className="bg-black/50 backdrop-blur-sm px-2 py-1 rounded-md text-white text-[10px] font-medium">
            1080p
          </div>
        </div>
        <div className="absolute bottom-3 left-3 text-white text-xs font-mono bg-black/50 backdrop-blur-sm px-2 py-1 rounded-md">
          {new Date().toISOString().split('T')[0]} {new Date().toLocaleTimeString('vi-VN')}
        </div>
      </div>

      {/* Camera Info */}
      <div className="p-lg flex flex-col gap-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-headline-sm text-headline-sm text-text-primary">
              {camera.room}
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant font-mono mt-1">
              {camera.id}
            </p>
          </div>
          
          {/* Status Indicator */}
          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
            camera.status === "online" 
              ? "bg-success-green/10 text-success-green border-success-green/20" 
              : camera.status === "offline"
              ? "bg-error-red/10 text-error-red border-error-red/20"
              : "bg-orange-500/10 text-orange-600 border-orange-500/20"
          }`}>
            <div className={`w-1.5 h-1.5 rounded-full ${
              camera.status === "online" ? "bg-success-green" : camera.status === "offline" ? "bg-error-red" : "bg-orange-500"
            }`}></div>
            {camera.status === "online" ? "Trực tuyến" : camera.status === "offline" ? "Ngoại tuyến" : "Cảnh báo"}
          </div>
        </div>

        <div className="mt-2 flex items-center gap-3 border-t border-border-light pt-3 relative">
          <button 
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(camera);
            }}
            className="flex-1 flex justify-center items-center gap-2 py-2 rounded-xl text-primary hover:bg-primary-container hover:text-white transition-all font-medium text-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">fullscreen</span>
            Xem chi tiết
          </button>
          
          <div className="relative" ref={dropdownRef}>
            <button 
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowDropdown(!showDropdown);
              }}
              className="w-10 h-10 flex justify-center items-center rounded-xl text-outline hover:text-primary hover:bg-primary-container transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">more_vert</span>
            </button>

            {showDropdown && (
              <div className="absolute right-0 bottom-full mb-2 w-36 bg-white rounded-2xl border border-border-light shadow-xl z-30 py-2 animate-in fade-in slide-in-from-bottom-2 duration-150">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDropdown(false);
                    onEdit(camera);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-text-primary hover:bg-surface-dim transition-colors text-left cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px] text-outline">edit</span>
                  Chỉnh sửa
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDropdown(false);
                    onDelete(camera);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-error-red hover:bg-error-red/5 transition-colors text-left cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">delete</span>
                  Xóa camera
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
