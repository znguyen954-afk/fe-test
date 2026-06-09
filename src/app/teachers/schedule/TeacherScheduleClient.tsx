"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import DashboardLayout from "@/components/layout/DashboardLayout";

// Mock data cho danh sách giảng viên (Đồng bộ với teachers/page.tsx)
const teachers = [
  {
    id: "GV01",
    name: "TS. Sarah Jenkins",
    title: "Giảng viên Khoa Khoa học Máy tính",
    avatar: "https://i.pravatar.cc/150?u=sarah",
    department: "Khoa học Máy tính",
    interactionScore: 88,
    interactionStatus: "Top 5% Khoa",
    stats: {
      assignedClasses: 2,
      totalPeriods: 45,
      completedPeriods: 36,
      completionRate: 80,
      avgAttendance: "96.5%",
      primaryShift: "Ca Sáng (75%)"
    },
    upcomingClasses: [
      { id: "up-1", subject: "Học máy nâng cao", room: "Phòng 302", time: "Thứ 5, 13:00 - 15:40", period: "Tiết 7-9", mode: "Trực tiếp" },
      { id: "up-2", subject: "AI 101", room: "Phòng 204", time: "Thứ 2 tuần sau, 07:30 - 10:10", period: "Tiết 1-3", mode: "Trực tiếp" },
      { id: "up-3", subject: "Seminar AI", room: "Hội trường lớn", time: "Thứ 4 tuần sau, 15:45 - 17:45", period: "Tiết 10-11", mode: "Trực tuyến" }
    ],
    scheduleData: [
      {
        id: "sch-1",
        day: 2, // Thứ 2
        shift: "Sáng",
        subject: "AI 101",
        code: "23CS-AI-N01",
        time: "07:30 - 10:10",
        period: "Tiết 1-3",
        room: "Phòng 204",
        capacity: "42/45",
        status: "done"
      },
      {
        id: "sch-2",
        day: 3, // Thứ 3
        shift: "Sáng",
        subject: "AI 101",
        code: "23CS-AI-N01",
        time: "07:30 - 10:10",
        period: "Tiết 1-3",
        room: "Phòng 204",
        capacity: "40/45",
        status: "done"
      },
      {
        id: "sch-3",
        day: 4, // Thứ 4
        shift: "Chiều",
        subject: "Học máy nâng cao",
        code: "23CS-ML-N02",
        time: "13:00 - 15:40",
        period: "Tiết 7-9",
        room: "Phòng 302",
        capacity: "44/45",
        status: "live"
      },
      {
        id: "sch-4",
        day: 5, // Thứ 5
        shift: "Chiều",
        subject: "Học máy nâng cao",
        code: "23CS-ML-N02",
        time: "15:45 - 17:30",
        period: "Tiết 10-11",
        room: "Phòng 302",
        capacity: "43/45",
        status: "upcoming"
      }
    ]
  },
  {
    id: "GV02",
    name: "PGS.TS. Nguyễn Văn An",
    title: "Trưởng bộ môn Kỹ thuật Phần mềm",
    avatar: "https://i.pravatar.cc/150?u=an",
    department: "Kỹ thuật Phần mềm",
    interactionScore: 75,
    interactionStatus: "Tốt",
    stats: {
      assignedClasses: 2,
      totalPeriods: 30,
      completedPeriods: 18,
      completionRate: 60,
      avgAttendance: "94.2%",
      primaryShift: "Ca Chiều (80%)"
    },
    upcomingClasses: [
      { id: "up-4", subject: "Kiến trúc phần mềm", room: "Phòng 101", time: "Thứ 6, 13:00 - 15:40", period: "Tiết 7-9", mode: "Trực tiếp" },
      { id: "up-5", subject: "Quản lý dự án CNTT", room: "Phòng 102", time: "Thứ 7 tuần sau, 08:00 - 11:30", period: "Tiết 2-5", mode: "Trực tiếp" }
    ],
    scheduleData: [
      {
        id: "sch-5",
        day: 3, // Thứ 3
        shift: "Sáng",
        subject: "Quản lý dự án CNTT",
        code: "23CS-SE-N02",
        time: "08:00 - 11:30",
        period: "Tiết 2-5",
        room: "Phòng 102",
        capacity: "35/38",
        status: "done"
      },
      {
        id: "sch-6",
        day: 6, // Thứ 6
        shift: "Chiều",
        subject: "Kiến trúc phần mềm",
        code: "23CS-SE-N01",
        time: "13:00 - 15:40",
        period: "Tiết 7-9",
        room: "Phòng 101",
        capacity: "36/36",
        status: "upcoming"
      }
    ]
  },
  {
    id: "GV03",
    name: "ThS. Trần Thị Mai",
    title: "Giảng viên Khoa Hệ thống Thông tin",
    avatar: "https://i.pravatar.cc/150?u=mai",
    department: "Hệ thống Thông tin",
    interactionScore: 95,
    interactionStatus: "Xuất sắc",
    stats: {
      assignedClasses: 2,
      totalPeriods: 48,
      completedPeriods: 42,
      completionRate: 87.5,
      avgAttendance: "98.1%",
      primaryShift: "Ca Sáng (90%)"
    },
    upcomingClasses: [
      { id: "up-6", subject: "Cơ sở dữ liệu", room: "Phòng 405", time: "Thứ 3 tuần sau, 07:30 - 10:10", period: "Tiết 1-3", mode: "Trực tiếp" },
      { id: "up-7", subject: "Khai phá dữ liệu", room: "Phòng 406", time: "Thứ 4 tuần sau, 13:00 - 15:40", period: "Tiết 7-9", mode: "Trực tiếp" }
    ],
    scheduleData: [
      {
        id: "sch-7",
        day: 3, // Thứ 3
        subject: "Cơ sở dữ liệu",
        shift: "Sáng",
        code: "23CS-DB-N01",
        time: "07:30 - 10:10",
        period: "Tiết 1-3",
        room: "Phòng 405",
        capacity: "45/45",
        status: "done"
      },
      {
        id: "sch-8",
        day: 4, // Thứ 4
        subject: "Khai phá dữ liệu",
        shift: "Chiều",
        code: "23CS-DM-N01",
        time: "13:00 - 15:40",
        period: "Tiết 7-9",
        room: "Phòng 406",
        capacity: "42/43",
        status: "done"
      },
      {
        id: "sch-9",
        day: 5, // Thứ 5
        subject: "Cơ sở dữ liệu",
        shift: "Sáng",
        code: "23CS-DB-N01",
        time: "07:30 - 10:10",
        period: "Tiết 1-3",
        room: "Phòng 405",
        capacity: "45/45",
        status: "done"
      }
    ]
  },
  {
    id: "GV04",
    name: "TS. Lê Hoàng Nam",
    title: "Giảng viên An toàn Thông tin",
    avatar: "https://i.pravatar.cc/150?u=nam",
    department: "An toàn Thông tin",
    interactionScore: 82,
    interactionStatus: "Tốt",
    stats: {
      assignedClasses: 2,
      totalPeriods: 36,
      completedPeriods: 24,
      completionRate: 66.7,
      avgAttendance: "95.0%",
      primaryShift: "Ca Sáng (60%)"
    },
    upcomingClasses: [
      { id: "up-8", subject: "Mạng máy tính", room: "Phòng 502", time: "Thứ 2 tuần sau, 10:15 - 12:00", period: "Tiết 4-5", mode: "Trực tiếp" },
      { id: "up-9", subject: "An toàn thông tin", room: "Phòng 503", time: "Thứ 4 tuần sau, 07:30 - 10:10", period: "Tiết 1-3", mode: "Trực tiếp" }
    ],
    scheduleData: [
      {
        id: "sch-10",
        day: 2, // Thứ 2
        subject: "Mạng máy tính",
        shift: "Sáng",
        code: "23CS-NW-N01",
        time: "10:15 - 12:00",
        period: "Tiết 4-5",
        room: "Phòng 502",
        capacity: "40/40",
        status: "done"
      },
      {
        id: "sch-11",
        day: 4, // Thứ 4
        subject: "An toàn thông tin",
        shift: "Sáng",
        code: "23CS-SEC-N01",
        time: "07:30 - 10:10",
        period: "Tiết 1-3",
        room: "Phòng 503",
        capacity: "38/40",
        status: "done"
      }
    ]
  }
];

export default function TeacherScheduleClient() {
  const [selectedTeacherId, setSelectedTeacherId] = useState(teachers[0].id);
  const [mondayDate, setMondayDate] = useState<Date>(() => {
    const today = new Date();
    const day = today.getDay();
    const diff = today.getDate() - day + (day === 0 ? -6 : 1); // Adjust for Monday start
    const monday = new Date(today.setDate(diff));
    monday.setHours(0, 0, 0, 0);
    return monday;
  });

  const selectedTeacher = teachers.find(t => t.id === selectedTeacherId) || teachers[0];

  const handlePrevWeek = () => {
    setMondayDate((prev) => {
      const nextDate = new Date(prev);
      nextDate.setDate(prev.getDate() - 7);
      return nextDate;
    });
  };

  const handleNextWeek = () => {
    setMondayDate((prev) => {
      const nextDate = new Date(prev);
      nextDate.setDate(prev.getDate() + 7);
      return nextDate;
    });
  };

  const getWeekDays = () => {
    const days = [];
    const labels = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"];
    for (let i = 0; i < 7; i++) {
      const dayDate = new Date(mondayDate);
      dayDate.setDate(mondayDate.getDate() + i);
      days.push({
        label: labels[i],
        dayNumber: i + 2, // Monday is 2, Tuesday 3...
        dateStr: `${dayDate.getDate().toString().padStart(2, "0")}/${(dayDate.getMonth() + 1).toString().padStart(2, "0")}/${dayDate.getFullYear()}`,
        dateShort: `${dayDate.getDate().toString().padStart(2, "0")}/${(dayDate.getMonth() + 1).toString().padStart(2, "0")}`
      });
    }
    return days;
  };

  const weekDays = getWeekDays();

  const getWeekRangeText = () => {
    const sunday = new Date(mondayDate);
    sunday.setDate(mondayDate.getDate() + 6);
    const pad = (n: number) => n.toString().padStart(2, "0");
    return `Tuần: ${pad(mondayDate.getDate())}/${pad(mondayDate.getMonth() + 1)} - ${pad(sunday.getDate())}/${pad(sunday.getMonth() + 1)}`;
  };

  // Lọc lịch học cho giảng viên hiện tại
  // Thêm ngày tháng thực tế dựa trên ngày thứ trong tuần được chọn
  const getLecturerSchedule = () => {
    return selectedTeacher.scheduleData.map(item => {
      const matchingDay = weekDays.find(d => d.dayNumber === item.day);
      return {
        ...item,
        dateStr: matchingDay ? matchingDay.dateStr : "",
        dateShort: matchingDay ? matchingDay.dateShort : ""
      };
    });
  };

  const currentSchedule = getLecturerSchedule();

  return (
    <DashboardLayout>
      <div className="flex-1 flex flex-col p-4 md:p-6 bg-[#F5F5F5] w-full text-left gap-6 overflow-x-hidden">
        
        {/* Navigation Breadcrumb */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 text-left">
          <div className="flex items-center gap-2 font-body-std text-body-std text-outline whitespace-nowrap">
            <span className="hover:text-primary transition-colors cursor-pointer">Hệ thống</span>
            <span className="material-symbols-outlined text-[16px] shrink-0">chevron_right</span>
            <span className="hover:text-primary transition-colors cursor-pointer">Giảng viên</span>
            <span className="material-symbols-outlined text-[16px] shrink-0">chevron_right</span>
            <span className="font-semibold text-text-primary text-body-std whitespace-nowrap">Lịch giảng dạy</span>
          </div>
        </div>

        {/* Layout container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT COLUMN: 70-75% - Weekly teaching schedule */}
          <div className="lg:col-span-8 flex flex-col gap-4 min-w-0">
            
            {/* Top Toolbar card */}
            <div className="bg-surface-white rounded-2xl border border-border-light p-4 shadow-sm flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
              
              {/* Teacher Selector dropdown */}
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-10 h-10 rounded-full border border-border-light relative overflow-hidden shrink-0">
                  <Image 
                    src={selectedTeacher.avatar} 
                    alt={selectedTeacher.name} 
                    fill 
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <label htmlFor="teacher-select" className="block text-[10px] font-bold text-outline uppercase tracking-wider mb-0.5 whitespace-nowrap">Giảng viên</label>
                  <select 
                    id="teacher-select"
                    value={selectedTeacherId}
                    onChange={(e) => setSelectedTeacherId(e.target.value)}
                    className="w-full bg-transparent border-none font-headline-sm text-text-primary font-bold focus:ring-0 outline-none p-0 cursor-pointer text-sm truncate"
                  >
                    {teachers.map((teacher) => (
                      <option key={teacher.id} value={teacher.id}>
                        {teacher.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Week Selector controls */}
              <div className="flex items-center justify-between sm:justify-end gap-3 border-t sm:border-t-0 pt-3 sm:pt-0 border-border-light/60 shrink-0">
                <button
                  type="button"
                  onClick={handlePrevWeek}
                  className="p-2 rounded-xl border border-border-light bg-surface-bright hover:bg-gray-100 hover:text-primary transition-colors flex items-center justify-center cursor-pointer active:scale-95 shrink-0"
                  aria-label="Previous Week"
                >
                  <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                </button>
                <div className="px-4 py-1.5 rounded-xl border border-border-light bg-surface-bright font-bold text-text-primary text-xs tracking-wide min-w-[150px] text-center whitespace-nowrap">
                  {getWeekRangeText()}
                </div>
                <button
                  type="button"
                  onClick={handleNextWeek}
                  className="p-2 rounded-xl border border-border-light bg-surface-bright hover:bg-gray-100 hover:text-primary transition-colors flex items-center justify-center cursor-pointer active:scale-95 shrink-0"
                  aria-label="Next Week"
                >
                  <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                </button>
              </div>
            </div>

            {/* Main schedule table card */}
            <div className="bg-surface-white rounded-3xl border border-border-light shadow-[0px_4px_25px_rgba(0,0,0,0.03)] overflow-hidden flex flex-col min-w-0">
              
              <div className="p-5 border-b border-border-light/60 bg-surface-bright/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="min-w-0">
                  <h2 className="font-headline-md text-headline-md text-text-primary truncate">Nội dung lịch dạy theo tuần</h2>
                  <p className="text-xs text-outline mt-0.5 truncate">Thời khóa biểu giảng dạy của giảng viên {selectedTeacher.name}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-success-green"></span>
                  <span className="text-[11px] font-semibold text-text-primary uppercase tracking-wider whitespace-nowrap">{selectedTeacher.department}</span>
                </div>
              </div>

              {/* Table Wrapper */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[750px]">
                  <thead>
                    <tr className="border-b border-border-light bg-surface-bright select-none">
                      <th className="py-3.5 px-4 font-bold text-outline text-[11px] uppercase tracking-normal w-12 text-center whitespace-nowrap">STT</th>
                      <th className="py-3.5 px-4 font-bold text-outline text-[11px] uppercase tracking-normal w-28 whitespace-nowrap">Thứ / Ngày</th>
                      <th className="py-3.5 px-4 font-bold text-outline text-[11px] uppercase tracking-normal w-24 whitespace-nowrap">Ca học</th>
                      <th className="py-3.5 px-4 font-bold text-outline text-[11px] uppercase tracking-normal whitespace-nowrap">Tên học phần / Mã lớp</th>
                      <th className="py-3.5 px-4 font-bold text-outline text-[11px] uppercase tracking-normal w-28 whitespace-nowrap">Giờ dạy</th>
                      <th className="py-3.5 px-4 font-bold text-outline text-[11px] uppercase tracking-normal w-24 whitespace-nowrap">Phòng</th>
                      <th className="py-3.5 px-4 font-bold text-outline text-[11px] uppercase tracking-normal w-20 text-center whitespace-nowrap">Sĩ số</th>
                      <th className="py-3.5 px-4 font-bold text-outline text-[11px] uppercase tracking-normal w-28 text-center whitespace-nowrap">Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-light/50">
                    {currentSchedule.length > 0 ? (
                      currentSchedule.map((session, index) => (
                        <tr key={session.id} className="hover:bg-surface-bright/30 transition-colors">
                          <td className="py-4 px-4 font-semibold text-outline text-sm text-center whitespace-nowrap">{index + 1}</td>
                          <td className="py-4 px-4 whitespace-nowrap">
                            <div className="font-semibold text-text-primary text-sm">Thứ {session.day}</div>
                            <div className="text-[11px] text-outline font-medium mt-0.5">{session.dateStr}</div>
                          </td>
                          <td className="py-4 px-4 whitespace-nowrap">
                            <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold border ${
                              session.shift === "Sáng" 
                                ? "bg-blue-50 text-blue-600 border-blue-200" 
                                : "bg-purple-50 text-purple-600 border-purple-200"
                            }`}>
                              Ca {session.shift}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <div className="font-semibold text-text-primary text-sm line-clamp-1">{session.subject}</div>
                            <div className="text-[11px] text-outline mt-0.5 font-medium">{session.code}</div>
                          </td>
                          <td className="py-4 px-4 whitespace-nowrap">
                            <div className="font-semibold text-text-primary text-sm">{session.time}</div>
                            <div className="text-[11px] text-outline mt-0.5 font-medium">{session.period}</div>
                          </td>
                          <td className="py-4 px-4 whitespace-nowrap">
                            <div className="flex items-center gap-1 font-semibold text-text-primary text-sm">
                              <span className="material-symbols-outlined text-[16px] text-outline shrink-0">room</span>
                              {session.room}
                            </div>
                          </td>
                          <td className="py-4 px-4 font-semibold text-on-surface-variant text-sm text-center whitespace-nowrap">{session.capacity}</td>
                          <td className="py-4 px-4 text-center whitespace-nowrap">
                            {session.status === "done" && (
                              <span className="bg-success-green/10 text-success-green border border-success-green/20 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider whitespace-nowrap">
                                Đã dạy
                              </span>
                            )}
                            {session.status === "live" && (
                              <span className="bg-error-red/10 text-error-red border border-error-red/20 text-[10px] font-bold px-2.5 py-0.5 rounded-md uppercase tracking-wider flex items-center justify-center gap-1 w-fit mx-auto animate-pulse whitespace-nowrap">
                                <span className="w-1.5 h-1.5 bg-error-red rounded-full shrink-0"></span> Trực tiếp
                              </span>
                            )}
                            {session.status === "upcoming" && (
                              <span className="bg-primary/10 text-primary border border-primary/20 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider whitespace-nowrap">
                                Sắp học
                              </span>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={8} className="py-16 text-center text-outline italic">
                          <div className="flex flex-col items-center justify-center gap-2">
                            <span className="material-symbols-outlined text-[40px] text-outline/40">calendar_today</span>
                            <span className="font-semibold text-sm">Không có lịch giảng dạy trong tuần này</span>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Table Footer */}
              <div className="p-4 bg-surface-bright/40 border-t border-border-light/75 flex justify-between items-center text-xs font-semibold text-text-primary gap-4 flex-wrap">
                <div className="whitespace-nowrap">
                  Tổng số môn giảng dạy trong tuần: <span className="text-primary font-bold">{new Set(currentSchedule.map(s => s.subject)).size} môn</span>
                </div>
                <div className="whitespace-nowrap">
                  Tổng số tiết dạy: <span className="text-primary font-bold">{currentSchedule.length * 3} tiết</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: 25-30% - Sidebar statistics & upcoming classes */}
          <div className="lg:col-span-4 flex flex-col gap-6 w-full min-w-0">
            
            {/* PANEL 1: Teaching Statistics (Dark Blue Header) */}
            <div className="bg-surface-white rounded-3xl border border-border-light shadow-[0px_4px_25px_rgba(0,0,0,0.03)] overflow-hidden flex flex-col">
              {/* Card Header (Deep Academy Blue) */}
              <div className="bg-[#183AD6] text-white p-4.5 flex items-center gap-3 select-none">
                <span className="material-symbols-outlined text-[20px] shrink-0">analytics</span>
                <h3 className="font-headline-sm text-headline-sm text-white uppercase tracking-normal font-bold whitespace-nowrap">Thống kê giảng dạy</h3>
              </div>
              
              {/* Card List Content */}
              <div className="p-4 flex flex-col gap-3.5">
                <div className="flex items-center justify-between p-3 rounded-2xl bg-surface-bright border border-border-light/50 gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="material-symbols-outlined text-primary text-[18px] shrink-0">class</span>
                    <span className="text-xs font-semibold text-outline truncate">Lớp học phụ trách</span>
                  </div>
                  <span className="text-sm font-bold text-text-primary shrink-0 whitespace-nowrap">{selectedTeacher.stats.assignedClasses} lớp</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-2xl bg-surface-bright border border-border-light/50 gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="material-symbols-outlined text-primary text-[18px] shrink-0">hourglass_empty</span>
                    <span className="text-xs font-semibold text-outline truncate">Số tiết dạy (Thực tế/KH)</span>
                  </div>
                  <span className="text-sm font-bold text-text-primary shrink-0 whitespace-nowrap">{selectedTeacher.stats.completedPeriods}/{selectedTeacher.stats.totalPeriods} tiết</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-2xl bg-surface-bright border border-border-light/50 gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="material-symbols-outlined text-primary text-[18px] shrink-0">check_circle</span>
                    <span className="text-xs font-semibold text-outline truncate">Tỷ lệ hoàn thành</span>
                  </div>
                  <span className="text-sm font-bold text-success-green shrink-0 whitespace-nowrap">{selectedTeacher.stats.completionRate}%</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-2xl bg-surface-bright border border-border-light/50 gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="material-symbols-outlined text-primary text-[18px] shrink-0">groups</span>
                    <span className="text-xs font-semibold text-outline truncate">Chuyên cần bình quân</span>
                  </div>
                  <span className="text-sm font-bold text-text-primary shrink-0 whitespace-nowrap">{selectedTeacher.stats.avgAttendance}</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-2xl bg-surface-bright border border-border-light/50 gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="material-symbols-outlined text-primary text-[18px] shrink-0">light_mode</span>
                    <span className="text-xs font-semibold text-outline truncate">Ca học chính</span>
                  </div>
                  <span className="text-sm font-bold text-text-primary shrink-0 whitespace-nowrap">{selectedTeacher.stats.primaryShift}</span>
                </div>

                {/* Score bar */}
                <div className="mt-2 pt-3 border-t border-border-light/50 flex flex-col gap-2">
                  <div className="flex justify-between items-center text-xs font-semibold text-text-primary gap-2">
                    <span className="text-outline text-[11px] font-semibold whitespace-nowrap">Chỉ số tương tác (AI)</span>
                    <span className="text-primary font-bold text-sm shrink-0">{selectedTeacher.interactionScore}/100</span>
                  </div>
                  <div className="w-full bg-surface-container rounded-full h-1.5 overflow-hidden">
                    <div className="bg-primary h-full rounded-full transition-all duration-500" style={{ width: `${selectedTeacher.interactionScore}%` }}></div>
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-outline font-semibold gap-2 mt-1">
                    <span className="truncate">Xếp hạng khoa</span>
                    <span className="bg-primary/10 text-primary border border-primary/20 px-1.5 py-0.5 rounded text-[9px] font-bold shrink-0 whitespace-nowrap">{selectedTeacher.interactionStatus}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* PANEL 2: Upcoming classes (Orange Header) */}
            <div className="bg-surface-white rounded-3xl border border-border-light shadow-[0px_4px_25px_rgba(0,0,0,0.03)] overflow-hidden flex flex-col">
              {/* Card Header (Orange) */}
              <div className="bg-[#E05600] text-white p-4.5 flex items-center gap-3 select-none">
                <span className="material-symbols-outlined text-[20px] shrink-0">event_upcoming</span>
                <h3 className="font-headline-sm text-headline-sm text-white uppercase tracking-normal font-bold whitespace-nowrap">Lịch dạy sắp tới</h3>
              </div>
              
              {/* Card list */}
              <div className="p-4 flex flex-col gap-3">
                {selectedTeacher.upcomingClasses.map((item) => (
                  <div 
                    key={item.id} 
                    className="p-3.5 rounded-2xl bg-surface-bright border border-border-light/60 hover:border-primary/40 transition-colors flex flex-col gap-2 relative group min-w-0"
                  >
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="font-semibold text-text-primary text-sm group-hover:text-primary transition-colors line-clamp-1 truncate flex-1">{item.subject}</h4>
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase shrink-0 whitespace-nowrap ${
                        item.mode === "Trực tiếp" 
                          ? "bg-blue-50 text-blue-600 border border-blue-200" 
                          : "bg-tertiary/10 text-tertiary border border-tertiary/20"
                      }`}>
                        {item.mode}
                      </span>
                    </div>
                    
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-1.5 text-xs text-outline font-semibold whitespace-nowrap">
                        <span className="material-symbols-outlined text-[15px] shrink-0">calendar_today</span>
                        <span className="truncate">{item.time}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-outline font-semibold whitespace-nowrap">
                        <span className="material-symbols-outlined text-[15px] shrink-0">schedule</span>
                        <span className="truncate">{item.period}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-outline font-semibold whitespace-nowrap">
                        <span className="material-symbols-outlined text-[15px] shrink-0">room</span>
                        <span className="truncate">Phòng: {item.room}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}
