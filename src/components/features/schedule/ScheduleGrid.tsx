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
  gridRowStart: number;
  gridRowSpan: number;
  mode?: "Trực tiếp" | "Trực tuyến";
}

interface WeekDay {
  label: string;
  sub: string;
  fullDateStr: string;
}

interface ScheduleGridProps {
  weekDays: WeekDay[];
  currentClassesData: ClassSession[];
  hoursData: string[];
  onClassClick: (cls: ClassSession, status: "live" | "done" | "upcoming") => void;
  getClassStatus: (cls: ClassSession, dateStr: string) => "live" | "done" | "upcoming";
  getBorderColorClass: (color: string) => string;
  getHeaderColorClass: (color: string) => string;
}

export default function ScheduleGrid({
  weekDays,
  currentClassesData,
  hoursData,
  onClassClick,
  getClassStatus,
  getBorderColorClass,
  getHeaderColorClass,
}: ScheduleGridProps) {
  return (
    <div className="bg-white rounded-3xl shadow-[0px_4px_25px_rgba(0,0,0,0.05)] border border-border-light overflow-x-auto text-left">
      <div className="min-w-[1000px] flex flex-col">
        
        {/* Days Header */}
        <div className="grid grid-cols-[100px_repeat(7,1fr)] border-b border-border-light bg-surface-bright">
          <div className="py-4 text-center border-r border-border-light flex flex-col items-center justify-center min-h-[70px]">
            <div className="flex flex-col items-center">
              <span className="material-symbols-outlined text-outline text-[20px] mb-1">schedule</span>
              <span className="text-[11px] font-bold text-outline uppercase tracking-wider">Giờ VN</span>
            </div>
          </div>
          {weekDays.map((day) => (
            <div
              key={day.label}
              className="py-4 text-center border-r border-border-light last:border-r-0 flex flex-col items-center justify-center min-h-[70px]"
            >
              <span className="text-[20px] font-bold text-text-primary leading-none">{day.sub}</span>
              <span className="text-[12px] text-outline font-medium mt-1">{day.label}</span>
            </div>
          ))}
        </div>

        {/* Time Grid Body */}
        <div 
          className="relative grid grid-cols-[100px_repeat(7,1fr)] bg-white border-t border-border-light" 
          style={{ height: `${(hoursData.length - 1) * 70}px` }}
        >
          
          {/* Hour Lines (Grid Background) */}
          <div className="absolute inset-0 grid grid-cols-[100px_repeat(7,1fr)] pointer-events-none">
            <div className="border-r border-border-light/80"></div>
            <div className="border-r border-border-light/80"></div>
            <div className="border-r border-border-light/80"></div>
            <div className="border-r border-border-light/80"></div>
            <div className="border-r border-border-light/80"></div>
            <div className="border-r border-border-light/80"></div>
            <div className="border-r border-border-light/80"></div>
            <div></div>
          </div>

          {/* Grid cell lines vertically split by 1-hour rows */}
          <div 
            className="col-span-8 grid pointer-events-none absolute inset-0"
            style={{ gridTemplateRows: `repeat(${hoursData.length - 1}, minmax(0, 1fr))` }}
          >
            {[...Array(hoursData.length - 1)].map((_, i) => (
              <div key={i} className="border-b border-border-light/80 w-full h-full last:border-b-0"></div>
            ))}
          </div>

          {/* Y-Axis: Hour Labels (aligned precisely with rows) */}
          <div 
            className="grid select-none border-r border-border-light/80 z-10 bg-white" 
            style={{ gridTemplateRows: `repeat(${hoursData.length - 1}, 70px)` }}
          >
            {hoursData.map((hour) => (
              <div key={hour} className="text-center font-bold text-outline text-[12px] pt-1 h-full">
                {hour}
              </div>
            ))}
          </div>

          {/* Days Columns for Cards mapping */}
          <div 
            className="col-span-7 grid grid-cols-7 relative p-1 z-10" 
            style={{ gridTemplateRows: `repeat(${(hoursData.length - 1) * 4}, minmax(17.5px, 1fr))` }}
          >
            {currentClassesData.map((cls) => {
              const dayObj = weekDays[cls.day - 2];
              // Ensure dayObj is defined to prevent crash
              if (!dayObj) return null;
              const status = getClassStatus(cls, dayObj.fullDateStr);
              
              return (
                <div
                  key={cls.id}
                  onClick={() => onClassClick(cls, status)}
                  className={`relative m-0.5 rounded-xl border ${getBorderColorClass(cls.color)} bg-white overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col justify-between group ${status === 'done' ? 'opacity-85' : ''}`}
                  style={{
                    gridColumn: `${cls.day - 1} / span 1`,
                    gridRow: `${cls.gridRowStart} / span ${cls.gridRowSpan}`,
                  }}
                >
                  {/* Banner header of card */}
                  <div className={`px-2 py-1 text-white ${getHeaderColorClass(cls.color)} font-medium transition-all group-hover:brightness-95 text-left flex flex-col gap-0.5`}>
                    <div className="flex justify-between items-start gap-1">
                      <h4 className="text-[12px] font-bold line-clamp-1 leading-tight flex-1">{cls.subject}</h4>
                      {status === "live" && (
                        <span className="bg-error-red text-white text-[8px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5 shrink-0 animate-pulse shadow-sm">
                          <span className="w-1.5 h-1.5 bg-white rounded-full"></span> TRỰC TIẾP
                        </span>
                      )}
                      {status === "done" && (
                        <span className="bg-success-green text-white text-[8px] font-bold px-1 py-0.5 rounded shrink-0 uppercase">
                          Done
                        </span>
                      )}
                      {status === "upcoming" && (
                        <span className="bg-primary-container text-white text-[8px] font-bold px-1 py-0.5 rounded shrink-0 uppercase">
                          Sắp học
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] opacity-90 font-semibold">{cls.time}</p>
                  </div>

                  {/* Content inside card */}
                  <div className="p-2 flex-1 flex flex-col justify-start items-start gap-1 text-left">
                    <p className="text-[11px] leading-snug text-on-surface-variant font-medium line-clamp-2 w-full">
                      {cls.subText}
                    </p>
                    <div className="mt-auto flex flex-col gap-0.5 w-full pt-1.5 border-t border-border-light/40">
                      <div className="flex items-center gap-1 text-[10px] text-outline font-bold">
                        <span className="material-symbols-outlined text-[12px] leading-none text-outline">room</span>
                        <span>Phòng {cls.room}</span>
                      </div>
                      {cls.teacher && (
                        <div className="flex items-center gap-1 text-[10px] text-outline font-semibold">
                          <span className="material-symbols-outlined text-[12px] leading-none text-outline">person</span>
                          <span>GV: {cls.teacher}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </div>
  );
}
