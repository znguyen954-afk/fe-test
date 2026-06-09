"use client";

import React from "react";

interface ScheduleHeaderProps {
  weekRangeText: string;
  onPrevWeek: () => void;
  onNextWeek: () => void;
  selectedRoomName?: string | null;
  onBackToRooms?: () => void;
  classrooms?: { id: string; name: string }[];
  onSelectRoom?: (roomId: string) => void;
}

export default function ScheduleHeader({
  weekRangeText,
  onPrevWeek,
  onNextWeek,
  selectedRoomName = null,
  onBackToRooms,
  classrooms = [],
  onSelectRoom,
}: ScheduleHeaderProps) {
  return (
    <div className="flex flex-col gap-4 mb-6 text-left">
      {/* Back button and Room switcher if a room is selected */}
      {selectedRoomName && onBackToRooms && (
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBackToRooms}
            className="flex items-center justify-center p-2 border border-border-light rounded-2xl bg-white hover:bg-surface-container transition-all shadow-sm text-outline hover:text-primary cursor-pointer hover:scale-102"
            title="Quay lại danh sách phòng học"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          </button>
          <span className="text-xs font-bold text-outline uppercase tracking-wider">
            Danh sách phòng học
          </span>
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-3 w-full">
          {selectedRoomName ? (
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full sm:w-auto">
              <h2 className="font-headline-lg text-headline-lg font-bold text-text-primary">
                Lịch học:
              </h2>
              {/* Classroom switcher dropdown */}
              {classrooms.length > 0 && onSelectRoom ? (
                <div className="relative inline-flex items-center bg-white rounded-2xl border border-border-light px-4 py-2 shadow-sm text-primary font-bold text-lg focus-within:border-primary/50 transition-colors w-full sm:w-64">
                  <select
                    value={classrooms.find(c => c.name === selectedRoomName || c.id === selectedRoomName)?.id || ""}
                    onChange={(e) => onSelectRoom(e.target.value)}
                    className="bg-transparent border-none focus:ring-0 pr-8 appearance-none cursor-pointer outline-none w-full font-poppins text-headline-md font-bold text-primary"
                  >
                    {classrooms.map((room) => (
                      <option key={room.id} value={room.id} className="font-medium text-text-primary text-sm">
                        {room.name}
                      </option>
                    ))}
                  </select>
                  <span className="material-symbols-outlined text-primary ml-2 text-[22px] pointer-events-none absolute right-3">
                    unfold_more
                  </span>
                </div>
              ) : (
                <span className="text-headline-md font-bold text-primary bg-primary/5 border border-primary/20 px-4 py-2 rounded-2xl">
                  {selectedRoomName}
                </span>
              )}
            </div>
          ) : (
            <div>
              <h2 className="font-headline-lg text-headline-lg font-bold text-text-primary">
                Thời khóa biểu & Lịch học
              </h2>
              <p className="font-body-std text-body-std text-outline mt-0.5">
                Vui lòng chọn phòng học bên dưới để xem lịch học chi tiết trong ngày từ sáng đến tối.
              </p>
            </div>
          )}
        </div>

        <div className="flex gap-2 shrink-0 w-full sm:w-auto justify-end">
          <button
            type="button"
            onClick={onPrevWeek}
            className="px-4 py-2 border border-border-light rounded-2xl font-button-std text-sm bg-white hover:bg-surface-container transition-colors shadow-sm text-on-surface-variant flex items-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">chevron_left</span>
            Tuần trước
          </button>
          
          <div className="flex items-center px-4 bg-white border border-border-light rounded-2xl text-xs font-semibold text-outline shadow-sm whitespace-nowrap">
            {weekRangeText.replace("Tuần hiện tại: ", "")}
          </div>

          <button
            type="button"
            onClick={onNextWeek}
            className="px-4 py-2 border border-border-light rounded-2xl font-button-std text-sm bg-white hover:bg-surface-container transition-colors shadow-sm text-on-surface-variant flex items-center gap-2 cursor-pointer"
          >
            Tuần tới
            <span className="material-symbols-outlined text-[18px]">chevron_right</span>
          </button>
        </div>
      </div>
    </div>
  );
}
