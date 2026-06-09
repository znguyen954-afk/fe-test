"use client";

import React, { useState, useEffect } from "react";

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

interface Classroom {
  id: string;
  name: string;
  building: "Tòa A" | "Tòa B" | "Tòa C" | "Khu VPC" | "Khác";
  capacity: number;
  devices: string[];
  status?: "normal" | "maintenance" | "warning";
  statusText?: string;
}

interface ClassroomListProps {
  classrooms: Classroom[];
  classesData: ClassSession[];
  onSelectRoom: (roomId: string) => void;
}

export default function ClassroomList({ classrooms, classesData, onSelectRoom }: ClassroomListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBuilding, setSelectedBuilding] = useState<string>("Tất cả");
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  // Keep track of real-time clock for status calculations
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 30000); // update every 30 seconds
    return () => clearInterval(timer);
  }, []);

  const buildings = ["Tất cả", "Tòa A", "Tòa B", "Tòa C", "Khu VPC", "Khác"];

  // Helper to determine if a class is currently active in a classroom
  const getActiveClass = (roomId: string) => {
    const currentDay = currentTime.getDay(); // 0: Sunday, 1: Monday, ...
    const apiDay = currentDay === 0 ? 8 : currentDay + 1; // Monday: 2, Sunday: 8
    const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();

    return classesData.find((cls) => {
      // Check room match (loose match for robustness)
      const isSameRoom =
        cls.room.toLowerCase() === roomId.toLowerCase() ||
        cls.room.toLowerCase().includes(roomId.toLowerCase()) ||
        roomId.toLowerCase().includes(cls.room.toLowerCase());

      if (!isSameRoom || cls.day !== apiDay) return false;

      const [start, end] = cls.time.split(" - ");
      const [startHour, startMin] = start.split(":").map(Number);
      const [endHour, endMin] = end.split(":").map(Number);

      const startMinutes = startHour * 60 + startMin;
      const endMinutes = endHour * 60 + endMin;

      return currentMinutes >= startMinutes && currentMinutes <= endMinutes;
    });
  };

  // Helper to get next class in a classroom today
  const getNextClassToday = (roomId: string) => {
    const currentDay = currentTime.getDay();
    const apiDay = currentDay === 0 ? 8 : currentDay + 1;
    const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();

    const roomClassesToday = classesData.filter((cls) => {
      const isSameRoom =
        cls.room.toLowerCase() === roomId.toLowerCase() ||
        cls.room.toLowerCase().includes(roomId.toLowerCase()) ||
        roomId.toLowerCase().includes(cls.room.toLowerCase());
      return isSameRoom && cls.day === apiDay;
    });

    const upcoming = roomClassesToday.filter((cls) => {
      const [start] = cls.time.split(" - ");
      const [startHour, startMin] = start.split(":").map(Number);
      const startMinutes = startHour * 60 + startMin;
      return startMinutes > currentMinutes;
    });

    if (upcoming.length === 0) return null;

    // Sort by starting time to get the earliest next class
    upcoming.sort((a, b) => {
      const [startA] = a.time.split(" - ");
      const [startHourA, startMinA] = startA.split(":").map(Number);
      const startMinutesA = startHourA * 60 + startMinA;

      const [startB] = b.time.split(" - ");
      const [startHourB, startMinB] = startB.split(":").map(Number);
      const startMinutesB = startHourB * 60 + startMinB;

      return startMinutesA - startMinutesB;
    });

    return upcoming[0];
  };

  // Filter classrooms based on search query and building tab
  const filteredClassrooms = classrooms.filter((room) => {
    const matchesSearch =
      room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesBuilding = selectedBuilding === "Tất cả" || room.building === selectedBuilding;

    return matchesSearch && matchesBuilding;
  });

  return (
    <div className="flex-grow flex flex-col gap-6 text-left">
      {/* Search and Filters Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-5 rounded-3xl border border-border-light shadow-sm">
        {/* Tabs for Buildings */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {buildings.map((b) => (
            <button
              key={b}
              onClick={() => setSelectedBuilding(b)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                selectedBuilding === b
                  ? "bg-primary text-white shadow-md shadow-primary/20 scale-102"
                  : "bg-surface-bright text-outline hover:text-text-primary hover:bg-surface-container-high"
              }`}
            >
              {b}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="flex items-center bg-surface-bright rounded-2xl border border-border-light px-4 py-2 w-full md:w-80 shadow-inner group focus-within:border-primary/50 transition-colors">
          <span className="material-symbols-outlined text-outline group-focus-within:text-primary transition-colors mr-2 text-[20px]">
            search
          </span>
          <input
            type="text"
            placeholder="Tìm phòng học (vd: A-301, VPC...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none focus:ring-0 font-body-std text-body-std text-text-primary outline-none flex-1 w-full"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="text-outline hover:text-text-primary flex items-center justify-center p-0.5 rounded-full hover:bg-surface-container"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          )}
        </div>
      </div>

      {/* Grid List of Classrooms */}
      {filteredClassrooms.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredClassrooms.map((room) => {
            const activeClass = getActiveClass(room.id);
            const nextClass = getNextClassToday(room.id);
            const isOccupied = !!activeClass;

            // Check classes scheduled for today
            const currentDay = currentTime.getDay();
            const apiDay = currentDay === 0 ? 8 : currentDay + 1;
            const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();

            const roomClassesToday = classesData.filter((cls) => {
              const isSameRoom =
                cls.room.toLowerCase() === room.id.toLowerCase() ||
                cls.room.toLowerCase().includes(room.id.toLowerCase()) ||
                room.id.toLowerCase().includes(cls.room.toLowerCase());
              return isSameRoom && cls.day === apiDay;
            });

            const hasClassesToday = roomClassesToday.length > 0;
            
            // Check if all classes today have ended
            const allClassesEndedToday = hasClassesToday && roomClassesToday.every((cls) => {
              const [, end] = cls.time.split(" - ");
              const [endHour, endMin] = end.split(":").map(Number);
              const endMinutes = endHour * 60 + endMin;
              return currentMinutes > endMinutes;
            });

            // Check if next class starts in less than 30 minutes
            let startsSoon = false;
            let timeDiffMinutes = 0;
            if (nextClass) {
              const [start] = nextClass.time.split(" - ");
              const [startHour, startMin] = start.split(":").map(Number);
              const startMinutes = startHour * 60 + startMin;
              timeDiffMinutes = startMinutes - currentMinutes;
              startsSoon = timeDiffMinutes > 0 && timeDiffMinutes <= 30;
            }

            // Compute visual accent color and status label
            let accentColorClass = "bg-success-green";
            let statusBadge = (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-bold tracking-wide select-none bg-success-green/5 border-success-green/20 text-success-green">
                <span className="w-1.5 h-1.5 rounded-full bg-success-green"></span>
                ĐANG TRỐNG
              </div>
            );

            if (room.status === "maintenance") {
              accentColorClass = "bg-amber-500";
              statusBadge = (
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-bold tracking-wide select-none bg-amber-500/5 border-amber-500/20 text-amber-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                  ĐANG BẢO TRÌ
                </div>
              );
            } else if (room.status === "warning") {
              accentColorClass = "bg-orange-500";
              statusBadge = (
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-bold tracking-wide select-none bg-orange-500/5 border-orange-500/20 text-orange-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span>
                  SỰ CỐ CAMERA
                </div>
              );
            } else if (isOccupied) {
              accentColorClass = "bg-error-red";
              statusBadge = (
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-bold tracking-wide select-none bg-error-red/5 border-error-red/20 text-error-red">
                  <span className="w-1.5 h-1.5 rounded-full bg-error-red animate-pulse"></span>
                  ĐANG GIẢNG DẠY
                </div>
              );
            } else if (startsSoon) {
              accentColorClass = "bg-primary";
              statusBadge = (
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-bold tracking-wide select-none bg-primary/5 border-primary/20 text-primary">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>
                  SẮP DIỄN RA
                </div>
              );
            } else if (allClassesEndedToday) {
              accentColorClass = "bg-outline";
              statusBadge = (
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-bold tracking-wide select-none bg-outline/5 border-outline/20 text-outline">
                  <span className="w-1.5 h-1.5 rounded-full bg-outline"></span>
                  ĐÃ KẾT THÚC
                </div>
              );
            }

            return (
              <div
                key={room.id}
                onClick={() => onSelectRoom(room.id)}
                className="bg-white rounded-3xl shadow-[0px_4px_25px_rgba(0,0,0,0.03)] border border-border-light/80 hover:border-primary/45 hover:shadow-[0px_10px_35px_rgba(19,60,209,0.08)] hover:-translate-y-1 transition-all duration-300 cursor-pointer p-6 flex flex-col group relative overflow-hidden"
              >
                {/* Visual Accent Bar */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1 transition-all duration-300 ${accentColorClass} group-hover:h-1.5`}
                ></div>

                {/* Header: Room Name and Indicator */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-[11px] font-bold text-outline uppercase tracking-wider">
                      {room.building}
                    </span>
                    <h3 className="font-headline-md text-headline-md text-text-primary group-hover:text-primary transition-colors mt-0.5">
                      {room.name}
                    </h3>
                  </div>

                  {/* Indicator Light */}
                  {statusBadge}
                </div>

                {/* Body Content */}
                <div className="flex-grow flex flex-col gap-4 border-t border-border-light/45 pt-4">
                  {/* Render based on status */}
                  {room.status === "maintenance" ? (
                    <div className="flex items-center gap-2.5 text-amber-700 bg-amber-500/5 rounded-2xl p-3.5 border border-amber-500/10 justify-center min-h-[82px]">
                      <span className="material-symbols-outlined text-[20px] text-amber-600">build</span>
                      <span className="text-[11px] font-semibold">{room.statusText || "Đang bảo trì định kỳ thiết bị"}</span>
                    </div>
                  ) : room.status === "warning" ? (
                    <div className="flex items-center gap-2.5 text-orange-700 bg-orange-500/5 rounded-2xl p-3.5 border border-orange-500/10 justify-center min-h-[82px]">
                      <span className="material-symbols-outlined text-[20px] text-orange-600">warning</span>
                      <span className="text-[11px] font-semibold">{room.statusText || "Camera giám sát mất kết nối"}</span>
                    </div>
                  ) : isOccupied && activeClass ? (
                    <div className="bg-error-red/5 rounded-2xl p-3 border border-error-red/10">
                      <div className="flex items-center gap-1.5 text-error-red font-bold text-[10px] mb-1">
                        <span className="material-symbols-outlined text-[14px]">school</span>
                        <span>ĐANG GIẢNG DẠY</span>
                      </div>
                      <p className="font-bold text-xs text-text-primary line-clamp-1 leading-snug">
                        {activeClass.subject}
                      </p>
                      <p className="text-[10px] text-on-surface-variant font-medium mt-1">
                        GV: {activeClass.teacher}
                      </p>
                      <p className="text-[10px] text-outline font-semibold mt-0.5">
                        Giờ: {activeClass.time} ({activeClass.period})
                      </p>
                    </div>
                  ) : startsSoon && nextClass ? (
                    <div className="bg-primary/5 rounded-2xl p-3 border border-primary/10 flex flex-col justify-center min-h-[82px] text-left">
                      <div className="flex items-center gap-1.5 text-primary font-bold text-[10px] mb-1">
                        <span className="material-symbols-outlined text-[15px] animate-bounce">alarm</span>
                        <span>CHUẨN BỊ GIẢNG DẠY</span>
                      </div>
                      <p className="font-bold text-xs text-text-primary line-clamp-1 leading-snug">
                        {nextClass.subject}
                      </p>
                      <p className="text-[10px] text-outline font-semibold mt-0.5">
                        Bắt đầu sau {timeDiffMinutes} phút ({nextClass.time.split(" - ")[0]})
                      </p>
                    </div>
                  ) : allClassesEndedToday ? (
                    <div className="flex items-center gap-2 text-outline bg-surface-bright rounded-2xl p-3.5 border border-border-light/30 justify-center min-h-[82px]">
                      <span className="material-symbols-outlined text-[20px] text-outline/80">task_alt</span>
                      <span className="text-[11px] font-semibold">Lịch dạy hôm nay đã kết thúc</span>
                    </div>
                  ) : !hasClassesToday ? (
                    <div className="flex items-center gap-2 text-outline bg-surface-bright rounded-2xl p-3.5 border border-border-light/30 justify-center min-h-[82px]">
                      <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                      <span className="text-[11px] font-semibold">Hôm nay không có lịch dạy</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-outline bg-surface-bright rounded-2xl p-3.5 border border-border-light/30 justify-center min-h-[82px]">
                      <span className="material-symbols-outlined text-[18px]">event_available</span>
                      <span className="text-[11px] font-semibold">Phòng học hiện đang trống</span>
                    </div>
                  )}

                  {/* Next Upcoming Class today (if not under maintenance) */}
                  {room.status !== "maintenance" && nextClass && (
                    <div className="flex flex-col gap-1 text-xs">
                      <div className="flex items-center gap-1 text-[10px] text-outline font-bold">
                        <span className="material-symbols-outlined text-[13px]">schedule</span>
                        <span>LỚP TIẾP THEO</span>
                      </div>
                      <p className="font-bold text-[11px] text-text-primary line-clamp-1">
                        {nextClass.subject}
                      </p>
                      <p className="text-[10px] text-on-surface-variant font-medium">
                        Bắt đầu: {nextClass.time.split(" - ")[0]}
                      </p>
                    </div>
                  )}
                </div>

                {/* Footer: Capacity and Devices */}
                <div className="mt-5 pt-3.5 border-t border-border-light/45 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[10px] text-outline font-bold">
                    <span className="material-symbols-outlined text-[14px]">group</span>
                    <span>Sức chứa: {room.capacity} SV</span>
                  </div>

                  {/* Device Icons */}
                  <div className="flex gap-1.5 text-outline">
                    {room.devices.includes("camera") && (
                      <span
                        className="material-symbols-outlined text-[15px] cursor-help"
                        title="Có camera giám sát AI"
                      >
                        videocam
                      </span>
                    )}
                    {room.devices.includes("projector") && (
                      <span
                        className="material-symbols-outlined text-[15px] cursor-help"
                        title="Có máy chiếu"
                      >
                        co_present
                      </span>
                    )}
                    {room.devices.includes("aircon") && (
                      <span
                        className="material-symbols-outlined text-[15px] cursor-help"
                        title="Có điều hòa"
                      >
                        ac_unit
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-outline gap-4 bg-white rounded-3xl border border-border-light/80 shadow-[0px_4px_25px_rgba(0,0,0,0.03)]">
          <span className="material-symbols-outlined text-[54px] text-outline/40">meeting_room</span>
          <div className="text-center">
            <p className="font-bold text-sm text-text-primary">Không tìm thấy phòng học nào</p>
            <p className="text-[11px] text-outline mt-1">Vui lòng thử lại với từ khóa hoặc bộ lọc khác</p>
          </div>
        </div>
      )}
    </div>
  );
}
